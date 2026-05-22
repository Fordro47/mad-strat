# Madni Strategies Website

Marketing site for **Madni Strategies** built with the Next.js App Router, Tailwind CSS v4, and TypeScript.

## Content & brand

Editable site copy lives in [`lib/site-content.ts`](lib/site-content.ts). [`lib/archive-entries.generated.ts`](lib/archive-entries.generated.ts) powers the archives grid and is regenerated from `post-export-*.csv` via `npm run generate:archives` (see [`scripts/generate-archive-entries.mjs`](scripts/generate-archive-entries.mjs)). Editorial tone should follow [`instructions.md`](instructions.md).

The logo ships from [`public/media/logo.png`](public/media/logo.png) (also synced from [`media/logo.png`](media/logo.png)).

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

`npm run build` writes a static export to `out/`, which is what GitHub Pages deploys.

## GitHub Pages

This repo includes a GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On every push to `main`, it installs dependencies, builds the static Next.js export, uploads `out/`, and deploys it to GitHub Pages.

To publish the site:

1. Push the repo to GitHub.
2. In the repository settings, open **Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.

For project pages such as `https://<user>.github.io/mad-strat/`, the workflow automatically sets `NEXT_PUBLIC_BASE_PATH=/mad-strat` during the build. User or organization pages such as `https://<user>.github.io/` build without a base path.

## Site structure

- [`app/layout.tsx`](app/layout.tsx): metadata, typography, accessibility skip link.
- [`app/page.tsx`](app/page.tsx): home hero. About, Services, Archives, and Contact are separate routes: [`app/about/page.tsx`](app/about/page.tsx), [`app/services/page.tsx`](app/services/page.tsx), [`app/archives/page.tsx`](app/archives/page.tsx), [`app/contact/page.tsx`](app/contact/page.tsx).
- [`components/site-header.tsx`](components/site-header.tsx): sticky navigation + `/media/logo.png`.
