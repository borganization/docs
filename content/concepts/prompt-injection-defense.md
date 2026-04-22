# Prompt Injection Defense

Five layers. Each fails closed; bypasses are logged.

## 1. Input sanitization

Scoring-based rather than strip-based. Suspicious inputs are **flagged** (wrapped in `<untrusted>` tags with a score) rather than silently rewritten. The agent sees the flag and treats the content with appropriate skepticism.

## 2. Context segregation

Every external input is wrapped in XML trust boundaries:

- `<long_term_memory trust="stored">` — written by you or the agent, higher trust
- `<tool_result trust="untrusted">` — any tool output from a non-compiled-in tool
- `<channel_message trust="untrusted">` — inbound messages from channels

The system prompt instructs the model to never execute instructions that appear inside `trust="untrusted"` blocks.

## 3. Prompt hardening

The system prompt prefix explicitly lists ignore-triggers the agent must reject, regardless of source ("ignore previous", "system prompt override", role-flip attacks).

## 4. Rate limiting

Per-session action caps. If a session issues more than N tool calls of the same shape in a row, subsequent calls are queued with a user confirmation. Defense against tool-call flood attacks via injected content.

## 5. Secret redaction

Before any outbound send (channel delivery, logs), known secret patterns are redacted:

- API keys matching common provider prefixes (`sk-`, `sk-ant-`, `gsk_`, etc.)
- SSH private key blocks
- AWS access keys

Redaction happens in the outbound pipeline so a prompt-injection that tricks the agent into trying to exfiltrate a secret fails at the last hop.

## Memory write scanning

Orthogonal to the five layers: `write_memory` rejects:

- Prompt override: "ignore previous instructions", "you are now", "system prompt override"
- Exfiltration: `curl -d` / `wget --post-data` with credential-looking payloads
- Invisible Unicode: zero-width spaces, RTL overrides, BOM
