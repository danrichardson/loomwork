# Loomwork Upgrade Prompt

Use this prompt to instruct an agent to upgrade a loomwork-based site to the
latest framework version. This is the prompt consumed by the "Upgrade Demo Site"
GitHub Action, and can be given to any coding agent working in a site repo.

---

## Prompt

Your task is to upgrade this site to the latest version of the loomwork
framework. This is a major upgrade — the framework now includes a theme system,
reader controls panel, and new page templates. Follow these steps exactly.

### Phase 1: Merge Framework Code

#### 1. Verify the loomwork remote is configured

```bash
git remote -v
```

You should see a `loomwork` remote pointing to
`https://github.com/danrichardson/loomwork.git`. If it is missing, add it:

```bash
git remote add loomwork https://github.com/danrichardson/loomwork.git
```

#### 2. Fetch and merge the latest loomwork

```bash
git fetch loomwork
git merge loomwork/main
```

#### 3. Resolve any conflicts

Conflicts will fall into one of three categories. Handle each differently:

**Pure site files (always keep yours — HEAD side):**
- `README.md`
- `src/site.config.ts`
- `src/styles/site.css`
- `src/pages/index.astro`
- `src/content/pages/*.mdx`
- `astro.config.mjs`
- `wrangler.toml`

**Framework files (should auto-merge cleanly — if they conflict, accept
loomwork's version):**
- `src/layouts/`
- `src/components/`
- `src/styles/global.css`
- `src/styles/themes.css`
- `src/content.config.ts`
- `src/themes/`
- `src/pages/[...slug].astro`
- `src/pages/404.astro`
- `src/pages/mobile/`
- `public/_headers`
- `public/_redirects`
- `public/.assetsignore`
- `public/themes/`
- `public/mobile/`

**Dependency files (special handling):**
- `package.json` — If conflicted, accept the **incoming loomwork version** so
  new framework dependencies are included, then verify your project `name` and
  `description` fields are still correct. If loomwork added dependencies your
  site also added, both will be present after merge.
- `package-lock.json` — **Always delete and regenerate.** Do not try to merge
  this file manually:

```bash
git checkout --theirs package.json   # take framework deps
# Then verify and fix name/description if needed
rm package-lock.json
```

After resolving all conflicts:

```bash
git add .
```

If the merge was interrupted, complete it:

```bash
git merge --continue
```

#### 4. Install dependencies

This is required after every merge — framework updates may add, remove, or
upgrade npm packages:

```bash
npm install
```

This also regenerates `package-lock.json` if you deleted it in step 3.

#### 5. Check for CSS variable changes

If the merge updated `src/styles/global.css`, check whether any CSS custom
property names you reference in `src/styles/site.css` were renamed or removed:

```bash
git diff HEAD~1 HEAD -- src/styles/global.css | grep "^[-+].*--"
```

If this shows renamed variables, update `site.css` to match.

#### 6. Build and verify the merge

```bash
npm run build
```

The build must complete with no errors before proceeding. Warnings about sharp
or KV bindings are expected and can be ignored.

Confirm:
- Your content pages still appear in the build output
- The homepage renders (`dist/index.html`)
- The mobile editor renders (`dist/mobile/index.html`)

### Phase 2: Adopt 2.0 Features

The framework now includes a theme system with 10 built-in themes, a floating
reader controls panel, and a longform page template. Update site files to use
these features.

#### 7. Enable a theme in site.config.ts

Open `src/site.config.ts` and add/update these fields:

```typescript
theme: "campfire",      // or any built-in theme (see list below)
reader_controls: true,  // floating gear panel: dark mode, font size, TOC, width, focus
```

Available themes: `manuscript`, `brutalist`, `atelier`, `terminal`, `gazette`,
`alpine`, `campfire`, `moonrise`, `fieldnotes`, `neon`.

Choose a theme that fits the site's identity. Each theme provides a complete
color palette, font stack, and dark mode — no manual CSS needed.

#### 8. Clean up site.css

Now that a theme handles colors and fonts, remove any manually-defined color
palette or font-family declarations from `src/styles/site.css`. The theme CSS
provides all of these.

**Remove** (or comment out): any `:root` block that sets `--color-*` variables
or `--font-*` variables, since the theme provides these.

**Keep**: any site-specific CSS that is NOT color/font related (custom layout
rules, component overrides, etc.). If you have accent color overrides specific
to the site identity, you can keep a small `:root` block with just
`--color-accent` and `--color-accent-hover` to tweak the theme's palette. But
do not redefine the full color/font system — that's the theme's job.

The goal: `site.css` should be small (under ~30 lines of variable overrides
at most).

#### 9. Update fonts_url

Since the theme loads its own Google Fonts automatically, clear the manual
`fonts_url` in `site.config.ts`:

```typescript
fonts_url: "",  // theme loads its own fonts
```

If the theme's fonts are not a good fit and you want to override them, you can
set `fonts_url` to a Google Fonts URL and override `--font-body` /
`--font-heading` in `site.css`. But try the theme's defaults first.

#### 10. Verify homepage uses CSS variables (not hardcoded colors)

Open `src/pages/index.astro` and check for any hardcoded hex colors (e.g.,
`#2d6a4f`, `#f5f5f0`). Replace them with CSS variable references:
- Background colors → `var(--color-bg)`, `var(--color-bg-alt)`, `var(--color-surface)`
- Text colors → `var(--color-text)`, `var(--color-text-muted)`
- Accent colors → `var(--color-accent)`, `var(--color-accent-hover)`, `var(--color-accent-light)`
- Border colors → `var(--color-border)`

This ensures the homepage respects theme changes and dark mode. If the homepage
already uses only CSS variables, no changes needed.

#### 11. Add a longform content page

Create one new `.mdx` page using the `longform` template to verify the
split-panel layout works. This template is new in 2.0 and designed for
deep-dive articles with a fixed sidebar.

Pick a topic that fits the site's content. For example, on a hiking site you
might add `src/content/pages/deep-dives/trail-philosophy.mdx`. Write at least
800 words with 4+ sections and use Callout components. Example frontmatter:

```yaml
---
title: "Your Deep Dive Title"
description: "Description for SEO, max 160 chars."
section: "deep-dives"
nav_order: 50
template: "longform"
date_created: 2026-03-03
---
```

Add a nav item for this page in `site.config.ts`.

#### 12. Delete loomwork placeholder content that arrived with the merge

The merge may have brought in loomwork's placeholder content pages and docs.
Delete anything that is not your site content:

```bash
# Delete loomwork placeholder pages if they appeared
rm -f src/content/pages/about_Loomwork.mdx
rm -f src/content/pages/guide.mdx
rm -f src/content/pages/mobile-app.mdx
rm -f src/content/pages/building.mdx
rm -f src/content/pages/theming.mdx
rm -f src/content/pages/page-types.mdx
rm -f src/content/pages/reader-controls.mdx
rm -rf src/content/pages/deep-dives/campfire-2-retro.mdx
rm -rf src/content/pages/deep-dives/designing-for-focus.mdx
rm -rf src/content/pages/deep-dives/what-is-longform.mdx

# Delete loomwork docs directory if it appeared
rm -rf docs/

# Delete loomwork-specific images
rm -f public/images/1771364152056-image.jpg
```

Only delete files you did not create. Do not delete your own content pages, images, or docs.

### Phase 3: Final Verification

#### 13. Rebuild and verify 2.0 features

```bash
npm run build
```

Confirm all of the following:
- Build completes with no errors
- Your content pages still render (check `dist/` for your page slugs)
- The new longform page renders (e.g., `dist/deep-dives/trail-philosophy/index.html`)
- The homepage renders (`dist/index.html`)
- The mobile editor renders (`dist/mobile/index.html`)
- Theme CSS files exist in `dist/themes/` (10 files: alpine.css, atelier.css, etc.)
- No loomwork placeholder pages in the build output (about_Loomwork, guide, mobile-app, building, theming, page-types, reader-controls)

#### 14. Verify the dev server

```bash
npm run dev
```

Confirm it starts at http://localhost:4321 without errors.

#### 15. Commit

```bash
git add -A
git commit -m "Upgrade to loomwork 2.0: themes, reader controls, longform template"
```

#### 16. Push

```bash
git push origin main
```

#### 17. Verify deployment

Wait 1-2 minutes for Cloudflare to deploy, then check the live site. Confirm:
- The theme is visibly active (styled fonts, colors, dark mode)
- The reader controls gear icon (⚙) appears in the bottom-right corner
- The new longform page renders with the split-panel layout
- All existing content pages still work
- Dark mode toggle works in the reader controls panel

---

## Notes for the agent

- If the merge produces conflicts in framework files (layouts, components,
  global.css), that means those files were edited in the site repo. Accept the
  incoming loomwork changes to get back in sync.
- If `git merge` fails entirely (unrelated histories), use:
  `git merge loomwork/main --allow-unrelated-histories`
- Do not push until the local build is clean.
- The key 2.0 changes are: `theme` field, `reader_controls` field, cleaned-up
  `site.css`, empty `fonts_url`, longform template page, and CSS variable usage
  on the homepage. All of these must be present in the final commit.
- If anything goes wrong after merging, you can abort or roll back:
  - Before committing: `git merge --abort`
  - After committing: `git reset --hard HEAD~1`
