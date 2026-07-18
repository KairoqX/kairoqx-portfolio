# KairoqX — Portfolio

A production-ready personal portfolio built with Next.js (App Router),
TypeScript (strict mode), Tailwind CSS v4, Framer Motion, and Lucide icons.

Live sections: Hero (with a mouse-reactive neural-network canvas), About,
Skills, Projects (fetched live from the GitHub API — nothing hardcoded),
Learning Journey timeline, an interactive Terminal, Certificates, GitHub
stats, and a fully working Contact form (Resend-powered).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values, see below
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.example` for the full list with explanations. The two that
matter most:

- `RESEND_API_KEY` — required for the contact form to actually send email.
  Get a free key at https://resend.com. Without it, the form still
  validates and shows a clear error instead of silently failing.
- `GITHUB_TOKEN` — optional. Raises the GitHub API rate limit from 60/hr
  to 5000/hr. Add it if the Projects/GitHub sections start showing
  fallback data due to rate limiting.

## Project structure

```
src/
  app/                Next.js App Router pages, layout, API routes,
                       robots.ts, sitemap.ts
  components/          Shared, reusable React components
    ui/                 Design-system primitives (Button, GlassCard,
                         Reveal, Magnetic, brand icons, etc.)
  sections/             One file per homepage section (Hero, About, ...)
  hooks/                Reusable client-side hooks
  lib/                  Data (site-config.ts), GitHub API client,
                         validation schema, rate limiter
  utils/                Small framework-agnostic helpers (cn.ts)
public/                 Static assets, favicon, manifest, OG image
```

## Editing content

Everything you're likely to change lives in **`src/lib/site-config.ts`**:
name, role, socials, skills, certificates, timeline entries, and the
fallback project list used only if the live GitHub fetch fails. Nothing
else needs to be touched to update your info.

Projects themselves are **not** stored in this file — they're fetched
live from `https://api.github.com/users/AakashThunderz/repos` at build
time (revalidated hourly). Add, remove, or edit a repo on GitHub and it
appears here automatically.

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import it on https://vercel.com/new.
3. Add the environment variables from `.env.example` under
   Project → Settings → Environment Variables.
4. Deploy. No further configuration needed — this repo is a stock
   Next.js App Router project.

## Notes

- Color theme (blue → crimson) lives entirely in `src/app/globals.css`
  under the `@theme` block — change three hex values there to re-theme
  the whole site.
- Scroll-reveal animations use Framer Motion's `whileInView`, which
  correctly recomputes visibility even inside transformed/blurred
  ancestors — this avoids a class of "works on mobile, silently breaks
  on desktop" bugs that a hand-rolled `IntersectionObserver` + CSS class
  toggle is prone to.
- `lucide-react` no longer ships brand/logo icons (GitHub, Instagram, X)
  in recent versions — `src/components/ui/brand-icons.tsx` has small
  hand-drawn substitutes that plug into the same icon registry.
