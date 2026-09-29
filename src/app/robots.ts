import type { MetadataRoute } from "next";

const SITE = "https://dayrlism.info";

/** Crawl rules + sitemap discovery.
 *
 *  /keystatic is the CMS admin UI, /api is machinery, and /vN are the archived
 *  builds of previous versions of this site — all noise in an index, and the
 *  archives would otherwise compete with the live pages for the same terms. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/keystatic", "/v1/", "/v2/", "/v3/", "/v4/", "/v5/", "/v6/", "/v7/", "/v8/", "/v9/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
