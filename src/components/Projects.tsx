import { FiExternalLink } from "react-icons/fi";
import { profile } from "@/content/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Selected work" title="Projects" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((project, i) => {
            const host = project.url ? project.url.replace(/^https?:\/\//, "") : null;
            return (
              <Reveal key={project.name} delay={i * 70} className="h-full">
                <a
                  href={project.url}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand hover:shadow-lg dark:border-white/10 dark:bg-ink"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-lg font-semibold">{project.name}</h3>
                    {project.url && (
                      <FiExternalLink className="text-slate-400 transition group-hover:text-brand" />
                    )}
                  </div>
                  {project.period && (
                    <p className="mt-1 text-xs text-slate-400">{project.period}</p>
                  )}
                  {host && <p className="mt-3 text-sm text-brand">{host}</p>}
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
