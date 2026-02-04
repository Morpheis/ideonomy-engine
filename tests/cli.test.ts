import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

const run = (args: string) =>
  execSync(`npx tsx src/index.ts ${args}`, {
    cwd: '/Users/kzink/Personal/ideonomy-engine',
    encoding: 'utf-8',
  });

describe('CLI', () => {
  it('reason command outputs Ideonomic Analysis', () => {
    const output = run('reason "test problem"');
    expect(output).toContain('Ideonomic Analysis');
  });

  it('reason --json outputs valid JSON', () => {
    const output = run('reason --json "test problem"');
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty('problem');
    expect(parsed).toHaveProperty('lenses');
  });

  it('reason --concise outputs concise format with division themes', () => {
    const output = run('reason --concise "test problem"');
    expect(output).toContain('Ideonomic Analysis');
    // concise is shorter than full markdown
    const fullOutput = run('reason "test problem"');
    expect(output.length).toBeLessThan(fullOutput.length);
  });

  it('reason --profile creative uses creative profile', () => {
    const output = run('reason --json --profile creative "anything"');
    const parsed = JSON.parse(output);
    expect(parsed.meta.profileUsed).toBe('creative');
  });

  it('profiles command lists all profile names', () => {
    const output = run('profiles');
    expect(output).toContain('technical');
    expect(output).toContain('creative');
    expect(output).toContain('strategic');
    expect(output).toContain('ethical');
    expect(output).toContain('diagnostic');
    expect(output).toContain('interpersonal');
    expect(output).toContain('philosophical');
    expect(output).toContain('general');
  });

  it('divisions command lists division themes', () => {
    const output = run('divisions');
    expect(output).toContain('ANALOGIES');
    expect(output).toContain('CAUSES');
    expect(output).toContain('PATTERNS');
  });

  it('division ANALOGIES shows detail', () => {
    const output = run('division ANALOGIES');
    expect(output).toContain('ANALOGIES');
    expect(output).toContain('Icelology');
    expect(output).toContain('Core Question');
    expect(output).toContain('Guiding Questions');
  });
});
