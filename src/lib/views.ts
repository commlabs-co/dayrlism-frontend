import { Redis } from "@upstash/redis";

// Vercel's Upstash for Redis integration provisions the REST endpoint + token
// under KV_* names (KV_REST_API_URL / KV_REST_API_TOKEN); the @upstash/redis
// SDK's own convention is UPSTASH_REDIS_REST_*. Accept either pair so the
// counter activates regardless of how the store was linked.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

/** True only when Upstash credentials are configured (set in Vercel env). */
export const viewsEnabled = Boolean(url && token);

const redis = viewsEnabled
  ? new Redis({ url: url as string, token: token as string })
  : null;

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
