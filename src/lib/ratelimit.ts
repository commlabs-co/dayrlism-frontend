import { redis } from "./redis";

/** Fixed-window per-client rate limiter on the shared Upstash store.
 *
 *  Fail-open by design: with Redis unconfigured or unreachable the request is
 *  allowed — the features behind it already degrade gracefully, and keeping
 *  the blog available matters more than a perfectly enforced ceiling. */
export async function rateLimit(
  scope: string,
  id: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  if (!redis) return true;
  try {
    const windowId = Math.floor(Date.now() / 1000 / windowSeconds);
    const k = `rl:${scope}:${windowId}:${id}`;
    const count = await redis.incr(k);
    // Window id is baked into the key, so a missed expire only strands a key.
    if (count === 1) await redis.expire(k, windowSeconds + 1);
    return count <= limit;
  } catch {
    return true;
  }
}

/** Best-effort client IP behind Vercel's proxy (first x-forwarded-for hop). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const first = fwd ? (fwd.split(",")[0] || "").trim() : "";
  return first || req.headers.get("x-real-ip") || "unknown";
}
