"use client";

import { useEffect } from "react";

/** Progressive enhancement for the rendered article: hover-to-copy heading
 *  anchors and a copy button on code blocks. No SSR impact (renders null). */
export function PostEnhancements() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".dl-prose");
    if (!root) return;
    const cleanups: Array<() => void> = [];

    // Heading anchor links
    root.querySelectorAll<HTMLElement>("h2[id], h3[id]").forEach((h) => {
      if (h.querySelector(".dl-anchor")) return;
      const a = document.createElement("a");
      a.className = "dl-anchor";
      a.href = `#${h.id}`;
      a.textContent = "#";
      a.setAttribute("aria-label", "Link to this section");
      const onClick = (e: MouseEvent) => {
        e.preventDefault();
        history.replaceState(null, "", `#${h.id}`);
        void navigator.clipboard?.writeText(
          `${location.origin}${location.pathname}#${h.id}`
        );
      };
      a.addEventListener("click", onClick);
      h.appendChild(a);
      cleanups.push(() => a.removeEventListener("click", onClick));
    });

    // Copy button on code blocks
    root.querySelectorAll<HTMLPreElement>("pre").forEach((pre) => {
      if (pre.querySelector(".dl-copy")) return;
      pre.classList.add("dl-pre");
      const btn = document.createElement("button");
      btn.className = "dl-copy dl-mono";
      btn.type = "button";
      btn.textContent = "Copy";
      const onClick = () => {
        const code = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        void navigator.clipboard?.writeText(code).then(() => {
          btn.textContent = "Copied ✓";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 1500);
        });
      };
      btn.addEventListener("click", onClick);
      pre.appendChild(btn);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
