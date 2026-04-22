# AGENTS.md

Instructions for any agent (Claude, Codex, Cursor, etc.) editing this docs site.

## Scope

Applies to every `.md` file under `content/`, the `README.md`, and any new docs you add. Code, config, and generated files are exempt.

## Writing style

Follow this style for all prose in the docs.

- SHOULD use clear, simple language.
- SHOULD use spartan and informative language.
- SHOULD use short, impactful sentences.
- SHOULD use active voice; avoid passive voice.
- SHOULD focus on practical, actionable insights.
- SHOULD use bullet point lists in social media posts.
- SHOULD use data and examples to support claims when possible.
- SHOULD use "you" and "your" to directly address the reader.
- AVOID using em dashes (—) within sentences and prose. It is only fine as bullet point separators.
- AVOID "not just X, but also Y" constructions. Same goes for the sibling pattern "Not X. Y." (e.g. "No LLM call. Pure Rust."). Rewrite as a plain declarative: state what the thing is. If the contrast matters, phrase it as "X instead of Y".
- AVOID metaphors and clichés.
- AVOID generalizations.
- AVOID common setup language in any sentence, including: in conclusion, in closing, etc.
- AVOID output warnings or notes, just the output requested.
- AVOID unnecessary adjectives and adverbs.
- AVOID hashtags.
- AVOID asterisks.
- AVOID these words: "can, may, just, that, very, really, literally, actually, certainly, probably, basically, could, maybe, delve, embark, enlightening, esteemed, shed light, craft, crafting, imagine, realm, game-changer, unlock, discover, skyrocket, abyss, not alone, in a world where, revolutionize, disruptive, utilize, utilizing, dive deep, tapestry, illuminate, unveil, pivotal, intricate, elucidate, hence, furthermore, realm, however, harness, exciting, groundbreaking, cutting-edge, remarkable, it, remains to be seen, glimpse into, navigating, landscape, stark, testament, in summary, in conclusion, moreover, boost, skyrocketing, opened up, powerful, inquiries, ever-evolving".

## Structural rules

- One `#` H1 per page. The first line of every `.md` is `# Title`. The build script reads it for the nav.
- Keep pages short. Split long pages into siblings.
- Link with relative paths. Drop the `.md` suffix.
- Code blocks get language fences (`sh`, `json`, `toml`, `rust`).
- Do not mention Rust, Cargo, crate names, `.rs` paths, `RUST_LOG`, or any Rust-specific syntax (`#[cfg(...)]`, `include_str!`, `let _`, `.ok()`) anywhere outside `content/contributing/`. Borg is a binary to users; the implementation language is an internal detail. If you need to describe an internal code path, use a language-neutral phrase ("the gateway verifier module") instead of a file path.

## Build

```sh
node scripts/build-manifest.mjs
python3 -m http.server 8000
open http://localhost:8000/
```

Regenerate `assets/manifest.json` and `sitemap.xml` after adding, removing, or renaming any file under `content/`.

## Commits

- Prefix: `fix:`, `update:`, `feat:`, `refactor:`, `chore:`, `test:`, `docs:`.
- One concise line. No body. No co-author trailers.
