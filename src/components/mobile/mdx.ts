// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MDX UTILITIES — Parse frontmatter, split content
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ParsedFile {
  frontmatter: Record<string, any>;
  body: string;
  raw: string;
}

/** Parse YAML frontmatter from MDX/MD content */
export function parseFile(raw: string): ParsedFile {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw, raw };
  }
  const yamlStr = match[1];
  const body = match[2];
  const frontmatter = parseYaml(yamlStr);
  return { frontmatter, body, raw };
}

/** Serialize frontmatter + body back to MDX string */
export function serializeFile(
  frontmatter: Record<string, any>,
  body: string
): string {
  const yaml = serializeYaml(frontmatter);
  return `---\n${yaml}---\n${body}`;
}

/** Simple YAML parser (handles the subset used in Loomwork frontmatter) */
function parseYaml(str: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = str.split("\n");
  let currentKey = "";

  for (const line of lines) {
    // Array continuation
    if (line.match(/^\s+-\s+/)) {
      const value = line.replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, "").trim();
      if (currentKey && Array.isArray(result[currentKey])) {
        result[currentKey].push(value);
      }
      continue;
    }

    const kvMatch = line.match(/^(\w[\w_]*)\s*:\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value: any = kvMatch[2].trim();
      currentKey = key;

      if (value === "" || value === "[]") {
        // Check if next lines are array items
        result[key] = [];
        continue;
      }

      // Array inline: [a, b, c]
      if (value.startsWith("[") && value.endsWith("]")) {
        result[key] = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
        continue;
      }

      // Boolean
      if (value === "true") { result[key] = true; continue; }
      if (value === "false") { result[key] = false; continue; }

      // Number
      if (/^\d+$/.test(value)) { result[key] = parseInt(value, 10); continue; }

      // Quoted string
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        result[key] = value.slice(1, -1);
        continue;
      }

      result[key] = value;
    }
  }

  return result;
}

/** Simple YAML serializer for frontmatter */
function serializeYaml(obj: Record<string, any>): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}:`);
        for (const item of value) {
          lines.push(`  - "${item}"`);
        }
      }
    } else if (typeof value === "string") {
      // Quote strings that contain special chars
      if (value.includes(":") || value.includes("#") || value.includes('"')) {
        lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
      } else {
        lines.push(`${key}: "${value}"`);
      }
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${String(value)}`);
    }
  }
  return lines.join("\n") + "\n";
}

/** Render very basic markdown to HTML (for preview without dependencies) */
export function renderMarkdown(md: string): string {
  let html = md
    // Code blocks (must be before other transforms)
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) =>
      `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`)
    // Headers
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Blockquote
    .replace(/^>\s*(.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    // Unordered list items
    .replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>")
    // Paragraphs (lines that aren't already wrapped in tags)
    .replace(/^(?!<[a-z/])((?!^\s*$).+)$/gm, "<p>$1</p>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Extract title from frontmatter or filename */
export function getTitle(frontmatter: Record<string, any>, filename: string): string {
  return frontmatter.title || filename.replace(/\.mdx?$/, "").replace(/[-_]/g, " ");
}

/** Default frontmatter for new pages */
export function defaultPageFrontmatter(): Record<string, any> {
  return {
    title: "",
    description: "",
    section: "",
    template: "default",
    draft: true,
    tags: [],
  };
}

/** Default frontmatter for new posts */
export function defaultPostFrontmatter(): Record<string, any> {
  return {
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    tags: [],
    draft: true,
  };
}
