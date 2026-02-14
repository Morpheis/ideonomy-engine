/**
 * Library entry point for programmatic usage.
 *
 * Import from here when using ideonomy-engine as a library:
 *   import { reason, profiles, reasoningDivisions } from '@clawdactual/ideonomy-engine';
 */

// Core engine
export { reason } from './engine.js';

// Types (re-exported for consumers)
export type {
  Division,
  OrganonList,
  ReasoningProfile,
  LensResult,
  ReasoningResult,
  ReasoningOptions,
} from './types.js';

// Profiles
export { profiles, profilesById, getProfile } from './profiles.js';

// Divisions data
export { reasoningDivisions, reasoningDivisionsByTheme } from './data/divisions.js';

// Organon data
export { organonLists, organonListsById } from './data/organons.js';

// Selector (for advanced usage)
export { selectProfile, selectDivisions } from './selector.js';

// Lens generator (for advanced usage)
export { generateLens, generateAllLenses } from './lenses.js';

// Formatters
export { formatMarkdown, formatConcise } from './formatters/markdown.js';
export { formatJson } from './formatters/json.js';
