import { rateLimit, clientIp } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

// Notion's REST API is a single POST, so it's called directly rather than
// pulling in @notionhq/client.
const NOTION_API = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_MESSAGE = 5000;
// Notion rejects any single rich_text run longer than this.
const RICH_TEXT_LIMIT = 2000;

/** Split a long message into rich_text-safe paragraph blocks. */
function paragraphs(text: string) {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += RICH_TEXT_LIMIT) {
    chunks.push(text.slice(i, i + RICH_TEXT_LIMIT));
  }
  return chunks.map((content) => ({
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: [{ type: "text", text: { content } }] },
  }));
}

/** Record a contact-form enquiry as a row in the Notion database.
 *  Returns a clear 503 while unconfigured rather than pretending to succeed. */
export async function POST(req: Request) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_CONTACT_DB_ID;
  if (!token || !databaseId) {
    return Response.json(
      { ok: false, error: "The contact form isn't configured yet." },
      { status: 503 },
    );
  }

  // Enquiries are rare per human; this is the only thing standing between the
  // form and a script filling the database.
  if (!(await rateLimit("contact", clientIp(req), 3, 600))) {
    return Response.json(
      { ok: false, error: "Too many messages — please try again later." },
      { status: 429 },
    );
  }

  let name = "";
  let email = "";
  let message = "";
  try {
    const body = await req.json();
    name = String(body?.name ?? "").trim();
    email = String(body?.email ?? "").trim().toLowerCase();
    message = String(body?.message ?? "").trim();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!name || name.length > MAX_NAME) {
    return Response.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return Response.json(
      { ok: false, error: `Please write a message (up to ${MAX_MESSAGE} characters).` },
      { status: 400 },
    );
  }

  try {
    const r = await fetch(NOTION_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: { title: [{ text: { content: name } }] },
          Email: { email },
          // The property mirrors the message for at-a-glance triage; the full
          // text always lives in the page body below.
          Message: { rich_text: [{ text: { content: message.slice(0, RICH_TEXT_LIMIT) } }] },
          Status: { select: { name: "New" } },
          Source: { select: { name: "Website contact form" } },
        },
        children: paragraphs(message),
      }),
    });

    if (r.ok) return Response.json({ ok: true });

    // Surface Notion's own reason server-side; keep it vague to the client so a
    // misconfiguration never leaks the database id or token state.
    const detail = await r.text().catch(() => "");
    console.error(`Notion contact write failed (${r.status}): ${detail.slice(0, 500)}`);
    return Response.json(
      { ok: false, error: "Couldn't send that just now. Please try again." },
      { status: 502 },
    );
  } catch (err) {
    console.error("Notion contact write threw:", err);
    return Response.json(
      { ok: false, error: "Network error. Please try again." },
      { status: 502 },
    );
  }
}
