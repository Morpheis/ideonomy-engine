#!/usr/bin/env node

import { Command } from 'commander';
import { reason } from './engine.js';
import { formatMarkdown, formatConcise } from './formatters/markdown.js';
import { formatJson } from './formatters/json.js';
import { profiles } from './profiles.js';
import { reasoningDivisions, reasoningDivisionsByTheme } from './data/divisions.js';
import { SessionStore } from './sessions.js';
import { drill } from './drill.js';
import { chain } from './chain.js';
import { synthesize } from './synthesis.js';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync } from 'fs';

const program = new Command();

program
  .name('ideonomy')
  .description('Ideonomic reasoning engine — structured creative thinking through systematic idea lenses')
  .version('0.2.0');

// === REASON ===

program
  .command('reason')
  .description('Analyze a problem through ideonomic lenses')
  .argument('<problem>', 'The problem or question to analyze')
  .option('-p, --profile <id>', 'Use a specific reasoning profile')
  .option('-d, --divisions <themes>', 'Comma-separated division themes')
  .option('-l, --lenses <count>', 'Number of lenses to generate', parseInt)
  .option('-s, --session <id>', 'Add result to an existing session')
  .option('--synthesize', 'Include synthesis of tensions/convergences/surprises')
  .option('--json', 'Output as JSON')
  .option('--concise', 'Output concise format (core questions only)')
  .action((problem: string, opts: {
    profile?: string; divisions?: string; lenses?: number;
    session?: string; synthesize?: boolean;
    json?: boolean; concise?: boolean;
  }) => {
    const options: { profile?: string; divisions?: string[]; lensCount?: number } = {};
    if (opts.profile) options.profile = opts.profile;
    if (opts.divisions) options.divisions = opts.divisions.split(',').map(s => s.trim());
    if (opts.lenses) options.lensCount = opts.lenses;

    const result = reason(problem, options);

    // Save to session if specified
    if (opts.session) {
      const store = new SessionStore();
      store.addEntry(opts.session, { type: 'reason', result });
      console.log(`📎 Saved to session ${opts.session}\n`);
    }

    if (opts.json) {
      const output: Record<string, unknown> = { ...result };
      if (opts.synthesize) {
        output.synthesis = synthesize(result);
      }
      console.log(JSON.stringify(output, null, 2));
    } else if (opts.concise) {
      console.log(formatConcise(result));
      if (opts.synthesize) {
        const syn = synthesize(result);
        console.log('\n--- Synthesis ---');
        console.log(syn.summary);
      }
    } else {
      console.log(formatMarkdown(result));
      if (opts.synthesize) {
        const syn = synthesize(result);
        console.log('\n# Synthesis\n');
        console.log(syn.summary);
        if (syn.tensions.length > 0) {
          console.log('\n## Tensions');
          for (const t of syn.tensions) {
            console.log(`- **${t.lens1} ↔ ${t.lens2}:** ${t.description}`);
          }
        }
        if (syn.convergences.length > 0) {
          console.log('\n## Convergences');
          for (const c of syn.convergences) {
            console.log(`- **${c.lenses.join(' + ')}:** ${c.description}`);
          }
        }
        if (syn.surprises.length > 0) {
          console.log('\n## Surprises');
          for (const s of syn.surprises) {
            console.log(`- **${s.lens}:** ${s.description}`);
          }
        }
      }
    }
  });

// === DRILL ===

