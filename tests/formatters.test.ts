import { describe, it, expect } from 'vitest';
import { formatMarkdown, formatConcise } from '../src/formatters/markdown.js';
import { formatJson } from '../src/formatters/json.js';
import { reason } from '../src/engine.js';

const result = reason('How do I design a resilient distributed system?', { profile: 'technical' });
const emptyResult = reason('empty test', { divisions: ['ANALOGIES'] });

describe('formatMarkdown', () => {
  it('contains the problem text', () => {
    const md = formatMarkdown(result);
    expect(md).toContain('How do I design a resilient distributed system?');
  });

  it('contains the profile name', () => {
    const md = formatMarkdown(result);
    expect(md).toContain('Technical Problem-Solving');
  });

  it('contains each division theme as a heading', () => {
    const md = formatMarkdown(result);
    for (const lens of result.lenses) {
      expect(md).toContain(`## 🔍 ${lens.division.theme}`);
    }
  });

  it('contains each core question in blockquote', () => {
    const md = formatMarkdown(result);
    for (const lens of result.lenses) {
      expect(md).toContain(`> ${lens.coreQuestion}`);
    }
  });

  it('has guiding questions as numbered list', () => {
    const md = formatMarkdown(result);
    expect(md).toContain('1. ');
    expect(md).toContain('2. ');
  });

  it('handles empty lens arrays gracefully', () => {
    const emptyish = { ...result, lenses: [] };
    const md = formatMarkdown(emptyish);
    expect(md).toContain('Ideonomic Analysis');
    expect(md).toContain('Lenses:** 0');
  });
});

describe('formatConcise', () => {
  it('has one line per lens with division theme', () => {
    const concise = formatConcise(result);
    for (const lens of result.lenses) {
      expect(concise).toContain(`${lens.division.theme}:`);
    }
  });

  it('contains division themes', () => {
    const concise = formatConcise(result);
    expect(concise).toContain('ANALYSES');
    expect(concise).toContain('CAUSES');
  });

  it('handles empty lens arrays gracefully', () => {
    const emptyish = { ...result, lenses: [] };
    const concise = formatConcise(emptyish);
    expect(concise).toContain('Ideonomic Analysis');
  });
});

describe('formatJson', () => {
  it('outputs valid JSON', () => {
    const json = formatJson(result);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('parses back to equivalent object', () => {
    const json = formatJson(result);
    const parsed = JSON.parse(json);
    expect(parsed.problem).toBe(result.problem);
    expect(parsed.lenses.length).toBe(result.lenses.length);
    expect(parsed.meta.profileUsed).toBe(result.meta.profileUsed);
  });
});
