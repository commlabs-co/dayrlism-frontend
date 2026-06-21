import type { ReactNode } from "react";

// Keystatic renders its own full-page admin UI; this layout just passes through
// so the marketing chrome doesn't wrap the editor.
export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return children;
}
