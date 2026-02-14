/**
 * Synthesis — identify tensions, convergences, and surprises across lenses.
 *
 * After running multiple lenses on a problem, synthesis looks for:
 * - Tensions: where two lenses pull in opposite directions
 * - Convergences: where multiple lenses point toward similar insights
 * - Surprises: unexpected cross-domain connections
 */

import type { ReasoningResult, LensResult } from './types.js';

/** A tension between two lenses. */
export interface Tension {
  lens1: string;
  lens2: string;
  description: string;
}

/** A convergence across multiple lenses. */
export interface Convergence {
  lenses: string[];
  description: string;
}

/** A surprising cross-domain connection. */
export interface Surprise {
  lens: string;
  description: string;
}

/** The full synthesis result. */
export interface SynthesisResult {
  tensions: Tension[];
  convergences: Convergence[];
  surprises: Surprise[];
  summary: string;
}

/**
 * Known tension pairs — divisions whose perspectives naturally oppose.
 * When both appear in a session, they generate productive conflict.
 */
const TENSION_PAIRS: [string, string, string][] = [
  ['ANALOGIES', 'ANOMALIES', 'What fits the pattern vs. what breaks it'],
  ['EXCELLENCES', 'LIMITATIONS', 'What makes this great vs. what constrains it'],
  ['EXCELLENCES', 'BADS', 'The best aspects vs. the worst aspects'],
  ['COMMONALITIES', 'DIFFERENCES', 'What unifies vs. what distinguishes'],
  ['OPPOSITES', 'ANALOGIES', 'What is this unlike vs. what is this like'],
  ['FIRST PRINCIPLES', 'COMBINATIONS', 'Fundamental truths vs. novel mixtures'],
  ['PATTERNS', 'ANOMALIES', 'The regular vs. the irregular'],
  ['CAUSES', 'CHAINS-OF-CONSEQUENCES', 'Where it comes from vs. where it leads'],
  ['ALTERNATIVES', 'LIMITATIONS', 'What else is possible vs. what constrains the possible'],
  ['INVERSIONS', 'PATTERNS', 'Reversing the pattern vs. following it'],
  ['SYSTEMS', 'ANALYSES', 'The whole vs. the parts'],
  ['ORIGINS', 'TRANSFORMATIONS', 'Where it started vs. how it changed'],
  ['PROCESSES', 'FIRST PRINCIPLES', 'How it works vs. why it works'],
  ['PERSPECTIVES', 'FIRST PRINCIPLES', 'Relative viewpoints vs. absolute foundations'],
  ['PARADOXES', 'PATTERNS', 'What seems contradictory vs. what seems consistent'],
];

/**
 * Keywords that indicate similar conceptual territory between lenses.
 * Used to detect convergences.
 */
const CONVERGENCE_GROUPS: { theme: string; members: string[] }[] = [
  { theme: 'structure', members: ['ANALYSES', 'SYSTEMS', 'HIERARCHIES', 'PATTERNS', 'NETWORKS'] },
  { theme: 'change', members: ['TRANSFORMATIONS', 'PROCESSES', 'CHANGES', 'CYCLES', 'ORIGINS'] },
  { theme: 'evaluation', members: ['EXCELLENCES', 'BADS', 'LIMITATIONS', 'ALTERNATIVES'] },
  { theme: 'causality', members: ['CAUSES', 'CHAINS-OF-CONSEQUENCES', 'PROCESSES', 'ORIGINS'] },
  { theme: 'novelty', members: ['ANOMALIES', 'PARADOXES', 'INVERSIONS', 'COMBINATIONS'] },
  { theme: 'perspective', members: ['PERSPECTIVES', 'ANALOGIES', 'OPPOSITES', 'DIFFERENCES'] },
  { theme: 'foundations', members: ['FIRST PRINCIPLES', 'CONCEPTS', 'ORIGINS', 'CAUSES'] },
];

/**
 * Synthesize insights across lenses in a reasoning result.
 */
