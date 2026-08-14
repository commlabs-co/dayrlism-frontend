"use client";

import { useState } from "react";

type State = "idle" | "loading" | "ok" | "error";

/** Email capture → /api/subscribe (Buttondown). Optimistic, accessible,
 *  and self-contained — drops into any post foot. */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMsg("");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; already?: boolean; error?: string };
      if (r.ok && d.ok) {
        setState("ok");
        setMsg(d.already ? "You're already on the list — thanks!" : "Almost there — check your inbox to confirm. ✓");
        setEmail("");
      } else {
        setState("error");
        setMsg(d.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <section className="dl-news" aria-labelledby="dl-news-title">
      <div className="dl-news-copy">
        <div id="dl-news-title" className="dl-news-title">Get new posts by email</div>
        <p className="dl-news-sub">
          Occasional essays on building, climate, and engineering. No spam — unsubscribe anytime.
        </p>
      </div>

      {state === "ok" ? (
        <p className="dl-news-ok dl-mono" role="status">
          {msg}
        </p>
      ) : (
        <form className="dl-news-form" onSubmit={onSubmit} noValidate>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            className="dl-news-input"
            disabled={state === "loading"}
          />
          <button type="submit" className="dl-news-btn" disabled={state === "loading"}>
            {state === "loading" ? "…" : "Subscribe"}
          </button>
        </form>
      )}

      {state === "error" && (
        <p className="dl-news-err dl-mono" role="alert">
          {msg}
        </p>
      )}
    </section>
  );
}
