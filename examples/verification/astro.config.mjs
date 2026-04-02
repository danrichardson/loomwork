// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ASTRO CONFIG - SITE-SPECIFIC FILE
//
// Change `site` to your domain. The rest should rarely
// need changing unless you're adding integrations.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  // Change this per-site
  site: "https://verification.loomwork.org",

  output: "static",
  adapter: cloudflare(),

  image: {
    service: { entrypoint: "astro/assets/services/compile" },
  },

  integrations: [mdx(), react(), sitemap()],

  markdown: {
    shikiConfig: { theme: "github-dark" },
  },

  // React 19 + Cloudflare Workers fix
  vite: {
    resolve: {
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});
