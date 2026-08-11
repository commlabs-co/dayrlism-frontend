import { redis } from "./redis";

/** True only when Upstash credentials are configured (set in Vercel env). */
export const viewsEnabled = redis !== null;

const key = (slug: string) => `views:${slug}`;

/** Atomically bump and return a post's view count (null if not configured). */
export async function incrementViews(slug: string): Promise<number | null> {
  if (!redis) return null;
  try {
    return await redis.incr(key(slug));
  } catch {
    return null;
  }
}

/** Read a post's view count without incrementing (null if not configured). */
export async function getViews(slug: string): Promise<number | null> {
  if (!redis) return null;
  try {
    const v = await redis.get<number>(key(slug));
    return v == null ? 0 : Number(v);
  } catch {
    return null;
  }
}
