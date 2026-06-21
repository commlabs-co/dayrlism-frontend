// Single, decoupled access point for blog content.
//
// Everything funnels through this module so the rest of the app never imports
// Keystatic directly. If the CMS is ever swapped (Tina, Sanity, a hand-rolled
// reader), only this file changes — the pages keep consuming `PostSummary` /
// `getPost` unchanged.
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

const isProd = process.env.NODE_ENV === "production";

export type PostSummary = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string | null;
  tags: readonly string[];
  coverImage: string | null;
};

export type FullPost = Awaited<ReturnType<typeof getPost>>;
/** The parsed Markdoc body node, as returned by the Keystatic reader. */
export type PostNode = NonNullable<FullPost>["node"];

/** Normalise an image reference to a usable public URL (robust to either a bare
 *  filename or an already-public path being stored in front matter). */
function resolveImage(value: string | null): string | null {
  if (!value) return null;
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return `/images/blog/${value}`;
}

function byNewest(a: PostSummary, b: PostSummary): number {
  if (!a.publishedAt) return 1;
  if (!b.publishedAt) return -1;
  return b.publishedAt.localeCompare(a.publishedAt);
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await reader.collections.posts.all();
  return posts
    .filter((p) => !(isProd && p.entry.draft))
    .map((p) => ({
      slug: p.slug,
      title: p.entry.title,
      summary: p.entry.summary,
      publishedAt: p.entry.publishedAt,
      tags: p.entry.tags,
      coverImage: resolveImage(p.entry.coverImage),
    }))
    .sort(byNewest);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  for (const post of posts) for (const tag of post.tags) set.add(tag);
  return [...set].sort((a, b) => a.localeCompare(b));
}

export async function getPostSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((p) => p.slug);
}

export async function getPost(slug: string) {
  const entry = await reader.collections.posts.read(slug);
  if (!entry) return null;
  if (isProd && entry.draft) return null;
  const { node } = await entry.content();
  return {
    slug,
    title: entry.title,
    summary: entry.summary,
    publishedAt: entry.publishedAt,
    tags: entry.tags,
    coverImage: resolveImage(entry.coverImage),
    node,
  };
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
