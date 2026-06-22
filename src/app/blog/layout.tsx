import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./blog.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const tokens: CSSProperties = {
  "--bg": "#06181C",
  "--bg2": "#0B262C",
  "--panel": "#0C2A30",
  "--line": "rgba(160,225,220,0.14)",
  "--text": "#EAF6F4",
  "--muted": "#82A6A8",
  "--accent": "#4DF0C4",
  "--accent-soft": "rgba(77,240,196,0.12)",
  "--brand": "#0F4C5C",
} as CSSProperties;

export default function BlogLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div
      className={`dl-blog-root ${bricolage.variable} ${spaceMono.variable}`}
      style={tokens}
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
          opacity: 0.3,
        }}
      />

      {/* ===== NAV ===== */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px clamp(20px,5vw,64px)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "linear-gradient(to bottom,var(--bg),transparent)",
        }}
      >
        <Link
          href="/blog"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 700,
            fontSize: 19,
            letterSpacing: "-.02em",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/brand/logo-mark.png"
            alt="dayrlism"
            style={{ height: 24, width: "auto", display: "block", objectFit: "contain" }}
          />
          <span>dayrlism</span>
          <span
            className="dl-mono"
            style={{
              fontSize: 11,
              color: "var(--muted)",
              alignSelf: "flex-end",
              marginBottom: 2,
            }}
          >
            / blog
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.4vw,28px)" }}>
          <Link className="dl-link-u dl-mono" href="/resume" style={{ fontSize: 12.5, color: "var(--muted)" }}>
            RESUME
          </Link>
          <Link className="dl-link-u dl-mono" href="/" style={{ fontSize: 12.5, color: "var(--muted)" }}>
            ← HOME
          </Link>
        </div>
      </nav>

      {/* ===== MAIN ===== */}
      <main style={{ position: "relative", zIndex: 1 }}>{children}</main>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "46px clamp(20px,5vw,64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/brand/logo-mark.png"
            alt=""
            style={{ height: 20, width: "auto", display: "block", objectFit: "contain" }}
          />
          dayrlism
        </div>
        <div className="dl-mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>
          © {year} {profile.fullName.toUpperCase()}
        </div>
      </footer>
    </div>
  );
}
