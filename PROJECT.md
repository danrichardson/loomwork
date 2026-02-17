# Loomwork Mobile — Project Description

## Overview

**Loomwork Mobile** is a Progressive Web App (PWA) that serves as a mobile content editor for sites built with [Loomwork](https://github.com/danrichardson/loomwork), the open-source Astro-based web publishing framework. It lets site owners create, edit, and publish MDX content directly from their phone or tablet — no laptop, no terminal, no app store required.

The app talks directly to the **GitHub API** to read and commit content files, and Cloudflare handles deployment automatically on push. No custom server infrastructure is needed.

Loomwork Mobile lives **inside the Loomwork repo** as a framework file. Every Loomwork site gets the editor automatically and it stays in sync with the framework.

## Core Problem

Loomwork sites are managed by editing MDX files in a git repo and pushing to GitHub. This workflow requires a computer with a code editor and git CLI. Loomwork Mobile removes that friction — letting site owners write and publish from anywhere using their phone.

## Target User

A **site owner/author** who runs one or more Loomwork-powered sites and wants to create or edit content on the go. They are comfortable with Markdown but don't want to SSH into a machine or open VS Code just to fix a typo or publish a quick post.

## Distribution & Update Model

### Where It Lives

Loomwork Mobile is **bundled inside the Loomwork repo** as a framework directory (e.g., `packages/mobile/` or `src/mobile/`). It is a framework file — users don't edit it, and upstream updates merge cleanly via the existing `git fetch loomwork && git merge loomwork/main` workflow.

This means:
- **Every forked Loomwork site includes the mobile editor** — zero extra setup
- **Schema sync is automatic** — the editor and the content schemas live in the same repo
- **Updates flow through the existing mechanism** — `git merge loomwork/main` updates both the framework and the mobile editor in one step
- **Accessible at a site route** — e.g., `yoursite.com/mobile` or `yoursite.com/admin`
- **Deployed on Cloudflare Pages** alongside the site itself — no separate hosting

### How the PWA Updates

Because it's a PWA, updates are automatic. The service worker detects new assets when the user opens the app. When a site owner pulls framework updates and redeploys, the mobile editor updates too. No app store review. No user action.

### Schema Synchronization

The mobile app does **not** hardcode Loomwork's content schema. Instead:

1. A **build-time script** reads `src/content.config.ts` (the Zod schemas) and generates a `loomwork.schema.json` manifest describing every collection, field, type, constraints (max length, required, enum values, defaults, etc.)
2. The mobile app reads this JSON at runtime and **dynamically generates the frontmatter form**
3. When someone adds a field to `content.config.ts`, the next build regenerates the manifest, and the form automatically includes the new field — **zero mobile app code changes required**

This is the same pattern used by headless CMS tools like Decap CMS and TinaCMS. It makes the mobile editor resilient to any schema evolution in Loomwork.

### Multi-Site Consideration

Since each site has its own bundled editor, managing multiple sites means bookmarking each site's editor URL (e.g., `site-a.com/mobile`, `site-b.com/mobile`). The editor still uses GitHub PAT auth per-site. In the future, a thin "site switcher" PWA could wrap multiple instances, but for v1 this is sufficient — site owners rarely manage more than a few sites.

## Platform & Tech Stack

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Platform | **Progressive Web App (PWA)** | No app store; installable to home screen on iOS/Android; works in any modern browser |
| Framework | **Vite + React + TypeScript** | Shares language/ecosystem with Loomwork (which already uses React for islands); fast dev experience |
| Styling | **CSS Modules** or **Tailwind CSS** | Lightweight, no runtime cost |
| State | **React Context + useReducer** (to start) | Simple; upgrade to Zustand if complexity grows |
| Storage | **IndexedDB** (via `idb-keyval` or similar) | Offline draft storage, token persistence |
| Auth | **GitHub Personal Access Token (PAT)** | No backend needed; fine-grained PATs can scope to specific repos; stored encrypted in IndexedDB |
| API | **GitHub REST API** (via `octokit`) | Read/write repo files, list branches, create commits |
| MDX Preview | **`react-markdown`** + remark/rehype plugins | Render Markdown preview in-app; progressively add MDX component support |
| PWA | **Vite PWA Plugin** (`vite-plugin-pwa`) | Service worker, offline support, install prompt |
| Schema | **Generated JSON manifest** (`loomwork.schema.json`) | Build-time extraction from Zod schemas; mobile app reads at runtime for dynamic form generation |

## Architecture

```
┌─ Loomwork Repo (forked) ──────────────────────────────────┐
│                                                           │
│  src/content.config.ts ──► build ──► loomwork.schema.json |
│                                                           │
│  src/content/pages/*.mdx    (content files)               │
│  src/content/posts/*.mdx                                  │
│  src/site.config.ts         (site identity)               │
│                                                           │
│  packages/mobile/           (Loomwork Mobile PWA)         │
│  └── built & served at /mobile                            │
│                                                           │
└───────────────────────────────────────────────────────────┘
        │ deployed to
        ▼
┌──────────────────────────────────────────┐
│  Cloudflare Pages                        │
│  yoursite.com        ← main site         │
│  yoursite.com/mobile ← mobile editor PWA │
└──────────────────────────────────────────┘

┌─ Loomwork Mobile (in browser) ───────────────────────┐
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Editor      │  │ Preview      │  │ Frontmatter  │ │
│  │ (Markdown)  │  │ (rendered)   │  │ Form (dynamic│ │
│  │             │  │              │  │ from schema) │ │
│  └──────┬──────┘  └──────────────┘  └──────────────┘ │
│         │                                            │
│  ┌──────▼──────────────────────────────────────────┐ │
│  │  Content Manager                                │ │
│  │  reads loomwork.schema.json for form generation │ │
│  │  auto-saves drafts to IndexedDB                 │ │
│  └──────┬──────────────────────────────────────────┘ │
│         │                                            │
│  ┌──────▼──────────────────────────────────────────┐ │
│  │  GitHub Service (octokit)                       │ │
│  │  - List/read/write files via GitHub REST API    │ │
│  │  - Create commits to main branch                │ │
│  │  - Auth via PAT (stored in IndexedDB)           │ │
│  └──────┬──────────────────────────────────────────┘ │
│         │                                            │
└─────────┼────────────────────────────────────────────┘
          │ HTTPS
          ▼
   GitHub API ──push──► Cloudflare auto-deploys
```

**No custom backend.** The PWA communicates directly with GitHub's API using the user's PAT. The schema manifest is a static JSON file served alongside the PWA.

## Features — v1 (MVP)

### 1. Setup & Authentication
- On first visit to `/mobile`, prompt for a **GitHub Personal Access Token** with repo scope
- Validate the token and confirm access to the site's GitHub repo
- Store the PAT securely in IndexedDB
- Auto-detect the repo URL from site config or allow manual entry

### 2. Content Browser
- Display the file tree for `src/content/pages/` and `src/content/posts/`
- Show file metadata: title, description, template, draft status, last modified
- Parse frontmatter from MDX files to display structured info
- Sort/filter by section, draft status, date

### 3. Content Editor
- **Markdown text editor** with syntax highlighting (using CodeMirror or a lightweight alternative)
- **Dynamic frontmatter form** — generated at runtime from `loomwork.schema.json`; automatically adapts when schema fields are added/changed
- **Auto-save drafts** locally in IndexedDB (offline-capable)
- Create new pages and posts from templates

### 4. Preview
- **In-app Markdown preview** — rendered view of the content using `react-markdown` with remark-gfm
- **Live site link** — button to open the corresponding URL on the deployed site
- Side-by-side or toggle between edit and preview modes

### 5. Publish (Commit & Push)
- Commit message input (with sensible defaults like "Update {filename}")
- Commit directly to `main` branch (single-author workflow for v1)
- Show commit confirmation with link to the GitHub commit
- Visual indicator that Cloudflare deploy is triggered (link to site)

### 6. PWA Capabilities
- Installable to home screen (iOS & Android)
- Offline draft editing — sync when back online
- Responsive design optimized for mobile, works on tablet/desktop too

## Features — Future (v2+)

These are out of scope for v1 but the architecture should not prevent them:

| Feature | Description |
|---------|-------------|
| **Site config editor** | Edit `site.config.ts` — name, tagline, nav items, footer, fonts |
| **Theme/CSS editor** | Edit `site.css` — color picker for CSS variables, font selector |
| **Deploy status** | Poll Cloudflare API for build/deploy status |
| **Branch workflows** | Create feature branches, preview deploys, merge |
| **Image upload** | Upload images to `public/` or an external CDN, insert into content |
| **Rich text editing** | WYSIWYG toolbar (bold, italic, headings, links, lists) producing MDX |
| **MDX component palette** | Insert Callout, YouTube, and custom components via UI |
| **Collaborator support** | Multiple users, role-based access |
| **GitHub OAuth** | Replace PAT with OAuth flow (would need a small Cloudflare Worker for token exchange) |
| **Site switcher** | Thin wrapper PWA that bookmarks multiple site editors (site-a.com/mobile, site-b.com/mobile) |
| **Analytics dashboard** | View Cloudflare analytics for the site |
| **Notifications** | Push notifications for deploy success/failure |

## Loomwork Content Schema Reference

These schemas (from `src/content.config.ts`) are the source of truth. At build time, a script extracts them into `loomwork.schema.json` so the mobile app can dynamically generate forms. The schemas below are the current baseline:

### Pages

```typescript
{
  title: string;                                          // required
  description: string;                  // max 160 chars  // required
  section: string;                                        // optional
  nav_title: string;                                      // optional
  nav_order: number;                    // default: 100
  parent: string;                                         // optional
  hero_image: string;                                     // optional
  hero_alt: string;                                       // optional
  template: "default" | "landing" | "guide" | "tool";     // default: "default"
  draft: boolean;                       // default: false
  date_created: Date;                                     // optional
  date_updated: Date;                                     // optional
  tags: string[];                       // default: []
  og_image: string;                                       // optional
  canonical: string;                    // URL            // optional
  noindex: boolean;                     // default: false
}
```

### Posts

```typescript
{
  title: string;                                          // required
  description: string;                  // max 160 chars  // required
  date: Date;                                             // required, coerced
  author: string;                       // default: "Dan"
  tags: string[];                       // default: []
  hero_image: string;                                     // optional
  hero_alt: string;                                       // optional
  draft: boolean;                       // default: false
  og_image: string;                                       // optional
}
```

## Key Design Decisions

### Why bundle in the Loomwork repo?
- **Zero sync problem** — content schemas and the editor live in the same repo
- **Follows the existing update model** — `git merge loomwork/main` updates both framework and editor
- **Every fork includes it** — no separate install, no extra hosting
- **Deploys automatically** — Cloudflare builds the site + editor together
- **Framework file semantics** — users don't edit it, upstream merges are clean

### Why PWA over native?
- No app store approval process or fees
- Instant updates (no app store review cycle)
- Shares TypeScript/React with Loomwork's own tech stack
- Works on iOS, Android, and desktop from a single codebase
- Hosted alongside the site on Cloudflare Pages — no separate infrastructure

### Why PAT over OAuth?
- **Zero server infrastructure** — OAuth requires a backend to securely exchange tokens (client_secret can't live in frontend code)
- PATs with fine-grained permissions can be scoped to specific repos
- Simple UX: user creates a PAT on GitHub, pastes it into the app once
- Migration path: add OAuth later via a small Cloudflare Worker

### Why commit directly vs. draft PRs?
- v1 targets single-author sites — the owner is the only committer
- Direct commits to `main` match Loomwork's existing workflow (`git push` → auto-deploy)
- Branch/PR workflows can be added in v2 for team scenarios

## File Structure (Proposed)

Within the Loomwork repo:

```
loomwork/                              # ← the main Loomwork repo
├── src/
│   ├── content.config.ts              # ← source of truth for schemas
│   ├── site.config.ts
│   ├── content/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── packages/
│   └── mobile/                        # ← FRAMEWORK FILE (don't edit in site repos)
│       ├── public/
│       │   ├── manifest.json          # PWA manifest
│       │   └── icons/                 # App icons (various sizes)
│       ├── src/
│       │   ├── main.tsx               # App entry point
│       │   ├── App.tsx                # Root component + routing
│       │   ├── components/
│       │   │   ├── editor/
│       │   │   │   ├── MarkdownEditor.tsx
│       │   │   │   ├── DynamicFrontmatterForm.tsx  # reads loomwork.schema.json
│       │   │   │   └── EditorToolbar.tsx
│       │   │   ├── preview/
│       │   │   │   └── MarkdownPreview.tsx
│       │   │   ├── browser/
│       │   │   │   ├── FileTree.tsx
│       │   │   │   └── FileCard.tsx
│       │   │   └── common/
│       │   │       ├── Layout.tsx
│       │   │       ├── Header.tsx
│       │   │       └── BottomNav.tsx
│       │   ├── services/
│       │   │   ├── github.ts          # GitHub API wrapper (octokit)
│       │   │   ├── storage.ts         # IndexedDB for drafts + credentials
│       │   │   ├── schema.ts          # Load & interpret loomwork.schema.json
│       │   │   └── mdx.ts             # Frontmatter parsing, MDX utilities
│       │   ├── hooks/
│       │   │   ├── useGitHub.ts
│       │   │   ├── useDrafts.ts
│       │   │   └── useSchema.ts       # Hook to read dynamic schema
│       │   ├── types/
│       │   │   └── schema.ts          # Types for the schema manifest format
│       │   ├── context/
│       │   │   └── AppContext.tsx
│       │   └── styles/
│       │       └── global.css
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
├── scripts/
│   └── generate-schema.ts             # Reads content.config.ts → loomwork.schema.json
├── astro.config.mjs
├── package.json
└── loomwork.schema.json               # Generated artifact — committed to repo
```

## Hosting

The mobile editor is deployed **alongside the site** on Cloudflare Pages. The Astro build config routes `/mobile/*` to the PWA's built output. No separate hosting, no extra cost — it's part of the same Cloudflare Pages deployment.

## Success Criteria (v1)

- [ ] Mobile editor is bundled in the Loomwork repo under `packages/mobile/`
- [ ] Build-time script generates `loomwork.schema.json` from `content.config.ts`
- [ ] User can authenticate with a GitHub PAT on first visit to `/mobile`
- [ ] User can browse pages and posts in the repo
- [ ] User can open a file and edit its Markdown content
- [ ] Dynamic frontmatter form is generated from `loomwork.schema.json`
- [ ] User can preview rendered Markdown in-app
- [ ] User can commit changes with a message and push to GitHub
- [ ] Drafts are saved locally and survive app reload
- [ ] App is installable as PWA on iOS and Android
- [ ] Framework updates (`git merge loomwork/main`) update the editor cleanly
