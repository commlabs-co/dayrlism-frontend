# dayrlism

Personal site of **Dayrl Lee** — a single Next.js app that hosts the landing page, a print-ready résumé, and a git-based blog, all sharing one dark editorial brand.

🔗 **Live:** [dayrlism.info](https://dayrlism.info) · [/resume](https://dayrlism.info/resume) · [/blog](https://dayrlism.info/blog)

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS** + CSS-variable theming (dark/light)
- **Keystatic** — git-based CMS for the blog (Markdoc) and profile data
- **EmailJS** — client-side contact form
- Deployed on **Vercel** (Node 22+)

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page (hero, about, experience, versions, contact) |
| `/resume` | Print-ready résumé (A4 print stylesheet) |
| `/blog` | Blog index — tile grid with tag filtering |
| `/blog/[slug]` | Statically generated post pages |
| `/blog/rss.xml` | RSS feed |
| `/keystatic` | Keystatic admin UI (edit blog + profile) |

## Project structure

```
src/
  app/
    page.tsx, LandingView.tsx      # landing
    resume/                        # /resume
    blog/                          # /blog index, [slug], rss.xml, MarkdocContent
    keystatic/, api/keystatic/     # Keystatic admin + API route
    layout.tsx, globals.css        # root layout, metadata, fonts
  content/
    posts/*.mdoc                   # blog posts (Markdoc + front matter)
    profile-data.yaml              # profile singleton (CMS source of truth)
    profile.ts                     # typed fallback / default for the profile
    types.ts                       # Profile type
  lib/content.ts                   # the only module that reads Keystatic (reader, getProfile, getAllPosts…)
keystatic.config.ts                # collections + singletons schema
public/
  images/blog/                     # post cover/body images
  assets/img/brand/                # logo-mark, logo-seal, favicon
```

The rest of the app never imports Keystatic directly — everything flows through `src/lib/content.ts`, so the CMS could be swapped without touching the pages.

## Local development

```bash
yarn install
yarn dev          # http://localhost:3000
```

Open **http://localhost:3000/keystatic** to edit content locally (zero setup — it writes straight to the files on disk, which you then commit).

### Scripts

| Script | What it does |
| --- | --- |
| `yarn dev` | Dev server on `:3000` |
| `yarn build` | Production build |
| `yarn start` | Serve the production build on `:3013` |
| `yarn lint` | ESLint (`next lint`) |
| `yarn typecheck` | `tsc --noEmit` |

## Editing content

- **Blog posts** live as portable Markdoc files in `src/content/posts/*.mdoc`.
- **Profile / résumé data** (bio, contact, experience, education, skills, etc.) lives in the `profile` singleton at `src/content/profile-data.yaml`. `getProfile()` layers it over the typed defaults in `profile.ts`, so the site still renders if the singleton is missing a field.

Edit everything through the Keystatic UI at `/keystatic`; each save is a commit, and Vercel redeploys automatically.

## Environment variables

```bash
# Contact form (EmailJS) — public by design
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=...

# Keystatic — only needed to enable editing on the *deployed* site (GitHub mode).
# Without these, storage defaults to local (great for dev).
NEXT_PUBLIC_KEYSTATIC_STORAGE=github
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...   # secret — set in Vercel / .env.local, never commit
KEYSTATIC_SECRET=...                 # secret — `openssl rand -hex 32`
```

## Deployment

Pushing to `master` deploys to production on Vercel (`dayrlism.info`).

> **Note:** because the Keystatic reader loads content files at request time, `next.config.js` uses `outputFileTracingIncludes` to bundle `src/content/**` into the serverless functions. Without it, dynamic routes (e.g. the blog index) read an empty content directory in production.

## Licensing

The **code** in this repository is released under the [MIT License](LICENSE).
The **content** — blog posts and other material in `src/content/`, and the
images and personal branding in `public/` — is © Dayrl Lee Pui Shin, all
rights reserved.

> The committed `.env` intentionally contains only `NEXT_PUBLIC_*` values
> (GA measurement ID, EmailJS browser keys) — these ship to the client bundle
> and are public by design. Real secrets live in Vercel env vars and
> `.env.local` (gitignored), and CI runs a gitleaks scan on every push.

## Contact form → Notion

The landing contact form posts to `/api/contact`, which writes one row per
enquiry into a Notion database. Set in Vercel:

```
NOTION_TOKEN=secret_...        # internal integration secret
NOTION_CONTACT_DB_ID=...       # the Contact Submissions database id
```

Create the integration at <https://www.notion.so/my-integrations>, then share
the database with it (••• → Connections → your integration) — without that
step Notion answers `object_not_found`.

While unset the route returns a clear 503 and the form shows an error; it
never reports success without something being written. EmailJS, if its
`NEXT_PUBLIC_EMAILJS_*` vars are present, still fires as a best-effort
notification alongside the Notion write.
