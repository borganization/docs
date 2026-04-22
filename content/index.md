# Borg

**Personal AI assistant that runs locally, remembers you, and gets better over time.**

Borg is an AI agent written in Rust. It ships as a single binary with all integrations compiled in. The agent itself is the plugin system — it writes its own tools at runtime. Data lives in `~/.borg/`.

- Source: [github.com/borganization/borg](https://github.com/borganization/borg)
- License: MIT

## Quick start

```sh
curl -fsSL https://raw.githubusercontent.com/borganization/borg/main/scripts/install.sh | bash
borg
```

The installer detects your OS, downloads the right binary, and walks you through setup. On first run you pick a provider (OpenAI, Anthropic, OpenRouter, Gemini, DeepSeek, Groq, Ollama, or the Claude Code CLI) and paste a key.

## Where to go next

- [Getting Started](getting-started/) — install, first run, picking a provider
- [Concepts](concepts/) — agent loop, memory, skills, tools, hooks, channels
- [Use cases](use-cases/) — what people actually use Borg for
- [Reference](reference/) — slash commands, tool catalog, settings, architecture
- [Guides](guides/) — writing skills, adding channels, scheduling, migrating
- [Contributing](contributing/) — development setup, testing, roadmap

## Why Borg

| | Borg | Typical chatbot |
|---|---|---|
| Where it runs | Local binary, your machine | SaaS |
| Memory | SQLite on disk; survives restarts | Context window |
| Channels | Telegram, Slack, Discord, iMessage, etc. | Web UI only |
| Provider | Pick any; swap at runtime | Locked in |
| Scheduled work | Cron-native; workflows; heartbeat check-ins | None |
| Extensibility | Writes its own skills and tools | Plugins you install |
| Data | Yours. One folder. | Theirs |

## Status

Borg is open source and under active development. See the [roadmap](contributing/roadmap).
