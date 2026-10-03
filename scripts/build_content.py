#!/usr/bin/env python3
"""Zero-dependency build step: Markdown + frontmatter -> per-collection JSON index.

Run via `python scripts/build_content.py` (also run automatically in CI before deploy).
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content"
OUTPUT_DIR = CONTENT_DIR / "generated"
COLLECTIONS = ["notes", "blogs", "concepts", "projects", "research-papers"]

FRONTMATTER_RE = re.compile(r"^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$")


def parse_frontmatter(raw):
    match = FRONTMATTER_RE.match(raw)
    if not match:
        return {}, raw.strip()

    frontmatter, body = match.group(1), match.group(2)
    data = {}

    for line in re.split(r"\r?\n", frontmatter):
        if not line.strip():
            continue
        idx = line.find(":")
        if idx == -1:
            continue
        key = line[:idx].strip()
        value = line[idx + 1:].strip()

        if value.startswith("[") and value.endswith("]"):
            value = [
                v.strip().strip("\"'")
                for v in value[1:-1].split(",")
                if v.strip()
            ]
        else:
            value = value.strip("\"'")
        data[key] = value

    return data, body.strip()


def escape_html(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline(text):
    out = escape_html(text)
    out = re.sub(r"`([^`]+)`", r"<code>\1</code>", out)
    out = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", out)
    out = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", out)
    out = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>', out)
    return out


def markdown_to_html(markdown):
    blocks = re.split(r"\n\s*\n", markdown)
    html_blocks = []

    for block in blocks:
        trimmed = block.strip()
        if not trimmed:
            continue

        heading_match = re.match(r"^#{1,3}\s+", trimmed)
        if heading_match:
            level = len(re.match(r"^#+", trimmed).group(0)) + 2  # offset below page <h1>
            text = re.sub(r"^#+\s+", "", trimmed)
            html_blocks.append(f"<h{level}>{inline(text)}</h{level}>")
            continue

        if re.match(r"^[-*]\s+", trimmed):
            items = [
                re.sub(r"^[-*]\s+", "", line).strip()
                for line in trimmed.split("\n")
            ]
            items = [i for i in items if i]
            html_blocks.append("<ul>" + "".join(f"<li>{inline(i)}</li>" for i in items) + "</ul>")
            continue

        collapsed = re.sub(r"\s*\n\s*", " ", trimmed)
        html_blocks.append(f"<p>{inline(collapsed)}</p>")

    return "\n".join(html_blocks)


def excerpt_of(markdown, length=160):
    plain = re.sub(r"^#{1,3}\s+.*$", "", markdown, flags=re.MULTILINE)
    plain = re.sub(r"[`*_\[\]()#-]", "", plain)
    plain = re.sub(r"\s+", " ", plain).strip()
    return f"{plain[:length].strip()}…" if len(plain) > length else plain


def read_time_of(markdown):
    words = len(markdown.strip().split())
    return f"{max(1, round(words / 200))} min read"


def build_collection(name):
    directory = CONTENT_DIR / name
    try:
        files = sorted(f for f in directory.iterdir() if f.suffix == ".md")
    except FileNotFoundError:
        return []  # collection folder doesn't exist yet — that's fine

    items = []
    for file in files:
        raw = file.read_text(encoding="utf-8")
        data, body = parse_frontmatter(raw)
        slug = file.stem
        tags = data.get("tags")
        tags = tags if isinstance(tags, list) and tags else [t for t in [data.get("category")] if t]
        items.append({
            "slug": slug,
            "title": data.get("title") or slug,
            "date": data.get("date", ""),
            "category": data.get("category") or (data.get("tags")[0] if isinstance(data.get("tags"), list) and data.get("tags") else ""),
            "tags": tags,
            "readTime": read_time_of(body),
            "thumbnail": data.get("thumbnail", ""),
            "file": data.get("file", ""),
            "description": excerpt_of(body),
            "bodyHtml": markdown_to_html(body),
        })

    items.sort(key=lambda item: item["date"], reverse=True)
    return items


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for name in COLLECTIONS:
        items = build_collection(name)
        out_path = OUTPUT_DIR / f"{name}.json"
        out_path.write_text(json.dumps(items, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"Built content/generated/{name}.json ({len(items)} items)")


if __name__ == "__main__":
    main()
