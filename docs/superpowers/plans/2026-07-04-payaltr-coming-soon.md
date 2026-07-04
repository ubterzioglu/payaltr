# payaltr Coming-Soon Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium dark fintech "coming soon" page for payaltr as a Next.js 15 app, packaged with a multi-stage Dockerfile for Coolify, and pushed to `ubterzioglu/payaltr`.

**Architecture:** Next.js 15 App Router, statically rendered single page. Three presentational components (Hero, Aurora, Footer) composed in `app/page.tsx`. Plain CSS with design tokens in `globals.css` — no Tailwind, no external fonts. Docker multi-stage build using Next `output: 'standalone'`.

**Tech Stack:** Next.js 15, React 19, TypeScript, plain CSS, Docker (node:22-alpine).

## Global Constraints

- Next.js 15 (App Router) + React 19 + TypeScript.
- No Tailwind, no external font fetch, no analytics, no email capture, no API routes, no database.
- Page must be static-rendered (no runtime data fetching).
- Animation must respect `prefers-reduced-motion`.
- Dark-first premium fintech aesthetic; single accent color (electric violet/blue).
- Product name is exactly `payaltr` (lowercase). Hero headline: "Payments, reinvented."
- `next.config.ts` must set `output: 'standalone'`.
- Final Docker image on `node:22-alpine`, non-root user, `EXPOSE 3000`, `HEALTHCHECK` on `/`.
- Verification is `npm run build` + `docker build` + container smoke test on port 3000. No unit test suite.

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.eslintrc.json`

**Interfaces:**
- Consumes: nothing.
- Produces: a buildable Next.js 15 app. `app/page.tsx` exports a default React component (placeholder for now). `next.config.ts` exports a config object with `output: 'standalone'`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "payaltr",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.6",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@types/node": "22.10.7",
    "@types/react": "19.0.7",
    "@types/react-dom": "19.0.3",
    "eslint": "9.18.0",
    "eslint-config-next": "15.1.6",
    "typescript": "5.7.3"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 4: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

- [ ] **Step 5: Create `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 6: Create placeholder `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "payaltr",
  description: "Coming soon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Create placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return <main>payaltr — coming soon</main>;
}
```

- [ ] **Step 8: Create minimal `app/globals.css`**

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 9: Install dependencies**

Run: `npm install`
Expected: completes, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 10: Verify the build succeeds**

