"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import menPhoto from "../../../public/assets/img/hero/men.png";

const DARK: Record<string, string> = {
  "--bg": "#06181C",
  "--bg2": "#0B262C",
  "--panel": "#0C2A30",
  "--line": "rgba(160,225,220,0.14)",
  "--text": "#EAF6F4",
  "--muted": "#82A6A8",
  "--accent": "#4DF0C4",
  "--accent-soft": "rgba(77,240,196,0.12)",
  "--brand": "#0F4C5C",
};
const LIGHT: Record<string, string> = {
  "--bg": "#F4F2EC",
  "--bg2": "#FFFFFF",
  "--panel": "#FFFFFF",
  "--line": "rgba(8,49,58,0.13)",
  "--text": "#08313A",
  "--muted": "#5C777C",
  "--accent": "#0E8F73",
  "--accent-soft": "rgba(14,143,115,0.10)",
  "--brand": "#0F4C5C",
};

// ---- helpers driven by the canonical profile data ----
const host = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/+$/, "");
const initials = (n: string) =>
  n
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
const langPct = (p: string) =>
  /full/i.test(p) ? "95%" : /professional working/i.test(p) ? "75%" : /limited/i.test(p) ? "55%" : "70%";
const langLevel = (p: string) => p.replace(/\s*proficiency/i, "").trim();

const chip: CSSProperties = {
  fontSize: 12,
  color: "var(--muted)",
  border: "1px solid var(--line)",
  padding: "4px 10px",
  borderRadius: 7,
};
const chipLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  color: "var(--text)",
  border: "1px solid var(--line)",
  borderRadius: 999,
  padding: "8px 15px",
};

function SideCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      className="dl-card dl-section"
      data-reveal
      style={{ border: "1px solid var(--line)", borderRadius: 16, padding: 22, background: "var(--bg2)" }}
    >
      <div
        className="dl-card-label dl-mono"
        style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".16em", marginBottom: 14 }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div data-reveal style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 30 }}>
      <span className="dl-mono" style={{ fontSize: 13, color: "var(--accent)" }}>
        {n}
      </span>
      <h2 style={{ margin: 0, fontWeight: 600, fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-.02em" }}>{title}</h2>
    </div>
  );
}

