import Markdoc, { type Node, type Config } from "@markdoc/markdoc";

export type Heading = { level: number; text: string; id: string };

/** URL-safe slug for heading anchors / TOC. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Recursively collect plain text from a Markdoc AST node. */
function nodeText(node: Node): string {
  let s =
    node.type === "text" && typeof node.attributes?.content === "string"
      ? node.attributes.content
      : "";
  for (const child of node.children ?? []) s += nodeText(child);
  return s;
}

/** Estimated read time in minutes (~200 wpm), floor of 1. */
export function readingMinutes(node: Node): number {
  const words = nodeText(node).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Pull h2/h3 headings (with slug ids) for an on-this-page table of contents. */
export function extractHeadings(node: Node): Heading[] {
  const out: Heading[] = [];
  const walk = (n: Node) => {
    const lvl = n.attributes?.level;
    if (n.type === "heading" && (lvl === 2 || lvl === 3)) {
      const text = nodeText(n).trim();
      if (text) out.push({ level: lvl, text, id: slugify(text) });
    }
    for (const child of n.children ?? []) walk(child);
  };
  walk(node);
  return out;
}

/** Markdoc config that stamps slug ids onto headings so TOC anchors + scroll-spy
 *  line up with the rendered DOM. */
export const markdocConfig: Config = {
  nodes: {
    heading: {
      ...Markdoc.nodes.heading,
      transform(node: Node, config: Config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        const id = slugify(nodeText(node).trim());
        return new Markdoc.Tag(`h${node.attributes.level}`, { ...attributes, id }, children);
      },
    },
  },
};
