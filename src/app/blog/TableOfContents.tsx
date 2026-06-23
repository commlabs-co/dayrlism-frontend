"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdoc-utils";

/** Sticky "on this page" nav (desktop only via CSS) with scroll-spy. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="dl-toc" aria-label="On this page">
      <div className="dl-toc-title dl-mono">ON THIS PAGE</div>
      <ul>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="dl-toc-link"
              data-sub={h.level === 3 ? "true" : "false"}
              data-active={active === h.id ? "true" : "false"}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
