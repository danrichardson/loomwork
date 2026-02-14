// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SITE CONFIG — SITE-SPECIFIC FILE
//
// This file is YOURS. Edit it freely. It won't conflict
// with framework updates from the loomwork repo.
//
// Everything site-specific — name, nav, branding — lives here.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SITE = {
  // ── Identity ────────────────────────────────────────────
  name: "Loomwork",
  tagline: "A content-first Astro starter for crafting sites by hand",
  description:
    "MDX + Content Collections + Cloudflare Pages. Write markdown, push to GitHub, auto-deploy in 30 seconds.",
  url: "https://www.loomwork.org",
  author: "Dan",
  email: "",

  // ── Navigation ──────────────────────────────────────────
  nav: [
    { label: "About", href: "/about_Loomwork" },
    { label: "Deploy Guide", href: "/guide" },
  ],

  // ── Fonts ───────────────────────────────────────────────
  // Google Fonts URL. Leave empty to use system fonts (the default).
  // Then set --font-body / --font-heading in site.css.
  //
  // Example:
  // fonts_url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&display=swap",
  fonts_url: "",

  // ── Social ──────────────────────────────────────────────
  social: {
    github: "https://github.com/danrichardson/loomwork",
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    company: "Throughline Technical Services, LLC",
    license: "MIT License",
  },
} as const;

export type SiteConfig = typeof SITE;
