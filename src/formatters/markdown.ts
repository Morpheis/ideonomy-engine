import type { ReasoningResult } from '../types.js';

/**
 * Format a reasoning result as rich Markdown.
 */
export function formatMarkdown(result: ReasoningResult): string {
  const lines: string[] = [];

  lines.push('# Ideonomic Analysis');
  lines.push('');
  lines.push(`**Problem:** ${result.problem}`);
  lines.push(`**Profile:** ${result.profile.name} | **Lenses:** ${result.lenses.length}`);
  lines.push('');
  lines.push('---');

  for (const lens of result.lenses) {
    lines.push('');
    lines.push(`## 🔍 ${lens.division.theme} (${lens.division.binomen})`);
    lines.push('');
    lines.push(`> ${lens.coreQuestion}`);
    lines.push('');

    lines.push('### Guiding Questions');
    for (let i = 0; i < lens.guidingQuestions.length; i++) {
      lines.push(`${i + 1}. ${lens.guidingQuestions[i]}`);
    }
    lines.push('');

    lines.push('### Cross-Domain Sparks');
    for (const prompt of lens.crossDomainPrompts) {
      lines.push(`- ${prompt}`);
    }
    lines.push('');

    lines.push('### Conceptual Palette');
    for (const entry of lens.relevantOrganonItems) {
      lines.push(`**${entry.list}:** ${entry.items.join(', ')}`);
    }
    lines.push('');
    lines.push('---');
  }

  return lines.join('\n');
}

/**
 * Format a reasoning result as concise output — just core questions.
 */
export function formatConcise(result: ReasoningResult): string {
  const lines: string[] = [];

  lines.push(`# Ideonomic Analysis: ${result.problem}`);

  for (const lens of result.lenses) {
    lines.push(`${lens.division.theme}: ${lens.coreQuestion}`);
  }

  return lines.join('\n');
}
