// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTENT COLLECTIONS - FRAMEWORK FILE
//
// This file defines the schema for content collections.
// Do NOT edit in site repos - changes come from loomwork.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { defineCollection, z } from "astro:content";

// ── PAGES ───────────────────────────────────────────────────
// Long-form site content. File path = URL path.
//
//   src/content/pages/guides/getting-started.mdx
//   → /guides/getting-started
//
const pages = defineCollection({
  type: "content",
  schema: z.object({
    // Required
    title: z.string(),
    description: z.string().max(160),

    // Navigation
    section: z.string().optional(),
    nav_title: z.string().optional(),
    nav_order: z.number().default(100),
    parent: z.string().optional(),

    // Display
    hero_image: z.string().optional(),
    hero_alt: z.string().optional(),
    template: z
      .enum(["default", "landing", "guide", "tool"])
      .default("default"),

    // Metadata
    draft: z.boolean().default(false),
    date_created: z.coerce.date().optional(),
    date_updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),

    // SEO
    og_image: z.string().optional(),
    canonical: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

// ── POSTS ───────────────────────────────────────────────────
// Blog / news / updates. Date-driven, reverse-chronological.
// Optional - delete src/content/posts/ if you don't need it.
//
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    author: z.string().default("Dan"),
    tags: z.array(z.string()).default([]),
    hero_image: z.string().optional(),
    hero_alt: z.string().optional(),
    draft: z.boolean().default(false),
    og_image: z.string().optional(),
  }),
});

export const collections = { pages, posts };
