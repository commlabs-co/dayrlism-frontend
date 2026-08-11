import { Redis } from "@upstash/redis";

// Vercel's Upstash for Redis integration provisions the REST endpoint + token
// under KV_* names (KV_REST_API_URL / KV_REST_API_TOKEN); the @upstash/redis
// SDK's own convention is UPSTASH_REDIS_REST_*. Accept either pair.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

/** Shared Upstash client — null while unconfigured, so every feature that
 *  depends on Redis (view counts, rate limiting) degrades to a no-op. */
export const redis = url && token ? new Redis({ url, token }) : null;
