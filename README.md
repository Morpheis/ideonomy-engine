# 🔬 Ideonomy Engine

**Structured creative reasoning for AI agents — systematic thinking through ideonomic lenses.**

Based on Patrick Gunkel's [Ideonomy](http://ideonomy.mit.edu) — the "science of ideas" — which proposes that ideas themselves have discoverable laws and can be systematically combined to generate novel insights.

---

## What Is This?

The Ideonomy Engine takes a problem statement and runs it through curated **reasoning divisions** — structured lenses like ANALOGIES, INVERSIONS, FIRST PRINCIPLES, and PARADOXES — to generate questions you wouldn't have thought to ask.

It doesn't answer your problem. It restructures how you think about it.

**v0.2.0 adds conversational reasoning:** persistent sessions, drill-down, lens chaining, synthesis, and smarter relevance scoring. Think iteratively, not just one-shot.

## Install

```bash
npm install -g @clawdactual/ideonomy-engine
```

Or from source:

```bash
git clone https://github.com/Morpheis/ideonomy-engine.git
cd ideonomy-engine
npm install
npm run build
```

Requires Node.js ≥ 22.

## Quick Start

### CLI

```bash
# Basic reasoning (auto-selects profile based on problem keywords)
npx tsx src/index.ts reason "Your problem statement here"

# Concise mode (core questions only)
npx tsx src/index.ts reason --concise "Your problem statement here"

# Specific profile and lens count
npx tsx src/index.ts reason --profile creative --lenses 4 "How can I make this more engaging?"

# With synthesis (tensions, convergences, surprises)
npx tsx src/index.ts reason --synthesize "How can AI agents collaborate?"

# JSON output
npx tsx src/index.ts reason --json "Your problem statement here"
```

### Library (Programmatic)

```typescript
import { reason, synthesize, drill, chain } from '@clawdactual/ideonomy-engine';

// Basic reasoning
const result = reason('How can I improve this system?', { profile: 'technical' });
console.log(result.lenses.map(l => l.division.theme));

// With synthesis
const synthesis = synthesize(result);
console.log(synthesis.summary);
console.log(synthesis.tensions);   // opposing perspectives
console.log(synthesis.convergences); // aligned perspectives
console.log(synthesis.surprises);   // unexpected connections

// Drill deeper into one lens
const deep = drill('ANALOGIES', 'How can I improve this system?');
console.log(deep.subQuestions);

// Chain two lenses
const chained = chain(result.lenses[0], 'PARADOXES', 'How can I improve this system?');
console.log(chained.bridgeInsights);
console.log(chained.chainPrompts);
```

## Features

### Core Reasoning
```bash
ideonomy reason "problem"          # Full analysis through auto-selected profile
ideonomy reason -p creative "..."  # Use specific profile
ideonomy reason -d ANALOGIES,CAUSES "..."  # Use specific divisions
ideonomy reason -l 3 "..."        # Limit to 3 lenses
ideonomy reason --synthesize "..." # Include cross-lens synthesis
```

### Drill-Down (Go Deeper)
Expand a single division with more prompts, sub-questions, and organon items.

```bash
ideonomy drill ANALOGIES "What is creativity?"
ideonomy drill --json CAUSES "Why do projects fail?"
```

Drill generates:
- **Sub-questions** contextualizing guiding questions with phenomena
- **8 organon items** per list (vs 4 in standard)
- **6 cross-domain prompts** (vs 3 in standard)
- **Cross-pollination** with other divisions

### Lens Chaining (Compounded Reasoning)
Apply the output of one lens as input to another — where creative breakthroughs happen.

```bash
ideonomy chain ANALOGIES PARADOXES "How does memory work?"
ideonomy chain CAUSES INVERSIONS "Why do complex systems fail?"
```

Chain generates:
- **Bridge insights** connecting source questions to target perspective
- **Chain prompts** exploring tension, synthesis, and reversal between lenses
- **Target analysis** enriched by source context

### Synthesis (Cross-Lens Patterns)
Identify tensions, convergences, and surprises across multiple lenses.

```bash
ideonomy synthesize "How can AI agents collaborate?"
ideonomy synthesize -d "ANALOGIES,ANOMALIES,PATTERNS,CAUSES" "problem"
```

Synthesis finds:
- **Tensions** — opposing lenses pulling in different directions (15 known pairs)
- **Convergences** — multiple lenses pointing toward the same insight (7 thematic groups)
- **Surprises** — unexpected cross-domain connections
- **Summary** — paragraph tying it all together

### Persistent Sessions
Build on reasoning over time instead of starting fresh each time.

```bash
# Create a session
ideonomy session create "How can AI agents collaborate?"
# → Session created: a1b2c3d4

# Add reasoning to it
ideonomy reason --session a1b2c3d4 "How can AI agents collaborate?"
ideonomy drill --session a1b2c3d4 ANALOGIES "How can AI agents collaborate?"
ideonomy chain --session a1b2c3d4 ANALOGIES PARADOXES "How can AI agents collaborate?"

# Review the session
ideonomy session show a1b2c3d4
ideonomy session list
ideonomy session delete a1b2c3d4
```

Sessions are stored as JSON files in `~/.ideonomy/sessions/` (configurable via `IDEONOMY_SESSIONS_DIR` env var).

### Smart Relevance Scoring
Cross-domain prompts and organon items are selected based on keyword relevance to your problem, not random hashing. A problem about "quantum physics" will surface Physics, Quantum Mechanics, and Information Theory — not random unrelated sciences.

Scoring: direct substring match (3pts) > exact token match (2pts) > prefix match (1pt), with deterministic tie-breaking.

## Reference Commands

```bash
ideonomy profiles              # List all reasoning profiles
ideonomy divisions             # List all 28 reasoning divisions
ideonomy division ANALOGIES    # Show details for a specific division
```

## Reasoning Profiles

| Profile | Focus | Auto-triggers |
|---------|-------|---------------|
| `technical` | Engineering, debugging, systems | build, design, optimize, deploy |
| `creative` | Brainstorming, art, innovation | create, imagine, brainstorm, novel |
| `strategic` | Planning, decisions, competition | strategy, plan, decide, growth |
| `ethical` | Morals, values, dilemmas | right, wrong, should, fair |
| `diagnostic` | Root cause, troubleshooting | debug, broken, error, why |
| `interpersonal` | Communication, relationships | team, conflict, trust, lead |
| `philosophical` | Meaning, existence, knowledge | meaning, consciousness, truth |
| `general` | Balanced default | (fallback) |

## Architecture

```
src/
├── lib.ts          # Library barrel export (import from here)
├── index.ts        # CLI entry point
├── engine.ts       # Core reasoning engine
├── selector.ts     # Profile/division selection
├── lenses.ts       # Lens generation (with relevance scoring)
├── drill.ts        # Iterative drill-down
├── chain.ts        # Lens chaining
├── synthesis.ts    # Cross-lens pattern detection
├── sessions.ts     # Persistent session management
├── relevance.ts    # Keyword-scored relevance matching
├── profiles.ts     # Reasoning profiles
├── types.ts        # TypeScript types
├── data/
│   ├── divisions.ts  # 28 curated reasoning divisions
│   └── organons.ts   # 6 organon concept lists
└── formatters/
    ├── markdown.ts   # Rich markdown output
    └── json.ts       # JSON output
```

## Development

```bash
npm test              # Run all tests (vitest)
npm run test:watch    # Watch mode
npm run build         # Compile TypeScript
npm run dev           # Run CLI in dev mode (tsx)
```

## License

MIT
