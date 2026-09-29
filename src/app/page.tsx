import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import LandingView from "./LandingView";
import { getProfile } from "@/lib/content";
import { JsonLd } from "./JsonLd";
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

export default async function Home() {
  const profile = await getProfile();
  const site = "https://dayrlism.info";

  // Person + WebSite. Declares who the site is about and which profiles are the
  // same entity, which is what search engines use to build a knowledge panel.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site}/#person`,
        name: profile.fullName,
        alternateName: profile.name,
        url: site,
        jobTitle: profile.title,
        description: profile.metaDescription,
        nationality: profile.nationality,
        knowsLanguage: profile.languagesSpoken
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
        // sameAs is for other profiles representing the same person, so the
        // site's own URL is excluded.
        sameAs: [profile.contact.linkedin].filter(Boolean),
        homeLocation: { "@type": "Place", name: profile.contact.location },
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: "Dayrlism",
        description: profile.metaDescription,
        inLanguage: "en",
        publisher: { "@id": `${site}/#person` },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <LandingView
        fontClass={`${bricolage.variable} ${spaceMono.variable}`}
        profile={profile}
      />
    </>
  );
}
