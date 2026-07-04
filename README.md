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
