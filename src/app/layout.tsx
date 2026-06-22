import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Sora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getProfile } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    metadataBase: new URL("https://dayrlism.info"),
    title: {
      default: `${profile.name} — ${profile.title}`,
      template: `%s · ${profile.name}`,
    },
    description: profile.summary,
    openGraph: {
      title: `${profile.name} — ${profile.title}`,
      description: profile.summary,
      url: "https://dayrlism.info",
      siteName: "Dayrlism",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} — ${profile.title}`,
      description: profile.summary,
    },
    icons: { icon: "/favicon.png" },
  };
}

// Set the theme before paint to avoid a flash. Defaults to dark.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark', t? t==='dark' : true);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        {children}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
