import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { profile } from "@/content/profile";

function iconFor(url: string): IconType {
  if (url.includes("facebook")) return FaFacebookF;
  if (url.includes("instagram")) return FaInstagram;
  if (url.includes("linkedin")) return FaLinkedinIn;
  if (url.includes("wa.me") || url.includes("whatsapp")) return FaWhatsapp;
  return FaTwitter;
}

export default function Social({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {profile.social.map((item) => {
        const Icon = iconFor(item.url);
        return (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={item.url}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-brand hover:text-brand dark:border-white/10 dark:text-slate-300"
            >
              <Icon size={16} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
