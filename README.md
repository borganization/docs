# borg docs

Static documentation for [borganization/borg](https://github.com/borganization/borg).

- Main repo: https://github.com/borganization/borg
- Live docs: https://borganization.github.io/docs/
- Getting started: https://borganization.github.io/docs/getting-started/

## Install borg

```sh
curl -fsSL https://raw.githubusercontent.com/borganization/borg/main/scripts/install.sh | bash
borg
```

Full install options: [docs/getting-started/install](https://borganization.github.io/docs/getting-started/install).

## Design

Brutalist. Filesystem-native. LLM-friendly.

- No frameworks. Vanilla HTML, CSS, JS.
- Two-pane layout: file tree left, content right.
- URLs map 1:1 to files under `content/`.
- Every page is a standalone `.md`, reachable as raw markdown for copy-paste into LLMs.

## Layout

```
index.html           single shell (duplicated as 404.html for SPA routing)
assets/
  style.css          brutalist CSS
  app.js             router and markdown loader
  marked.min.js      vendored markdown parser
  manifest.json      generated file tree
content/             all markdown, structured as the site
scripts/
  build-manifest.mjs walks content/ and writes manifest.json
.github/workflows/
  pages.yml          GitHub Pages deploy
```

## Local development

```sh
node scripts/build-manifest.mjs
python3 -m http.server 8000
open http://localhost:8000/
```

## Deployment

GitHub Pages. Settings, Pages, Source, "GitHub Actions". Push to `main` and the `pages.yml` workflow deploys.

## License

MIT. See `LICENSE`.

---

This repo hosts the docs site only. Source code, issues, and releases live at [github.com/borganization/borg](https://github.com/borganization/borg).
