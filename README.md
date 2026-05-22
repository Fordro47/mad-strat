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

## Site structure

- [`app/layout.tsx`](app/layout.tsx): metadata, typography, accessibility skip link.
- [`app/page.tsx`](app/page.tsx): home hero. About, Services, Archives, and Contact are separate routes: [`app/about/page.tsx`](app/about/page.tsx), [`app/services/page.tsx`](app/services/page.tsx), [`app/archives/page.tsx`](app/archives/page.tsx), [`app/contact/page.tsx`](app/contact/page.tsx).
- [`components/site-header.tsx`](components/site-header.tsx): sticky navigation + `/media/logo.png`.
