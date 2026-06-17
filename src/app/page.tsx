import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import LandingView from "./LandingView";
import "./home.css";

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

export default function Home() {
  return <LandingView fontClass={`${bricolage.variable} ${spaceMono.variable}`} />;
}
