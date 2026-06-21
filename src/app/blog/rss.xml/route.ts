import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

const SITE = "https://dayrlism.info";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const pubDate = p.publishedAt
        ? `<pubDate>${new Date(`${p.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>`
        : "";
      return `
    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate}
      <description>${esc(p.summary)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>dayrlism — Blog</title>
    <link>${SITE}/blog</link>
    <description>Writing and notes on engineering, design, and building things.</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
