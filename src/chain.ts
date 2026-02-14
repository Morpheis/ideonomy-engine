/**
 * Lens chaining — apply the output of one lens as input to another.
 *
 * Takes guiding questions and cross-domain prompts from a source lens
 * and uses them to generate bridge insights, then runs those through
 * a target division for compounded reasoning.
 */

import type { LensResult } from './types.js';
import { reasoningDivisionsByTheme } from './data/divisions.js';
import { generateLens } from './lenses.js';

/** Result of chaining two lenses together. */
export interface ChainResult {
  /** Source division theme */
  sourceLens: string;
  /** Target division theme */
  targetLens: string;
  /** Bridge insights connecting source → target */
  bridgeInsights: string[];
  /** Chain-specific prompts that combine both lenses */
  chainPrompts: string[];
  /** The target lens analysis (enriched by source context) */
  result: LensResult;
}

/**
 * Chain two lenses: take insights from a source lens and filter them
 * through a target division.
 *
 * @param sourceLens - The completed LensResult to chain from
 * @param targetTheme - The target division theme (e.g., 'PARADOXES')
 * @param problem - The original problem statement
 * @returns ChainResult with bridge insights and target analysis
 */
export function chain(
  sourceLens: LensResult,
  targetTheme: string,
  problem: string
): ChainResult {
  const upper = targetTheme.toUpperCase();
  const targetDivision = reasoningDivisionsByTheme.get(upper);
  if (!targetDivision) {
    throw new Error(
      `Unknown division theme: "${targetTheme}". Available: ${[...reasoningDivisionsByTheme.keys()].join(', ')}`
    );
  }

  const sourceTheme = sourceLens.division.theme;

  // Generate bridge insights: what does the source lens reveal
  // that's relevant to the target lens's perspective?
  const bridgeInsights = generateBridgeInsights(sourceLens, targetDivision.theme, problem);

  // Generate the target lens analysis
  const targetResult = generateLens(targetDivision, problem);

  // Generate chain-specific prompts that combine both perspectives
  const chainPrompts = generateChainPrompts(sourceLens, targetDivision.theme, problem);

  return {
    sourceLens: sourceTheme,
    targetLens: upper,
    bridgeInsights,
    chainPrompts,
    result: targetResult,
  };
}

/**
 * Generate bridge insights by recontextualizing source guiding questions
 * through the target lens.
 */
function generateBridgeInsights(
  sourceLens: LensResult,
  targetTheme: string,
  problem: string
): string[] {
  const snippet = problem.slice(0, 60);
  const sourceTheme = sourceLens.division.theme;

  const insights: string[] = [];

  // Take each source guiding question and ask: what does this imply
  // when viewed through the target lens?
  for (const gq of sourceLens.guidingQuestions) {
    insights.push(
      `${sourceTheme} asks: "${gq}" — What does this imply through the lens of ${targetTheme} for "${snippet}"?`
    );
  }

  // Take source cross-domain prompts and bridge them
  if (sourceLens.crossDomainPrompts.length > 0) {
    const firstPrompt = sourceLens.crossDomainPrompts[0];
    insights.push(
      `The ${sourceTheme} analysis suggests: "${firstPrompt}" — How does ${targetTheme} reframe this insight?`
    );
  }

  return insights;
}

/**
 * Generate prompts that specifically leverage the intersection
 * of both lenses — the "creative collision" zone.
 */
function generateChainPrompts(
  sourceLens: LensResult,
  targetTheme: string,
  problem: string
): string[] {
  const snippet = problem.slice(0, 60);
  const sourceTheme = sourceLens.division.theme;

  const prompts: string[] = [];

  // Tension prompt: where do the two lenses create productive tension?
  prompts.push(
    `Where does ${sourceTheme}'s perspective on "${snippet}" create tension with ${targetTheme}? What does that tension reveal?`
  );

  // Synthesis prompt: what emerges at the intersection?
  prompts.push(
    `What insight about "${snippet}" only becomes visible when you combine ${sourceTheme} and ${targetTheme}?`
  );

  // Reversal prompt: how does the target lens transform the source's conclusions?
  prompts.push(
    `If ${sourceTheme} suggests one direction for "${snippet}", how does ${targetTheme} challenge or refine that direction?`
  );

  // Specific combo prompt using source organon items
  if (sourceLens.relevantOrganonItems.length > 0) {
    const firstOrganon = sourceLens.relevantOrganonItems[0];
    if (firstOrganon.items.length > 0) {
      prompts.push(
        `${sourceTheme} surfaced the concept of "${firstOrganon.items[0]}" — what does ${targetTheme} reveal about the role of ${firstOrganon.items[0]} in "${snippet}"?`
      );
    }
  }

  return prompts;
}
