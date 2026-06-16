"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const barsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="What I do" title="Skills & tooling" />

        <div className="grid gap-12 md:grid-cols-2">
          <div ref={barsRef} className="space-y-5">
            {profile.skillBars.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1 flex items-center justify-between text-sm font-medium">
                  <span>{skill.name}</span>
                  <span className="text-brand">{skill.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-dark to-brand transition-[width] duration-1000 ease-out"
                    style={{ width: active ? `${skill.level}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Tech stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.techSkills.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-brand hover:text-brand dark:border-white/10 dark:bg-ink dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Practices & platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand-dark dark:text-brand-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
