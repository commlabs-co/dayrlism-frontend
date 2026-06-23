import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

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
