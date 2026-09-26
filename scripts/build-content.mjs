// Zero-dependency build step: Markdown + frontmatter -> per-collection JSON index.
// Run via `npm run build` (also run automatically in CI before deploy).
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, "$1");
const CONTENT_DIR = join(ROOT, "content");
const OUTPUT_DIR = join(CONTENT_DIR, "generated");
const COLLECTIONS = ["notes", "blogs", "concepts", "projects", "research-papers"];

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, body: raw.trim() };

    const [, frontmatter, body] = match;
    const data = {};

    for (const line of frontmatter.split(/\r?\n/)) {
        if (!line.trim()) continue;
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let value = line.slice(idx + 1).trim();

        if (value.startsWith("[") && value.endsWith("]")) {
            value = value
                .slice(1, -1)
                .split(",")
                .map((v) => v.trim().replace(/^["']|["']$/g, ""))
                .filter(Boolean);
        } else {
            value = value.replace(/^["']|["']$/g, "");
        }
        data[key] = value;
    }

    return { data, body: body.trim() };
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(text) {
    let out = escapeHtml(text);
    out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return out;
}

// Minimal markdown -> HTML: paragraphs, headings (#-###), unordered lists. No external deps.
function markdownToHtml(markdown) {
    const blocks = markdown.split(/\n\s*\n/);
    return blocks
        .map((block) => {
            const trimmed = block.trim();
            if (!trimmed) return "";

            if (/^#{1,3}\s+/.test(trimmed)) {
                const level = trimmed.match(/^#+/)[0].length + 2; // offset below page <h1>
                return `<h${level}>${inline(trimmed.replace(/^#+\s+/, ""))}</h${level}>`;
            }

            if (/^[-*]\s+/.test(trimmed)) {
                const items = trimmed
                    .split(/\n/)
                    .map((line) => line.replace(/^[-*]\s+/, "").trim())
                    .filter(Boolean);
                return `<ul>${items.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`;
            }

            return `<p>${inline(trimmed.replace(/\s*\n\s*/g, " "))}</p>`;
        })
        .join("\n");
}

function excerptOf(markdown, length = 160) {
    const plain = markdown
        .replace(/^#{1,3}\s+.*$/gm, "")
        .replace(/[`*_[\]()#-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    return plain.length > length ? `${plain.slice(0, length).trim()}…` : plain;
}

function readTimeOf(markdown) {
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
}

async function buildCollection(name) {
    const dir = join(CONTENT_DIR, name);
    let files = [];
    try {
        files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
    } catch {
        return []; // collection folder doesn't exist yet — that's fine
    }

    const items = await Promise.all(
        files.map(async (file) => {
            const raw = await readFile(join(dir, file), "utf-8");
            const { data, body } = parseFrontmatter(raw);
            return {
                slug: basename(file, ".md"),
                title: data.title || basename(file, ".md"),
                date: data.date || "",
                category: data.category || data.tags?.[0] || "",
                tags: data.tags && data.tags.length ? data.tags : [data.category].filter(Boolean),
                readTime: readTimeOf(body),
                thumbnail: data.thumbnail || "",
                file: data.file || "",
                description: excerptOf(body),
                bodyHtml: markdownToHtml(body),
            };
        })
    );

    items.sort((a, b) => (a.date < b.date ? 1 : -1));
    return items;
}

async function main() {
    await mkdir(OUTPUT_DIR, { recursive: true });

    for (const name of COLLECTIONS) {
        const items = await buildCollection(name);
        await writeFile(join(OUTPUT_DIR, `${name}.json`), JSON.stringify(items, null, 2));
        console.log(`Built content/generated/${name}.json (${items.length} items)`);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
