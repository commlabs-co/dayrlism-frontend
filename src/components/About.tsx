import { FiCheckCircle } from "react-icons/fi";
import { profile } from "@/content/profile";
import { getAge, getExperience } from "@/lib/tools";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  const facts = [
    { label: "Age", value: String(getAge(profile.birthDate)) },
    { label: "Location", value: profile.contact.location },
    { label: "Nationality", value: profile.nationality },
    { label: "Languages", value: profile.languagesSpoken },
    { label: "Email", value: profile.contact.email },
    { label: "Freelance", value: profile.availability },
  ];

  const stats = [
    { value: `${getExperience(profile.careerStartYear)}+`, label: "Years of experience" },
    ...profile.stats.map((s) => ({ value: s.value, label: `${s.label1} ${s.label2}` })),
  ];

  return (
    <section id="about" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About me" title="A bit of background" />

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {profile.summary}
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-2">
                  <FiCheckCircle className="mt-1 shrink-0 text-brand" />
                  <div className="text-sm">
                    <dt className="font-semibold text-slate-800 dark:text-slate-100">
                      {fact.label}
                    </dt>
                    <dd className="text-slate-500 dark:text-slate-400">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg dark:border-white/10 dark:bg-ink-soft"
              >
                <p className="font-display text-3xl font-bold text-brand">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
