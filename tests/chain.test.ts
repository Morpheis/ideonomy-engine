import { describe, it, expect } from 'vitest';
import { chain } from '../src/chain.js';
import { reason } from '../src/engine.js';

describe('chain', () => {
  it('takes a source lens and applies a target division to its guiding questions', () => {
    const sourceResult = reason('How can AI agents collaborate?', {
      divisions: ['ANALOGIES'],
      lensCount: 1,
    });
    const sourceLens = sourceResult.lenses[0];

    const result = chain(sourceLens, 'PARADOXES', 'How can AI agents collaborate?');
    expect(result.sourceLens).toBe('ANALOGIES');
    expect(result.targetLens).toBe('PARADOXES');
    expect(result.bridgeInsights.length).toBeGreaterThan(0);
    expect(result.result.division.theme).toBe('PARADOXES');
  });

  it('generates bridge insights from source guiding questions', () => {
    const sourceResult = reason('Why do complex systems fail?', {
      divisions: ['CAUSES'],
      lensCount: 1,
    });
    const sourceLens = sourceResult.lenses[0];

    const result = chain(sourceLens, 'INVERSIONS', 'Why do complex systems fail?');
    // Bridge insights should reference the source division
    expect(result.bridgeInsights.length).toBeGreaterThan(0);
    for (const insight of result.bridgeInsights) {
      expect(insight.length).toBeGreaterThan(0);
    }
  });

  it('result contains the target division analysis', () => {
    const sourceResult = reason('test problem', {
      divisions: ['PATTERNS'],
      lensCount: 1,
    });
    const result = chain(sourceResult.lenses[0], 'FIRST PRINCIPLES', 'test problem');

    expect(result.result.coreQuestion).toContain('test problem');
    expect(result.result.guidingQuestions.length).toBeGreaterThan(0);
    expect(result.result.crossDomainPrompts.length).toBeGreaterThan(0);
  });

  it('chain prompts incorporate source lens context', () => {
    const sourceResult = reason('How does memory work?', {
      divisions: ['ANALOGIES'],
      lensCount: 1,
    });
    const result = chain(sourceResult.lenses[0], 'TRANSFORMATIONS', 'How does memory work?');

    // The chain-specific prompts should reference the source
    expect(result.chainPrompts.length).toBeGreaterThan(0);
    const allPrompts = result.chainPrompts.join(' ');
    expect(allPrompts).toContain('ANALOGIES');
  });

  it('works with various source/target combinations', () => {
    const combos = [
      ['ANALOGIES', 'PARADOXES'],
      ['CAUSES', 'INVERSIONS'],
      ['PATTERNS', 'ANOMALIES'],
      ['FIRST PRINCIPLES', 'COMBINATIONS'],
    ];

    for (const [source, target] of combos) {
      const sourceResult = reason('test', { divisions: [source], lensCount: 1 });
      const result = chain(sourceResult.lenses[0], target, 'test');
      expect(result.sourceLens).toBe(source);
      expect(result.targetLens).toBe(target);
    }
  });

  it('throws on unknown target division', () => {
    const sourceResult = reason('test', { divisions: ['ANALOGIES'], lensCount: 1 });
    expect(() => chain(sourceResult.lenses[0], 'NONEXISTENT', 'test')).toThrow();
  });

  it('is deterministic', () => {
    const sourceResult = reason('test', { divisions: ['ANALOGIES'], lensCount: 1 });
    const r1 = chain(sourceResult.lenses[0], 'CAUSES', 'test');
    const r2 = chain(sourceResult.lenses[0], 'CAUSES', 'test');
    expect(r1.bridgeInsights).toEqual(r2.bridgeInsights);
    expect(r1.chainPrompts).toEqual(r2.chainPrompts);
  });
});
