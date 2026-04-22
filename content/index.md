# Borg

Personal AI assistant. Runs on your machine. Remembers you. Gets better over time.

Borg ships as one binary with every integration compiled in. The agent writes its own tools at runtime. Your data lives in `~/.borg/`.

- Source: [github.com/borganization/borg](https://github.com/borganization/borg)
- License: MIT

## Quick start

```sh
curl -fsSL https://raw.githubusercontent.com/borganization/borg/main/scripts/install.sh | bash
borg
```

The installer detects your OS, downloads the right binary, and walks you through setup. On first run you pick a provider and paste a key.

Supported providers:

- OpenAI
- Anthropic
- OpenRouter
- Gemini
- DeepSeek
- Groq
- Ollama (local)
- Claude Code CLI

## Where to go next

- [Getting Started](getting-started/) — install, first run, provider setup
- [Concepts](concepts/) — agent loop, memory, plugins, hooks, channels
- [Use cases](use-cases/) — what people do with Borg
- [Reference](reference/) — slash commands, tool catalog, settings, architecture
- [Guides](guides/) — writing skills, adding channels, scheduling, migrating
- [Contributing](contributing/) — development setup, testing, roadmap

## Why Borg

| Feature | Borg | Typical chatbot |
|---|---|---|
| Runs | Your machine | SaaS |
| Memory | SQLite on disk, survives restarts | Context window |
| Channels | Telegram, Slack, Discord, iMessage, and more | Web UI only |
| Provider | Swap at runtime | Locked in |
| Scheduled work | Cron, workflows, heartbeat check-ins | None |
| Extensibility | Writes plugins for you | Plugins you install |
| Data | Yours. One folder. | Theirs |

## Status

Borg is open source and under active development. See the [roadmap](contributing/roadmap).
