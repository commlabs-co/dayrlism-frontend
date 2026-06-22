"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import type { Profile } from "@/content/types";
import { getExperience } from "@/lib/tools";
import menPhoto from "../../public/assets/img/hero/men.png";

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

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// ---- curated presentation content (the design's editorial voice) ----
const skillGroups = [
  { label: "FRONTEND", items: ["React.js", "React Native", "TypeScript", "Next/Gatsby", "Vue.js", "HTML5", "SASS/LESS", "Webpack"] },
  { label: "BACKEND", items: ["Node.js", "NestJS", "REST APIs", "GraphQL", "Socket.io", "MySQL", "MongoDB", "Microservices"] },
  { label: "CLOUD & OPS", items: ["Digital Ocean", "Google Cloud", "AWS", "Jenkins", "CI/CD", "Git Flow", "Micro Frontend", "Strapi"] },
  { label: "EXPLORING", items: ["AI", "Blockchain", "Big Data", "Headless CMS"] },
];

const marqueeWords = [
  "Node.js", "React", "TypeScript", "NestJS", "GraphQL", "Cloud",
  "CI/CD", "Micro Frontend", "React Native", "Strapi", "Tailwind", "Positive Attitude",
];

const versions = [
  { tag: "v1", year: "2014", title: "The first site", note: "A diploma grad with something to prove. Hand-coded, scrappy, honest.", stack: "HTML · CSS · jQuery", url: "https://v1.dayrlism.info", current: false },
  { tag: "v2", year: "2017", title: "React era", note: "Rebuilt as a single-page app as the React habit took hold.", stack: "React · SASS", url: "https://v2.dayrlism.info", current: false },
  { tag: "v3", year: "2019", title: "Documentary", note: "Photography-led, the “there is a reason” voice arrives.", stack: "Gatsby · GraphQL", url: "https://v3.dayrlism.info", current: false },
  { tag: "v4", year: "2022", title: "Dark mode", note: "The teal & sun-switcher identity that still defines the brand.", stack: "Next.js · TS", url: "https://v4.dayrlism.info", current: false },
  { tag: "v5", year: "2024", title: "Resume split", note: "Landing and a dedicated resume dashboard, living separately.", stack: "Next · Gatsby", url: "https://v5.dayrlism.info", current: false },
  { tag: "v6", year: "2025", title: "Unified", note: "One home again — landing and resume merged into a single story.", stack: "React · NestJS", url: "/", current: true },
];

const liDisplay = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/+$/, "");
const shortProf = (p: string) => (/full/i.test(p) ? "full" : /professional working/i.test(p) ? "working" : "basic");

