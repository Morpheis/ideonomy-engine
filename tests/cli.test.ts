import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const run = (args: string, env?: Record<string, string>) =>
  execSync(`npx tsx src/index.ts ${args}`, {
    cwd: '/Users/kzink/Personal/ideonomy-engine',
    encoding: 'utf-8',
    env: { ...process.env, ...env },
  });

describe('CLI — Core', () => {
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

describe('CLI — Drill', () => {
  it('drill outputs deep dive analysis', () => {
    const output = run('drill ANALOGIES "test problem"');
    expect(output).toContain('Deep Dive');
    expect(output).toContain('ANALOGIES');
    expect(output).toContain('Sub-Questions');
    expect(output).toContain('Cross-Domain Sparks (Expanded)');
  });

  it('drill --json outputs valid JSON with subQuestions', () => {
    const output = run('drill --json ANALOGIES "test problem"');
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty('subQuestions');
    expect(parsed.subQuestions.length).toBeGreaterThan(0);
    expect(parsed.division.theme).toBe('ANALOGIES');
  });
});

describe('CLI — Chain', () => {
  it('chain outputs bridge insights and target analysis', () => {
    const output = run('chain ANALOGIES PARADOXES "test problem"');
    expect(output).toContain('Chain');
    expect(output).toContain('ANALOGIES');
    expect(output).toContain('PARADOXES');
    expect(output).toContain('Bridge Insights');
    expect(output).toContain('Chain Prompts');
  });

  it('chain --json outputs valid JSON', () => {
    const output = run('chain --json ANALOGIES CAUSES "test problem"');
    const parsed = JSON.parse(output);
    expect(parsed.sourceLens).toBe('ANALOGIES');
    expect(parsed.targetLens).toBe('CAUSES');
    expect(parsed.bridgeInsights.length).toBeGreaterThan(0);
  });
});

describe('CLI — Synthesize', () => {
  it('synthesize outputs tensions and convergences', () => {
    const output = run('synthesize -d "ANALOGIES,ANOMALIES,PATTERNS,CAUSES" "test problem"');
    expect(output).toContain('Synthesis');
  });

  it('synthesize --json outputs valid JSON', () => {
    const output = run('synthesize --json -d "ANALOGIES,ANOMALIES" "test problem"');
    const parsed = JSON.parse(output);
    expect(parsed).toHaveProperty('reasoning');
    expect(parsed).toHaveProperty('synthesis');
    expect(parsed.synthesis).toHaveProperty('tensions');
    expect(parsed.synthesis).toHaveProperty('convergences');
    expect(parsed.synthesis).toHaveProperty('surprises');
  });
});

describe('CLI — Sessions', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'ideonomy-cli-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('session create outputs a session id', () => {
    const output = run(`session create "test problem"`, { IDEONOMY_SESSIONS_DIR: tempDir });
    expect(output).toContain('Session created');
  });

  it('session list shows sessions', () => {
    run(`session create "test problem"`, { IDEONOMY_SESSIONS_DIR: tempDir });
    const output = run('session list', { IDEONOMY_SESSIONS_DIR: tempDir });
    expect(output).toContain('test problem');
  });
});
