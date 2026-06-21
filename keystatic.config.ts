import { config, collection, fields } from "@keystatic/core";

// Storage mode. Defaults to `local` (zero setup: `yarn dev` → /keystatic edits
// files directly), which also lets production build without GitHub App secrets.
//
// To enable editing in production, create the Keystatic GitHub App, then set on
// the host:
//   NEXT_PUBLIC_KEYSTATIC_STORAGE=github   (flips the mode below — must be public
//                                            so client + server agree)
//   KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET
//
// The on-disk format never changes between modes, so content stays portable.
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({ kind: "github", repo: "commlabs-co/dayrlism-frontend" } as const)
    : ({ kind: "local" } as const);

export default config({
  storage,
  ui: {
    brand: { name: "Dayrlism" },
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedAt"],
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 1 } },
          },
          slug: {
            label: "Slug",
            description: "The URL segment: /blog/<slug>",
          },
        }),
        publishedAt: fields.date({
          label: "Published date",
          defaultValue: { kind: "today" },
        }),
        summary: fields.text({
          label: "Summary",
          description: "Shown on the blog index and used for SEO / social cards.",
          multiline: true,
          validation: { length: { min: 1, max: 300 } },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Keep hidden from the live site until unchecked.",
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/blog",
              publicPath: "/images/blog/",
            },
          },
        }),
      },
    }),
  },
});
