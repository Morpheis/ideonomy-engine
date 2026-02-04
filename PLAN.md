# Ideonomy Engine — Plan

## What It Does
Takes a problem/question → selects relevant ideonomic divisions as "lenses" → generates structured analysis that pushes past default thinking patterns.

## Two Modes
1. **Structured (default):** Pure data. Returns lens prompts with guiding questions, relevant organon items, and suggested angles. No LLM call — the calling agent does the thinking. Fast, free, works anywhere.
2. **Deep (`--deep`):** LLM-powered. Engine calls an LLM to reason through each lens. Richer output but requires API key + costs tokens.

## Architecture

```
src/
├── index.ts           # CLI entry (Commander)
├── engine.ts          # Core: orchestrates selection → lens generation → output
├── selector.ts        # Picks relevant divisions for a problem
├── lenses.ts          # Generates lens analysis for each division
├── profiles.ts        # Curated division sets for problem types
├── data/
│   ├── divisions.ts   # 235 divisions (from ideonomy-explorer)
│   ├── organons.ts    # Organon lists (from ideonomy-explorer)
│   └── capabilities.ts # 132 capabilities (from ideonomy-explorer)
├── formatters/
│   ├── markdown.ts    # Markdown output
│   └── json.ts        # JSON output
└── types.ts           # TypeScript types
tests/
├── selector.test.ts
├── lenses.test.ts
├── engine.test.ts
├── profiles.test.ts
└── formatters.test.ts
```

## Core Concepts

### Division Selection
Not all 235 divisions are useful for every problem. Selector picks 5-8 most relevant ones.

**Approach: Reasoning Profiles + keyword affinity scoring**
- Pre-curated profiles: `technical`, `creative`, `ethical`, `strategic`, `interpersonal`, `debug`
- Each profile maps to 8-12 high-value divisions
- Keyword affinity: each division has associated keywords; match against problem text
- Hybrid: start with best-matching profile, boost/swap based on keyword hits
- User can override: `--profile creative` or `--divisions "ANALOGIES,CAUSES,LIMITS"`

### Core Reasoning Divisions (top ~30 most useful for agents)
Curated from 235, grouped by reasoning function:

**Understanding (what is it?):**
- ANALOGIES (Icelology) — what is this like?
- ANALYSES (Merismology) — break it into parts
- CONCEPTS (Ennoology) — define precisely
- APPEARANCES (Phenology) — what does it look like?
- ESSENCES (Ousiodology) — what is fundamental?

**Causation (why?):**
- CAUSES (Etiology) — why does this happen?
- CONSEQUENCES (chains-of-consequences, Anyormology) — what follows?
- ORIGINS (Archology) — where did this start?
- FAILURES/BADS (Cacology) — what can go wrong?

**Change (how does it move?):**
- CHANGES (Tropology) — how does this evolve?
- CYCLES (Cyclology) — what repeats?
- GROWTHS (Auxology) — how does this scale?
- LIMITS (Peratology) — what are the boundaries?
- TRANSITIONS (Metaptosology) — tipping points?

**Structure (how is it organized?):**
- HIERARCHIES (Climology) — what are the levels?
- COMBINATIONS (Mixology) — what can be combined?
- PATTERNS (Paradeigmology) — what recurs?
- CHAINS (Ormology) — what sequences exist?
- CLUSTERS (Botryology) — what groups together?

**Alternatives (what else?):**
- ALTERNATIVES (Allagology) — what other approaches?
- OPPOSITES (Enantiology) — what's the reverse?
- INVERSIONS (Strophology) — flip it around
- IDEALS (Aristology) — what would perfection look like?

**Context (where does it sit?):**
- CIRCUMSTANCES (Symphorology) — what conditions matter?
- CONTEXTS (Sympheriology?) — surrounding factors
- COMMONALITIES (Metochology) — shared with what?
- DIFFERENCES (Diaphorology) — distinct from what?

### Lens Generation
For each selected division, generate:
1. **Core question** — the essential question this lens asks
2. **Guiding sub-questions** — 3-5 specific angles
3. **Relevant organon items** — pull from organon lists that relate
4. **Cross-domain prompts** — suggest unexpected domains to draw from

### Output Formats
- **Markdown** (default) — readable, pasteable
- **JSON** (`--json`) — structured, machine-parseable
- **Concise** (`--concise`) — just the core questions, no elaboration

## CLI Interface

```bash
# Basic usage
ideonomy reason "How should I handle persistent memory across sessions?"

# With profile
ideonomy reason --profile technical "How to design a caching layer?"

# Specific divisions
ideonomy reason --divisions "ANALOGIES,CAUSES,LIMITS" "Why do teams burn out?"

# Deep mode (LLM-powered)
ideonomy reason --deep "What's the relationship between trust and transparency?"

# JSON output
ideonomy reason --json "How to make AI agents more creative?"

# Concise
ideonomy reason --concise "Should we build or buy?"

# List available profiles
ideonomy profiles

# List all divisions
ideonomy divisions

# Explore a specific division
ideonomy division ANALOGIES
```

## Build Order (TDD)

1. **Types** — define core interfaces
2. **Data** — import/adapt from ideonomy-explorer
3. **Profiles** — define reasoning profiles with division sets + tests
4. **Selector** — keyword affinity + profile matching + tests
5. **Lenses** — generate structured analysis per division + tests
6. **Engine** — orchestrate selector → lenses → output + tests
7. **Formatters** — markdown + JSON output + tests
8. **CLI** — Commander wrapper + integration tests
9. **Deep mode** — optional LLM integration

## Tech
- TypeScript, Vitest, Commander
- No runtime deps beyond commander (deep mode: optional openai/anthropic SDK)
- ES modules, Node 18+
