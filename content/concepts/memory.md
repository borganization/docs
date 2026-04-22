# Memory

Borg has a two-tier memory system: short-term working memory for the current session, and long-term persistent memory in SQLite.

## Architecture

| Tier | Storage | Lifetime | Rendered as |
|---|---|---|---|
| Short-term | `ShortTermMemory` struct (RAM) | Current session | `<working_memory>` (dynamic suffix) |
| Long-term | SQLite `memory_entries` | Persistent | `<long_term_memory trust="stored">` (stable prefix) |
| Identity | `~/.borg/IDENTITY.md` | Persistent | System prompt prefix |
| Heartbeat | `~/.borg/HEARTBEAT.md` | Persistent | Heartbeat turns only |

SQLite is the single source of truth for long-term memory. No filesystem memory files.

## Long-term memory

Each turn the agent builds a memory context within a token budget:

1. The `INDEX` entry is always loaded first if it fits.
2. Remaining entries are ranked by **hybrid search** — 70% vector similarity, 30% BM25, adaptive weighting, with MMR diversity re-ranking.
3. Entries include until the budget is exhausted.
4. Rendered as `<long_term_memory trust="stored">` in the stable prefix.

### Hybrid search

- Embeddings auto-detect from API keys: OpenAI → OpenRouter → Gemini.
- Falls back to recency-only ranking when no provider is available.
- Per-term fallback (0.7× discount) when a multi-word phrase has no hits.
- Embedding cache with 30-day TTL on `last_accessed_at`.

### Writing

```json
{
  "filename": "user-preferences",
  "content": "# User Preferences\n\n- Prefers concise answers\n- Timezone: PST",
  "append": false,
  "scope": "global"
}
```

- `scope`: `"global"` or `"project:{id}"`.
- Hard cap: 20,000 tokens (rejected). Warns at 8,000.
- Injection scanner rejects: prompt-override patterns, exfiltration attempts, invisible Unicode (ZWSP, RTL overrides, BOM).

### Configuration

```sh
borg settings set memory.max_context_tokens 8000
borg settings set memory.embeddings.enabled true
borg settings set memory.embeddings.recency_weight 0.2
borg settings set memory.embeddings.bm25_weight 0.3
borg settings set memory.embeddings.vector_weight 0.7
```

## Short-term memory

Accumulates during a session:

- Fact categories: `Decision`, `Preference`, `TaskOutcome`, `CodeFact`, `Correction`.
- Budget-aware; evicts oldest when token limit hit (default 2000).
- Tracks active project from the `projects` tool.
- Omitted entirely when empty (zero token cost).

Never written directly to long-term. On session end, flushes to a daily log entry which nightly consolidation processes.

## Consolidation

Scheduled tasks seeded on first migration to V34:

| When | What |
|---|---|
| **Nightly, 3 AM** | Reviews day's sessions. Appends to existing entries, creates new topics, or skips duplicates. |
| **Weekly, 4 AM Sunday** | Dedupes, merges, tightens entries. Prunes embedding cache (>30d unused). |

## Identity

`~/.borg/IDENTITY.md` is the one memory kept as a filesystem file. It's the first part of the system prompt. Both you and the agent can edit it.

## Tips

- Keep `INDEX` as a concise index of what Borg knows.
- Project-scoped memory isolates per-project context.
- With embeddings on, semantic relevance beats recency.
