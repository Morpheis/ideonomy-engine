import { describe, it, expect } from 'vitest';
import { selectDivisions, selectProfile } from '../src/selector.js';

describe('selectDivisions', () => {
  it('returns exact divisions when specified by theme', () => {
    const result = selectDivisions('any', { divisions: ['ANALOGIES', 'CAUSES'] });
    expect(result).toHaveLength(2);
    expect(result[0].theme).toBe('ANALOGIES');
    expect(result[1].theme).toBe('CAUSES');
  });

  it('matches divisions case-insensitively', () => {
    const result = selectDivisions('any', { divisions: ['analogies', 'Causes'] });
    expect(result).toHaveLength(2);
    expect(result[0].theme).toBe('ANALOGIES');
    expect(result[1].theme).toBe('CAUSES');
  });

  it('throws on unknown division theme', () => {
    expect(() => selectDivisions('any', { divisions: ['NONEXISTENT'] }))
      .toThrow();
  });

  it('returns creative profile divisions when profile specified', () => {
    const result = selectDivisions('any', { profile: 'creative' });
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result.map(d => d.theme)).toContain('ANALOGIES');
    expect(result.map(d => d.theme)).toContain('COMBINATIONS');
  });

  it('falls back to general for unknown profile', () => {
    const result = selectDivisions('any', { profile: 'nonexistent' });
    const generalResult = selectDivisions('any', { profile: 'general' });
    expect(result.map(d => d.theme)).toEqual(generalResult.map(d => d.theme));
  });

  it('auto-selects diagnostic profile for debugging problem', () => {
    const result = selectDivisions('How should I debug this failing test?');
    const profile = selectProfile('How should I debug this failing test?');
    expect(profile.id).toBe('diagnostic');
    expect(result.map(d => d.theme)).toContain('CAUSES');
    expect(result.map(d => d.theme)).toContain('BADS');
  });

  it('auto-selects philosophical profile for consciousness question', () => {
    const profile = selectProfile("What's the meaning of consciousness?");
    expect(profile.id).toBe('philosophical');
  });

  it('auto-selects technical profile for building question', () => {
    const profile = selectProfile('How do I build a caching layer?');
    expect(profile.id).toBe('technical');
  });

  it('auto-selects general profile when no keywords match', () => {
    const profile = selectProfile('xyzzy florp blarg');
    expect(profile.id).toBe('general');
  });

  it('limits divisions with lensCount', () => {
    const result = selectDivisions('any', { profile: 'technical', lensCount: 3 });
    expect(result).toHaveLength(3);
  });
});

describe('selectProfile', () => {
  it('returns specified profile by id', () => {
    const profile = selectProfile('any', 'creative');
    expect(profile.id).toBe('creative');
  });

  it('falls back to general for unknown profile id', () => {
    const profile = selectProfile('any', 'nonexistent');
    expect(profile.id).toBe('general');
  });
});
