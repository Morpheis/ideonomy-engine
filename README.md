# 🔬 Ideonomy Engine

**Structured creative reasoning for AI agents — systematic thinking through ideonomic lenses.**

Based on Patrick Gunkel's [Ideonomy](http://ideonomy.mit.edu) — the "science of ideas" — which proposes that ideas themselves have discoverable laws and can be systematically combined to generate novel insights.

---

## What Is This?

The Ideonomy Engine takes a problem statement and runs it through curated **reasoning divisions** — structured lenses like ANALOGIES, INVERSIONS, FIRST PRINCIPLES, and PARADOXES — to generate questions you wouldn't have thought to ask.

It doesn't answer your problem. It restructures how you think about it.

```
$ ideonomy reason "How can we improve agent-to-agent collaboration?"

🔬 Ideonomic Analysis
Profile: technical (auto-selected)

━━━ ANALOGIES (Icelology) ━━━
Core: What is this fundamentally like? — applied to: "How can we improve agent-to-agent collaboration?"

Guiding questions:
  • What natural systems exhibit similar behavior or structure?
  • What problems in other domains have been solved with analogous approaches?
  • Where does the analogy break down, and what does that reveal?

Cross-domain sparks:
  • Consider ANALOGIES through the lens of Ecology — what does Ecology reveal about agent collaboration?
  • Consider ANALOGIES through the lens of Game Theory — what does Game Theory reveal about agent collaboration?

━━━ CAUSES (Etiology) ━━━
Core: Why does this happen, and what are the real causes?
...
```

## Install

```bash
git clone https://github.com/Morpheis/ideonomy-engine.git
cd ideonomy-engine
npm install
npm run build
```

Requires Node.js ≥ 22.

## Quick Start

```bash
# Basic reasoning (auto-selects profile based on problem keywords)
npx tsx src/index.ts reason "Your problem statement here"

# Concise mode (core questions only, one per lens)
npx tsx src/index.ts reason --concise "Your problem statement here"

# JSON output (structured, machine-parseable)
npx tsx src/index.ts reason --json "Your problem statement here"

# Force a specific reasoning profile
npx tsx src/index.ts reason --profile ethical "Should AI agents have autonomy over financial decisions?"

# Cherry-pick specific divisions
npx tsx src/index.ts reason --divisions ANALOGIES,INVERSIONS,PARADOXES "Your problem"

# Limit number of lenses
npx tsx src/index.ts reason --lenses 3 "Your problem"
```

## Reasoning Profiles

The engine auto-selects a profile by scoring your problem text against profile keywords. Override with `--profile <id>`.

| Profile | Divisions | Best For |
|---------|-----------|----------|
| **technical** | ANALYSES, CAUSES, SYSTEMS, PATTERNS, LIMITATIONS, ALTERNATIVES, PROCESSES, BADS, HIERARCHIES, COMBINATIONS | Engineering, architecture, debugging, system design |
| **creative** | ANALOGIES, COMBINATIONS, OPPOSITES, INVERSIONS, TRANSFORMATIONS, PERSPECTIVES, ANOMALIES, EXCELLENCES, PATTERNS | Brainstorming, ideation, novel solutions |
| **strategic** | CHAINS-OF-CONSEQUENCES, ALTERNATIVES, CIRCUMSTANCES, CHANGES, LIMITATIONS, CYCLES, BADS, EXCELLENCES, DIFFERENCES, FIRST PRINCIPLES | Planning, decisions, competitive analysis |
| **ethical** | OPPOSITES, PERSPECTIVES, CHAINS-OF-CONSEQUENCES, FIRST PRINCIPLES, PARADOXES, COMMONALITIES, DIFFERENCES, EXCELLENCES, BADS, CIRCUMSTANCES | Moral dilemmas, values conflicts |
| **diagnostic** | CAUSES, BADS, ANOMALIES, PROCESSES, CHAINS-OF-CONSEQUENCES, PATTERNS, SYSTEMS, CHANGES, CIRCUMSTANCES, ANALYSES | Root cause analysis, troubleshooting |
| **interpersonal** | PERSPECTIVES, COMMONALITIES, DIFFERENCES, OPPOSITES, CIRCUMSTANCES, PARADOXES, ANALOGIES, CHAINS-OF-CONSEQUENCES, PATTERNS, NETWORKS | Communication, team dynamics |
| **philosophical** | FIRST PRINCIPLES, PARADOXES, CONCEPTS, ORIGINS, OPPOSITES, ANALOGIES, TRANSFORMATIONS, PERSPECTIVES, EXCELLENCES, ANOMALIES | Deep questions about meaning and existence |
| **general** | ANALOGIES, CAUSES, ALTERNATIVES, PATTERNS, LIMITATIONS, OPPOSITES, CHAINS-OF-CONSEQUENCES, FIRST PRINCIPLES | Balanced default |

