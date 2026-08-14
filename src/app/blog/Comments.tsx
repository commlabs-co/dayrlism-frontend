"use client";

import { useEffect, useRef } from "react";

// Giscus config comes from env so the public-comments repo can be swapped
// without code changes. repoId + categoryId come from https://giscus.app
// once the repo has Discussions + the giscus app installed.
const repo = process.env.NEXT_PUBLIC_GISCUS_REPO; // e.g. "commlabs-co/dayrlism-comments"
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Comments";
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const configured = Boolean(repo && repoId && categoryId);

/** GitHub-Discussions comments via giscus. Renders nothing until the
 *  NEXT_PUBLIC_GISCUS_* env vars are set, so it's invisible while unconfigured
 *  — exactly like the view counter. */
export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!configured || !host) return;
    // Guard against double-inject (React Strict Mode / client navigation).
    if (host.querySelector("script, iframe.giscus-frame")) return;

    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-repo", repo!);
    s.setAttribute("data-repo-id", repoId!);
    s.setAttribute("data-category", category);
    s.setAttribute("data-category-id", categoryId!);
    s.setAttribute("data-mapping", "pathname");
    s.setAttribute("data-strict", "1");
    s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-emit-metadata", "0");
    s.setAttribute("data-input-position", "top");
    s.setAttribute("data-theme", "transparent_dark");
    s.setAttribute("data-lang", "en");
    s.setAttribute("data-loading", "lazy");
    host.appendChild(s);
  }, []);

  if (!configured) return null;

  return (
    <section style={{ marginTop: 48, borderTop: "1px solid var(--line)", paddingTop: 28 }}>
      <div className="dl-mono" style={{ fontSize: 12, letterSpacing: ".18em", color: "var(--accent)", marginBottom: 18 }}>
        COMMENTS
      </div>
      <div ref={ref} className="dl-giscus" />
    </section>
  );
}
