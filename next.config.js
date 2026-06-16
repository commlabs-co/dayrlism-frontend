/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
