import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import heroImg from "../../public/assets/img/hero/men.png";
import { profile } from "@/content/profile";
import Social from "./Social";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-dark/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 dark:border-white/10 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            {profile.availability} for select projects
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Hi, I&apos;m {profile.name}.
            <span className="block text-brand">{profile.title}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Get in touch <FiArrowRight />
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand dark:border-white/15 dark:text-slate-200"
            >
              <FiDownload /> View résumé
            </Link>
          </div>

          <Social className="mt-8" />
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-fade-up">
          <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-3xl bg-brand/10" />
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-brand/10 to-transparent dark:border-white/10">
            <Image
              src={heroImg}
              alt={profile.name}
              priority
              placeholder="blur"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
