// Vercel sets VERCEL_ENV at build time: "production" for master, "preview"
// for PR/branch deploys, unset for local builds.
const isVercelProduction = process.env.VERCEL_ENV === "production";
const isVercelPreview = process.env.VERCEL_ENV === "preview";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keystatic's reader loads content files from disk at request/build time.
  // Next's file tracer can't see those dynamic reads, so the .mdoc / .yaml
  // source files are otherwise omitted from the serverless bundle and dynamic
  // or on-demand routes (e.g. the /blog index) read an empty content dir in
  // production. Bundle them explicitly into the functions that read them.
  outputFileTracingIncludes: {
    "/": ["./src/content/**/*"],
    "/resume": ["./src/content/**/*"],
    "/blog": ["./src/content/**/*"],
    "/blog/[slug]": ["./src/content/**/*"],
    "/api/keystatic/[...params]": ["./src/content/**/*"],
  },
  async redirects() {
    return [
      // The production deployment is also reachable on *.vercel.app, where it
      // is a full duplicate of dayrlism.info that search engines can index.
      // Send those hosts to the canonical domain. Production builds only, so
      // preview deploys (also *.vercel.app) keep working.
      ...(isVercelProduction
        ? [
            {
              source: "/:path*",
              has: [{ type: "host", value: ".*\\.vercel\\.app" }],
              destination: "https://dayrlism.info/:path*",
              permanent: true,
            },
          ]
        : []),
      // Preserve existing résumé links once resume.dayrlism.info points here.
      {
        source: "/:path*",
        has: [{ type: "host", value: "resume.dayrlism.info" }],
        destination: "https://dayrlism.info/resume",
        permanent: true,
      },
      // Archived sites live in public/vN/ and use relative asset paths, so they
      // must be served from a directory URL — /v4 alone would resolve
      // "css/style.css" against the root and render the page unstyled.
      {
        source: "/v:n(\\d+)",
        destination: "/v:n/index.html",
        permanent: false,
      },
      // Same for sub-pages of the exported builds (e.g. /v9/home-dark, written
      // out as home-dark/index.html). Segments are matched without dots so that
      // real asset requests (/v9/_next/…/main.abc123.js) never take this path.
      {
        source: "/v:n(\\d+)/:sub((?:[^/.]+/)*[^/.]+)",
        destination: "/v:n/:sub/index.html",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      // Preview deploys must never be indexed. Vercel adds this header to
      // preview URLs itself; setting it here keeps that true regardless of
      // project settings.
      ...(isVercelPreview
        ? [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ]
        : []),
      {
        // HSTS. Deliberately without `preload`: submitting to the preload list
        // is effectively irreversible and would bind every current and future
        // subdomain to HTTPS. max-age + includeSubDomains gives the protection
        // without the one-way door.
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
      {
        // Keep nine archived portfolios out of the index so they don't compete
        // with the live site (and don't resurface as stale search results).
        source: "/v:n(\\d+)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

module.exports = nextConfig;