export default function LandingView({
  fontClass,
  profile,
}: {
  fontClass: string;
  profile: Profile;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(-1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [senderName, setSenderName] = useState("");

  const applyTheme = (t: "dark" | "light") => {
    const r = rootRef.current;
    if (!r) return;
    const set = t === "light" ? LIGHT : DARK;
    Object.entries(set).forEach(([k, v]) => r.style.setProperty(k, v));
  };

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

  // scroll reveals + count-up stats
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const counts = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveals.forEach((el) => el.classList.add("in"));
      counts.forEach((el) => (el.textContent = el.getAttribute("data-count") || el.textContent));
      return;
    }

    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => ro.observe(el));

    const animateCount = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute("data-count") || "0", 10) || 0;
      const dur = 1100;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target as HTMLElement);
            co.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counts.forEach((el) => co.observe(el));

    const safety = setTimeout(() => {
      reveals.forEach((el) => el.classList.add("in"));
      counts.forEach((el) => (el.textContent = el.getAttribute("data-count") || el.textContent));
    }, 2600);

    return () => {
      ro.disconnect();
      co.disconnect();
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

  const closeMenu = () => setMenuOpen(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const name = ((new FormData(form).get("name") as string) || "").trim();
    if (!name) return;
    const first = name.split(/\s+/)[0];

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // no email backend configured — acknowledge optimistically
      setSenderName(first);
      setStatus("sent");
      form.reset();
      return;
    }
    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      setSenderName(first);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const c = profile.contact;
  const year = new Date().getFullYear();
  const themeIcon = theme === "dark" ? "☾" : "☀";
  const themeLabel = theme === "dark" ? "Light mode" : "Dark mode";
  const menuClass = menuOpen ? "open" : "";

  const stats = [
    { value: getExperience(profile.careerStartYear), label: "YEARS SHIPPING" },
    { value: profile.projects.length, label: "PRODUCTS BUILT" },
    { value: profile.experience.length, label: "COMPANIES" },
  ];

  const edu = profile.education[0];
  const certsLine = profile.certificates.map((x) => x.name.split(" — ")[0].split(":")[0]).join(" · ");
  const langLine = profile.languages.map((l) => `${l.name.split(" ")[0]} (${shortProf(l.proficiency)})`).join(" · ");

  const navLinks = [
    { href: "#about", label: "About", n: "01" },
    { href: "#resume", label: "Resume", n: "02" },
    { href: "#versions", label: "Versions", n: "03" },
    { href: "/blog", label: "Blog", n: "04" },
    { href: "#contact", label: "Contact", n: "05" },
  ];

  const inputStyle: CSSProperties = {
    width: "100%",
    background: "var(--bg2)",
    border: "1px solid var(--line)",
    borderRadius: 10,
    padding: "13px 14px",
    color: "var(--text)",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
  };
  const labelStyle: CSSProperties = {
    display: "block",
    fontSize: 11,
    color: "var(--accent)",
    letterSpacing: ".1em",
    marginBottom: 8,
  };

  const MarqueeGroup = () => (
    <div style={{ display: "flex", gap: 30, paddingRight: 30, alignItems: "center" }}>
      {marqueeWords.map((w, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 30 }}>
          <span style={{ fontWeight: 600, fontSize: "clamp(18px,2.2vw,30px)", letterSpacing: "-.02em" }}>{w}</span>
          <span className="dl-mono" style={{ color: "var(--accent)" }}>✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`dl-landing-root ${fontClass}`}
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
      {/* grain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: "radial-gradient(var(--line) 1px,transparent 1px)",
          backgroundSize: "34px 34px",
          opacity: 0.35,
        }}
      />

      {/* ===== NAV ===== */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px clamp(20px,5vw,64px)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "linear-gradient(to bottom,var(--bg),transparent)",
        }}
      >
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 21, letterSpacing: "-.02em" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/brand/logo-mark.png" alt="dayrlism logo" style={{ height: 26, width: "auto", display: "block", objectFit: "contain" }} />
          <span>dayrlism</span>
        </a>
        <div className="dl-desktop-nav" style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.4vw,34px)" }}>
          {navLinks.map((l) => (
            <a key={l.href} className="dl-link-u dl-mono" href={l.href} style={{ fontSize: 12.5, letterSpacing: ".04em", color: "var(--muted)" }}>
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="dl-theme-btn"
            style={{
              cursor: "pointer",
              width: 40,
              height: 40,
              borderRadius: 999,
              border: "1px solid var(--line)",
              background: "var(--accent-soft)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            <span>{themeIcon}</span>
          </button>
        </div>
      </nav>

      {/* ===== MOBILE FLOATING MENU ===== */}
      <div className="dl-fab-wrap">
        <div className={`dl-fab-backdrop ${menuClass}`} onClick={closeMenu} />
        <div className={`dl-fab-menu ${menuClass}`}>
          <button
            className="dl-fab-item dl-mono"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--bg2)",
              color: "var(--text)",
              border: "1px solid var(--line)",
              borderRadius: 999,
              padding: "11px 20px",
              fontSize: 13,
              letterSpacing: ".05em",
              boxShadow: "0 8px 26px rgba(0,0,0,.35)",
            }}
          >
            <span style={{ color: "var(--accent)", fontSize: 15 }}>{themeIcon}</span> {themeLabel}
          </button>
          {navLinks.map((l) => {
            const isContact = l.href === "#contact";
            return (
              <a
                key={l.href}
                className="dl-fab-item"
                href={l.href}
                onClick={closeMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  minWidth: 190,
                  justifyContent: "center",
                  background: isContact ? "var(--accent)" : "var(--bg2)",
                  color: isContact ? "#06181C" : "var(--text)",
                  border: `1px solid ${isContact ? "var(--accent)" : "var(--line)"}`,
                  borderRadius: 14,
                  padding: "15px 24px",
                  fontWeight: isContact ? 700 : 600,
                  fontSize: 17,
                  boxShadow: isContact ? "0 10px 30px rgba(77,240,196,.3)" : "0 8px 26px rgba(0,0,0,.35)",
                }}
              >
                <span className="dl-mono" style={{ fontSize: 11, color: isContact ? undefined : "var(--accent)", opacity: isContact ? 0.7 : 1 }}>
                  {l.n}
                </span>{" "}
                {l.label}
              </a>
            );
          })}
        </div>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          className="dl-fab-btn"
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 26,
            zIndex: 71,
            width: 62,
            height: 62,
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className={`dl-burger ${menuClass}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* ===== HERO ===== */}
      <header
        id="home"
        className="dl-hero"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px clamp(20px,5vw,64px) 60px",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: "-20% -10%", zIndex: 0, pointerEvents: "none" }}>
          <div
            className="dl-aurora-a"
            style={{
              position: "absolute",
              top: "6%",
              left: "8%",
              width: "46vw",
              height: "46vw",
              borderRadius: "50%",
              background: "radial-gradient(circle at 50% 50%,rgba(77,240,196,.42),transparent 62%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="dl-aurora-b"
            style={{
              position: "absolute",
              bottom: "0%",
              right: "6%",
              width: "42vw",
              height: "42vw",
              borderRadius: "50%",
              background: "radial-gradient(circle at 50% 50%,rgba(15,76,92,.85),transparent 60%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div data-reveal className="dl-hero-meta" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
            <span className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".1em" }}>
              [ EST. {profile.careerStartYear} — KUALA LUMPUR ]
            </span>
            <span className="dl-rule" style={{ flex: "0 0 64px", height: 1, background: "var(--line)" }} />
            <span className="dl-mono" style={{ fontSize: 12, color: "var(--muted)", letterSpacing: ".1em" }}>
              FULLSTACK · NODE.JS
            </span>
          </div>

          <div className="dl-hero-grid">
            <div>
              <h1 style={{ margin: 0, fontWeight: 300, lineHeight: 0.92, letterSpacing: "-.04em", fontSize: "clamp(52px,11vw,168px)" }}>
                <span style={{ display: "block", color: "var(--text)" }}>There is</span>
                <span style={{ display: "block" }}>
                  a <span style={{ fontWeight: 700, fontStyle: "italic", color: "var(--accent)" }}>Reason</span>
                </span>
              </h1>
              <p style={{ maxWidth: 540, margin: "30px 0 0", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.6, color: "var(--muted)" }}>
                I&apos;m <span style={{ color: "var(--text)", fontWeight: 600 }}>{profile.name}</span> — a fullstack developer who turns ideas into
                fast, human, well-built web &amp; mobile products. Node, React, the cloud, and a stubbornly positive attitude — because a good build can
                change everything.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 38 }}>
                <a
                  href="#resume"
                  className="dl-btn-accent"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--accent)", color: "#06181C", fontWeight: 700, fontSize: 15, padding: "15px 26px", borderRadius: 10 }}
                >
                  View the work <span className="dl-mono">→</span>
                </a>
                <a
                  href="#contact"
                  className="dl-btn-ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid var(--line)", color: "var(--text)", fontWeight: 600, fontSize: 15, padding: "15px 26px", borderRadius: 10 }}
                >
                  Start a project
                </a>
              </div>
            </div>

            {/* photo */}
            <div data-reveal className="dl-hero-photo" style={{ position: "relative", justifySelf: "center" }}>
              <div className="dl-float" style={{ position: "absolute", inset: -14, border: "1px solid var(--line)", borderRadius: 24 }} />
              <div
                style={{
                  position: "relative",
                  width: "clamp(220px,26vw,330px)",
                  height: "clamp(280px,32vw,420px)",
                  borderRadius: 18,
                  overflow: "hidden",
                  border: "1px solid var(--line)",
                  background: "var(--panel)",
                  boxShadow: "0 30px 80px rgba(0,0,0,.5)",
                }}
              >
                <Image src={menPhoto} alt={profile.name} fill priority placeholder="blur" sizes="(max-width:760px) 80vw, 330px" style={{ objectFit: "cover" }} />
              </div>
              <div
                className="dl-mono"
                style={{ position: "absolute", bottom: -16, left: -16, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, padding: "10px 14px", fontSize: 11, color: "var(--accent)" }}
              >
                {c.phone}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: -24,
                  right: -24,
                  width: 74,
                  height: 74,
                  borderRadius: 999,
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 34px rgba(0,0,0,.45)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="dl-seal-img" src="/assets/img/brand/logo-seal.png" alt="dayrlism seal" style={{ width: 58, height: 58 }} />
              </div>
            </div>
          </div>

          {/* scroll cue */}
          <div data-reveal style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "clamp(40px,6vh,80px)" }}>
            <div style={{ width: 22, height: 36, border: "1px solid var(--line)", borderRadius: 12, position: "relative" }}>
              <div className="dl-scrolldot" style={{ position: "absolute", top: 6, left: "50%", width: 3, height: 7, marginLeft: -1.5, borderRadius: 2, background: "var(--accent)" }} />
            </div>
            <span className="dl-mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em" }}>
              SCROLL — THERE&apos;S MORE TO THE STORY
            </span>
          </div>
        </div>
      </header>

      {/* marquee */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--bg2)", overflow: "hidden", padding: "18px 0" }}>
        <div className="dl-marquee-track" style={{ display: "flex", width: "max-content" }}>
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,11vh,150px) clamp(20px,5vw,64px)" }}>
        <div data-reveal className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".18em", marginBottom: 34 }}>
          01 — THE PERSON
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(34px,5vw,80px)" }}>
          <h2 data-reveal style={{ margin: 0, fontWeight: 400, fontSize: "clamp(30px,4vw,54px)", lineHeight: 1.08, letterSpacing: "-.03em" }}>
            Builder by trade, optimist by <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 600 }}>design</span>.
          </h2>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: "var(--muted)" }}>
              From a diploma in software engineering to a decade across{" "}
              <span style={{ color: "var(--text)" }}>Carsome, REA Group, LottieFiles</span> and beyond — I&apos;ve shipped websites, dashboards, ad
              units, plugins, and platforms end-to-end.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: "var(--muted)" }}>
              Today I&apos;m building two ventures — <span style={{ color: "var(--text)" }}>Corplabs</span> (SaaS for talent &amp; ops) and <span style={{ color: "var(--text)" }}>HiTerra</span> (an AI-powered
              agri-tech &amp; carbon platform) — with React, NestJS, and TypeScript, still chasing the edges: AI, blockchain, big data.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 10 }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div data-count={s.value} style={{ fontWeight: 700, fontSize: "clamp(30px,3.4vw,44px)", color: "var(--accent)", letterSpacing: "-.03em" }}>
                    {s.value}
                  </div>
                  <div className="dl-mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* skill columns */}
        <div
          data-reveal
          style={{
            marginTop: "clamp(50px,7vh,90px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {skillGroups.map((grp) => (
            <div key={grp.label} style={{ background: "var(--bg)", padding: "26px 24px" }}>
              <div className="dl-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".12em", marginBottom: 16 }}>
                {grp.label}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {grp.items.map((s) => (
                  <span key={s} className="dl-skill-chip" style={{ fontSize: 13, color: "var(--muted)", border: "1px solid var(--line)", padding: "5px 11px", borderRadius: 7 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RESUME / EXPERIENCE ===== */}
      <section id="resume" style={{ position: "relative", zIndex: 1, background: "var(--bg2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,11vh,150px) clamp(20px,5vw,64px)" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 50 }}>
            <div>
              <div data-reveal className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".18em", marginBottom: 20 }}>
                02 — THE TRACK RECORD
              </div>
              <h2 data-reveal style={{ margin: 0, fontWeight: 400, fontSize: "clamp(30px,4.4vw,58px)", lineHeight: 1.05, letterSpacing: "-.03em" }}>
                A decade,
                <br />
                role by role.
              </h2>
            </div>
            <Link
              data-reveal
              href="/resume"
              className="dl-btn-ghost dl-mono"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid var(--line)", padding: "13px 22px", borderRadius: 10, fontSize: 13, color: "var(--text)" }}
            >
              VIEW RESUME <span>↗</span>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {profile.experience.map((job, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={`${job.company}-${job.period}`}
                  data-reveal
                  className="dl-exp-row"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  style={{ borderTop: "1px solid var(--line)", padding: "24px 0", cursor: "pointer", display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 6 }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                    <span className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", minWidth: 92 }}>
                      {job.period}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: "-.02em" }}>{job.company}</span>
                    <span style={{ fontSize: 14, color: "var(--muted)" }}>{job.title}</span>
                    <span className="dl-mono" style={{ marginLeft: "auto", color: "var(--accent)", fontSize: 18 }}>
                      {open ? "–" : "+"}
                    </span>
                  </div>
                  {open && job.achievements && (
                    <p className="dl-exp-detail" style={{ margin: "8px 0 2px", maxWidth: 760, fontSize: 15, lineHeight: 1.7, color: "var(--muted)" }}>
                      {job.achievements.join(" ")}
                    </p>
                  )}
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid var(--line)" }} />
          </div>

          {/* mini facts */}
          <div data-reveal style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 24 }}>
              <div className="dl-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".12em", marginBottom: 14 }}>
                EDUCATION
              </div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{edu.degree}</div>
              <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>
                {edu.institute} · {edu.period}
              </div>
            </div>
            <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 24 }}>
              <div className="dl-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".12em", marginBottom: 14 }}>
                CERTIFICATES
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{certsLine}</div>
            </div>
            <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 24 }}>
              <div className="dl-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".12em", marginBottom: 14 }}>
                LANGUAGES
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{langLine}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VERSIONS ===== */}
      <section id="versions" style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,11vh,150px) clamp(20px,5vw,64px)" }}>
        <div data-reveal className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".18em", marginBottom: 20 }}>
          03 — THE EVOLUTION
        </div>
        <h2 data-reveal style={{ margin: "0 0 14px", fontWeight: 400, fontSize: "clamp(30px,4.4vw,58px)", lineHeight: 1.05, letterSpacing: "-.03em" }}>
          dayrlism, versioned.
        </h2>
        <p data-reveal style={{ margin: "0 0 50px", maxWidth: 560, fontSize: 16, lineHeight: 1.7, color: "var(--muted)" }}>
          This portfolio has been rebuilt as the craft evolved — a quiet changelog of a developer growing up in public since {profile.careerStartYear}.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
          {versions.map((v) => (
            <div key={v.tag} data-reveal className="dl-vcard" style={{ background: "var(--bg)", padding: "28px 24px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontWeight: 700, fontSize: 26, color: "var(--accent)", letterSpacing: "-.03em" }}>{v.tag}</span>
                <span className="dl-mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                  {v.year}
                </span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{v.title}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)" }}>{v.note}</div>
              <div className="dl-mono" style={{ marginTop: 16, fontSize: 10.5, color: "var(--accent)", opacity: 0.8 }}>
                {v.stack}
              </div>
              {v.current ? (
                <span className="dl-mono" style={{ display: "inline-block", marginTop: 14, fontSize: 11, color: "var(--muted)" }}>
                  You&apos;re here
                </span>
              ) : (
                <a
                  className="dl-link-u dl-mono"
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 11.5, fontWeight: 600, color: "var(--accent)" }}
                >
                  Visit {v.tag} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ position: "relative", zIndex: 1, background: "var(--bg2)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,12vh,160px) clamp(20px,5vw,64px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
            <div>
              <div data-reveal className="dl-mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".18em", marginBottom: 24 }}>
                04 — LET&apos;S BUILD
              </div>
              <h2 data-reveal className="dl-contact-h2" style={{ margin: 0, fontWeight: 300, fontSize: "clamp(40px,7vw,108px)", lineHeight: 0.95, letterSpacing: "-.04em" }}>
                Got a
                <br />
                <span style={{ fontWeight: 700, fontStyle: "italic", color: "var(--accent)" }}>reason</span>
                <br />
                to build?
              </h2>
              <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40 }}>
                <a className="dl-link-u" href={`mailto:${c.email}`} style={{ fontSize: 18 }}>
                  {c.email}
                </a>
                <a className="dl-link-u" href={c.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: 18, color: "var(--muted)" }}>
                  {liDisplay(c.linkedin)}
                </a>
                <a className="dl-link-u" href={`tel:${c.phone}`} style={{ fontSize: 18, color: "var(--muted)" }}>
                  {c.phone}
                </a>
              </div>
            </div>

            <form
              ref={formRef}
              data-reveal
              onSubmit={onSubmit}
              style={{ border: "1px solid var(--line)", borderRadius: 18, padding: "clamp(24px,3vw,38px)", background: "var(--bg)", display: "flex", flexDirection: "column", gap: 18 }}
            >
              {status === "sent" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, padding: "30px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>✓</div>
                  <div style={{ fontWeight: 600, fontSize: 20 }}>Message noted, {senderName}.</div>
                  <div style={{ color: "var(--muted)", fontSize: 14, maxWidth: 280 }}>There is a reason you reached out — I&apos;ll get back to you soon.</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label className="dl-mono" style={labelStyle}>
                      YOUR NAME
                    </label>
                    <input className="dl-input" name="name" placeholder="Jane Doe" required style={inputStyle} />
                  </div>
                  <div>
                    <label className="dl-mono" style={labelStyle}>
                      EMAIL
                    </label>
                    <input className="dl-input" name="user_email" type="email" placeholder="you@company.com" required style={inputStyle} />
                  </div>
                  <div>
                    <label className="dl-mono" style={labelStyle}>
                      WHAT ARE WE BUILDING?
                    </label>
                    <textarea className="dl-input" name="message" rows={3} placeholder="A few words about the project…" required style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="dl-btn-accent"
                    style={{ background: "var(--accent)", color: "#06181C", fontWeight: 700, fontSize: 15, padding: 15, border: "none", borderRadius: 10, cursor: "pointer", opacity: status === "sending" ? 0.7 : 1 }}
                  >
                    {status === "sending" ? "Sending…" : "Send it →"}
                  </button>
                  {status === "error" && (
                    <span style={{ fontSize: 13, color: "#ff8f8f" }}>Something went wrong — please email me directly.</span>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "46px clamp(20px,5vw,64px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 18, letterSpacing: "-.02em" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/brand/logo-mark.png" alt="" style={{ height: 22, width: "auto", display: "block", objectFit: "contain" }} />
          dayrlism
        </div>
        <div className="dl-mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>
          © {year} {profile.fullName.toUpperCase()} · A POSITIVE ATTITUDE CAN CHANGE EVERYTHING
        </div>
        <a className="dl-link-u dl-mono" href="#home" style={{ fontSize: 11.5, color: "var(--muted)" }}>
          BACK TO TOP ↑
        </a>
      </footer>
    </div>
  );
}
