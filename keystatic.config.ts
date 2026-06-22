import { config, collection, fields, singleton } from "@keystatic/core";

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
  singletons: {
    profile: singleton({
      label: "Profile (landing + résumé)",
      path: "src/content/profile-data",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Name" }),
        fullName: fields.text({ label: "Full name" }),
        title: fields.text({ label: "Title" }),
        headline: fields.text({ label: "Headline" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        birthDate: fields.text({ label: "Birth date (MM/DD/YYYY)" }),
        careerStartYear: fields.integer({ label: "Career start year" }),
        nationality: fields.text({ label: "Nationality" }),
        availability: fields.text({ label: "Availability" }),
        languagesSpoken: fields.text({ label: "Languages spoken" }),
        contact: fields.object(
          {
            email: fields.text({ label: "Email" }),
            emailsAlt: fields.array(fields.text({ label: "Alt email" }), {
              label: "Alternate emails",
              itemLabel: (p) => p.value || "email",
            }),
            phone: fields.text({ label: "Phone" }),
            location: fields.text({ label: "Location" }),
            website: fields.text({ label: "Website" }),
            linkedin: fields.text({ label: "LinkedIn" }),
            telegram: fields.text({ label: "Telegram" }),
          },
          { label: "Contact" }
        ),
        skillBars: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            level: fields.integer({ label: "Level (0–100)" }),
          }),
          { label: "Skill bars", itemLabel: (p) => p.fields.name.value || "Skill" }
        ),
        techSkills: fields.array(fields.text({ label: "Skill" }), {
          label: "Tech skills",
          itemLabel: (p) => p.value || "Skill",
        }),
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills & tooling",
          itemLabel: (p) => p.value || "Skill",
        }),
        experience: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            company: fields.text({ label: "Company" }),
            period: fields.text({ label: "Period" }),
            country: fields.text({ label: "Country" }),
            achievements: fields.array(
              fields.text({ label: "Achievement", multiline: true }),
              { label: "Achievements", itemLabel: (p) => p.value || "Achievement" }
            ),
          }),
          {
            label: "Experience",
            itemLabel: (p) =>
              `${p.fields.title.value || "Role"} — ${p.fields.company.value || ""}`,
          }
        ),
        volunteer: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            company: fields.text({ label: "Organisation" }),
            period: fields.text({ label: "Period" }),
            country: fields.text({ label: "Country" }),
            achievements: fields.array(
              fields.text({ label: "Achievement", multiline: true }),
              { label: "Achievements", itemLabel: (p) => p.value || "Achievement" }
            ),
          }),
          {
            label: "Volunteer",
            itemLabel: (p) =>
              `${p.fields.title.value || "Role"} — ${p.fields.company.value || ""}`,
          }
        ),
        education: fields.array(
          fields.object({
            degree: fields.text({ label: "Degree" }),
            institute: fields.text({ label: "Institute" }),
            period: fields.text({ label: "Period" }),
            details: fields.text({ label: "Details" }),
          }),
          { label: "Education", itemLabel: (p) => p.fields.degree.value || "Degree" }
        ),
        certificates: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            detail: fields.text({ label: "Detail" }),
            period: fields.text({ label: "Period" }),
          }),
          { label: "Certificates", itemLabel: (p) => p.fields.name.value || "Certificate" }
        ),
        languages: fields.array(
          fields.object({
            name: fields.text({ label: "Language" }),
            proficiency: fields.text({ label: "Proficiency" }),
          }),
          { label: "Languages", itemLabel: (p) => p.fields.name.value || "Language" }
        ),
        interests: fields.array(fields.text({ label: "Interest" }), {
          label: "Interests",
          itemLabel: (p) => p.value || "Interest",
        }),
        projects: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            url: fields.text({ label: "URL" }),
            period: fields.text({ label: "Period" }),
          }),
          { label: "Projects", itemLabel: (p) => p.fields.name.value || "Project" }
        ),
        references: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            role: fields.text({ label: "Role" }),
            contact: fields.text({ label: "Contact" }),
          }),
          { label: "References", itemLabel: (p) => p.fields.name.value || "Reference" }
        ),
        social: fields.array(
          fields.object({
            icon: fields.text({ label: "Icon (Font Awesome class)" }),
            url: fields.text({ label: "URL" }),
          }),
          { label: "Social links", itemLabel: (p) => p.fields.url.value || "link" }
        ),
        crypto: fields.array(
          fields.object({
            icon: fields.text({ label: "Icon (Font Awesome class)" }),
            label: fields.text({ label: "Label" }),
            address: fields.text({ label: "Address" }),
          }),
          { label: "Crypto addresses", itemLabel: (p) => p.fields.label.value || "Address" }
        ),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Value" }),
            label1: fields.text({ label: "Label line 1" }),
            label2: fields.text({ label: "Label line 2" }),
          }),
          { label: "Stats", itemLabel: (p) => p.fields.value.value || "Stat" }
        ),
      },
    }),
  },
});
