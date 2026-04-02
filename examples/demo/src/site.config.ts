// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SITE CONFIG - SITE-SPECIFIC FILE
//
// This file is YOURS. Edit it freely. It won't conflict
// with framework updates from the loomwork repo.
//
// Everything site-specific - name, nav, branding - lives here.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SITE = {
  // ── Identity ────────────────────────────────────────────
  name: "Trail & Summit",
  tagline: "Your guide to the best hikes, gear, and outdoor adventures",
  description:
    "Curated trail guides, gear reviews, and wilderness safety tips for hikers of every level. Get outside and explore.",
  url: "https://www.trailandsummit.com",
  author: "Trail & Summit Team",
  email: "hello@trailandsummit.com",

  // ── Navigation ──────────────────────────────────────────
  // Update these to match your content pages:
  nav: [
    { label: "About", href: "/about" },
    { label: "Trail Guides", href: "/trails" },
    { label: "Gear", href: "/gear" },
    { label: "Safety", href: "/safety" },
  ],

  // ── Fonts ───────────────────────────────────────────────
  // Google Fonts URL. Leave empty to use system fonts (the default).
  // Then set --font-body / --font-heading in site.css.
  fonts_url: "https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&family=Source+Sans+3:wght@400;600;700&display=swap",

  // ── Social ──────────────────────────────────────────────
  social: {
    github: "",
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    company: "Trail & Summit",
    license: "",
  },
} as const;

export type SiteConfig = typeof SITE;
