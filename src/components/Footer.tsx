import Link from "next/link";
import { profile } from "@/content/profile";
import Social from "./Social";

const versions = [
  { version: "8.0.1", date: "2023-08-02", url: "https://dayrlism.info" },
  { version: "5.0.0", date: "2020-01-30", url: "https://v5.dayrlism.info" },
  { version: "4.0.0", date: "2018-01-29", url: "https://v4.dayrlism.info" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 dark:border-white/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold">
            dayrlism<span className="text-brand">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            {profile.headline}
          </p>
          <Social className="mt-5" />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Changelog
          </h3>
          <ul className="space-y-2 text-sm">
            {versions.map((v) => (
              <li key={v.version} className="flex items-center gap-2">
                <span className="text-slate-400">v{v.version}</span>
                <span className="text-xs text-slate-400">{v.date}</span>
                <a href={v.url} className="text-brand hover:underline" target="_blank" rel="noreferrer">
                  visit
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-brand">About</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-brand">Projects</a>
            </li>
            <li>
              <Link href="/resume" className="hover:text-brand">Résumé</Link>
            </li>
            <li>
              <a href="#contact" className="hover:text-brand">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
      </div>
    </footer>
  );
}
