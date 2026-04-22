# Settings

Settings live in the SQLite `settings` table. No `config.toml`.

Open `/settings` to browse, search, and change any value. For scripting, `borg help` lists CLI equivalents.

## LLM

| Key | Default | Description |
|---|---|---|
| `llm.provider` | auto-detect | `openai`, `anthropic`, `openrouter`, `gemini`, `deepseek`, `groq`, `ollama`, `claude_code` |
| `llm.model` | provider default | Model ID |
| `llm.temperature` | 0.7 | Sampling temperature |
| `llm.fallback` | `[]` | JSON array of fallback providers |
| `llm.max_output_tokens` | 4096 | |
| `llm.thinking` | `"auto"` | Thinking or reasoning mode |

## Memory

| Key | Default | Description |
|---|---|---|
| `memory.max_context_tokens` | 8000 | Budget for long-term memory in the system prompt |
| `memory.embeddings.enabled` | `true` | |
| `memory.embeddings.vector_weight` | 0.7 | |
| `memory.embeddings.bm25_weight` | 0.3 | |
| `memory.embeddings.recency_weight` | 0.2 | 0 pure similarity, 1 pure recency |
| `memory.short_term.max_tokens` | 2000 | |

## Heartbeat

| Key | Default |
|---|---|
| `heartbeat.enabled` | `false` |
| `heartbeat.interval` | `30m` |
| `heartbeat.cron` | (unset) |
| `heartbeat.quiet_hours` | `00:00-06:00` |

## Gateway

| Key | Default |
|---|---|
| `gateway.enabled` | `true` |
| `gateway.bind` | `127.0.0.1:7700` |
| `gateway.<channel>.enabled` | `false` per channel |
| `gateway.dm_policy` | `pairing` |

Bindings and channel policies store as JSON. Set `gateway.bindings` in `/settings`:

```json
[{"channel":"slack","model":"claude-opus-4-7"}]
```

## Security

| Key | Default |
|---|---|
| `security.blocked_paths` | `[".ssh",".aws",".gnupg",".config/gh",".env","credentials","private_key"]` |
| `security.sandbox.default` | OS-specific |

## Hooks

| Key | Default |
|---|---|
| `hooks.enabled` | `true` |
| `hooks.default_timeout` | `60` |

## Collab mode

| Key | Default |
|---|---|
| `collab.default_mode` | `default` |

## Web, TTS, Image

| Key | Default |
|---|---|
| `web.enabled` | `true` |
| `browser.enabled` | `false` |
| `tts.enabled` | `false` |
| `image_gen.enabled` | `false` |

## Appearance

| Key | Default |
|---|---|
| `ui.theme` | `auto` |
| `ui.markdown_rendering` | `true` |
