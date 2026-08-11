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
    ];
  },
  async headers() {
    return [
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
