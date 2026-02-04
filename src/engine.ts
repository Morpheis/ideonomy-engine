import type { ReasoningOptions, ReasoningResult } from './types.js';
import { selectDivisions, selectProfile } from './selector.js';
import { generateAllLenses } from './lenses.js';
import { getProfile } from './profiles.js';

/**
 * Core reasoning engine — selects divisions, generates lenses, returns structured result.
 */
export function reason(problem: string, options?: ReasoningOptions): ReasoningResult {
  // Determine profile
  let profileUsed: string;
  let profile;

  if (options?.divisions) {
    // Custom divisions — use 'custom' as profile
    profileUsed = 'custom';
    profile = { ...getProfile('general'), id: 'custom', name: 'Custom Selection' };
  } else {
    profile = selectProfile(problem, options?.profile);
    profileUsed = profile.id;
  }

  // Select divisions
  const divisions = selectDivisions(problem, options);

  // Generate lenses
  const lenses = generateAllLenses(divisions, problem);

  return {
    problem,
    profile,
    lenses,
    meta: {
      divisionCount: lenses.length,
      profileUsed,
      timestamp: new Date().toISOString(),
    },
  };
}
