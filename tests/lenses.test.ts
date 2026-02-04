import { describe, it, expect } from 'vitest';
import { generateLens, generateAllLenses } from '../src/lenses.js';
import { reasoningDivisionsByTheme } from '../src/data/divisions.js';

const analogies = reasoningDivisionsByTheme.get('ANALOGIES')!;
const causes = reasoningDivisionsByTheme.get('CAUSES')!;
const problem = 'How do I design a resilient distributed system?';

describe('generateLens', () => {
  it('returns a valid LensResult structure', () => {
    const result = generateLens(analogies, problem);
    expect(result).toHaveProperty('division');
    expect(result).toHaveProperty('coreQuestion');
    expect(result).toHaveProperty('guidingQuestions');
    expect(result).toHaveProperty('relevantOrganonItems');
    expect(result).toHaveProperty('crossDomainPrompts');
  });

  it('core question includes the problem text', () => {
    const result = generateLens(analogies, problem);
    expect(result.coreQuestion).toContain(problem);
    expect(result.coreQuestion).toContain(analogies.coreQuestion);
  });

  it('guiding questions match the division', () => {
    const result = generateLens(analogies, problem);
    expect(result.guidingQuestions).toEqual(analogies.guidingQuestions);
  });

  it('relevantOrganonItems has entries from multiple organon lists', () => {
    const result = generateLens(analogies, problem);
    expect(result.relevantOrganonItems.length).toBeGreaterThanOrEqual(2);
    const listNames = result.relevantOrganonItems.map(o => o.list);
    // Should have entries from different lists
    expect(new Set(listNames).size).toBeGreaterThanOrEqual(2);
  });

  it('each organon entry has 3-5 items', () => {
    const result = generateLens(analogies, problem);
    for (const entry of result.relevantOrganonItems) {
      expect(entry.items.length).toBeGreaterThanOrEqual(3);
      expect(entry.items.length).toBeLessThanOrEqual(5);
    }
  });

  it('crossDomainPrompts has 2-3 entries', () => {
    const result = generateLens(analogies, problem);
    expect(result.crossDomainPrompts.length).toBeGreaterThanOrEqual(2);
    expect(result.crossDomainPrompts.length).toBeLessThanOrEqual(3);
  });

  it('cross-domain prompts contain the problem snippet', () => {
    const result = generateLens(analogies, problem);
    const snippet = problem.slice(0, 50);
    for (const prompt of result.crossDomainPrompts) {
      expect(prompt).toContain(snippet);
    }
  });

  it('is deterministic — same input produces same output', () => {
    const result1 = generateLens(analogies, problem);
    const result2 = generateLens(analogies, problem);
    expect(result1).toEqual(result2);
  });

  it('different divisions produce different results', () => {
    const result1 = generateLens(analogies, problem);
    const result2 = generateLens(causes, problem);
    expect(result1.coreQuestion).not.toBe(result2.coreQuestion);
    expect(result1.division.theme).not.toBe(result2.division.theme);
  });
});

describe('generateAllLenses', () => {
  it('generates a lens for each division', () => {
    const divisions = [analogies, causes];
    const results = generateAllLenses(divisions, problem);
    expect(results).toHaveLength(2);
    expect(results[0].division.theme).toBe('ANALOGIES');
    expect(results[1].division.theme).toBe('CAUSES');
  });
});
