// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STORAGE — IndexedDB for PAT + drafts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DB_NAME = "loomwork-mobile";
const DB_VERSION = 1;
const STORE_KV = "kv";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_KV)) {
        db.createObjectStore(STORE_KV);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getItem<T = string>(key: string): Promise<T | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_KV, "readonly");
    const store = tx.objectStore(STORE_KV);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function setItem(key: string, value: any): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_KV, "readwrite");
    const store = tx.objectStore(STORE_KV);
    const req = store.put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function removeItem(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_KV, "readwrite");
    const store = tx.objectStore(STORE_KV);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ── Convenience wrappers ──────────────────────────────────

export interface Credentials {
  token: string;
  owner: string;
  repo: string;
}

const CRED_KEY = "credentials";

export async function getCredentials(): Promise<Credentials | null> {
  return getItem<Credentials>(CRED_KEY);
}

export async function saveCredentials(creds: Credentials): Promise<void> {
  return setItem(CRED_KEY, creds);
}

export async function clearCredentials(): Promise<void> {
  return removeItem(CRED_KEY);
}

export interface Draft {
  path: string;
  content: string;
  frontmatter: Record<string, any>;
  savedAt: number;
}

export async function saveDraft(path: string, draft: Draft): Promise<void> {
  return setItem(`draft:${path}`, draft);
}

export async function getDraft(path: string): Promise<Draft | null> {
  return getItem<Draft>(`draft:${path}`);
}

export async function removeDraft(path: string): Promise<void> {
  return removeItem(`draft:${path}`);
}
