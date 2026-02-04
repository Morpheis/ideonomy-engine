/**
 * Core types for the Ideonomy Engine.
 */

/** One of Gunkel's 235 thematic divisions of ideas */
export interface Division {
  id: number;
  theme: string;       // e.g. "ANALOGIES"
  binomen: string;     // e.g. "Icelology"
  groupId: number;     // top-level group (1-8)
  keywords: string[];  // affinity keywords for matching
  coreQuestion: string; // the essential question this division asks
  guidingQuestions: string[]; // 3-5 sub-questions
}

/** A list of conceptual items used for combinatorial reasoning */
export interface OrganonList {
  id: string;
  name: string;
  description: string;
  items: string[];
}

/** A curated set of divisions optimized for a reasoning style */
export interface ReasoningProfile {
  id: string;
  name: string;
  description: string;
  divisionThemes: string[];  // themes to include
  keywords: string[];        // trigger keywords for auto-selection
}

/** A single lens analysis applied to a problem */
export interface LensResult {
  division: Division;
  coreQuestion: string;
  guidingQuestions: string[];
  relevantOrganonItems: { list: string; items: string[] }[];
  crossDomainPrompts: string[];
}

/** The full output of an ideonomic reasoning session */
export interface ReasoningResult {
  problem: string;
  profile: ReasoningProfile;
  lenses: LensResult[];
  meta: {
    divisionCount: number;
    profileUsed: string;
    timestamp: string;
  };
}

/** Options for the reasoning engine */
export interface ReasoningOptions {
  /** Force a specific profile */
  profile?: string;
  /** Force specific divisions by theme name */
  divisions?: string[];
  /** Number of lenses to generate (default: 6) */
  lensCount?: number;
  /** Output format */
  format?: 'markdown' | 'json' | 'concise';
}
