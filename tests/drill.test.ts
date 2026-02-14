import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { drill } from '../src/drill.js';
import { reason } from '../src/engine.js';
import { SessionStore } from '../src/sessions.js';
import { reasoningDivisionsByTheme } from '../src/data/divisions.js';

let tempDir: string;
let store: SessionStore;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'ideonomy-drill-'));
  store = new SessionStore(tempDir);
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('drill', () => {
  it('generates a deeper analysis for a specific division', () => {
    const result = drill('ANALOGIES', 'How can AI agents collaborate?');
    expect(result.division.theme).toBe('ANALOGIES');
    expect(result.coreQuestion).toContain('How can AI agents collaborate?');
  });

  it('generates more cross-domain prompts than standard lens', () => {
    const standard = reason('test problem', { divisions: ['ANALOGIES'], lensCount: 1 });
    const drilled = drill('ANALOGIES', 'test problem');

    expect(drilled.crossDomainPrompts.length).toBeGreaterThan(
      standard.lenses[0].crossDomainPrompts.length
    );
  });

  it('generates more organon items per list than standard lens', () => {
    const standard = reason('test problem', { divisions: ['ANALOGIES'], lensCount: 1 });
    const drilled = drill('ANALOGIES', 'test problem');

    const standardMaxItems = Math.max(
      ...standard.lenses[0].relevantOrganonItems.map(o => o.items.length)
    );
    const drilledMaxItems = Math.max(
      ...drilled.relevantOrganonItems.map(o => o.items.length)
    );

    expect(drilledMaxItems).toBeGreaterThan(standardMaxItems);
  });

  it('generates sub-questions derived from guiding questions', () => {
    const drilled = drill('ANALOGIES', 'How do distributed systems handle failure?');
    expect(drilled.subQuestions).toBeDefined();
    expect(drilled.subQuestions.length).toBeGreaterThan(0);
    // Sub-questions should reference the problem domain
    const allText = drilled.subQuestions.join(' ');
    expect(allText.length).toBeGreaterThan(0);
  });

  it('includes all standard lens fields', () => {
    const drilled = drill('CAUSES', 'Why do projects fail?');
    expect(drilled.division).toBeDefined();
    expect(drilled.coreQuestion).toBeTruthy();
    expect(drilled.guidingQuestions.length).toBeGreaterThan(0);
    expect(drilled.relevantOrganonItems.length).toBeGreaterThan(0);
    expect(drilled.crossDomainPrompts.length).toBeGreaterThan(0);
  });

  it('works with different divisions', () => {
    const themes = ['ANALOGIES', 'CAUSES', 'PATTERNS', 'PARADOXES', 'FIRST PRINCIPLES'];
    for (const theme of themes) {
      const drilled = drill(theme, 'test problem');
      expect(drilled.division.theme).toBe(theme);
      expect(drilled.subQuestions.length).toBeGreaterThan(0);
    }
  });

  it('throws on unknown division', () => {
    expect(() => drill('NONEXISTENT', 'problem')).toThrow();
  });

  it('is deterministic', () => {
    const r1 = drill('ANALOGIES', 'test problem');
    const r2 = drill('ANALOGIES', 'test problem');
    expect(r1.subQuestions).toEqual(r2.subQuestions);
    expect(r1.crossDomainPrompts).toEqual(r2.crossDomainPrompts);
  });
});
