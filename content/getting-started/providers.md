# Providers

Borg is provider-agnostic. Pick any supported backend and swap at runtime with `/model`.

| Provider | Key | Notes |
|---|---|---|
| OpenRouter | `OPENROUTER_API_KEY` | Recommended default. One account, many models. |
| OpenAI | `OPENAI_API_KEY` | GPT-4 / GPT-5 / o-series. |
| Anthropic | `ANTHROPIC_API_KEY` | Claude 3.x, 4.x. Workflows auto-skip for Claude models. |
| Google | `GEMINI_API_KEY` | Gemini 1.5 / 2.x. |
| DeepSeek | `DEEPSEEK_API_KEY` | DeepSeek-V3, DeepSeek-R1. |
| Groq | `GROQ_API_KEY` | Fast inference on Llama, Mixtral, Qwen. |
| Ollama | *(none)* | Point at a running Ollama server (`http://localhost:11434`). |
| Claude Code CLI | *(none)* | If `claude` is on PATH, Borg can delegate to it. |

## Setting a provider

Either export the env var before `borg`, or configure at runtime:

```sh
borg settings set llm.provider openai
borg settings set llm.model gpt-5
borg credentials set OPENAI_API_KEY sk-...
```

## Fallback chains

You can define a fallback chain so a provider outage doesn't kill your session:

```sh
borg settings set llm.fallback '["openai","anthropic","openrouter"]'
```

If the primary errors, Borg retries down the chain.

## Per-channel overrides

Gateway bindings (see [concepts/channels](../concepts/channels)) let you route a Telegram bot to Gemini and a Slack workspace to Claude — same binary.
