"use client";

import { useEffect, useState } from "react";

function format(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

/** Records a view (once per session per post) and shows the count.
 *  Renders nothing until a number comes back, so it's invisible while the
 *  Upstash store is unconfigured — the rest of the post is unaffected. */
export function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const seenKey = `viewed:${slug}`;
    const seen = sessionStorage.getItem(seenKey);
    let cancelled = false;
    fetch(`/api/views/${encodeURIComponent(slug)}`, { method: seen ? "GET" : "POST" })
      .then((r) => r.json())
      .then((d: { count: number | null }) => {
        if (!cancelled && typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});
    if (!seen) sessionStorage.setItem(seenKey, "1");
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (count === null) return null;
  return <> · {format(count)} views</>;
}
