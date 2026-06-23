// Single, decoupled access point for blog content.
//
// Everything funnels through this module so the rest of the app never imports
// Keystatic directly. If the CMS is ever swapped (Tina, Sanity, a hand-rolled
// reader), only this file changes — the pages keep consuming `PostSummary` /
// `getPost` unchanged.
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { profile as staticProfile } from "@/content/profile";
import type { Profile } from "@/content/types";
import { readingMinutes, extractHeadings } from "./markdoc-utils";

export const reader = createReader(process.cwd(), keystaticConfig);

/**
 * Landing + résumé profile data, sourced from the Keystatic `profile` singleton
 * and layered over the static `profile.ts` so the site renders correctly even
 * if the singleton is missing or a field was never set in the CMS.
 */
export async function getProfile(): Promise<Profile> {
  try {
    const data = await reader.singletons.profile.read();
    if (!data) return staticProfile;
    // clone to plain mutable objects (the reader returns readonly views)
    const cms = JSON.parse(JSON.stringify(data)) as Partial<Profile>;
    return { ...staticProfile, ...cms } as Profile;
  } catch {
    return staticProfile;
  }
}

const isProd = process.env.NODE_ENV === "production";

export type PostSummary = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string | null;
  tags: readonly string[];
  coverImage: string | null;
  readingTime: number;
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
  const mapped = await Promise.all(
    posts
      .filter((p) => !(isProd && p.entry.draft))
      .map(async (p) => {
        const { node } = await p.entry.content();
        return {
          slug: p.slug,
          title: p.entry.title,
          summary: p.entry.summary,
          publishedAt: p.entry.publishedAt,
          tags: p.entry.tags,
          coverImage: resolveImage(p.entry.coverImage),
          readingTime: readingMinutes(node),
        };
      })
  );
  return mapped.sort(byNewest);
}

/** Other posts sharing the most tags with the given one (for "related"). */
export async function getRelatedPosts(
  slug: string,
  tags: readonly string[],
  limit = 3
): Promise<PostSummary[]> {
  const tagSet = new Set(tags);
  const all = await getAllPosts();
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, score: p.tags.filter((t) => tagSet.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

/** Chronological neighbours for prev/next navigation (posts are newest-first). */
export async function getAdjacentPosts(
  slug: string
): Promise<{ newer: PostSummary | null; older: PostSummary | null }> {
  const all = await getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i < all.length - 1 ? all[i + 1] : null,
  };
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
    readingTime: readingMinutes(node),
    headings: extractHeadings(node),
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
