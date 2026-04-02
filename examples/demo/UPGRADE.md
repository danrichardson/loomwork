# Upgrading from Loomwork Upstream

This guide is for AI agents upgrading a forked loomwork site to the latest
framework version. Follow each step in order. Do not skip the pre-flight check.

---

## How Loomwork Updates Work

Loomwork separates files into two categories:

**Framework files** — maintained upstream, never edited in site repos. These
merge cleanly from loomwork because your repo hasn't touched them.

**Site files** — yours to own. Loomwork only ships placeholder versions of
these, so they won't conflict either.

In practice, `git merge loomwork/main` should almost always be conflict-free.
The pre-flight check below catches the rare case where someone edited a
framework file by mistake.

---

## Pre-Flight: Identify Any Edited Framework Files

Before merging, check whether any framework files have been modified in this
repo. If they have, note the changes — you will need to reapply them after the
merge or accept the upstream version.

**Framework files (should not be edited in site repos):**

| File | Purpose |
|------|---------|
| `src/layouts/Base.astro` | HTML shell, meta tags, font loading |
| `src/layouts/Content.astro` | Content page chrome, template variants |
| `src/components/Callout.astro` | Callout component |
| `src/components/Footer.astro` | Footer component |
| `src/components/Header.astro` | Header component |
| `src/components/TableOfContents.astro` | TOC sidebar component |
| `src/components/YouTube.astro` | YouTube embed component |
| `src/components/mobile/` | PWA mobile editor components |
| `src/pages/[...slug].astro` | Dynamic content page route |
| `src/pages/404.astro` | Not found page |
| `src/pages/mobile/` | PWA mobile editor page |
| `src/styles/global.css` | Base styles, reset, utilities |
| `src/content.config.ts` | Content collection schemas |
| `public/.assetsignore` | Cloudflare deploy fix |

Run this to see if any of them have uncommitted changes or differ from the
last commit:

```bash
git diff HEAD -- \
  src/layouts/ \
  src/components/ \
  src/pages/\[...slug\].astro \
  src/pages/404.astro \
  src/pages/mobile/ \
  src/styles/global.css \
  src/content.config.ts \
  public/.assetsignore
```

If this produces output, record what changed and why before proceeding.

**Site files (yours — will not be touched by the merge):**

- `src/site.config.ts`
- `src/styles/site.css`
- `src/pages/index.astro`
- `src/content/pages/*.mdx`
- `src/content/posts/*.mdx`
- `astro.config.mjs`
- `wrangler.toml`
- `package.json`
- `README.md`

---

## Step 1: Add Loomwork as an Upstream Remote (One-Time Setup)

If you haven't done this before:

```bash
git remote add loomwork https://github.com/danrichardson/loomwork.git
```

Verify it's set:

```bash
git remote -v
```

You should see both `origin` (your repo) and `loomwork` (upstream).

---

## Step 2: Fetch Latest Upstream Changes

```bash
git fetch loomwork
```

To preview what has changed in the framework before merging:

```bash
git log main..loomwork/main --oneline
```

To see the actual diff of framework files only:

```bash
git diff main loomwork/main -- \
  src/layouts/ \
  src/components/ \
  src/pages/\[...slug\].astro \
  src/pages/404.astro \
  src/pages/mobile/ \
  src/styles/global.css \
  src/content.config.ts \
  public/.assetsignore
```

Read this diff before merging. Understand what is changing.

---

## Step 3: Merge

```bash
git merge loomwork/main
```

**If the merge completes with no conflicts:** proceed to Step 5.

**If there are conflicts:** go to Step 4.

---

## Step 4: Resolve Conflicts (If Any)

Conflicts will only occur in files that both you and loomwork have changed.
This should only happen if you edited a framework file (caught in pre-flight).

For each conflicted file, run:

```bash
git diff --diff-filter=U
```

For framework files, accept the upstream (loomwork) version unless you had a
deliberate reason to diverge:

```bash
# Accept upstream version of a framework file
git checkout loomwork/main -- src/layouts/Base.astro
git add src/layouts/Base.astro
```

For site files, keep your version:

```bash
# Keep your version of a site file
git checkout HEAD -- src/site.config.ts
git add src/site.config.ts
```

After resolving all conflicts:

```bash
git merge --continue
```

---

## Step 5: Update Dependencies

Framework updates may add, remove, or upgrade npm packages.

```bash
npm install
```

Check the diff on `package.json` to understand what changed:

```bash
git show MERGE_HEAD:package.json
```

---

## Step 6: Verify the Build

```bash
npm run build
```

Confirm:
- Build completes with no errors
- Your content pages still render (check `dist/` for your page slugs)
- The homepage renders (`dist/index.html`)
- The mobile editor renders (`dist/mobile/index.html`)
- No unexpected new pages appeared in `dist/`

---

## Step 7: Verify the Dev Server

```bash
npm run dev
```

Confirm the dev server starts cleanly at http://localhost:4321 and your
pages load without errors in the browser console.

---

## Step 8: Push

```bash
git push origin main
```

---

## What to Watch For

**New framework components:** Loomwork may add new components to
`src/components/`. These are safe to use in your MDX files going forward.

**CSS variable changes in `global.css`:** If loomwork renames or removes a
CSS variable you reference in `site.css`, your styles may break silently.
After merging, search `site.css` for any variable names that changed upstream.

**Content schema changes in `content.config.ts`:** If the schema for content
collections changes, your MDX frontmatter may fail validation. Check the build
output for schema errors and update your `.mdx` files accordingly.

**New or renamed templates:** If loomwork adds a new `template` value or
renames an existing one, update your MDX frontmatter if needed.

---

## Loomwork Framework File Reference

If you are unsure whether a file is a framework file or a site file, the
rule is: **if it existed in the original loomwork repo and is not listed in
the "Site files" section of the README, don't edit it.**

When in doubt, check:

```bash
git log --oneline loomwork/main -- <file>
```

If loomwork has commits touching that file, it's a framework file.
