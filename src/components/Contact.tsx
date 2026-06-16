"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { profile } from "@/content/profile";
import SectionHeading from "./SectionHeading";
import Social from "./Social";
import Sponsor from "./Sponsor";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || !SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const details = [
    { Icon: FiMapPin, label: "Location", value: profile.contact.location },
    { Icon: FiMail, label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { Icon: FiPhone, label: "Phone", value: profile.contact.phone, href: `tel:${profile.contact.phone}` },
  ];

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand dark:border-white/10 dark:bg-ink-soft";

  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Get in touch" title="Let's work together" />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-8">
            <p className="text-slate-600 dark:text-slate-300">
              Feel free to reach out — I&apos;m open to discussing new projects, creative ideas, or
              being part of your vision.
            </p>

            <ul className="space-y-4">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Icon />
                  </span>
                  <span className="text-sm">
                    <span className="block text-xs uppercase tracking-wide text-slate-400">
                      {label}
                    </span>
                    {href ? (
                      <a href={href} className="font-medium hover:text-brand">
                        {value}
                      </a>
                    ) : (
                      <span className="font-medium">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Follow me
              </h3>
              <Social />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Buy me a coffee
              </h3>
              <Sponsor />
            </div>
          </Reveal>

          <Reveal delay={120}>
          <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={inputClass} type="text" name="name" placeholder="Your name" required />
              <input className={inputClass} type="email" name="user_email" placeholder="Your email" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={inputClass} type="text" name="mobile" placeholder="Your phone" />
              <input className={inputClass} type="text" name="subject" placeholder="Subject" required />
            </div>
            <textarea className={`${inputClass} min-h-[150px]`} name="message" placeholder="Your message" required />

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"} <FiSend />
              </button>
              {status === "sent" && (
                <span className="text-sm font-medium text-green-500">Message sent — thank you!</span>
              )}
              {status === "error" && (
                <span className="text-sm font-medium text-red-500">
                  Something went wrong. Please email me directly.
                </span>
              )}
            </div>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
