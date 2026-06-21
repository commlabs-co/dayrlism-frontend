import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing and notes on engineering, design, and building things.",
};

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);
  const visible = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(40px,8vw,90px) clamp(20px,5vw,64px) 40px" }}>
      {/* header */}
      <header style={{ marginBottom: 40 }}>
        <div className="dl-mono" style={{ fontSize: 12, letterSpacing: ".22em", color: "var(--accent)", marginBottom: 14 }}>
          JOURNAL
        </div>
        <h1 style={{ fontSize: "clamp(34px,6vw,58px)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.02, margin: 0 }}>
          Writing &amp; notes
        </h1>
        <p style={{ marginTop: 16, maxWidth: 560, color: "var(--muted)", fontSize: 17, lineHeight: 1.6 }}>
          Occasional notes on engineering, design, and the things I build.
        </p>
      </header>

      {/* tag filter */}
      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 34 }}>
          <Link className="dl-chip" data-active={!tag} href="/blog">
            All
          </Link>
          {tags.map((t) => (
            <Link key={t} className="dl-chip" data-active={t === tag} href={`/blog?tag=${encodeURIComponent(t)}`}>
              {t}
            </Link>
          ))}
        </div>
      )}

      {/* posts */}
      {visible.length === 0 ? (
        <p style={{ color: "var(--muted)", padding: "30px 0" }}>
          {tag ? (
            <>
              No posts tagged <strong style={{ color: "var(--text)" }}>{tag}</strong> yet.{" "}
              <Link href="/blog" style={{ color: "var(--accent)" }}>
                View all
              </Link>
            </>
          ) : (
            "No posts yet — check back soon."
          )}
        </p>
      ) : (
        <div style={{ display: "grid", gap: 18 }}>
          {visible.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="dl-post-card">
              {post.coverImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img className="dl-post-cover" src={post.coverImage} alt="" />
              ) : (
                <div className="dl-post-cover" />
              )}
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div className="dl-mono" style={{ fontSize: 11.5, color: "var(--muted)", letterSpacing: ".05em" }}>
                  {formatDate(post.publishedAt)}
                </div>
                <h2 style={{ margin: "7px 0 0", fontSize: "clamp(20px,2.6vw,26px)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.15 }}>
                  {post.title}
                </h2>
                <p style={{ margin: "9px 0 0", color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>
                  {post.summary}
                </p>
                {post.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
                    {post.tags.map((t) => (
                      <span key={t} className="dl-chip" style={{ pointerEvents: "none" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
