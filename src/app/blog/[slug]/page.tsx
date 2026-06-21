import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs, formatDate } from "@/lib/content";
import { MarkdocContent } from "../MarkdocContent";

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(32px,6vw,64px) clamp(20px,5vw,40px) 60px" }}>
      <Link className="dl-link-u dl-mono" href="/blog" style={{ fontSize: 12.5, color: "var(--muted)" }}>
        ← ALL POSTS
      </Link>

      <header style={{ margin: "26px 0 30px" }}>
        <div className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".06em" }}>
          {formatDate(post.publishedAt)}
        </div>
        <h1 style={{ margin: "12px 0 0", fontSize: "clamp(30px,5vw,46px)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.06 }}>
          {post.title}
        </h1>
        <p style={{ margin: "16px 0 0", color: "var(--muted)", fontSize: 18, lineHeight: 1.55 }}>
          {post.summary}
        </p>
        {post.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
            {post.tags.map((t) => (
              <Link key={t} className="dl-chip" href={`/blog?tag=${encodeURIComponent(t)}`}>
                {t}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={post.coverImage}
          alt=""
          style={{
            width: "100%",
            aspectRatio: "1200 / 630",
            objectFit: "cover",
            borderRadius: 16,
            border: "1px solid var(--line)",
            display: "block",
            marginBottom: 38,
          }}
        />
      )}

      <div className="dl-prose">
        <MarkdocContent node={post.node} />
      </div>
    </article>
  );
}
