import * as React from "react";
import Markdoc from "@markdoc/markdoc";
import type { PostNode } from "@/lib/content";
import { markdocConfig } from "@/lib/markdoc-utils";

// Renders a Keystatic Markdoc body to React. Pure host elements (h2, p, ul…),
// so it renders fine as a server component; styling comes from `.dl-prose`.
// `markdocConfig` stamps slug ids onto headings for TOC anchors + scroll-spy.
export function MarkdocContent({ node }: { node: PostNode }) {
  const renderable = Markdoc.transform(node, markdocConfig);
  return <>{Markdoc.renderers.react(renderable, React)}</>;
}
