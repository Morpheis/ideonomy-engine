/**
 * Relevance scoring for smarter cross-domain matching.
 *
 * Replaces hash-based random selection with keyword-scored relevance,
 * while maintaining determinism via score-based sorting with hash tie-breaking.
 */

/**
 * Simple deterministic hash for tie-breaking.
 */
function simpleHash(str: string): number {
  let h = 0;
  for (const c of str) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

/**
 * Tokenize a string into lowercase words.
 */
function tokenize(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 2);
}

/**
 * Score how relevant an organon item is to a problem statement.
 *
 * Scoring:
 * - 3 points: item name appears as substring in the problem (direct match)
 * - 2 points: item token matches a problem token exactly
 * - 1 point: item token shares a 4+ char prefix with a problem token (fuzzy)
 *
 * @param item - The organon item (e.g., "Quantum Mechanics")
 * @param problem - The problem statement
 * @returns Relevance score (0 = no match)
 */
export function scoreRelevance(item: string, problem: string): number {
  const itemLower = item.toLowerCase();
  const problemLower = problem.toLowerCase();
  let score = 0;

  // Direct substring match (strongest signal)
  if (problemLower.includes(itemLower)) {
    score += 3;
  }

  // Token-level matching
  const itemTokens = tokenize(item);
  const problemTokens = tokenize(problem);

  for (const iToken of itemTokens) {
    for (const pToken of problemTokens) {
      if (iToken === pToken) {
        score += 2;
      } else if (iToken.length >= 4 && pToken.length >= 4) {
        // Shared prefix (fuzzy match for morphological variants)
        const prefixLen = Math.min(4, iToken.length, pToken.length);
        if (iToken.slice(0, prefixLen) === pToken.slice(0, prefixLen)) {
          score += 1;
        }
      }
    }
  }

  return score;
}

/**
 * Pick the most relevant items from a list, scored against the problem.
 *
 * Items are sorted by relevance score (descending), with hash-based
 * tie-breaking for determinism. Falls back to hash-based selection
 * when all scores are 0 (completely unrelated problem).
 *
 * @param items - Array of organon items
 * @param problem - The problem statement
 * @param count - Number of items to return
 * @returns Array of the most relevant items
 */
export function pickRelevantItems(
  items: string[],
  problem: string,
  count: number
): string[] {
  const n = Math.min(count, items.length);
  const seed = simpleHash(problem);

  // Score all items
  const scored = items.map((item, index) => ({
    item,
    score: scoreRelevance(item, problem),
    // Hash-based tiebreaker ensures determinism
    tiebreaker: simpleHash(item + problem + String(index)),
  }));

  // Sort: highest score first, then tiebreaker for determinism
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.tiebreaker - b.tiebreaker;
  });

  return scored.slice(0, n).map(s => s.item);
}
