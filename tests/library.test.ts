import { describe, it, expect } from 'vitest';

describe('Library exports', () => {
  it('exports reason function', async () => {
    const mod = await import('../src/engine.js');
    expect(typeof mod.reason).toBe('function');
  });

  it('exports all core types via barrel', async () => {
    const mod = await import('../src/lib.js');
    // Core function
    expect(typeof mod.reason).toBe('function');
    // Profile helpers
    expect(typeof mod.getProfile).toBe('function');
    expect(typeof mod.profiles).toBe('object');
    // Division data
    expect(typeof mod.reasoningDivisions).toBe('object');
    expect(typeof mod.reasoningDivisionsByTheme).toBe('object');
    // Selector
    expect(typeof mod.selectProfile).toBe('function');
    expect(typeof mod.selectDivisions).toBe('function');
    // Formatters
    expect(typeof mod.formatMarkdown).toBe('function');
    expect(typeof mod.formatConcise).toBe('function');
    expect(typeof mod.formatJson).toBe('function');
    // Lens generator
    expect(typeof mod.generateLens).toBe('function');
    expect(typeof mod.generateAllLenses).toBe('function');
    // v0.2 features
    expect(typeof mod.drill).toBe('function');
    expect(typeof mod.chain).toBe('function');
    expect(typeof mod.synthesize).toBe('function');
    expect(typeof mod.SessionStore).toBe('function');
    expect(typeof mod.createSession).toBe('function');
    expect(typeof mod.scoreRelevance).toBe('function');
    expect(typeof mod.pickRelevantItems).toBe('function');
  });

  it('reason() is callable without CLI', async () => {
    const { reason } = await import('../src/lib.js');
    const result = reason('Test problem for library usage');
    expect(result.problem).toBe('Test problem for library usage');
    expect(result.lenses.length).toBeGreaterThan(0);
    expect(result.meta.profileUsed).toBeTruthy();
  });

  it('can use profiles and divisions directly', async () => {
    const { reason, profiles, reasoningDivisionsByTheme } = await import('../src/lib.js');
    // Verify profiles are available
    expect(profiles.length).toBeGreaterThan(0);
    expect(profiles.find(p => p.id === 'creative')).toBeDefined();
    // Verify divisions are available
    expect(reasoningDivisionsByTheme.get('ANALOGIES')).toBeDefined();

    // Use them in a reason call
    const result = reason('anything', { profile: 'creative', lensCount: 2 });
    expect(result.lenses).toHaveLength(2);
  });
});
