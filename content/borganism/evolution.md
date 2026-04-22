# Evolution

Borg evolves from how you use it. Like Pokemon, evolution is a permanent transformation earned through sustained usage, not a toggle. Your agent develops a specialization and name tied to your real workflows.

## Three components

1. **Stages** — three permanent tiers (Base → Evolved → Final)
2. **Levels** — 0 to 99 within each stage
3. **Archetypes** — 10 internal categories classifying your usage pattern

Display format: `Pipeline Warden Lvl.42`.

## Stages

| Stage | Name | Meaning |
|---|---|---|
| 1 | Base Borg | Generic. Learning your patterns. |
| 2 | Evolved Form | Specialization emerges. LLM-generated name tied to archetype. |
| 3 | Final Form | Mastery. Deep specialization confirmed through consistent usage. |

Stages never regress once reached. The archetype underneath the name stays fluid.

## Levels

Each stage runs 0 to 99. Reaching 99 gates evolution to the next stage. XP drives levels:

```
xp_gained = base_xp + (archetype_bonus if action aligns with dominant archetype)
```

| Action | Base XP | Bonus |
|---|---|---|
| Successful tool call | +1 | +1 if aligned |
| Creation event (tool, skill, memory, channel) | +2 | +1 if aligned |
| Session interaction | +1 | — |
| Scheduled task success | +2 | +1 if aligned |
| Tool failure | 0 | — |
| Correction detected | 0 | — |

XP per level scales per stage:

```
xp_for_level(stage, n) = stage_base + floor(n ^ stage_curve)
```

| Stage | Base | Curve | Lvl.99 cost | Target duration |
|---|---|---|---|---|
| 1 (Base) | 20 | 1.4 | 642 XP | months |
| 2 (Evolved) | 40 | 1.55 | 1,279 XP | 6 to 12 months |
| 3 (Final) | 80 | 1.8 | 3,989 XP | 1 to 2+ years |

XP events are rate-limited during replay: 15 total per hour, 5 per source, 3 creation events per hour.

## Archetypes

Ten internal categories. The LLM uses the dominant archetype to generate your agent's name, and aligned actions earn bonus XP.

| Archetype | Domain |
|---|---|
| Ops | DevOps, SRE, infra, CI/CD |
| Builder | Automation, coding, creation |
| Analyst | Research, data, metrics |
| Communicator | Outreach, messaging, email |
| Guardian | Security, compliance, monitoring |
| Strategist | Planning, prioritization |
| Creator | Content, writing, docs |
| Caretaker | Home, wellness, personal |
| Merchant | E-commerce, sales, finance |
| Tinkerer | Hardware, homelab, experimentation |

Scoring blends lifetime and recent behavior:

```
effective_score = lifetime_score * 0.35 + last_30d_score * 0.65
```

Pivoting from DevOps to marketing shifts your dominant archetype over weeks.

### Classification

1. **Deterministic rules** — tool, skill, and integration names map directly (`docker` skill → Ops, `apply_patch` → Builder).
2. **Keyword matching** — shell commands and prompts match against keyword sets.
3. **LLM classification** — ambiguous custom workflows get classified on first use, then cached.

## Gates

### Base → Evolved (target: 2 to 5 days)

| Requirement | Threshold |
|---|---|
| Level | Lvl.99 at Stage 1 |
| Bond score | ≥ 30 |
| Dominant archetype | Top score ≥ 1.3x second-place |
| Vitals health | No stat below 20 |

On pass, an LLM call confirms the archetype, generates a unique name, and writes a description.

### Evolved → Final (target: ~30 days)

| Requirement | Threshold |
|---|---|
| Level | Lvl.99 at Stage 2 |
| Bond score | ≥ 55 |
| Correction rate | < 20% over last 14 days |
| Archetype consistency | Dominant archetype unchanged 14+ days |

A second LLM call generates the Final Form name.

## What evolution changes

### Identity

Evolution context injects into the system prompt each turn:

```
<evolution_context>
Stage: Evolved | Pipeline Warden Lvl.42
Archetype: Ops (score: 74)
Autonomy: DraftAssist
</evolution_context>
```

### Autonomy tiers

| Stage | Tier | Behavior |
|---|---|---|
| 1 | Observe | Suggests only. Asks before acting. |
| 2 | Assist | Drafts before approval. Chains low-risk actions. |
| 3 | Autonomous | Executes routine workflows. Strong proactive recommendations. |

Tiers shape behavior via prompt context. They never bypass HITL safety settings.

### Action limits

| Limit | Stage 1 | Stage 2 | Stage 3 |
|---|---|---|---|
| Tool calls (warn/block) | 50/100 | 75/150 | 100/200 |
| Shell commands (warn/block) | 20/50 | 30/75 | 50/100 |
| File writes (warn/block) | 15/30 | 25/50 | 40/80 |

## Status surfaces

| Command | Shows |
|---|---|
| `/evolution` | Stage, level, archetype scores with momentum arrows, readiness, next-step hints |
| `/xp` | Today's and weekly XP, top sources, archetype breakdown, last 10 events |
| `/card` | Boxed ASCII share card with name, level, stage, description |

Channel commands work across Telegram, Slack, Discord, Teams, Google Chat, Signal, Twilio, and iMessage. Status reads are deterministic and skip the agent loop entirely.

## Event sourcing

Evolution state is event-sourced. The `evolution_events` table is the single source of truth. Stage, level, and archetype scores reconstruct from replay.

Each event carries an HMAC-SHA256 signature chained from the previous event:

```
hmac_content = "{event_type}|{xp_delta}|{archetype}|{source}|{created_at}|{prev_hmac}"
```

Broken chain links get skipped during replay. Casual SQL tampering fails verification.

### Event types

| Type | Description |
|---|---|
| `xp_gain` | Base or bonus XP from an action |
| `evolution` | Stage transition |
| `classification` | LLM archetype classification |
| `archetype_shift` | Dominant archetype changed |
| `level_up` | Level boundary crossed |
| `milestone_unlocked` | Sub-evolution win |
| `mood_changed` | Ambient-header mood flipped |
| `share_card_created` | `/card` rendered |

### Milestones

| ID | Trigger |
|---|---|
| `level_10`, `level_25`, `level_50`, `level_75`, `level_99` | Level boundary within current stage |
| `first_evolution` | Stage 1 → Stage 2 transition |
| `archetype_stabilized` | Dominant archetype held 7+ days |
| `first_strong_bond` | Bond crosses 55 for the first time |
| `aligned_streak_7d` | 7 consecutive days of aligned XP |

Milestones ride the same pending-celebrations outbox as stage transitions, delivered across channels listed in `heartbeat.channels`.

## Viewing

```
/evolution
/xp
/card
```
