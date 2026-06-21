import * as React from "react";
import Markdoc from "@markdoc/markdoc";
import type { PostNode } from "@/lib/content";

// Renders a Keystatic Markdoc body to React. Pure host elements (h2, p, ul…),
// so it renders fine as a server component; styling comes from `.dl-prose`.
export function MarkdocContent({ node }: { node: PostNode }) {
  const renderable = Markdoc.transform(node);
  return <>{Markdoc.renderers.react(renderable, React)}</>;
}
