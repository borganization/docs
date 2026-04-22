# Research Assistant

Web browse, summarize, remember. Ask again a week later and Borg still knows.

## Setup

1. Enable web and browser:
   ```sh
   borg settings set web.enabled true
   borg settings set browser.enabled true
   ```
2. Use a project for the research topic:
   ```
   > /projects create "retrieval-systems"
   ```

## Workflow

```
you:   find the 5 most-cited papers on MMR re-ranking this year
borg:  (web_search x 3, web_fetch x 5)
       Here are 5:
       1. ... (arxiv id, summary)
       2. ...
       Saved to project:retrieval-systems/mmr-2026.

you:   what did the Chen paper say about diversity?
borg:  (memory_search finds mmr-2026)
       Chen et al. argue diversity without relevance-preservation
       degrades NDCG by 6 to 9% on TREC-DL. Their fix is ...
```

## Why the setup works

- Hybrid search on memory surfaces the right saved page even with different query wording.
- Consolidation collapses near-duplicate saves. You end up with `mmr-2026` as one synthesized entry, not 8 fragments.
- Project scope keeps unrelated research out of your context.

## Tip

Bind a strong model for research:

```toml
[[gateway.bindings]]
channel = "tui"
project = "retrieval-systems"
provider = "anthropic"
model = "claude-opus-4-7"
thinking = "extended"
```
