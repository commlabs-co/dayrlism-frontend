import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";

const SITE = "https://dayrlism.info";

/** Lists only the canonical, indexable pages. The archived site versions under
 *  /vN are deliberately absent: they carry X-Robots-Tag noindex (see
 *  next.config.js) and exist for humans following the version history, not for
 *  search engines to rank against the live site. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const newest = posts.reduce<string | null>(
    (latest, p) => (!latest || (p.publishedAt ?? "") > latest ? p.publishedAt ?? latest : latest),
    null,
  );

  return [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE}/blog`,
      lastModified: newest ? new Date(newest) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
