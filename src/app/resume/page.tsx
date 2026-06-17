import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import ResumeView from "./ResumeView";
import "./resume.css";

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

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.fullName} — ${profile.title}.`,
};

export default function ResumePage() {
  return <ResumeView fontClass={`${bricolage.variable} ${spaceMono.variable}`} />;
}
