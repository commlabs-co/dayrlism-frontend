"use client";

import { FiDownload } from "react-icons/fi";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex cursor-pointer items-center gap-2 rounded px-4 py-2 text-sm font-semibold text-white"
      style={{ backgroundColor: "#0F4C5C" }}
    >
      <FiDownload /> Print / Save as PDF
    </button>
  );
}
