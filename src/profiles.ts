import type { ReasoningProfile } from './types.js';

/**
 * Reasoning profiles — curated sets of divisions optimized for different problem types.
 * Each profile selects 6-10 divisions that work well together.
 */
export const profiles: ReasoningProfile[] = [
  {
    id: "technical",
    name: "Technical Problem-Solving",
    description: "For engineering, architecture, debugging, and system design problems.",
    divisionThemes: [
      "ANALYSES", "CAUSES", "SYSTEMS", "PATTERNS", "LIMITATIONS",
      "ALTERNATIVES", "PROCESSES", "BADS", "HIERARCHIES", "COMBINATIONS",
    ],
    keywords: [
      "build", "design", "architect", "debug", "fix", "implement", "code", "system",
      "performance", "scale", "optimize", "refactor", "deploy", "infrastructure",
      "database", "api", "server", "algorithm", "data structure", "cache",
    ],
  },
  {
    id: "creative",
    name: "Creative Exploration",
    description: "For brainstorming, ideation, art, design, and novel solutions.",
    divisionThemes: [
      "ANALOGIES", "COMBINATIONS", "OPPOSITES", "INVERSIONS", "TRANSFORMATIONS",
      "PERSPECTIVES", "ANOMALIES", "EXCELLENCES", "PATTERNS",
    ],
    keywords: [
      "create", "invent", "imagine", "brainstorm", "novel", "original", "art",
      "design", "idea", "inspire", "innovate", "creative", "generate", "new",
      "different", "fresh", "unconventional", "experiment",
    ],
  },
  {
    id: "strategic",
    name: "Strategic Analysis",
    description: "For planning, decision-making, competitive analysis, and long-term thinking.",
    divisionThemes: [
      "CHAINS-OF-CONSEQUENCES", "ALTERNATIVES", "CIRCUMSTANCES", "CHANGES",
      "LIMITATIONS", "CYCLES", "BADS", "EXCELLENCES", "DIFFERENCES", "FIRST PRINCIPLES",
    ],
    keywords: [
      "strategy", "plan", "decide", "choose", "compete", "market", "position",
      "growth", "risk", "opportunity", "advantage", "trade-off", "prioritize",
      "roadmap", "long-term", "invest", "resource", "allocate",
    ],
  },
  {
    id: "ethical",
    name: "Ethical Reasoning",
    description: "For moral dilemmas, values conflicts, and questions of right and wrong.",
    divisionThemes: [
      "OPPOSITES", "PERSPECTIVES", "CHAINS-OF-CONSEQUENCES", "FIRST PRINCIPLES",
      "PARADOXES", "COMMONALITIES", "DIFFERENCES", "EXCELLENCES", "BADS", "CIRCUMSTANCES",
    ],
    keywords: [
      "right", "wrong", "moral", "ethical", "should", "ought", "fair", "just",
      "value", "principle", "dilemma", "conscience", "harm", "benefit", "duty",
      "virtue", "sin", "responsible", "accountable",
    ],
  },
  {
    id: "diagnostic",
    name: "Diagnostic Investigation",
    description: "For debugging, root cause analysis, troubleshooting, and understanding failures.",
    divisionThemes: [
      "CAUSES", "BADS", "ANOMALIES", "PROCESSES", "CHAINS-OF-CONSEQUENCES",
      "PATTERNS", "SYSTEMS", "CHANGES", "CIRCUMSTANCES", "ANALYSES",
    ],
    keywords: [
      "debug", "diagnose", "troubleshoot", "broken", "failing", "error", "bug",
      "root cause", "investigate", "symptom", "why", "wrong", "regression",
      "incident", "outage", "crash", "unexpected",
    ],
  },
  {
    id: "interpersonal",
    name: "Interpersonal & Communication",
    description: "For relationship dynamics, communication challenges, team issues, and social problems.",
    divisionThemes: [
      "PERSPECTIVES", "COMMONALITIES", "DIFFERENCES", "OPPOSITES", "CIRCUMSTANCES",
      "PARADOXES", "ANALOGIES", "CHAINS-OF-CONSEQUENCES", "PATTERNS", "NETWORKS",
    ],
    keywords: [
      "team", "communicate", "relationship", "conflict", "collaborate", "trust",
      "feedback", "culture", "lead", "manage", "motivate", "hire", "negotiate",
      "persuade", "listen", "empathy", "misunderstand",
    ],
  },
  {
    id: "philosophical",
    name: "Philosophical Inquiry",
    description: "For deep questions about meaning, existence, knowledge, and fundamental nature.",
    divisionThemes: [
      "FIRST PRINCIPLES", "PARADOXES", "CONCEPTS", "ORIGINS", "OPPOSITES",
      "ANALOGIES", "TRANSFORMATIONS", "PERSPECTIVES", "EXCELLENCES", "ANOMALIES",
    ],
    keywords: [
      "meaning", "exist", "consciousness", "real", "truth", "knowledge", "believe",
      "purpose", "nature", "essence", "fundamental", "why", "being", "identity",
      "free will", "mind", "soul", "god", "universe", "philosophy",
    ],
  },
  {
    id: "general",
    name: "General Reasoning",
    description: "A balanced default profile covering the most universally useful divisions.",
    divisionThemes: [
      "ANALOGIES", "CAUSES", "ALTERNATIVES", "PATTERNS", "LIMITATIONS",
      "OPPOSITES", "CHAINS-OF-CONSEQUENCES", "FIRST PRINCIPLES",
    ],
    keywords: [], // fallback — matches everything
  },
];

/** Quick lookup by id */
export const profilesById = new Map(profiles.map(p => [p.id, p]));

/** Get profile by id, falling back to 'general' */
export function getProfile(id: string): ReasoningProfile {
  return profilesById.get(id) ?? profilesById.get('general')!;
}
