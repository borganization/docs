# Memory

Borg runs a two-tier memory system. Short-term working memory for the current session. Long-term persistent memory in SQLite.

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

1. The `INDEX` entry loads first when room allows.
2. Remaining entries rank by hybrid search. 70% vector similarity, 30% BM25, adaptive weighting, with MMR diversity re-ranking.
3. Entries load one by one until the budget runs out.
4. Rendered as `<long_term_memory trust="stored">` in the stable prefix.

### Hybrid search

- Embeddings auto-detect from API keys. Order: OpenAI, OpenRouter, Gemini.
- Falls back to recency-only ranking with no provider available.
- Per-term fallback applies a 0.7x score discount when a multi-word phrase returns no hits.
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
- Hard cap: 20,000 tokens. Rejected above. Warns at 8,000.
- Injection scanner rejects: prompt-override patterns, exfiltration attempts, invisible Unicode (ZWSP, RTL overrides, BOM).

### Configuration

Set these in `/settings`:

| Key | Default |
|---|---|
| `memory.max_context_tokens` | `8000` |
| `memory.embeddings.enabled` | `true` |
| `memory.embeddings.recency_weight` | `0.2` |
| `memory.embeddings.bm25_weight` | `0.3` |
| `memory.embeddings.vector_weight` | `0.7` |

## Short-term memory

Accumulates during a session:

- Fact categories — `Decision`, `Preference`, `TaskOutcome`, `CodeFact`, `Correction`
- Budget-aware — evicts oldest facts when the token limit hits (default 2000)
- Tracks active project from the `projects` tool
- Drops out entirely when empty — zero token cost

Short-term memory never writes directly to long-term storage. On session end, the session flushes to a daily log entry. Nightly consolidation processes the log.

## Consolidation

Scheduled tasks seeded into the database on first run:

| When | What |
|---|---|
| Nightly, 3 AM | Reviews the day's sessions. Appends to existing entries, creates new topics, or skips duplicates. |
| Weekly, 4 AM Sunday | Dedupes, merges, tightens entries. Prunes embedding cache (>30 days unused). |

## Identity

`~/.borg/IDENTITY.md` stays as a filesystem file. Your system prompt starts with the contents. You and the agent both edit the file.

## Tips

- Keep `INDEX` as a concise map of what Borg knows.
- Project-scoped memory isolates per-project context.
- With embeddings on, semantic relevance beats recency.
