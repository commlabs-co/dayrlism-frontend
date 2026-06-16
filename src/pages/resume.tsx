import React from "react";
import Link from "next/link";
import SEO from "../components/Seo";
import { profile } from "../content/profile";

const SECONDARY = "#0F4C5C";
const PRIMARY = "#4DA6BD";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="tw-mb-3 tw-text-xs tw-font-bold tw-uppercase tw-tracking-[0.18em]"
    style={{ color: SECONDARY }}
  >
    {children}
  </h2>
);

const Resume = () => {
  const { contact } = profile;
  const contactRows = [
    { icon: "fa fa-envelope-o", value: contact.email },
    { icon: "fa fa-phone", value: contact.phone },
    { icon: "fa fa-map-marker", value: contact.location },
    { icon: "fa fa-globe", value: contact.website },
    { icon: "fa fa-linkedin", value: contact.linkedin },
  ];

  return (
    <>
      <SEO pageTitle={`${profile.fullName} — Résumé`} />

      <div
        className="tw-min-h-screen tw-py-8 tw-px-4 tw-font-resume tw-text-[13px] tw-text-slate-700"
        style={{ backgroundColor: "#eef2f4" }}
      >
        {/* Action bar — hidden when printing */}
        <div className="no-print tw-mx-auto tw-mb-5 tw-flex tw-max-w-[210mm] tw-items-center tw-justify-between">
          <Link
            href="/"
            className="tw-text-sm tw-font-medium tw-no-underline"
            style={{ color: SECONDARY }}
          >
            ← dayrlism.info
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="tw-cursor-pointer tw-rounded tw-border-0 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-white"
            style={{ backgroundColor: SECONDARY }}
          >
            <i className="fa fa-download tw-mr-2" aria-hidden="true" />
            Print / Save as PDF
          </button>
        </div>

        {/* A4 sheet */}
        <article className="tw-mx-auto tw-max-w-[210mm] tw-overflow-hidden tw-rounded tw-bg-white tw-shadow-lg print:tw-rounded-none print:tw-shadow-none">
          {/* Header */}
          <header className="tw-px-9 tw-py-8 tw-text-white" style={{ backgroundColor: SECONDARY }}>
            <h1 className="tw-m-0 tw-text-3xl tw-font-bold tw-tracking-wide">
              {profile.fullName}
            </h1>
            <p className="tw-mb-0 tw-mt-1 tw-text-base tw-font-light" style={{ color: PRIMARY }}>
              {profile.headline}
            </p>
          </header>

          <div className="tw-flex tw-flex-col md:tw-flex-row">
            {/* Sidebar */}
            <aside className="tw-w-full tw-bg-slate-50 tw-px-7 tw-py-7 md:tw-w-[34%]">
              <section className="tw-mb-6">
                <SectionTitle>Contact</SectionTitle>
                <ul className="tw-m-0 tw-list-none tw-p-0 tw-space-y-2">
                  {contactRows.map((row, i) => (
                    <li key={i} className="tw-flex tw-items-start tw-gap-2 tw-break-words">
                      <i
                        className={`${row.icon} tw-mt-1 tw-w-4 tw-text-center`}
                        style={{ color: PRIMARY }}
                        aria-hidden="true"
                      />
                      <span className="tw-break-all">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="tw-mb-6">
                <SectionTitle>Tech Skills</SectionTitle>
                <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                  {profile.techSkills.map((skill) => (
                    <span
                      key={skill}
                      className="tw-rounded tw-px-2 tw-py-0.5 tw-text-[11px]"
                      style={{ backgroundColor: "#e2edf1", color: SECONDARY }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className="tw-mb-6">
                <SectionTitle>Skills</SectionTitle>
                <ul className="tw-m-0 tw-list-disc tw-pl-4 tw-space-y-1">
                  {profile.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </section>

              <section className="tw-mb-6">
                <SectionTitle>Languages</SectionTitle>
                <ul className="tw-m-0 tw-list-none tw-p-0 tw-space-y-1.5">
                  {profile.languages.map((lang) => (
                    <li key={lang.name}>
                      <span className="tw-font-semibold tw-text-slate-800">{lang.name}</span>
                      <span className="tw-block tw-text-[11px] tw-text-slate-500">
                        {lang.proficiency}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="tw-mb-6">
                <SectionTitle>Certificates</SectionTitle>
                <ul className="tw-m-0 tw-list-none tw-p-0 tw-space-y-2">
                  {profile.certificates.map((cert) => (
                    <li key={cert.name}>
                      <span className="tw-font-semibold tw-text-slate-800">{cert.name}</span>
                      <span className="tw-block tw-text-[11px] tw-text-slate-500">
                        {[cert.detail, cert.period].filter(Boolean).join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="tw-mb-6">
                <SectionTitle>Interests</SectionTitle>
                <p className="tw-m-0">{profile.interests.join(", ")}</p>
              </section>

              <section>
                <SectionTitle>References</SectionTitle>
                <ul className="tw-m-0 tw-list-none tw-p-0 tw-space-y-2">
                  {profile.references.map((ref) => (
                    <li key={ref.name}>
                      <span className="tw-font-semibold tw-text-slate-800">{ref.name}</span>
                      <span className="tw-block tw-text-[11px] tw-text-slate-500">{ref.role}</span>
                      {ref.contact && (
                        <span className="tw-block tw-text-[11px] tw-text-slate-500">
                          {ref.contact}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </aside>

            {/* Main column */}
            <main className="tw-w-full tw-px-8 tw-py-7 md:tw-w-[66%]">
              <section className="tw-mb-6">
                <SectionTitle>Summary</SectionTitle>
                <p className="tw-m-0 tw-leading-relaxed">{profile.summary}</p>
              </section>

              <section className="tw-mb-6">
                <SectionTitle>Experience</SectionTitle>
                <div className="tw-space-y-4">
                  {profile.experience.map((job) => (
                    <div
                      key={`${job.company}-${job.period}`}
                      className="tw-break-inside-avoid tw-border-l-2 tw-pl-4"
                      style={{ borderColor: "#dbe7ec" }}
                    >
                      <div className="tw-flex tw-flex-wrap tw-items-baseline tw-justify-between tw-gap-x-2">
                        <h3 className="tw-m-0 tw-text-sm tw-font-bold tw-text-slate-800">
                          {job.title}
                        </h3>
                        <span className="tw-text-[11px] tw-font-medium tw-text-slate-500">
                          {job.period}
                        </span>
                      </div>
                      <p className="tw-m-0 tw-text-[12px] tw-font-semibold" style={{ color: PRIMARY }}>
                        {job.company}
                        {job.country ? ` · ${job.country}` : ""}
                      </p>
                      {job.achievements && job.achievements.length > 0 && (
                        <ul className="tw-mb-0 tw-mt-1.5 tw-list-disc tw-pl-4 tw-space-y-0.5">
                          {job.achievements.map((line, i) => (
                            <li key={i} className="tw-leading-snug">
                              {line}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="tw-mb-6 tw-break-inside-avoid">
                <SectionTitle>Education</SectionTitle>
                {profile.education.map((edu) => (
                  <div key={edu.degree} className="tw-mb-1">
                    <div className="tw-flex tw-flex-wrap tw-items-baseline tw-justify-between tw-gap-x-2">
                      <h3 className="tw-m-0 tw-text-sm tw-font-bold tw-text-slate-800">
                        {edu.degree}
                      </h3>
                      <span className="tw-text-[11px] tw-font-medium tw-text-slate-500">
                        {edu.period}
                      </span>
                    </div>
                    <p className="tw-m-0 tw-text-[12px] tw-font-semibold" style={{ color: PRIMARY }}>
                      {edu.institute}
                    </p>
                  </div>
                ))}
              </section>

              <section className="tw-break-inside-avoid">
                <SectionTitle>Selected Projects</SectionTitle>
                <ul className="tw-m-0 tw-list-none tw-p-0 tw-space-y-1.5">
                  {profile.projects.map((project) => (
                    <li key={project.name} className="tw-flex tw-flex-wrap tw-justify-between tw-gap-x-2">
                      <span>
                        <span className="tw-font-semibold tw-text-slate-800">{project.name}</span>
                        {project.url && (
                          <span className="tw-ml-2 tw-text-[11px]" style={{ color: PRIMARY }}>
                            {project.url.replace(/^https?:\/\//, "")}
                          </span>
                        )}
                      </span>
                      {project.period && (
                        <span className="tw-text-[11px] tw-text-slate-500">{project.period}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </main>
          </div>
        </article>
      </div>
    </>
  );
};

export default Resume;
