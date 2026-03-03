# Loomwork Upgrade Prompt

Use this prompt to instruct an agent to upgrade a loomwork-based site to the latest framework version.

---

## Prompt

Your task is to upgrade this site to the latest version of the loomwork framework. Follow these steps exactly, using the loomwork README as your reference.

### 1. Verify the loomwork remote is configured

```bash
git remote -v
```

You should see a `loomwork` remote pointing to `https://github.com/danrichardson/loomwork.git`. If it is missing, add it:

```bash
git remote add loomwork https://github.com/danrichardson/loomwork.git
```

### 2. Fetch and merge the latest loomwork

```bash
git fetch loomwork
git merge loomwork/main
```

### 3. Resolve any conflicts

Conflicts should only occur in **site files** (files you customized). For each conflict, keep your version — the HEAD side. Never keep loomwork's version of a site file.

Site files (always keep yours):
- `README.md`
- `src/site.config.ts`
- `src/styles/site.css`
- `src/pages/index.astro`
- `src/content/pages/*.mdx`
- `astro.config.mjs`
- `wrangler.toml`
- `package.json`

Framework files (should auto-merge cleanly — do not edit):
- `src/layouts/`
- `src/components/`
- `src/styles/global.css`
- `src/content.config.ts`
- `src/pages/[...slug].astro`
- `src/pages/404.astro`

After resolving conflicts:

```bash
git add .
```

### 4. Add a small visible change to a content file

Pick any page in `src/content/pages/` and add a small note at the bottom (e.g. a last-updated line). This gives you something concrete to look for when verifying the deployment went live.

### 5. Build and verify locally

```bash
npm run build
```

The build must complete with no errors before proceeding. Warnings about sharp or KV bindings are expected and can be ignored.

### 6. Commit

```bash
git commit -m "Upgrade to latest loomwork framework"
```

### 7. Push

```bash
git push origin main
```

### 8. Verify deployment

Wait 1-2 minutes for Cloudflare to deploy, then check the live site. Confirm the small content change you added in step 4 is visible. If it is, the upgrade is complete.

---

## Notes for the agent

- If the merge produces conflicts in framework files (layouts, components, global.css), that means those files were edited in the site repo. Resolve carefully — take the incoming loomwork changes where possible, and only keep site-specific additions that you made intentionally.
- If `git merge` fails entirely (unrelated histories), use `git merge loomwork/main --allow-unrelated-histories`.
- Do not push until the local build is clean.