export default function ResumeView({ fontClass }: { fontClass: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const applyTheme = (t: "dark" | "light") => {
    const r = rootRef.current;
    if (!r) return;
    const set = t === "light" ? LIGHT : DARK;
    Object.entries(set).forEach(([k, v]) => r.style.setProperty(k, v));
  };

  // sync from the site-wide theme key (default dark)
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      /* ignore */
    }
    const t = stored === "light" ? "light" : "dark";
    setTheme(t);
    applyTheme(t);
  }, []);

  // scroll reveals
  useEffect(() => {
    const r = rootRef.current;
    if (!r) return;
    const els = Array.from(r.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const safety = setTimeout(() => els.forEach((el) => el.classList.add("in")), 2600);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    } catch {
      /* ignore */
    }
  };

  const printResume = () => window.print();

  const c = profile.contact;
  const firstName = profile.name;
  const lastName = profile.fullName.replace(profile.name, "").trim();
  const liHandle = c.linkedin.replace(/\/+$/, "").split("/").slice(-2).join("/");
  const year = new Date().getFullYear();
  const themeIcon = theme === "dark" ? "☾" : "☀";

  return (
    <div
      ref={rootRef}
      className={`dl-resume-root ${fontClass}`}
      style={
        {
          "--bg": "#06181C",
          "--bg2": "#0B262C",
          "--panel": "#0C2A30",
          "--line": "rgba(160,225,220,0.14)",
          "--text": "#EAF6F4",
          "--muted": "#82A6A8",
          "--accent": "#4DF0C4",
          "--accent-soft": "rgba(77,240,196,0.12)",
          "--brand": "#0F4C5C",
          background: "var(--bg)",
          color: "var(--text)",
          minHeight: "100vh",
          overflowX: "hidden",
          transition: "background .5s ease,color .5s ease",
          position: "relative",
        } as CSSProperties
      }
    >
      <div
        className="dl-grain"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: "radial-gradient(var(--line) 1px,transparent 1px)",
          backgroundSize: "34px 34px",
          opacity: 0.32,
        }}
      />

      {/* ===== NAV ===== */}
      <nav
        className="dl-noprint"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px clamp(16px,4vw,44px)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "linear-gradient(to bottom,var(--bg),transparent)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 19, letterSpacing: "-.02em" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/brand/logo-mark.png" alt="dayrlism" style={{ height: 24, width: "auto", display: "block", objectFit: "contain" }} />
          <span>dayrlism</span>
          <span className="dl-mono" style={{ fontSize: 11, color: "var(--muted)", alignSelf: "flex-end", marginBottom: 2 }}>
            / resume
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            className="dl-link-u dl-nav-back dl-mono"
            href="/"
            style={{ fontSize: 12, letterSpacing: ".04em", color: "var(--muted)", padding: "8px 6px" }}
          >
            ← Back to main
          </Link>
          <button
            onClick={printResume}
            className="dl-btn-accent dl-mono"
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--accent)",
              color: "#06181C",
              border: "none",
              borderRadius: 999,
              padding: "9px 18px",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            PRINT
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="dl-theme-btn"
            style={{
              cursor: "pointer",
              width: 38,
              height: 38,
              borderRadius: 999,
              border: "1px solid var(--line)",
              background: "var(--accent-soft)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
            }}
          >
            {themeIcon}
          </button>
        </div>
      </nav>

      {/* ===== PROFILE HEADER ===== */}
      <header style={{ position: "relative", zIndex: 1, padding: "clamp(96px,13vh,140px) clamp(16px,4vw,44px) 40px", overflow: "hidden" }}>
        <div
          className="dl-aurora"
          style={{
            position: "absolute",
            top: "-10%",
            left: "-6%",
            width: "44vw",
            height: "44vw",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(77,240,196,.34),transparent 62%)",
            filter: "blur(70px)",
            animation: "dl-aurora 28s linear infinite",
            pointerEvents: "none",
          }}
        />
        <div className="dl-prof-grid" style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal style={{ position: "relative", justifySelf: "center" }}>
            <div
              className="dl-photo-wrap"
              style={{
                position: "relative",
                width: "clamp(132px,18vw,184px)",
                height: "clamp(160px,22vw,224px)",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--line)",
                background: "var(--panel)",
                boxShadow: "0 24px 60px rgba(0,0,0,.45)",
              }}
            >
              <Image src={menPhoto} alt={profile.fullName} fill placeholder="blur" sizes="(max-width:680px) 70vw, 184px" style={{ objectFit: "cover" }} />
            </div>
            <div
              className="dl-seal"
              style={{
                position: "absolute",
                top: -16,
                right: -16,
                width: 56,
                height: 56,
                borderRadius: 999,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 26px rgba(0,0,0,.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="dl-seal-img" src="/assets/img/brand/logo-seal.png" alt="" style={{ width: 44, height: 44 }} />
            </div>
          </div>
          <div data-reveal>
            <div className="dl-kicker dl-mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".18em", marginBottom: 14 }}>
              RÉSUMÉ — EST. {profile.careerStartYear}
            </div>
            <h1 style={{ margin: 0, fontWeight: 300, letterSpacing: "-.035em", lineHeight: 0.95, fontSize: "clamp(38px,6.5vw,82px)" }}>
              {firstName}
              {lastName && (
                <>
                  <br />
                  <span style={{ fontWeight: 700, fontStyle: "italic", color: "var(--accent)" }}>{lastName}</span>
                </>
              )}
            </h1>
            <div className="dl-role-line dl-mono" style={{ fontSize: "clamp(13px,1.6vw,16px)", color: "var(--text)", marginTop: 14, letterSpacing: ".02em" }}>
              {profile.headline}
            </div>
            <p className="dl-summary" style={{ maxWidth: 620, margin: "18px 0 0", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.7, color: "var(--muted)" }}>
              {profile.summary}
            </p>
            <div className="dl-prof-chips" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
              <a className="dl-link-u dl-mono" href={`mailto:${c.email}`} style={chipLink}>
                ✉ {c.email}
              </a>
              <a className="dl-link-u dl-mono" href={`tel:${c.phone}`} style={chipLink}>
                ☎ {c.phone}
              </a>
              <a className="dl-link-u dl-mono" href={c.linkedin} target="_blank" rel="noreferrer" style={chipLink}>
                {liHandle}
              </a>
              <a className="dl-link-u dl-mono" href={c.website} target="_blank" rel="noreferrer" style={{ ...chipLink, color: "var(--accent)" }}>
                {host(c.website)} ↗
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ===== BODY GRID ===== */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "20px clamp(16px,4vw,44px) 60px" }}>
        <div className="dl-resume-grid">
          {/* SIDEBAR */}
          <aside className="dl-sidebar dl-side-stack" style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <SideCard label="TECH SKILLS">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {profile.techSkills.map((t) => (
                  <span key={t} className="dl-chip" style={chip}>
                    {t}
                  </span>
                ))}
              </div>
            </SideCard>

            <SideCard label="METHODS & INFRA">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {profile.skills.map((s) => (
                  <span key={s} className="dl-chip" style={chip}>
                    {s}
                  </span>
                ))}
              </div>
            </SideCard>

            <SideCard label="LANGUAGES">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {profile.languages.map((l) => (
                  <div key={l.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{l.name}</span>
                      <span className="dl-mono" style={{ fontSize: 10, color: "var(--muted)" }}>
                        {langLevel(l.proficiency)}
                      </span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: "var(--line)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 99, background: "var(--accent)", width: langPct(l.proficiency) }} />
                    </div>
                  </div>
                ))}
              </div>
            </SideCard>

            <SideCard label="EDUCATION">
              {profile.education.map((edu) => (
                <div key={edu.degree}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{edu.degree}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{edu.institute}</div>
                  <div className="dl-mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                    {edu.period}
                  </div>
                </div>
              ))}
            </SideCard>

            <SideCard label="CERTIFICATES">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {profile.certificates.map((ct) => (
                  <div key={ct.name}>
                    <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{ct.name}</div>
                    {ct.detail && <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>{ct.detail}</div>}
                    {ct.period && (
                      <div className="dl-mono" style={{ fontSize: 10, color: "var(--accent)", marginTop: 3 }}>
                        {ct.period}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SideCard>

            <SideCard label="INTERESTS">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {profile.interests.map((i) => (
                  <span key={i} className="dl-chip" style={chip}>
                    {i}
                  </span>
                ))}
              </div>
            </SideCard>

            <SideCard label="REFERENCES">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {profile.references.map((r) => (
                  <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      className="dl-mono"
                      style={{
                        flex: "0 0 38px",
                        width: 38,
                        height: 38,
                        borderRadius: 999,
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {initials(r.name)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.role}</div>
                    </div>
                  </div>
                ))}
                <div className="dl-mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 2 }}>
                  Full contact details available on request.
                </div>
              </div>
            </SideCard>
          </aside>

          {/* MAIN COLUMN */}
          <div className="dl-main-col" style={{ display: "flex", flexDirection: "column", gap: "clamp(40px,6vh,72px)" }}>
            {/* WORK EXPERIENCE */}
            <section className="dl-section">
              <SectionHead n="01" title="Work Experience" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {profile.experience.map((job) => (
                  <div
                    key={`${job.company}-${job.period}`}
                    className="dl-exp"
                    data-reveal
                    style={{ position: "relative", padding: "0 0 32px 28px", borderLeft: "1px solid var(--line)" }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: -6.5,
                        top: 5,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        background: "var(--accent)",
                        boxShadow: "0 0 0 4px var(--bg)",
                      }}
                    />
                    <div className="dl-exp-meta" style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 14px" }}>
                      <h3 style={{ margin: 0, fontWeight: 600, fontSize: "clamp(17px,2vw,21px)", letterSpacing: "-.01em" }}>{job.title}</h3>
                      <span className="dl-mono" style={{ fontSize: 12, color: "var(--accent)" }}>
                        {job.company}
                        {job.country ? ` · ${job.country}` : ""}
                      </span>
                      <span className="dl-mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }}>
                        {job.period}
                      </span>
                    </div>
                    {job.achievements && job.achievements.length > 0 && (
                      <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                        {job.achievements.map((task, i) => (
                          <li key={i} style={{ position: "relative", paddingLeft: 18, fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
                            <span style={{ position: "absolute", left: 0, top: 8, width: 5, height: 5, borderRadius: 99, background: "var(--accent)", opacity: 0.7 }} />
                            {task}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* VOLUNTEER */}
            <section className="dl-section">
              <SectionHead n="02" title="Volunteer" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
                {profile.volunteer.map((v) => (
                  <div
                    key={`${v.company}-${v.period}`}
                    className="dl-card dl-vol"
                    data-reveal
                    style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 20, background: "var(--bg2)" }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{v.title}</div>
                    <div className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", marginTop: 4 }}>
                      {v.company}
                    </div>
                    {v.achievements && v.achievements[0] && (
                      <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)" }}>{v.achievements[0]}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section className="dl-section">
              <SectionHead n="03" title="Personal Projects" />
              <div
                className="dl-proj-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
                  gap: 1,
                  background: "var(--line)",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                {profile.projects.map((p) => (
                  <a key={p.name} className="dl-proj" data-reveal href={p.url} target="_blank" rel="noreferrer" style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                      <span style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</span>
                      <span className="dl-mono" style={{ color: "var(--accent)" }}>
                        ↗
                      </span>
                    </div>
                    {p.url && (
                      <div className="dl-proj-meta dl-mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, wordBreak: "break-all" }}>
                        {host(p.url)}
                      </div>
                    )}
                    {p.period && (
                      <div className="dl-proj-meta dl-mono" style={{ fontSize: 10, color: "var(--accent)", opacity: 0.8, marginTop: 6 }}>
                        {p.period}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* footer CTA */}
        <div
          className="dl-noprint"
          data-reveal
          style={{
            marginTop: 64,
            borderTop: "1px solid var(--line)",
            paddingTop: 34,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          <div className="dl-mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>
            © {year} {profile.fullName.toUpperCase()} · A POSITIVE ATTITUDE CAN CHANGE EVERYTHING
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={printResume}
              className="dl-btn-accent"
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--accent)",
                color: "#06181C",
                border: "none",
                borderRadius: 10,
                padding: "13px 22px",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Print / Save PDF
            </button>
            <Link
              href="/"
              className="dl-btn-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                border: "1px solid var(--line)",
                color: "var(--text)",
                borderRadius: 10,
                padding: "13px 22px",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              ← Back to main
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
