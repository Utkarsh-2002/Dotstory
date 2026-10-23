# Programmatic marketing site

A minimal, animated one-page marketing site (Next.js). Placeholder brand name: **Auctra**.

## Where to edit things

Almost everything lives in one file: **`lib/content.js`**

- Brand name, nav links, all headings and paragraphs
- Stats, case studies, testimonials, FAQ, footer links
- Images: every image slot has `src: null` (shows a coloured placeholder).
  Put your image in `public/images/` and set `src: "/images/your-file.jpg"`.

> All names, numbers, case studies and testimonials are **placeholders**.
> Replace them with real, approved content before going live.

Colours, fonts and spacing are at the top of `app/globals.css` (`:root { ... }`).

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Import this repo on [Vercel](https://vercel.com). It is detected as a Next.js
project automatically, and every push to `main` redeploys.
