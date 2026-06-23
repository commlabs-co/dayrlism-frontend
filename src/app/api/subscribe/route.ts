export const dynamic = "force-dynamic";

// Buttondown's current API. Override via env if the account is on the legacy
// api.buttondown.email host.
const API = process.env.BUTTONDOWN_API_URL ?? "https://api.buttondown.com/v1/subscribers";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Collect a newsletter signup and hand it to Buttondown.
 *  Degrades to a clear 503 while BUTTONDOWN_API_KEY is unset, so the form
 *  never silently fails. */
export async function POST(req: Request) {
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    return Response.json({ ok: false, error: "Newsletter isn't configured yet." }, { status: 503 });
  }

  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const r = await fetch(API, {
      method: "POST",
      headers: { Authorization: `Token ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email_address: email, referrer_url: "https://dayrlism.info/blog" }),
    });

    if (r.ok) return Response.json({ ok: true });

    // Buttondown answers 400 when the address already exists — treat as success.
    const data = await r.json().catch(() => null);
    const blob = JSON.stringify(data ?? "");
    if (r.status === 400 && /already|exists|subscribed/i.test(blob)) {
      return Response.json({ ok: true, already: true });
    }
    const detail =
      (data && (data.detail || (Array.isArray(data.email_address) ? data.email_address[0] : null))) || "";
    return Response.json(
      { ok: false, error: typeof detail === "string" && detail ? detail : "Subscription failed." },
      { status: 502 },
    );
  } catch {
    return Response.json({ ok: false, error: "Network error. Please try again." }, { status: 502 });
  }
}
