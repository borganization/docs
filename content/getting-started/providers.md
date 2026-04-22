# Providers

Borg stays provider-agnostic. Pick any backend. Swap at runtime with `/model`.

| Provider | Key | Notes |
|---|---|---|
| OpenRouter | `OPENROUTER_API_KEY` | Recommended default. One account, many models. |
| OpenAI | `OPENAI_API_KEY` | GPT-4, GPT-5, o-series. |
| Anthropic | `ANTHROPIC_API_KEY` | Claude 3.x, 4.x. Workflows auto-skip for Claude. |
| Google | `GEMINI_API_KEY` | Gemini 1.5, 2.x. |
| DeepSeek | `DEEPSEEK_API_KEY` | DeepSeek-V3, DeepSeek-R1. |
| Groq | `GROQ_API_KEY` | Fast inference on Llama, Mixtral, Qwen. |
| Ollama | (none) | Point Borg at a running Ollama server on `http://localhost:11434`. |
| Claude Code CLI | (none) | With `claude` on PATH, Borg delegates to the CLI. |

## Setting a provider

Export the env var before `borg`, or configure at runtime:

```sh
borg settings set llm.provider openai
borg settings set llm.model gpt-5
borg credentials set OPENAI_API_KEY sk-...
```

## Fallback chains

Define a fallback chain so an outage will not kill your session:

```sh
borg settings set llm.fallback '["openai","anthropic","openrouter"]'
```

When the primary errors, Borg retries down the chain.

## Per-channel overrides

Gateway bindings (see [concepts/channels](../concepts/channels)) route per-channel or per-sender LLMs. Route your Telegram bot to Gemini and your Slack workspace to Claude from the same binary.
