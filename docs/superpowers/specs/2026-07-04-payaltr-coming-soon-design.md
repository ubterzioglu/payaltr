# payaltr — Coming Soon Page Design

**Date:** 2026-07-04
**Repo:** https://github.com/ubterzioglu/payaltr (empty, public)
**Status:** Approved

## Summary

A premium single-page "coming soon" announcement for **payaltr**, a payments/fintech
product. Built as a Next.js 15 app (App Router, TypeScript), pushed to the empty
`ubterzioglu/payaltr` repo, and packaged with a multi-stage Dockerfile ready to deploy
on Coolify. **No email capture** — pure branded announcement.

## Goals

- Ship a high-end, production-grade "coming soon" landing page.
- Package it so it deploys on Coolify via a Dockerfile with minimal steps.
- Push the whole project to the currently-empty GitHub repo on `main`.

## Non-Goals (YAGNI)

- No email/waitlist capture, no backend API routes, no database.
- No external font fetch, no Tailwind, no analytics — keep the image small and CSP-clean.
- No unit test suite (verification is build + container smoke test).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Plain CSS with design tokens in `globals.css` (no Tailwind)
- Static-rendered page (no runtime data)
- Docker (multi-stage) for Coolify deployment

## Architecture

```
payaltr/
├─ app/
│  ├─ layout.tsx        # root layout, metadata/SEO/OG, font stack
│  ├─ page.tsx          # coming-soon page (server component)
│  └─ globals.css       # design tokens + base styles
├─ components/
│  ├─ Hero.tsx          # headline, subcopy, "Coming soon" badge
│  ├─ Aurora.tsx        # animated premium background (CSS, client)
│  └─ Footer.tsx        # brand mark, social links, copyright
├─ public/              # favicon, og-image
├─ Dockerfile           # multi-stage → standalone runner
├─ .dockerignore
├─ next.config.ts       # output: 'standalone'
├─ package.json / tsconfig.json / eslint config
└─ README.md            # includes Coolify deploy instructions
```

Each component has one clear purpose and communicates via props only:
- **Hero** — pure presentational; renders headline/subcopy/badge from static content.
- **Aurora** — self-contained animated background; client component so animation runs
  in the browser; respects `prefers-reduced-motion`.
- **Footer** — brand mark + social links + copyright; no dependencies.

## Visual Design ("premium")

Dark, high-end fintech aesthetic:

- **Background:** subtle animated aurora/gradient mesh (pure CSS keyframes,
  GPU-friendly via `transform`/`opacity`, `prefers-reduced-motion` respected) over near-black.
- **Type:** large, tight, confident hero — "Payments, reinvented." with a supporting
  line about payaltr coming soon. System/variable font stack (no external fetch).
- **Accent:** a single premium accent color (electric violet/blue) for the "Coming soon"
  pill and a subtle animated glow.
- **Layout:** centered, generous whitespace, fully responsive, dark-first.
- **Sharing:** SEO metadata + Open Graph tags so shared links preview premium.

## Deployment (Coolify)

- **Multi-stage Dockerfile:** `deps` → `build` → `runner`, using Next's
  `output: 'standalone'`. Final image on `node:22-alpine`, runs as a non-root user,
  `EXPOSE 3000`, `HEALTHCHECK` hitting `/`.
- **`.dockerignore`** keeps the build context tiny (excludes `node_modules`, `.next`, `.git`).
- **README** documents exact Coolify steps: New Resource → this repo →
  Build Pack = **Dockerfile** → port 3000 → deploy.
- **Git:** initialize locally, commit, push to `main` on `ubterzioglu/payaltr`.

## Testing / Verification

- `npm run build` must succeed (catches type + build errors).
- `docker build` locally to confirm the image builds and the container serves on `:3000`.
- No unit test suite for a static announcement page.

## Success Criteria

1. `npm run build` succeeds cleanly.
2. Docker image builds and a container serves the page on port 3000.
3. Page renders premium dark fintech coming-soon design, responsive, reduced-motion safe.
4. Project pushed to `main` on `ubterzioglu/payaltr` with README Coolify instructions.
