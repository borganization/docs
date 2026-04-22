# Security

Borg runs with your credentials, your shell, and your filesystem. Treat every tool result, channel message, and memory entry as untrusted input.

Defenses stack in layers. No single check carries the weight. Bypasses log, never hide.

- [prompt-injection-defense](prompt-injection-defense) — five layers, each fails closed
- [sandboxing](sandboxing) — macOS Seatbelt and Linux Bubblewrap, blocked-path filter
- [secrets-and-credentials](secrets-and-credentials) — credential store, keychain, redaction, DB permissions
- [layered-defense](layered-defense) — rate limits, sender pairing, gateway auth, ghost commits
- [security-check](security-check) — daily sweep, tamper detection, persistent warnings

## Reporting a vulnerability

Do not open a public issue. Use [GitHub private vulnerability reporting](https://github.com/borganization/borg/security/advisories/new) or email the maintainers directly.

Include:

- Steps to reproduce.
- Potential impact.
- A suggested fix if you have one.

### Response timeline

- Acknowledgment within 48 hours.
- Assessment within 7 days.
- Fix or mitigation plan within 14 days for confirmed vulnerabilities.

### In scope

- Sandbox escapes: tools or channels bypassing filesystem or network restrictions.
- Prompt injection: external input driving the agent to unintended actions.
- Secret leakage: API keys, tokens, or credentials exposed in logs, outputs, or tool results.
- Credential store flaws: keychain integration or credential resolution bugs.
- Gateway authentication bypass: unauthorized access to the webhook gateway or pairing system.
- Path traversal: reaching files outside allowed directories, especially blocked paths like `.ssh` and `.aws`.

### Out of scope

- Issues needing physical access to the machine.
- Social engineering against you.
- Vulnerabilities in upstream LLM providers.

## Supported versions

Only the latest release receives security updates. Run the most recent version.
