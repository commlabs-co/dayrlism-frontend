"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { profile } from "@/content/profile";

export default function Sponsor() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <ul className="space-y-2">
      {profile.crypto.map((coin) => (
        <li key={coin.address}>
          <button
            type="button"
            onClick={() => copy(coin.address)}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-brand dark:border-white/10"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{coin.label}</span>
              <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                {coin.address}
              </span>
            </span>
            {copied === coin.address ? (
              <FiCheck className="shrink-0 text-green-500" />
            ) : (
              <FiCopy className="shrink-0 text-slate-400" />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