Run: `npm run build`
Expected: "Compiled successfully", a `.next/` directory is produced, no type errors.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts .eslintrc.json app/
git commit -m "chore: scaffold next.js 15 app"
```

---

### Task 2: Design tokens and base styles

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS custom properties available globally: `--bg`, `--fg`, `--muted`, `--accent`, `--accent-2`, `--radius`, plus base body styling (dark background, system font stack, centered app shell via `.app` class). Later components use these tokens and the `.app` wrapper.

- [ ] **Step 1: Replace `app/globals.css` with design tokens + base styles**

```css
:root {
  --bg: #07080d;
  --bg-2: #0d0f1a;
  --fg: #f4f6fb;
  --muted: #9aa3b8;
  --accent: #7c5cff;
  --accent-2: #4d7cff;
  --radius: 999px;
  --maxw: 720px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

.app {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 2rem 1.25rem;
  text-align: center;
}
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: "Compiled successfully", no errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add design tokens and base styles"
```

---

### Task 3: Aurora animated background component

**Files:**
- Create: `components/Aurora.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: CSS tokens `--accent`, `--accent-2` from Task 2.
- Produces: default export `Aurora` (a client component taking no props) that renders a fixed, full-viewport animated gradient background behind page content. Relies on CSS classes `.aurora`, `.aurora__blob`, `.aurora__blob--a`, `.aurora__blob--b`, `.aurora__blob--c` added to `globals.css`.

- [ ] **Step 1: Create `components/Aurora.tsx`**

```tsx
"use client";

export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--a" />
      <div className="aurora__blob aurora__blob--b" />
      <div className="aurora__blob aurora__blob--c" />
    </div>
  );
}
```

- [ ] **Step 2: Append aurora styles to `app/globals.css`**

```css
.aurora {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: radial-gradient(
      1200px 600px at 50% -10%,
      rgba(124, 92, 255, 0.12),
      transparent 60%
    ),
    var(--bg);
}

.aurora__blob {
  position: absolute;
  width: 45vmax;
  height: 45vmax;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  will-change: transform;
}

.aurora__blob--a {
  background: var(--accent);
  top: -10%;
  left: -10%;
  animation: drift-a 18s ease-in-out infinite alternate;
}

.aurora__blob--b {
  background: var(--accent-2);
  bottom: -15%;
  right: -10%;
  animation: drift-b 22s ease-in-out infinite alternate;
}

.aurora__blob--c {
  background: #2a1b6b;
  top: 30%;
  left: 40%;
  animation: drift-c 26s ease-in-out infinite alternate;
}

@keyframes drift-a {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(8vw, 6vh, 0) scale(1.15);
  }
}

@keyframes drift-b {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(-7vw, -5vh, 0) scale(1.1);
  }
}

@keyframes drift-c {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(-5vw, 4vh, 0) scale(0.9);
  }
}

@media (prefers-reduced-motion: reduce) {
  .aurora__blob {
    animation: none;
  }
}
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: "Compiled successfully", no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Aurora.tsx app/globals.css
git commit -m "feat: add animated aurora background"
```

---

### Task 4: Hero component

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: CSS tokens from Task 2.
- Produces: default export `Hero` (server component, no props) rendering the "Coming soon" pill, the "Payments, reinvented." headline, and supporting subcopy. Relies on CSS classes `.hero`, `.pill`, `.pill__dot`, `.hero__title`, `.hero__sub` added to `globals.css`.

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
export default function Hero() {
  return (
    <section className="hero">
      <span className="pill">
        <span className="pill__dot" />
        Coming soon
      </span>
      <h1 className="hero__title">Payments, reinvented.</h1>
      <p className="hero__sub">
        payaltr is building a faster, safer way to move money. Secure by design,
        effortless by default. Launching soon.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Append hero styles to `app/globals.css`**

```css
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: var(--maxw);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  backdrop-filter: blur(6px);
}

.pill__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 rgba(124, 92, 255, 0.6);
  animation: pulse 2.4s ease-out infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(124, 92, 255, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(124, 92, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(124, 92, 255, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pill__dot {
    animation: none;
  }
}

.hero__title {
  font-size: clamp(2.75rem, 8vw, 5.5rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  font-weight: 700;
  background: linear-gradient(180deg, #ffffff 0%, #b9c0d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__sub {
  font-size: clamp(1rem, 2.4vw, 1.2rem);
  line-height: 1.6;
  color: var(--muted);
  max-width: 34rem;
}
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: "Compiled successfully", no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/globals.css
git commit -m "feat: add hero section"
```

---

### Task 5: Footer component

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: CSS tokens from Task 2.
- Produces: default export `Footer` (server component, no props) rendering the payaltr wordmark, an X/Twitter link, and a copyright line. Relies on CSS classes `.footer`, `.footer__brand`, `.footer__links`, `.footer__copy` added to `globals.css`. Uses a static year constant (no runtime `Date` — keeps the page static).

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__brand">payaltr</span>
      <nav className="footer__links">
        <a href="https://x.com/payaltr" target="_blank" rel="noopener noreferrer">
          X
        </a>
      </nav>
      <span className="footer__copy">© 2026 payaltr. All rights reserved.</span>
    </footer>
  );
}
```

- [ ] **Step 2: Append footer styles to `app/globals.css`**

```css
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--muted);
}

.footer__brand {
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--fg);
}

.footer__links {
  display: flex;
  gap: 1rem;
}

.footer__links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer__links a:hover {
  color: var(--fg);
}

.footer__copy {
  font-size: 0.8rem;
  opacity: 0.7;
}
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: "Compiled successfully", no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/globals.css
git commit -m "feat: add footer"
```

---

### Task 6: Compose the page and finalize metadata/SEO

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`

**Interfaces:**
- Consumes: `Aurora` (Task 3), `Hero` (Task 4), `Footer` (Task 5).
- Produces: the finished coming-soon page with full SEO + Open Graph metadata.

- [ ] **Step 1: Replace `app/page.tsx` to compose components**

