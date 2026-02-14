import { describe, it, expect } from 'vitest';
import { synthesize } from '../src/synthesis.js';
import { reason } from '../src/engine.js';

const problem = 'How can AI agents learn to collaborate effectively?';

describe('synthesize', () => {
  it('returns a SynthesisResult with all required fields', () => {
    const result = reason(problem, { profile: 'creative', lensCount: 5 });
    const synthesis = synthesize(result);

    expect(synthesis).toHaveProperty('tensions');
    expect(synthesis).toHaveProperty('convergences');
    expect(synthesis).toHaveProperty('surprises');
    expect(synthesis).toHaveProperty('summary');
    expect(Array.isArray(synthesis.tensions)).toBe(true);
    expect(Array.isArray(synthesis.convergences)).toBe(true);
    expect(Array.isArray(synthesis.surprises)).toBe(true);
    expect(typeof synthesis.summary).toBe('string');
  });

  it('identifies tensions between opposing divisions', () => {
    // Use divisions that are known to create tension
    const result = reason(problem, {
      divisions: ['ANALOGIES', 'OPPOSITES', 'LIMITATIONS', 'EXCELLENCES'],
    });
    const synthesis = synthesize(result);

    // Should find at least one tension
    expect(synthesis.tensions.length).toBeGreaterThan(0);
    for (const tension of synthesis.tensions) {
      expect(tension.lens1).toBeTruthy();
      expect(tension.lens2).toBeTruthy();
      expect(tension.description).toBeTruthy();
      expect(tension.lens1).not.toBe(tension.lens2);
    }
  });

  it('identifies convergences when multiple lenses point in similar directions', () => {
    const result = reason(problem, { profile: 'technical', lensCount: 6 });
    const synthesis = synthesize(result);

    expect(synthesis.convergences.length).toBeGreaterThan(0);
    for (const conv of synthesis.convergences) {
      expect(conv.lenses.length).toBeGreaterThanOrEqual(2);
      expect(conv.description).toBeTruthy();
    }
  });

  it('identifies surprises from cross-domain connections', () => {
    const result = reason(problem, { profile: 'creative', lensCount: 6 });
    const synthesis = synthesize(result);

    expect(synthesis.surprises.length).toBeGreaterThan(0);
    for (const surprise of synthesis.surprises) {
      expect(surprise.lens).toBeTruthy();
      expect(surprise.description).toBeTruthy();
    }
  });

  it('generates a non-empty summary', () => {
    const result = reason(problem, { profile: 'general' });
    const synthesis = synthesize(result);

    expect(synthesis.summary.length).toBeGreaterThan(50);
    // Summary should reference the problem
    expect(synthesis.summary.toLowerCase()).toContain('agent');
  });

  it('works with a single lens (minimal input)', () => {
    const result = reason(problem, { divisions: ['ANALOGIES'] });
    const synthesis = synthesize(result);

    // With only one lens, tensions require two → should be empty
    expect(synthesis.tensions).toHaveLength(0);
    // But should still have surprises from cross-domain
    expect(synthesis.surprises.length).toBeGreaterThan(0);
    expect(synthesis.summary).toBeTruthy();
  });

  it('is deterministic', () => {
    const result = reason(problem, { profile: 'creative', lensCount: 4 });
    const s1 = synthesize(result);
    const s2 = synthesize(result);

    expect(s1.tensions).toEqual(s2.tensions);
    expect(s1.convergences).toEqual(s2.convergences);
    expect(s1.surprises).toEqual(s2.surprises);
    expect(s1.summary).toBe(s2.summary);
  });

  it('handles different profiles', () => {
    const profiles = ['technical', 'creative', 'strategic', 'ethical', 'philosophical'];
    for (const profileId of profiles) {
      const result = reason(problem, { profile: profileId, lensCount: 4 });
      const synthesis = synthesize(result);
      expect(synthesis.summary).toBeTruthy();
    }
  });
});
