# Trail & Summit

Your guide to the best hikes, gear, and outdoor adventures.

Built with [Loomwork](https://github.com/danrichardson/loomwork) — a content-first Astro starter.

## Local Development

```bash
npm install
npm run dev        # → http://localhost:4321
```

## Content

All site content lives in `src/content/pages/` as MDX files. The file path becomes the URL:

- `src/content/pages/about.mdx` → `/about`
- `src/content/pages/trails.mdx` → `/trails`
- `src/content/pages/gear.mdx` → `/gear`
- `src/content/pages/safety.mdx` → `/safety`

## Customization

- **Site config:** `src/site.config.ts` — name, nav, footer, fonts
- **Styles:** `src/styles/site.css` — colors, fonts, spacing
- **Homepage:** `src/pages/index.astro`

## Deploy

Push to GitHub, connect to Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`

## Pulling Framework Updates

```bash
git remote add loomwork https://github.com/danrichardson/loomwork.git
git fetch loomwork
git merge loomwork/main
```