export function synthesize(result: ReasoningResult): SynthesisResult {
  const lensThemes = result.lenses.map(l => l.division.theme);
  const problem = result.problem;
  const snippet = problem.slice(0, 60);

  const tensions = findTensions(lensThemes, snippet);
  const convergences = findConvergences(lensThemes, snippet);
  const surprises = findSurprises(result.lenses, snippet);
  const summary = generateSummary(result, tensions, convergences, surprises);

  return { tensions, convergences, surprises, summary };
}

/**
 * Find tensions between opposing lenses.
 */
function findTensions(themes: string[], snippet: string): Tension[] {
  const themeSet = new Set(themes);
  const tensions: Tension[] = [];

  for (const [t1, t2, baseDescription] of TENSION_PAIRS) {
    if (themeSet.has(t1) && themeSet.has(t2)) {
      tensions.push({
        lens1: t1,
        lens2: t2,
        description: `${baseDescription} — for "${snippet}": ${t1} and ${t2} pull in opposite directions. The space between them may contain the key insight.`,
      });
    }
  }

  return tensions;
}

/**
 * Find convergences where multiple lenses point in similar directions.
 */
function findConvergences(themes: string[], snippet: string): Convergence[] {
  const themeSet = new Set(themes);
  const convergences: Convergence[] = [];

  for (const group of CONVERGENCE_GROUPS) {
    const matchingMembers = group.members.filter(m => themeSet.has(m));
    if (matchingMembers.length >= 2) {
      convergences.push({
        lenses: matchingMembers,
        description: `Multiple lenses converge on ${group.theme}: ${matchingMembers.join(', ')} all examine "${snippet}" through the lens of ${group.theme}. Where they agree is likely a strong signal.`,
      });
    }
  }

  return convergences;
}

/**
 * Find surprises — unexpected cross-domain connections from each lens.
 */
function findSurprises(lenses: LensResult[], snippet: string): Surprise[] {
  const surprises: Surprise[] = [];

  for (const lens of lenses) {
    // Look at cross-domain prompts for unexpected connections
    if (lens.crossDomainPrompts.length > 0) {
      // Pick the most "distant" cross-domain prompt (last one, which
      // typically comes from a different organon list than the first)
      const mostDistant = lens.crossDomainPrompts[lens.crossDomainPrompts.length - 1];
      surprises.push({
        lens: lens.division.theme,
        description: `${lens.division.theme} surfaces an unexpected connection: ${mostDistant}`,
      });
    }
  }

  return surprises;
}

/**
 * Generate a summary paragraph tying together tensions, convergences, and surprises.
 */
function generateSummary(
  result: ReasoningResult,
  tensions: Tension[],
  convergences: Convergence[],
  surprises: Surprise[]
): string {
  const problem = result.problem;
  const lensCount = result.lenses.length;
  const themes = result.lenses.map(l => l.division.theme);
  const parts: string[] = [];

  parts.push(
    `Analyzing "${problem}" through ${lensCount} ideonomic lens${lensCount === 1 ? '' : 'es'} (${themes.join(', ')}):`
  );

  if (tensions.length > 0) {
    const tensionPairs = tensions.map(t => `${t.lens1}↔${t.lens2}`).join(', ');
    parts.push(
      `${tensions.length} productive tension${tensions.length === 1 ? '' : 's'} found (${tensionPairs}). These opposing perspectives are where breakthrough insights often hide.`
    );
  }

  if (convergences.length > 0) {
    const convThemes = convergences.map(c => c.lenses.join('+')).join('; ');
    parts.push(
      `${convergences.length} convergence${convergences.length === 1 ? '' : 's'} detected (${convThemes}). Multiple lenses pointing in the same direction suggests a strong underlying pattern.`
    );
  }

  if (surprises.length > 0) {
    parts.push(
      `${surprises.length} cross-domain surprise${surprises.length === 1 ? '' : 's'} — unexpected connections that may open new avenues of thinking.`
    );
  }

  if (tensions.length === 0 && convergences.length === 0) {
    parts.push(
      `The selected lenses explore independent angles. Consider adding complementary divisions to find tensions or convergences.`
    );
  }

  return parts.join(' ');
}
