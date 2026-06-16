import { profile } from "@/content/profile";
import SectionHeading from "./SectionHeading";

export default function Timeline() {
  return (
    <section id="experience" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Career" title="Experience & education" />

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Experience */}
          <div>
            <ol className="relative border-l border-slate-200 dark:border-white/10">
              {profile.experience.map((job) => (
                <li key={`${job.company}-${job.period}`} className="mb-9 ml-6">
                  <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand dark:border-ink" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="font-display text-lg font-semibold">{job.title}</h3>
                    <span className="text-xs font-medium text-slate-400">{job.period}</span>
                  </div>
                  <p className="text-sm font-semibold text-brand">
                    {job.company}
                    {job.country ? ` · ${job.country}` : ""}
                  </p>
                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600 dark:text-slate-300">
                      {job.achievements.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Education & certificates */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Education
              </h3>
              {profile.education.map((edu) => (
                <div
                  key={edu.degree}
                  className="rounded-2xl border border-slate-200 p-5 dark:border-white/10"
                >
                  <p className="text-xs font-medium text-slate-400">{edu.period}</p>
                  <h4 className="mt-1 font-semibold">{edu.degree}</h4>
                  <p className="text-sm text-brand">{edu.institute}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Certificates
              </h3>
              <ul className="space-y-3">
                {profile.certificates.map((cert) => (
                  <li
                    key={cert.name}
                    className="rounded-xl border border-slate-200 p-4 dark:border-white/10"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold">{cert.name}</span>
                      {cert.period && (
                        <span className="text-xs text-slate-400">{cert.period}</span>
                      )}
                    </div>
                    {cert.detail && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cert.detail}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
