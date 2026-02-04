import type { Division, ReasoningProfile } from './types.js';
import { reasoningDivisions, reasoningDivisionsByTheme } from './data/divisions.js';
import { profiles, profilesById } from './profiles.js';

/**
 * Select a reasoning profile based on problem text or explicit profileId.
 * Auto-selects by scoring problem text against profile keywords.
 */
export function selectProfile(problem: string, profileId?: string): ReasoningProfile {
  if (profileId) {
    return profilesById.get(profileId) ?? profilesById.get('general')!;
  }

  const problemLower = problem.toLowerCase();
  const tokens = problemLower.split(/\W+/).filter(Boolean);

  let bestProfile: ReasoningProfile = profilesById.get('general')!;
  let bestScore = 0;

  for (const profile of profiles) {
    if (profile.id === 'general') continue; // general is fallback
    let score = 0;
    for (const keyword of profile.keywords) {
      // Check as substring of full problem (handles multi-word keywords)
      if (problemLower.includes(keyword)) {
        score++;
      } else if (tokens.includes(keyword)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestProfile = profile;
    }
  }

  return bestProfile;
}

/**
 * Select divisions for a problem based on options.
 * Priority: explicit divisions > explicit profile > auto-select profile.
 */
export function selectDivisions(
  problem: string,
  options?: { profile?: string; divisions?: string[]; lensCount?: number }
): Division[] {
  let divisions: Division[];

  if (options?.divisions) {
    // Explicit division selection — match by theme, case-insensitive
    divisions = options.divisions.map(theme => {
      const upper = theme.toUpperCase();
      const division = reasoningDivisionsByTheme.get(upper);
      if (!division) {
        throw new Error(`Unknown division theme: "${theme}". Available: ${[...reasoningDivisionsByTheme.keys()].join(', ')}`);
      }
      return division;
    });
  } else {
    // Profile-based selection
    const profile = selectProfile(problem, options?.profile);
    divisions = profile.divisionThemes
      .map(theme => reasoningDivisionsByTheme.get(theme))
      .filter((d): d is Division => d !== undefined);
  }

  // Apply lensCount limit
  if (options?.lensCount && options.lensCount < divisions.length) {
    divisions = divisions.slice(0, options.lensCount);
  }

  return divisions;
}