program
  .command('drill')
  .description('Go deeper on a single division — expanded analysis with sub-questions')
  .argument('<theme>', 'Division theme to drill into (e.g., ANALOGIES)')
  .argument('<problem>', 'The problem or question to analyze')
  .option('-s, --session <id>', 'Add result to an existing session')
  .option('--json', 'Output as JSON')
  .action((theme: string, problem: string, opts: { session?: string; json?: boolean }) => {
    const result = drill(theme, problem);

    if (opts.session) {
      const store = new SessionStore();
      // Wrap drill result in a ReasoningResult-compatible structure for session storage
      const sessionResult = reason(problem, { divisions: [theme] });
      store.addEntry(opts.session, {
        type: 'drill',
        result: sessionResult,
        meta: { drilledTheme: theme, subQuestions: result.subQuestions },
      });
      console.log(`📎 Saved drill to session ${opts.session}\n`);
    }

    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`# 🔍 Deep Dive: ${result.division.theme} (${result.division.binomen})\n`);
      console.log(`> ${result.coreQuestion}\n`);

      console.log('## Guiding Questions');
      for (let i = 0; i < result.guidingQuestions.length; i++) {
        console.log(`${i + 1}. ${result.guidingQuestions[i]}`);
      }

      console.log('\n## Sub-Questions (Deeper Exploration)');
      for (let i = 0; i < result.subQuestions.length; i++) {
        console.log(`${i + 1}. ${result.subQuestions[i]}`);
      }

      console.log('\n## Cross-Domain Sparks (Expanded)');
      for (const prompt of result.crossDomainPrompts) {
        console.log(`- ${prompt}`);
      }

      console.log('\n## Conceptual Palette (Expanded)');
      for (const entry of result.relevantOrganonItems) {
        console.log(`**${entry.list}:** ${entry.items.join(', ')}`);
      }
    }
  });

// === CHAIN ===

program
  .command('chain')
  .description('Chain two lenses — apply output of one as input to another')
  .argument('<source>', 'Source division theme (e.g., ANALOGIES)')
  .argument('<target>', 'Target division theme (e.g., PARADOXES)')
  .argument('<problem>', 'The problem or question to analyze')
  .option('-s, --session <id>', 'Add result to an existing session')
  .option('--json', 'Output as JSON')
  .action((source: string, target: string, problem: string, opts: { session?: string; json?: boolean }) => {
    const sourceResult = reason(problem, { divisions: [source], lensCount: 1 });
    const result = chain(sourceResult.lenses[0], target, problem);

    if (opts.session) {
      const store = new SessionStore();
      const sessionResult = reason(problem, { divisions: [source, target] });
      store.addEntry(opts.session, {
        type: 'chain',
        result: sessionResult,
        meta: { sourceLens: source, targetLens: target, bridgeInsights: result.bridgeInsights },
      });
      console.log(`📎 Saved chain to session ${opts.session}\n`);
    }

    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`# ⛓️ Chain: ${result.sourceLens} → ${result.targetLens}\n`);
      console.log(`**Problem:** ${problem}\n`);

      console.log('## Bridge Insights');
      for (let i = 0; i < result.bridgeInsights.length; i++) {
        console.log(`${i + 1}. ${result.bridgeInsights[i]}`);
      }

      console.log('\n## Chain Prompts (Intersection Zone)');
      for (const prompt of result.chainPrompts) {
        console.log(`- ${prompt}`);
      }

      console.log(`\n## Target Analysis: ${result.result.division.theme}`);
      console.log(`> ${result.result.coreQuestion}\n`);
      for (let i = 0; i < result.result.guidingQuestions.length; i++) {
        console.log(`${i + 1}. ${result.result.guidingQuestions[i]}`);
      }
    }
  });

// === SYNTHESIZE ===

program
  .command('synthesize')
  .description('Synthesize insights across lenses — find tensions, convergences, surprises')
  .argument('<problem>', 'The problem or question to analyze')
  .option('-p, --profile <id>', 'Use a specific reasoning profile')
  .option('-d, --divisions <themes>', 'Comma-separated division themes')
  .option('-l, --lenses <count>', 'Number of lenses', parseInt)
  .option('--json', 'Output as JSON')
  .action((problem: string, opts: { profile?: string; divisions?: string; lenses?: number; json?: boolean }) => {
    const options: { profile?: string; divisions?: string[]; lensCount?: number } = {};
    if (opts.profile) options.profile = opts.profile;
    if (opts.divisions) options.divisions = opts.divisions.split(',').map(s => s.trim());
    if (opts.lenses) options.lensCount = opts.lenses;

    const result = reason(problem, options);
    const syn = synthesize(result);

    if (opts.json) {
      console.log(JSON.stringify({ reasoning: result, synthesis: syn }, null, 2));
    } else {
      console.log('# 🧬 Synthesis\n');
      console.log(syn.summary);

      if (syn.tensions.length > 0) {
        console.log('\n## ⚡ Tensions');
        for (const t of syn.tensions) {
          console.log(`\n### ${t.lens1} ↔ ${t.lens2}`);
          console.log(t.description);
        }
      }

      if (syn.convergences.length > 0) {
        console.log('\n## 🎯 Convergences');
        for (const c of syn.convergences) {
          console.log(`\n### ${c.lenses.join(' + ')}`);
          console.log(c.description);
        }
      }

      if (syn.surprises.length > 0) {
        console.log('\n## 💡 Surprises');
        for (const s of syn.surprises) {
          console.log(`\n### ${s.lens}`);
          console.log(s.description);
        }
      }
    }
  });

