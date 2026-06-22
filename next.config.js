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
    ];
  },
};

module.exports = nextConfig;