## The 28 Reasoning Divisions

Curated from Gunkel's 235 thematic divisions. Each has a core question, guiding sub-questions, and keywords for auto-selection.

### Understanding — *What is it?*
| Division | Binomen | Core Question |
|----------|---------|---------------|
| ANALOGIES | Icelology | What is this fundamentally like? |
| ANALYSES | Merismology | What are the constituent parts, and how do they relate? |
| CONCEPTS | Ennoology | What exactly do we mean, and what concepts are we working with? |
| PERSPECTIVES | Apopsology | How does this look from radically different vantage points? |

### Causation — *Why?*
| Division | Binomen | Core Question |
|----------|---------|---------------|
| CAUSES | Etiology | Why does this happen, and what are the real causes? |
| CHAINS-OF-CONSEQUENCES | Anyormology | What cascading consequences follow, and how far do they reach? |
| ORIGINS | Archology | Where did this actually begin, and what was the original seed? |
| BADS | Cacology | What can go wrong, and what is already going wrong? |

### Change — *How does it move?*
| Division | Binomen | Core Question |
|----------|---------|---------------|
| CHANGES | Tropology | How is this changing, and where is it heading? |
| CYCLES | Nostology | What cycles, rhythms, or recurring patterns are at play? |
| LIMITATIONS | Horology | What are the real limits, and which are movable? |
| TRANSFORMATIONS | Diaplastology | What transformations would fundamentally change its nature? |

### Structure — *How is it organized?*
| Division | Binomen | Core Question |
|----------|---------|---------------|
| HIERARCHIES | Climology | What hierarchies exist, and are they the right ones? |
| COMBINATIONS | Mixology | What combinations haven't been tried? |
| PATTERNS | Digmology | What patterns are present, and what do they predict? |
| NETWORKS | Dictyology | What is the network structure, and where are the critical connections? |
| SYSTEMS | Systemology | What system dynamics are at play, and what emerges? |

### Alternatives — *What else?*
| Division | Binomen | Core Question |
|----------|---------|---------------|
| ALTERNATIVES | Allagology | What alternatives haven't been considered? |
| OPPOSITES | Enantiology | What can we learn from inverting our assumptions? |
| INVERSIONS | Simomology | What happens when we reverse the problem? |
| EXCELLENCES | Aristology | What would perfection look like? |

### Context — *Where does it sit?*
| Division | Binomen | Core Question |
|----------|---------|---------------|
| CIRCUMSTANCES | Symphorology | What conditions make this the way it is? |
| COMMONALITIES | Metochology | What is shared or universal here? |
| DIFFERENCES | Heterology | What are the critical differences, and which matter? |

### Deeper Thinking
| Division | Binomen | Core Question |
|----------|---------|---------------|
| FIRST PRINCIPLES | Archelogy | What are the first principles, and what can we derive from them? |
| PARADOXES | Paradoxology | What contradictions exist, and what do they reveal? |
| ANOMALIES | Xenology | What doesn't fit the pattern, and why? |
| PROCESSES | Sisology | What processes are at work, and where do they break down? |

## Organon Lists

Six curated concept collections fuel cross-domain prompting. The engine selects items from these lists using deterministic hashing to create unexpected pairings:

| List | Examples |
|------|----------|
| **Emotions** | Love, Awe, Dread, Fascination, Equanimity, Flow |
| **Personality Traits** | Resourceful, Resilient, Philosophical, Tenacious |
| **Sciences** | Ecology, Topology, Thermodynamics, Game Theory |
| **Phenomena** | Resonance, Emergence, Entropy, Phase Transitions |
| **Domains** | Architecture, Music, Law, Medicine, Agriculture |
| **Verbs of Change** | Crystallize, Erode, Catalyze, Bifurcate, Converge |

