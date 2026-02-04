import { describe, it, expect } from 'vitest';
import { reason } from '../src/engine.js';

describe('reason', () => {
  it('returns a valid ReasoningResult', () => {
    const result = reason('How should I design this API?');
    expect(result).toHaveProperty('problem');
    expect(result).toHaveProperty('profile');
    expect(result).toHaveProperty('lenses');
    expect(result).toHaveProperty('meta');
  });

  it('preserves the problem string', () => {
    const problem = 'How should I design this API?';
    const result = reason(problem);
    expect(result.problem).toBe(problem);
  });

  it('meta.divisionCount matches lenses length', () => {
    const result = reason('How should I design this API?');
    expect(result.meta.divisionCount).toBe(result.lenses.length);
  });

  it('meta has profileUsed string', () => {
    const result = reason('How should I design this API?');
    expect(typeof result.meta.profileUsed).toBe('string');
    expect(result.meta.profileUsed.length).toBeGreaterThan(0);
  });

  it('meta has ISO timestamp', () => {
    const result = reason('How should I design this API?');
    const parsed = new Date(result.meta.timestamp);
    expect(parsed.toISOString()).toBe(result.meta.timestamp);
  });

  it('works with explicit profile option', () => {
    const result = reason('anything', { profile: 'creative' });
    expect(result.meta.profileUsed).toBe('creative');
    expect(result.profile.id).toBe('creative');
  });

  it('works with explicit divisions option', () => {
    const result = reason('anything', { divisions: ['ANALOGIES', 'CAUSES'] });
    expect(result.lenses).toHaveLength(2);
    expect(result.lenses[0].division.theme).toBe('ANALOGIES');
    expect(result.lenses[1].division.theme).toBe('CAUSES');
    expect(result.meta.profileUsed).toBe('custom');
  });

  it('works with auto-selection', () => {
    const result = reason('How do I debug this failing test?');
    expect(result.meta.profileUsed).toBe('diagnostic');
  });

  it('lensCount limits output', () => {
    const result = reason('anything', { profile: 'technical', lensCount: 3 });
    expect(result.lenses).toHaveLength(3);
    expect(result.meta.divisionCount).toBe(3);
  });
});
