"use client";

import { useState } from "react";

/** Share to X / LinkedIn + copy link. No backend. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const e = encodeURIComponent;
  const x = `https://twitter.com/intent/tweet?text=${e(title)}&url=${e(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="dl-share">
      <span className="dl-share-label dl-mono">SHARE</span>
      <a className="dl-share-btn" href={x} target="_blank" rel="noreferrer" aria-label="Share on X">
        X
      </a>
      <a className="dl-share-btn" href={linkedin} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
        in
      </a>
      <button className="dl-share-btn" type="button" onClick={copy}>
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
