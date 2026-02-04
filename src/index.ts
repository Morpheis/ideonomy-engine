#!/usr/bin/env node

import { Command } from 'commander';
import { reason } from './engine.js';
import { formatMarkdown, formatConcise } from './formatters/markdown.js';
import { formatJson } from './formatters/json.js';
import { profiles } from './profiles.js';
import { reasoningDivisions, reasoningDivisionsByTheme } from './data/divisions.js';

const program = new Command();

program
  .name('ideonomy')
  .description('Ideonomic reasoning engine — structured creative thinking through systematic idea lenses')
  .version('0.1.0');

program
  .command('reason')
  .description('Analyze a problem through ideonomic lenses')
  .argument('<problem>', 'The problem or question to analyze')
  .option('-p, --profile <id>', 'Use a specific reasoning profile')
  .option('-d, --divisions <themes>', 'Comma-separated division themes')
  .option('-l, --lenses <count>', 'Number of lenses to generate', parseInt)
  .option('--json', 'Output as JSON')
  .option('--concise', 'Output concise format (core questions only)')
  .action((problem: string, opts: { profile?: string; divisions?: string; lenses?: number; json?: boolean; concise?: boolean }) => {
    const options: { profile?: string; divisions?: string[]; lensCount?: number } = {};
    if (opts.profile) options.profile = opts.profile;
    if (opts.divisions) options.divisions = opts.divisions.split(',').map(s => s.trim());
    if (opts.lenses) options.lensCount = opts.lenses;

    const result = reason(problem, options);

    if (opts.json) {
      console.log(formatJson(result));
    } else if (opts.concise) {
      console.log(formatConcise(result));
    } else {
      console.log(formatMarkdown(result));
    }
  });

program
  .command('profiles')
  .description('List all available reasoning profiles')
  .action(() => {
    for (const p of profiles) {
      console.log(`${p.id} — ${p.name}`);
      console.log(`  ${p.description}`);
      console.log(`  Divisions: ${p.divisionThemes.join(', ')}`);
      console.log();
    }
  });

program
  .command('divisions')
  .description('List all reasoning divisions')
  .action(() => {
    for (const d of reasoningDivisions) {
      console.log(`${d.theme} (${d.binomen}) — ${d.coreQuestion}`);
    }
  });

program
  .command('division')
  .description('Show details for a specific division')
  .argument('<theme>', 'Division theme (e.g., ANALOGIES)')
  .action((theme: string) => {
    const d = reasoningDivisionsByTheme.get(theme.toUpperCase());
    if (!d) {
      console.error(`Unknown division: ${theme}`);
      console.error(`Available: ${[...reasoningDivisionsByTheme.keys()].join(', ')}`);
      process.exit(1);
    }
    console.log(`# ${d.theme} (${d.binomen})`);
    console.log();
    console.log(`**Core Question:** ${d.coreQuestion}`);
    console.log();
    console.log('**Keywords:** ' + d.keywords.join(', '));
    console.log();
    console.log('**Guiding Questions:**');
    for (let i = 0; i < d.guidingQuestions.length; i++) {
      console.log(`${i + 1}. ${d.guidingQuestions[i]}`);
    }
  });

program.parse();
