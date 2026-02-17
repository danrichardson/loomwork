// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MOBILE APP — Root React component
// FRAMEWORK FILE — do not edit in site repos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useCallback } from "react";
import type { Credentials } from "./storage";
import {
  getCredentials,
  saveCredentials,
  clearCredentials,
  saveDraft,
  getDraft,
} from "./storage";
import {
  parseRepo,
  validateToken,
  listFilesRecursive,
  getFile,
  putFile,
} from "./github";
import type { RepoFile, FileContent } from "./github";
import { parseFile, serializeFile, renderMarkdown, getTitle } from "./mdx";
import "./mobile.css";

// ── Types ────────────────────────────────────────────────

type Screen = "login" | "browser" | "editor";
type EditorTab = "edit" | "preview" | "frontmatter";

interface AppState {
  screen: Screen;
  creds: Credentials | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  files: RepoFile[];
  currentFile: FileContent | null;
  currentSha: string | null;
  editorTab: EditorTab;
  body: string;
  frontmatter: Record<string, any>;
  dirty: boolean;
  showCommit: boolean;
  commitMessage: string;
  committing: boolean;
}

// ── Component ────────────────────────────────────────────

export function MobileApp({
  siteName = "Loomwork",
  siteUrl = "",
}: {
  siteName?: string;
  siteUrl?: string;
}) {
  const [state, setState] = useState<AppState>({
    screen: "login",
    creds: null,
    loading: true,
    error: null,
    success: null,
    files: [],
    currentFile: null,
    currentSha: null,
    editorTab: "edit",
    body: "",
    frontmatter: {},
    dirty: false,
    showCommit: false,
    commitMessage: "",
    committing: false,
  });

  const set = useCallback(
    (patch: Partial<AppState>) => setState((s) => ({ ...s, ...patch })),
    []
  );

  // ── Init: check saved credentials ──────────────────────
  useEffect(() => {
    (async () => {
      try {
        const creds = await getCredentials();
        if (creds) {
          set({ creds, screen: "browser", loading: false });
          loadFiles(creds);
        } else {
          set({ loading: false });
        }
      } catch {
        set({ loading: false });
      }
    })();
  }, []);

  // ── Load file list ─────────────────────────────────────
  async function loadFiles(creds: Credentials) {
    set({ loading: true, error: null });
    try {
      const [pages, posts] = await Promise.all([
        listFilesRecursive(creds.token, creds.owner, creds.repo, "src/content/pages").catch(
          () => []
        ),
        listFilesRecursive(creds.token, creds.owner, creds.repo, "src/content/posts").catch(
          () => []
        ),
      ]);
      set({ files: [...pages, ...posts], loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  }

  // ── Login ──────────────────────────────────────────────
  async function handleLogin(repoInput: string, token: string) {
    set({ loading: true, error: null });
    try {
      const { owner, repo } = parseRepo(repoInput);
      const valid = await validateToken(token, owner, repo);
      if (!valid) {
        set({ error: "Invalid token or no access to repo.", loading: false });
        return;
      }
      const creds: Credentials = { token, owner, repo };
      await saveCredentials(creds);
      set({ creds, screen: "browser", loading: false });
      loadFiles(creds);
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  }

  // ── Logout ─────────────────────────────────────────────
  async function handleLogout() {
    await clearCredentials();
    set({
      screen: "login",
      creds: null,
      files: [],
      currentFile: null,
      error: null,
      success: null,
    });
  }

  // ── Open file ──────────────────────────────────────────
  async function openFile(file: RepoFile) {
    if (!state.creds) return;
    set({ loading: true, error: null });
    try {
      // Check for local draft first
      const draft = await getDraft(file.path);
      const remote = await getFile(
        state.creds.token,
        state.creds.owner,
        state.creds.repo,
        file.path
      );

      let body: string;
      let frontmatter: Record<string, any>;
      let dirty = false;

      if (draft && draft.savedAt > 0) {
        body = draft.content;
        frontmatter = draft.frontmatter;
        dirty = true;
      } else {
        const parsed = parseFile(remote.content);
        body = parsed.body;
        frontmatter = parsed.frontmatter;
      }

      set({
        screen: "editor",
        currentFile: remote,
        currentSha: remote.sha,
        body,
        frontmatter,
        editorTab: "edit",
        dirty,
        loading: false,
        commitMessage: `Update ${file.name}`,
      });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  }

  // ── Auto-save draft ────────────────────────────────────
  useEffect(() => {
    if (!state.currentFile || !state.dirty) return;
    const timer = setTimeout(() => {
      saveDraft(state.currentFile!.path, {
        path: state.currentFile!.path,
        content: state.body,
        frontmatter: state.frontmatter,
        savedAt: Date.now(),
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.body, state.frontmatter, state.dirty]);

  // ── Commit ─────────────────────────────────────────────
  async function handleCommit() {
    if (!state.creds || !state.currentFile) return;
    set({ committing: true, error: null });
    try {
      const content = serializeFile(state.frontmatter, state.body);
      const result = await putFile(
        state.creds.token,
        state.creds.owner,
        state.creds.repo,
        state.currentFile.path,
        content,
        state.commitMessage,
        state.currentSha || undefined
      );
      // Clear draft
      await import("./storage").then(({ removeDraft }) =>
        removeDraft(state.currentFile!.path)
      );
      set({
        currentSha: result.sha,
        dirty: false,
        showCommit: false,
        committing: false,
        success: `Committed! Cloudflare will deploy shortly.`,
      });
      // Clear success after a few seconds
      setTimeout(() => set({ success: null }), 5000);
    } catch (e: any) {
      set({ error: e.message, committing: false });
    }
  }

  // ── Back to browser ────────────────────────────────────
  function goBack() {
    set({
      screen: "browser",
      currentFile: null,
      currentSha: null,
      body: "",
      frontmatter: {},
      dirty: false,
      editorTab: "edit",
      error: null,
      success: null,
    });
    if (state.creds) loadFiles(state.creds);
  }

  // ── Render ─────────────────────────────────────────────

  if (state.loading && state.screen === "login") {
    return (
      <div className="mobile-app">
        <div className="m-empty">
          <div className="m-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-app">
      {/* Status messages */}
      {state.error && (
        <div className="m-status m-status--error">
          {state.error}
          <button
            className="m-btn--icon"
            style={{ float: "right" }}
            onClick={() => set({ error: null })}
          >
            ✕
          </button>
        </div>
      )}
      {state.success && (
        <div className="m-status m-status--success">{state.success}</div>
      )}

      {state.screen === "login" && (
        <LoginScreen siteName={siteName} onLogin={handleLogin} loading={state.loading} />
      )}

      {state.screen === "browser" && (
        <>
          <header className="m-header">
            <div className="m-header__title">
              <span className="m-header__mark">⬡</span>
              {siteName}
            </div>
            <div className="m-header__actions">
              <button className="m-btn--icon" onClick={() => state.creds && loadFiles(state.creds)} title="Refresh">
                ↻
              </button>
              <button className="m-btn--icon" onClick={handleLogout} title="Sign out">
                ⏻
              </button>
            </div>
          </header>
          <div className="m-content">
            {state.loading ? (
              <div className="m-empty">
                <div className="m-spinner" />
              </div>
            ) : (
              <FileBrowser files={state.files} onOpen={openFile} />
            )}
          </div>
        </>
      )}

      {state.screen === "editor" && state.currentFile && (
        <>
          <header className="m-header">
            <div className="m-header__title">
              <button className="m-btn--icon" onClick={goBack}>
                ←
              </button>
              <span style={{ fontSize: "0.875rem" }}>
                {state.frontmatter.title || state.currentFile.path.split("/").pop()}
              </span>
              {state.dirty && (
                <span style={{ color: "var(--m-accent)", fontSize: "0.75rem" }}>●</span>
              )}
            </div>
            <div className="m-header__actions">
              <button
                className="m-btn m-btn--primary m-btn--small"
                disabled={!state.dirty}
                onClick={() => set({ showCommit: true })}
              >
                Publish
              </button>
            </div>
          </header>
          <Editor
            body={state.body}
            frontmatter={state.frontmatter}
            tab={state.editorTab}
            onTabChange={(tab) => set({ editorTab: tab })}
            onBodyChange={(body) => set({ body, dirty: true })}
            onFrontmatterChange={(fm) => set({ frontmatter: fm, dirty: true })}
            filePath={state.currentFile.path}
            siteUrl={siteUrl}
          />
          {state.showCommit && (
            <CommitDialog
              message={state.commitMessage}
              onMessageChange={(msg) => set({ commitMessage: msg })}
              onCommit={handleCommit}
              onCancel={() => set({ showCommit: false })}
              committing={state.committing}
            />
          )}
        </>
      )}
    </div>
  );
}

// ── Login Screen ─────────────────────────────────────────

function LoginScreen({
  siteName,
  onLogin,
  loading,
}: {
  siteName: string;
  onLogin: (repo: string, token: string) => void;
  loading: boolean;
}) {
  const [repo, setRepo] = useState("");
  const [token, setToken] = useState("");

  return (
    <div className="m-login">
      <div className="m-login__mark">⬡</div>
      <h1 className="m-login__title">{siteName}</h1>
      <p className="m-login__subtitle">Mobile Editor</p>
      <form
        className="m-login__form"
        onSubmit={(e) => {
          e.preventDefault();
          if (repo && token) onLogin(repo, token);
        }}
      >
        <div>
          <label className="m-label" htmlFor="repo">
            GitHub Repository
          </label>
          <input
            id="repo"
            className="m-input m-input--mono"
            type="text"
            placeholder="owner/repo or GitHub URL"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
          />
        </div>
        <div>
          <label className="m-label" htmlFor="token">
            Personal Access Token
          </label>
          <input
            id="token"
            className="m-input m-input--mono"
            type="password"
            placeholder="ghp_..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
          />
          <p style={{ fontSize: "0.75rem", color: "#78716c", marginTop: "0.25rem" }}>
            Create at GitHub → Settings → Developer Settings → Personal Access Tokens
          </p>
        </div>
        <button
          type="submit"
          className="m-btn m-btn--primary"
          disabled={!repo || !token || loading}
        >
          {loading ? <span className="m-spinner" /> : "Connect"}
        </button>
      </form>
    </div>
  );
}

// ── File Browser ─────────────────────────────────────────

function FileBrowser({
  files,
  onOpen,
}: {
  files: RepoFile[];
  onOpen: (file: RepoFile) => void;
}) {
  const pages = files.filter((f) => f.path.startsWith("src/content/pages/"));
  const posts = files.filter((f) => f.path.startsWith("src/content/posts/"));

  if (files.length === 0) {
    return (
      <div className="m-empty">
        <div className="m-empty__icon">📄</div>
        <p>No content files found.</p>
      </div>
    );
  }

  return (
    <div className="m-files">
      {pages.length > 0 && (
        <FileSection title="Pages" files={pages} onOpen={onOpen} icon="📄" />
      )}
      {posts.length > 0 && (
        <FileSection title="Posts" files={posts} onOpen={onOpen} icon="📝" />
      )}
    </div>
  );
}

function FileSection({
  title,
  files,
  onOpen,
  icon,
}: {
  title: string;
  files: RepoFile[];
  onOpen: (file: RepoFile) => void;
  icon: string;
}) {
  return (
    <div className="m-files__section">
      <h2 className="m-files__heading">{title}</h2>
      {files.map((file) => (
        <button key={file.path} className="m-file-card" onClick={() => onOpen(file)}>
          <span className="m-file-card__icon">{icon}</span>
          <div className="m-file-card__info">
            <div className="m-file-card__title">{file.name}</div>
            <div className="m-file-card__desc">{file.path}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Editor ───────────────────────────────────────────────

function Editor({
  body,
  frontmatter,
  tab,
  onTabChange,
  onBodyChange,
  onFrontmatterChange,
  filePath,
  siteUrl,
}: {
  body: string;
  frontmatter: Record<string, any>;
  tab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
  onBodyChange: (body: string) => void;
  onFrontmatterChange: (fm: Record<string, any>) => void;
  filePath: string;
  siteUrl: string;
}) {
  // Derive the live URL from the file path
  const slug = filePath
    .replace(/^src\/content\/pages\//, "")
    .replace(/^src\/content\/posts\//, "")
    .replace(/\.mdx?$/, "");
  const liveUrl = siteUrl ? `${siteUrl.replace(/\/$/, "")}/${slug}` : "";

  return (
    <div className="m-editor">
      <div className="m-editor__toolbar">
        <div className="m-editor__toolbar-group">
          {(["edit", "preview", "frontmatter"] as const).map((t) => (
            <button
              key={t}
              className={`m-editor__tab ${tab === t ? "m-editor__tab--active" : ""}`}
              onClick={() => onTabChange(t)}
            >
              {t === "edit" ? "✏️ Edit" : t === "preview" ? "👁️ Preview" : "⚙️ Meta"}
            </button>
          ))}
        </div>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="m-btn--icon"
            title="View live"
          >
            ↗
          </a>
        )}
      </div>

      {tab === "edit" && (
        <textarea
          className="m-editor__textarea"
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          placeholder="Start writing..."
          spellCheck
        />
      )}

      {tab === "preview" && (
        <div
          className="m-preview"
          dangerouslySetInnerHTML={{
            __html: renderMarkdown(body),
          }}
        />
      )}

      {tab === "frontmatter" && (
        <FrontmatterForm
          frontmatter={frontmatter}
          onChange={onFrontmatterChange}
          isPost={filePath.includes("/posts/")}
        />
      )}
    </div>
  );
}

// ── Frontmatter Form ─────────────────────────────────────

function FrontmatterForm({
  frontmatter,
  onChange,
  isPost,
}: {
  frontmatter: Record<string, any>;
  onChange: (fm: Record<string, any>) => void;
  isPost: boolean;
}) {
  const update = (key: string, value: any) => {
    onChange({ ...frontmatter, [key]: value });
  };

  return (
    <div className="m-frontmatter">
      <Field label="Title">
        <input
          className="m-input"
          value={frontmatter.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
      </Field>

      <Field label="Description">
        <input
          className="m-input"
          value={frontmatter.description || ""}
          onChange={(e) => update("description", e.target.value)}
          maxLength={160}
        />
        <small style={{ color: "#78716c", fontSize: "0.75rem" }}>
          {(frontmatter.description || "").length}/160
        </small>
      </Field>

      {isPost && (
        <>
          <Field label="Date">
            <input
              className="m-input"
              type="date"
              value={frontmatter.date || ""}
              onChange={(e) => update("date", e.target.value)}
            />
          </Field>
          <Field label="Author">
            <input
              className="m-input"
              value={frontmatter.author || ""}
              onChange={(e) => update("author", e.target.value)}
            />
          </Field>
        </>
      )}

      {!isPost && (
        <>
          <Field label="Section">
            <input
              className="m-input"
              value={frontmatter.section || ""}
              onChange={(e) => update("section", e.target.value)}
            />
          </Field>
          <Field label="Template">
            <select
              className="m-select"
              value={frontmatter.template || "default"}
              onChange={(e) => update("template", e.target.value)}
            >
              <option value="default">Default</option>
              <option value="landing">Landing</option>
              <option value="guide">Guide</option>
              <option value="tool">Tool</option>
            </select>
          </Field>
          <Field label="Nav Order">
            <input
              className="m-input"
              type="number"
              value={frontmatter.nav_order ?? 100}
              onChange={(e) => update("nav_order", parseInt(e.target.value) || 100)}
            />
          </Field>
        </>
      )}

      <Field label="Tags (comma-separated)">
        <input
          className="m-input"
          value={Array.isArray(frontmatter.tags) ? frontmatter.tags.join(", ") : ""}
          onChange={(e) =>
            update(
              "tags",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      </Field>

      <Field label="Draft">
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={frontmatter.draft || false}
            onChange={(e) => update("draft", e.target.checked)}
          />
          <span style={{ fontSize: "0.875rem" }}>
            {frontmatter.draft ? "Draft (not published)" : "Published"}
          </span>
        </label>
      </Field>

      <Field label="Hero Image URL">
        <input
          className="m-input"
          value={frontmatter.hero_image || ""}
          onChange={(e) => update("hero_image", e.target.value)}
          placeholder="/images/hero.jpg"
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="m-frontmatter__field">
      <label className="m-label">{label}</label>
      {children}
    </div>
  );
}

// ── Commit Dialog ────────────────────────────────────────

function CommitDialog({
  message,
  onMessageChange,
  onCommit,
  onCancel,
  committing,
}: {
  message: string;
  onMessageChange: (msg: string) => void;
  onCommit: () => void;
  onCancel: () => void;
  committing: boolean;
}) {
  return (
    <div className="m-dialog-overlay" onClick={onCancel}>
      <div className="m-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 className="m-dialog__title">Publish Changes</h2>
        <p style={{ fontSize: "0.875rem", color: "#78716c", marginBottom: "1rem" }}>
          This will commit to the main branch. Cloudflare will auto-deploy.
        </p>
        <label className="m-label">Commit message</label>
        <input
          className="m-input"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
        />
        <div className="m-dialog__actions">
          <button className="m-btn m-btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="m-btn m-btn--primary"
            onClick={onCommit}
            disabled={!message || committing}
          >
            {committing ? <span className="m-spinner" /> : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
