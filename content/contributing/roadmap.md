# Roadmap

Borg's real roadmap lives in [`docs/ROADMAP.md` in the main repo](https://github.com/borganization/borg/blob/main/docs/ROADMAP.md). This page points there to avoid drift.

## Current focus

- Open-source release polish: packaging, install script, docs (this site).
- Plugin marketplace: discover, install, update skills and channels.
- More native channels: Matrix, IRC, Zulip as candidates.
- Finer-grained memory scoping: per-channel scoped entries.

## Wishlist

- First-class multi-agent: persistent sub-agents with their own sessions.
- Time-travel debugging for sessions: replay a turn with tweaked inputs.
- Browser extension channel.

## How to influence the roadmap

- Open an issue describing the use case before writing code.
- Attach a rough design sketch for anything touching agent.rs, memory, or the gateway.
- PRs welcome. Read `CLAUDE.md` at the root first.
