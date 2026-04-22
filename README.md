# borg docs

Static documentation for [borganization/borg](https://github.com/borganization/borg).

Live: https://borganization.github.io/docs/

## Design

Brutalist, filesystem-native, LLM-friendly:

- No frameworks. Vanilla HTML + CSS + JS.
- Two-pane layout: file tree left, content right.
- URLs map 1:1 to files under `content/`.
- Every page is a standalone `.md`, reachable as raw markdown for copy-paste into LLMs.

## Layout

```
index.html           single shell (also duplicated as 404.html for SPA routing)
assets/
  style.css          brutalist CSS
  app.js             router + markdown loader
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

GitHub Pages. Settings → Pages → Source = "GitHub Actions". Push to `main` and the `pages.yml` workflow deploys.

## License

MIT — see `LICENSE`.
