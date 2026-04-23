#!/usr/bin/env node
// Walks content/ and emits assets/manifest.json, a tree of pages with titles.
// Title = first "# Heading" line in each .md, else the filename.

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT = join(ROOT, "content");
const OUT = join(ROOT, "assets", "manifest.json");
const SITEMAP = join(ROOT, "sitemap.xml");
const SITE_URL = "https://docs.borganization.ai";

// Preferred display order for top-level sections. Anything not listed falls
// through to alphabetical after these.
const TOP_ORDER = [
  "getting-started",
  "concepts",
  "channels",
  "borganism",
  "use-cases",
  "security",
  "guides",
  "reference",
  "contributing",
];

async function readTitle(file) {
  try {
    const text = await readFile(file, "utf8");
    const m = text.match(/^\s*#\s+(.+?)\s*$/m);
    if (m) return m[1].trim();
  } catch {}
  return null;
}

async function walk(dir) {
  const entries = (await readdir(dir, { withFileTypes: true }))
    .filter((e) => !e.name.startsWith("."))
    .sort((a, b) => {
      // Directories first, then files; alphabetical within each.
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  const nodes = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      const children = await walk(full);
      const indexMd = join(full, "index.md");
      let title = null;
      try { await stat(indexMd); title = await readTitle(indexMd); } catch {}
      const rel = relative(CONTENT, full).replace(/\\/g, "/");
      nodes.push({
        path: rel,
        title: title || e.name,
        children: children.filter((c) => !(c.path === rel + "/index" || c.path.endsWith("/index"))),
      });
    } else if (e.name.endsWith(".md")) {
      if (e.name === "index.md") continue; // handled by parent dir
      const rel = relative(CONTENT, full).replace(/\\/g, "/").replace(/\.md$/, "");
      const title = (await readTitle(full)) || e.name.replace(/\.md$/, "");
      nodes.push({ path: rel, title, children: [] });
    }
  }
  return nodes;
}

const tree = await walk(CONTENT);
tree.sort((a, b) => {
  const ai = TOP_ORDER.indexOf(a.path);
  const bi = TOP_ORDER.indexOf(b.path);
  if (ai !== -1 && bi !== -1) return ai - bi;
  if (ai !== -1) return -1;
  if (bi !== -1) return 1;
  return a.path.localeCompare(b.path);
});
await writeFile(OUT, JSON.stringify(tree, null, 2) + "\n", "utf8");
console.log(`wrote ${relative(ROOT, OUT)} (${tree.length} top-level entries)`);

// Sitemap
const urls = [""];
function collect(nodes) {
  for (const n of nodes) {
    if (n.children && n.children.length) {
      urls.push(n.path + "/");
      collect(n.children);
    } else {
      urls.push(n.path);
    }
  }
}
collect(tree);
const today = new Date().toISOString().slice(0, 10);
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      (u) =>
        `  <url><loc>${SITE_URL}/${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`
    )
    .join("\n") +
  "\n</urlset>\n";
await writeFile(SITEMAP, xml, "utf8");
console.log(`wrote ${relative(ROOT, SITEMAP)} (${urls.length} urls)`);
