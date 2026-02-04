import type { ReasoningResult } from '../types.js';

/**
 * Format a reasoning result as pretty-printed JSON.
 */
export function formatJson(result: ReasoningResult): string {
  return JSON.stringify(result, null, 2);
}
