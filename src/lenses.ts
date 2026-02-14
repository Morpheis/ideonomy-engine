import type { Division, LensResult } from './types.js';
import { organonLists } from './data/organons.js';
import { pickRelevantItems } from './relevance.js';

/**
 * Simple deterministic hash for seeding organon selection.
 */
function simpleHash(str: string): number {
  let h = 0;
  for (const c of str) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

/**
 * Pick N consecutive items from an array starting at a hash-derived index, wrapping around.
 */
function pickItems(items: string[], seed: number, count: number): string[] {
  const start = seed % items.length;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(items[(start + i) % items.length]);
  }
  return result;
}

/**
 * Generate a lens analysis for a single division applied to a problem.
 */
export function generateLens(division: Division, problem: string): LensResult {
  const seed = simpleHash(division.theme + problem);
  const snippet = problem.slice(0, 50);

  // Core question: contextualize
  const coreQuestion = `${division.coreQuestion} — applied to: "${problem}"`;

  // Guiding questions: as-is from the division
  const guidingQuestions = division.guidingQuestions;

  // Relevant organon items: 4 items from each list, scored by relevance
  const relevantOrganonItems = organonLists.map(list => ({
    list: list.name,
    items: pickRelevantItems(list.items, problem, 4),
  }));

  // Cross-domain prompts: 2-3 prompts from sciences and phenomena, scored by relevance
  const sciencesList = organonLists.find(l => l.id === 'sciences')!;
  const phenomenaList = organonLists.find(l => l.id === 'phenomena')!;

  const scienceItems = pickRelevantItems(sciencesList.items, problem, 3);
  const phenomenaItems = pickRelevantItems(phenomenaList.items, problem, 3);

  const crossDomainPrompts: string[] = [];
  // 2 science-based prompts + 1 phenomena-based
  crossDomainPrompts.push(
    `Consider ${division.theme} through the lens of ${scienceItems[0]} — what does ${scienceItems[0]} reveal about ${snippet}?`
  );
  crossDomainPrompts.push(
    `Consider ${division.theme} through the lens of ${scienceItems[1]} — what does ${scienceItems[1]} reveal about ${snippet}?`
  );
  crossDomainPrompts.push(
    `Consider ${division.theme} through the lens of ${phenomenaItems[0]} — what does ${phenomenaItems[0]} reveal about ${snippet}?`
  );

  return {
    division,
    coreQuestion,
    guidingQuestions,
    relevantOrganonItems,
    crossDomainPrompts,
  };
}

/**
 * Generate lenses for all divisions.
 */
export function generateAllLenses(divisions: Division[], problem: string): LensResult[] {
  return divisions.map(d => generateLens(d, problem));
}
