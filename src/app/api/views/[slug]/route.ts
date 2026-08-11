import { incrementViews, getViews } from "@/lib/views";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

// Slug guard so the endpoint can't be used to spray arbitrary Redis keys.
const VALID = /^[a-z0-9-]{1,80}$/;

// POST = a real view (increment). GET = read-only (already-seen this session).
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID.test(slug)) return Response.json({ count: null }, { status: 400 });
  // Increments are the abusable path — cap them per IP. Reads stay open.
  if (!(await rateLimit("views", clientIp(req), 20, 60))) {
    return Response.json({ count: null }, { status: 429 });
  }
  return Response.json({ count: await incrementViews(slug) });
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID.test(slug)) return Response.json({ count: null }, { status: 400 });
  return Response.json({ count: await getViews(slug) });
}
