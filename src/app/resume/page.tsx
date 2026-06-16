import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { profile } from "@/content/profile";
import PrintButton from "@/components/PrintButton";

const SECONDARY = "#0F4C5C";
const PRIMARY = "#4DA6BD";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.fullName} — ${profile.title}.`,
};

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mb-3 text-xs font-bold uppercase tracking-[0.18em]"
      style={{ color: SECONDARY }}
    >
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const { contact } = profile;
  const contactRows = [
    contact.email,
    contact.phone,
    contact.location,
    contact.website,
    contact.linkedin,
  ];

  return (
    <div
      className="min-h-screen px-4 py-8 text-[13px] text-slate-700"
      style={{ backgroundColor: "#eef2f4", fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}
    >
      {/* Action bar — hidden in print */}
      <div className="no-print mx-auto mb-5 flex max-w-[210mm] items-center justify-between">
        <Link href="/" className="text-sm font-medium no-underline" style={{ color: SECONDARY }}>
          ← dayrlism.info
        </Link>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-[210mm] overflow-hidden rounded bg-white shadow-lg print:rounded-none print:shadow-none">
        {/* Header */}
        <header className="px-9 py-8 text-white" style={{ backgroundColor: SECONDARY }}>
          <h1 className="m-0 text-3xl font-bold tracking-wide">{profile.fullName}</h1>
          <p className="mb-0 mt-1 text-base font-light" style={{ color: PRIMARY }}>
            {profile.headline}
          </p>
        </header>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full bg-slate-50 px-7 py-7 md:w-[34%]">
            <section className="mb-6">
              <SectionTitle>Contact</SectionTitle>
              <ul className="m-0 list-none space-y-1.5 p-0">
                {contactRows.map((row) => (
                  <li key={row} className="break-all">
                    {row}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <SectionTitle>Tech Skills</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {profile.techSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded px-2 py-0.5 text-[11px]"
                    style={{ backgroundColor: "#e2edf1", color: SECONDARY }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <SectionTitle>Skills</SectionTitle>
              <ul className="m-0 list-disc space-y-1 pl-4">
                {profile.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <SectionTitle>Languages</SectionTitle>
              <ul className="m-0 list-none space-y-1.5 p-0">
                {profile.languages.map((lang) => (
                  <li key={lang.name}>
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="block text-[11px] text-slate-500">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <SectionTitle>Certificates</SectionTitle>
              <ul className="m-0 list-none space-y-2 p-0">
                {profile.certificates.map((cert) => (
                  <li key={cert.name}>
                    <span className="font-semibold text-slate-800">{cert.name}</span>
                    <span className="block text-[11px] text-slate-500">
                      {[cert.detail, cert.period].filter(Boolean).join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle>References</SectionTitle>
              <ul className="m-0 list-none space-y-2 p-0">
                {profile.references.map((ref) => (
                  <li key={ref.name}>
                    <span className="font-semibold text-slate-800">{ref.name}</span>
                    <span className="block text-[11px] text-slate-500">{ref.role}</span>
                    {ref.contact && (
                      <span className="block text-[11px] text-slate-500">{ref.contact}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* Main */}
          <main className="w-full px-8 py-7 md:w-[66%]">
            <section className="mb-6">
              <SectionTitle>Summary</SectionTitle>
              <p className="m-0 leading-relaxed">{profile.summary}</p>
            </section>

            <section className="mb-6">
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-4">
                {profile.experience.map((job) => (
                  <div
                    key={`${job.company}-${job.period}`}
                    className="break-inside-avoid border-l-2 pl-4"
                    style={{ borderColor: "#dbe7ec" }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                      <h3 className="m-0 text-sm font-bold text-slate-800">{job.title}</h3>
                      <span className="text-[11px] font-medium text-slate-500">{job.period}</span>
                    </div>
                    <p className="m-0 text-[12px] font-semibold" style={{ color: PRIMARY }}>
                      {job.company}
                      {job.country ? ` · ${job.country}` : ""}
                    </p>
                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="mb-0 mt-1.5 list-disc space-y-0.5 pl-4">
                        {job.achievements.map((line, i) => (
                          <li key={i} className="leading-snug">
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6 break-inside-avoid">
              <SectionTitle>Education</SectionTitle>
              {profile.education.map((edu) => (
                <div key={edu.degree} className="mb-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h3 className="m-0 text-sm font-bold text-slate-800">{edu.degree}</h3>
                    <span className="text-[11px] font-medium text-slate-500">{edu.period}</span>
                  </div>
                  <p className="m-0 text-[12px] font-semibold" style={{ color: PRIMARY }}>
                    {edu.institute}
                  </p>
                </div>
              ))}
            </section>

            <section className="break-inside-avoid">
              <SectionTitle>Selected Projects</SectionTitle>
              <ul className="m-0 list-none space-y-1.5 p-0">
                {profile.projects.map((project) => (
                  <li key={project.name} className="flex flex-wrap justify-between gap-x-2">
                    <span>
                      <span className="font-semibold text-slate-800">{project.name}</span>
                      {project.url && (
                        <span className="ml-2 text-[11px]" style={{ color: PRIMARY }}>
                          {project.url.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                    </span>
                    {project.period && (
                      <span className="text-[11px] text-slate-500">{project.period}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </article>
    </div>
  );
}