```tsx
import Aurora from "@/components/Aurora";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Aurora />
      <main className="app">
        <Hero />
        <Footer />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Replace `app/layout.tsx` with full metadata**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://payaltr.com"),
  title: "payaltr — Payments, reinvented.",
  description:
    "payaltr is building a faster, safer way to move money. Secure by design, effortless by default. Launching soon.",
  keywords: ["payaltr", "payments", "fintech", "money transfer", "coming soon"],
  openGraph: {
    title: "payaltr — Payments, reinvented.",
    description:
      "A faster, safer way to move money. Secure by design, effortless by default. Launching soon.",
    url: "https://payaltr.com",
    siteName: "payaltr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "payaltr — Payments, reinvented.",
    description:
      "A faster, safer way to move money. Launching soon.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the build succeeds and page is statically rendered**

Run: `npm run build`
Expected: "Compiled successfully". In the route output table, `/` is marked as static (`○` / prerendered), not dynamic.

- [ ] **Step 4: Smoke-test locally**

Run: `npm run start` (after build), then in another shell `curl -s http://localhost:3000 | grep -i "Payments, reinvented"`
Expected: the headline text appears in the returned HTML. Stop the server afterward.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: compose coming-soon page with SEO metadata"
```

---

### Task 7: Docker multi-stage build for Coolify

**Files:**
- Create: `Dockerfile`, `.dockerignore`

**Interfaces:**
- Consumes: the Next.js app with `output: 'standalone'` (Task 1).
- Produces: a Docker image that serves the app on port 3000 as a non-root user with a healthcheck.

- [ ] **Step 1: Create `.dockerignore`**

```
node_modules
.next
.git
docs
npm-debug.log*
.DS_Store
.env*
Dockerfile
.dockerignore
README.md
```

- [ ] **Step 2: Create `Dockerfile`**

```dockerfile
# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
```

- [ ] **Step 3: Ensure `public/` exists (standalone COPY needs it)**

Run: `mkdir -p public` and create `public/.gitkeep` (empty file) so the directory is tracked and the Docker `COPY public` step succeeds even with no assets.

- [ ] **Step 4: Build the Docker image**

Run: `docker build -t payaltr:local .`
Expected: build completes through all three stages, ends with "naming to docker.io/library/payaltr:local".

- [ ] **Step 5: Run the container and smoke-test**

Run: `docker run -d --rm -p 3000:3000 --name payaltr-test payaltr:local`, wait ~3s, then `curl -s http://localhost:3000 | grep -i "Payments, reinvented"`
Expected: headline text appears. Then `docker stop payaltr-test`.

- [ ] **Step 6: Commit**

```bash
git add Dockerfile .dockerignore public/.gitkeep
git commit -m "build: add multi-stage dockerfile for coolify"
```

---

### Task 8: README with Coolify deploy instructions, and push to GitHub

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: everything above.
- Produces: documentation and the project published to `main` on `ubterzioglu/payaltr`.

- [ ] **Step 1: Create `README.md`**

````markdown
# payaltr

Premium "coming soon" page for **payaltr** — payments, reinvented.

Built with Next.js 15 (App Router) + TypeScript. Static-rendered, dark
premium fintech design, no external dependencies at runtime.

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Docker

```bash
docker build -t payaltr .
docker run -p 3000:3000 payaltr
```

The image is a multi-stage build using Next.js `output: 'standalone'`,
runs as a non-root user, exposes port 3000, and has a `/` healthcheck.

## Deploy on Coolify

1. In Coolify, **New Resource → Application → Public/Private Repository**.
2. Select this repository (`ubterzioglu/payaltr`), branch `main`.
3. Set **Build Pack** to **Dockerfile**.
4. Set the **Port** to `3000`.
5. (Optional) Attach your domain and enable HTTPS.
6. **Deploy**.

Coolify builds the `Dockerfile`, runs the container, and routes your
domain to port 3000. The healthcheck keeps the deployment status accurate.
````

- [ ] **Step 2: Verify the build one final time**

Run: `npm run build`
Expected: "Compiled successfully", no errors.

- [ ] **Step 3: Commit the README**

```bash
git add README.md
git commit -m "docs: add readme with coolify deploy instructions"
```

- [ ] **Step 4: Set the remote and push to GitHub**

Run:
```bash
git branch -M main
git remote add origin https://github.com/ubterzioglu/payaltr.git
git push -u origin main
```
Expected: all commits pushed; `main` set as upstream. Confirm with `gh repo view ubterzioglu/payaltr --json isEmpty` showing `"isEmpty":false`.

---

## Self-Review

- **Spec coverage:** Next.js app (Task 1), premium dark design + aurora + hero + footer (Tasks 2–5), static render + SEO/OG (Task 6), multi-stage Dockerfile with non-root/healthcheck/3000 (Task 7), README with Coolify steps + push to repo (Task 8). No email capture anywhere — matches spec. All success criteria covered.
- **Placeholder scan:** No TBD/TODO; every code step has complete content.
- **Type/name consistency:** Component default exports `Aurora`/`Hero`/`Footer` match imports in Task 6. CSS class names used in components match those defined in `globals.css` across tasks. `output: 'standalone'` in Task 1 matches the Dockerfile `COPY .next/standalone` in Task 7.