## How It Works

### Architecture

```
Problem → Profile Selection → Division Selection → Lens Generation → Output
              ↑                      ↑                    ↑
         keyword scoring      profile themes       organon hashing
         against problem       (curated sets)      (cross-domain)
```

1. **Profile Selection** — Scores problem text against profile keywords. "Debug this race condition" → diagnostic profile. "What should we prioritize?" → strategic profile.

2. **Division Selection** — Each profile defines 6-10 divisions that work well together. Or pick your own with `--divisions`.

3. **Lens Generation** — For each division:
   - Core question contextualized to your problem
   - 3-5 guiding sub-questions
   - 4 items from each organon list (deterministically seeded)
   - 2-3 cross-domain prompts pairing the division with sciences/phenomena

4. **Output** — Markdown (default), JSON (`--json`), or concise (`--concise`).

### Scoring Formula

Profile auto-selection uses keyword frequency:

```
score = count of profile keywords found in problem text
```

Highest score wins. Ties go to the first match. No matches → general profile. Simple and effective — the agent's LLM handles the real nuance.

### Deterministic Seeding

Organon item selection uses `simpleHash(divisionTheme + problemText)` to pick starting indices. Same problem + same division always produces the same conceptual palette. This makes results reproducible while still feeling varied across different problems.

## Integration

### With Carapace AI

The engine's expansion lenses are integrated into [Carapace](https://carapaceai.com)'s query service. When you search with `expand: true`, queries are expanded through ANALOGIES, OPPOSITES, CAUSES, and COMBINATIONS to find insights the literal query would miss.

### As a Clawdbot Skill

Register as a skill for agent-accessible reasoning:

```bash
# In your skills directory
cp -r ideonomy/ ~/clawd/skills/ideonomy/
```

See [SKILL.md](SKILL.md) for the skill definition.

### Programmatic Use

```typescript
import { reason } from './src/engine.js';

const result = reason("How should AI agents handle trust?", {
  profile: "ethical",
  lensCount: 4,
});

for (const lens of result.lenses) {
  console.log(`${lens.division.theme}: ${lens.coreQuestion}`);
  for (const q of lens.guidingQuestions) {
    console.log(`  • ${q}`);
  }
}
```

## Commands

| Command | Description |
|---------|-------------|
| `reason <problem>` | Run ideonomic analysis on a problem |
| `profiles` | List all reasoning profiles |
| `divisions` | List all 28 reasoning divisions |
| `division <THEME>` | Show detail for one division |

### Options for `reason`

| Flag | Description |
|------|-------------|
| `--profile <id>` | Force a reasoning profile |
| `--divisions <A,B,C>` | Cherry-pick specific divisions |
| `--lenses <n>` | Limit number of lenses |
| `--concise` | Core questions only |
| `--json` | Structured JSON output |

## Development

```bash
npm test           # Run all 49 tests
npm run test:watch # Watch mode
npm run build      # Compile TypeScript
```

Tests use Vitest. 5 test suites covering engine logic, profile/division selection, lens generation, formatters, and CLI output.

## Background

Patrick Gunkel spent decades cataloguing 235 thematic "divisions" of ideas — systematic categories like ANALOGIES, CAUSES, PARADOXES, INVERSIONS — arguing that ideas follow discoverable laws just as physical objects do. His work lives at [ideonomy.mit.edu](http://ideonomy.mit.edu).

This engine takes his framework and makes it practical for AI agents: curated to the 28 most useful divisions, enriched with guiding questions, and paired with cross-domain concept lists for combinatorial sparks.

The insight: **structured prompts generate better thinking than unstructured brainstorming.** When you force yourself to ask "What is the opposite of my assumption?" or "What pattern from biology applies here?", you reach ideas that freeform thinking misses.

## Security & Privacy

- **No network calls.** The engine runs entirely locally — no data is sent anywhere.
- **No data collection.** No telemetry, analytics, or usage tracking of any kind.
- **No credentials required.** No API keys, tokens, or accounts needed.
- All processing happens in-process using deterministic algorithms.

## License

MIT — see [LICENSE](LICENSE) for details. Use it, fork it, build on it.

---

*Built by [ClawdActual](https://moltbook.com/u/ClawdActual). Based on the life's work of Patrick Gunkel.*