// === SESSION MANAGEMENT ===

const sessionCmd = program
  .command('session')
  .description('Manage reasoning sessions');

sessionCmd
  .command('create')
  .description('Create a new reasoning session')
  .argument('<problem>', 'The problem this session explores')
  .action((problem: string) => {
    const store = new SessionStore();
    const session = store.create(problem);
    console.log(`✅ Session created: ${session.id}`);
    console.log(`   Problem: ${session.problem}`);
    console.log(`\nUse --session ${session.id} with reason/drill/chain to build on it.`);
  });

sessionCmd
  .command('list')
  .description('List all sessions')
  .action(() => {
    const store = new SessionStore();
    const sessions = store.list();
    if (sessions.length === 0) {
      console.log('No sessions found.');
      return;
    }
    for (const s of sessions) {
      const entryCount = s.history.length;
      const themes = store.getExploredThemes(s.id);
      console.log(`${s.id}  "${s.problem}"`);
      console.log(`  ${entryCount} entries | Updated: ${s.updatedAt}`);
      if (themes.length > 0) {
        console.log(`  Explored: ${themes.join(', ')}`);
      }
      console.log();
    }
  });

sessionCmd
  .command('show')
  .description('Show session details')
  .argument('<id>', 'Session ID')
  .option('--json', 'Output as JSON')
  .action((id: string, opts: { json?: boolean }) => {
    const store = new SessionStore();
    const session = store.load(id);
    if (!session) {
      console.error(`Session not found: ${id}`);
      process.exit(1);
    }

    if (opts.json) {
      console.log(JSON.stringify(session, null, 2));
    } else {
      console.log(`# Session: ${session.id}\n`);
      console.log(`**Problem:** ${session.problem}`);
      console.log(`**Created:** ${session.createdAt}`);
      console.log(`**Updated:** ${session.updatedAt}`);
      console.log(`**Entries:** ${session.history.length}\n`);

      for (let i = 0; i < session.history.length; i++) {
        const entry = session.history[i];
        const themes = entry.result.lenses.map(l => l.division.theme).join(', ');
        console.log(`${i + 1}. [${entry.type}] ${entry.timestamp} — ${themes}`);
        if (entry.meta) {
          console.log(`   Meta: ${JSON.stringify(entry.meta)}`);
        }
      }
    }
  });

sessionCmd
  .command('delete')
  .description('Delete a session')
  .argument('<id>', 'Session ID')
  .action((id: string) => {
    const store = new SessionStore();
    if (store.delete(id)) {
      console.log(`✅ Session ${id} deleted.`);
    } else {
      console.error(`Session not found: ${id}`);
      process.exit(1);
    }
  });

// === REFERENCE COMMANDS ===

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

program
  .command('skill')
  .description('Display the SKILL.md — teaches agents how to use ideonomy')
  .option('--path', 'Print the file path instead of the content')
  .action((opts) => {
    const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
    const skillPath = join(packageRoot, 'skill', 'SKILL.md');

    if (!existsSync(skillPath)) {
      console.error(`SKILL.md not found at ${skillPath}`);
      process.exit(1);
    }

    if (opts.path) {
      console.log(skillPath);
    } else {
      console.log(readFileSync(skillPath, 'utf-8'));
    }
  });

program.parse();
