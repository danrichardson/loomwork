// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GITHUB SERVICE — Talks to GitHub REST API via PAT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const API = "https://api.github.com";

export interface RepoFile {
  name: string;
  path: string;
  sha: string;
  type: "file" | "dir";
}

export interface FileContent {
  content: string; // decoded
  sha: string;
  path: string;
  encoding: string;
}

export interface CommitResult {
  sha: string;
  html_url: string;
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

/** Parse "owner/repo" from a full GitHub URL or "owner/repo" string */
export function parseRepo(input: string): { owner: string; repo: string } {
  const cleaned = input.replace(/\.git$/, "").replace(/\/$/, "");
  const match = cleaned.match(/(?:github\.com\/)?([^/]+)\/([^/]+)$/);
  if (!match) throw new Error("Invalid repo format. Use owner/repo or a GitHub URL.");
  return { owner: match[1], repo: match[2] };
}

/** Validate the token can access the repo */
export async function validateToken(
  token: string,
  owner: string,
  repo: string
): Promise<boolean> {
  const res = await fetch(`${API}/repos/${owner}/${repo}`, {
    headers: headers(token),
  });
  return res.ok;
}

/** List files in a directory */
export async function listFiles(
  token: string,
  owner: string,
  repo: string,
  path: string
): Promise<RepoFile[]> {
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${path}`,
    { headers: headers(token) }
  );
  if (!res.ok) throw new Error(`Failed to list ${path}: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data.map((f: any) => ({
    name: f.name,
    path: f.path,
    sha: f.sha,
    type: f.type,
  }));
}

/** Recursively list all files under a path */
export async function listFilesRecursive(
  token: string,
  owner: string,
  repo: string,
  path: string
): Promise<RepoFile[]> {
  const items = await listFiles(token, owner, repo, path);
  const results: RepoFile[] = [];
  for (const item of items) {
    if (item.type === "file") {
      results.push(item);
    } else if (item.type === "dir") {
      const children = await listFilesRecursive(token, owner, repo, item.path);
      results.push(...children);
    }
  }
  return results;
}

/** Get file content (decoded from base64) */
export async function getFile(
  token: string,
  owner: string,
  repo: string,
  path: string
): Promise<FileContent> {
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${path}`,
    { headers: headers(token) }
  );
  if (!res.ok) throw new Error(`Failed to get ${path}: ${res.status}`);
  const data = await res.json();
  const content = atob(data.content.replace(/\n/g, ""));
  return {
    content,
    sha: data.sha,
    path: data.path,
    encoding: data.encoding,
  };
}

/** Create or update a file */
export async function putFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  sha?: string // required for updates, omit for new files
): Promise<CommitResult> {
  const body: any = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: headers(token),
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to save ${path}: ${res.status} ${err.message || ""}`);
  }
  const data = await res.json();
  return {
    sha: data.commit.sha,
    html_url: data.commit.html_url,
  };
}

/** Delete a file */
export async function deleteFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
  sha: string,
  message: string
): Promise<void> {
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "DELETE",
      headers: headers(token),
      body: JSON.stringify({ message, sha }),
    }
  );
  if (!res.ok) throw new Error(`Failed to delete ${path}: ${res.status}`);
}
