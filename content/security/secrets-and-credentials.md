# Secrets and credentials

Borg handles secrets you own: API keys, cloud tokens, chat bot credentials. One pipeline stores, injects, and redacts them.

## Storage

Credentials live under the `[credentials]` section of the config, backed by SQLite.

- macOS: the keychain fronts the store. The DB holds a reference. The secret lives in Keychain Access.
- Linux: the DB holds the value directly. File permissions protect the value.

Manage credentials from `/settings` under the credentials section: add, view, or remove entries by key name (e.g. `anthropic.api_key`). Values never render back after save, only a masked placeholder.

## Injection into skills

Skills declare required credentials in `SKILL.md` frontmatter:

```yaml
requires:
  env:
    - GITHUB_TOKEN
```

At skill load time, Borg resolves declared names against `[credentials]` and injects them as environment variables into `run_shell` when the skill is active. Missing credential: skill marks unavailable, body stays out of the prompt.

Credentials never reach the model context.

## Secret redaction

Every outbound pipe passes through a redactor before leaving the process: channel delivery, log writes, tool results.

Patterns redacted:

- Provider API keys: `sk-`, `sk-ant-`, `gsk_`, `xai-`, `xoxb-`, `ghp_`, and similar prefixes.
- SSH private key blocks (`-----BEGIN ... PRIVATE KEY-----`).
- AWS access keys (`AKIA...`).
- Bearer tokens in HTTP headers.

Redaction fires at the last hop. A prompt injection tricking the agent into exfiltrating a secret still gets stripped at delivery. See [prompt-injection-defense](prompt-injection-defense) for the full chain.

## Blocked paths

Sensitive directories and files never reach tools. Defaults:

```
.ssh
.aws
.gnupg
.config/gh
.env
credentials
private_key
```

The sandbox profile generator strips these from `fs_read` and `fs_write` allowlists before emitting the policy. `list_dir` rechecks every entry. Full details in [sandboxing](sandboxing).

## Database file permissions

Borg creates `~/.borg/borg.db` at mode `0600`. Owner read/write only.

Check your install:

```sh
stat -f '%Sp' ~/.borg/borg.db   # macOS
stat -c '%a' ~/.borg/borg.db    # Linux
```

A mode other than `600` flags as a persistent warning under [security-check](security-check).

Treat the SQLite file as sensitive on any shared machine. Memory entries, session transcripts, and credential references all live inside.
