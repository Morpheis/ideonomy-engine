/**
 * Persistent reasoning sessions — save, load, and build on reasoning over time.
 */

import { readFileSync, writeFileSync, readdirSync, unlinkSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';
import type { ReasoningResult } from './types.js';

/** A single entry in a session's history */
export interface SessionEntry {
  type: 'reason' | 'drill' | 'chain' | 'synthesize';
  timestamp: string;
  result: ReasoningResult;
  /** Optional metadata (e.g., which lens was drilled, chain source/target) */
  meta?: Record<string, unknown>;
}

/** Input for adding an entry (timestamp auto-generated) */
export interface SessionEntryInput {
  type: SessionEntry['type'];
  result: ReasoningResult;
  meta?: Record<string, unknown>;
}

/** A persistent reasoning session */
export interface Session {
  id: string;
  problem: string;
  createdAt: string;
  updatedAt: string;
  history: SessionEntry[];
}

/** Default session storage directory (configurable via IDEONOMY_SESSIONS_DIR env) */
const DEFAULT_DIR = process.env.IDEONOMY_SESSIONS_DIR || join(
  process.env.HOME || process.env.USERPROFILE || '.',
  '.ideonomy',
  'sessions'
);

/**
 * Generate a short unique session ID.
 */
function generateId(): string {
  return randomBytes(6).toString('hex');
}

/**
 * Session store — manages persistent sessions on disk.
 */
export class SessionStore {
  private dir: string;

  constructor(dir: string = DEFAULT_DIR) {
    this.dir = dir;
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir, { recursive: true });
    }
  }

  private filePath(id: string): string {
    return join(this.dir, `${id}.json`);
  }

  /** Create a new session. */
  create(problem: string): Session {
    const now = new Date().toISOString();
    const session: Session = {
      id: generateId(),
      problem,
      createdAt: now,
      updatedAt: now,
      history: [],
    };
    writeFileSync(this.filePath(session.id), JSON.stringify(session, null, 2));
    return session;
  }

  /** Load a session by ID. Returns null if not found. */
  load(id: string): Session | null {
    const path = this.filePath(id);
    if (!existsSync(path)) return null;
    const data = readFileSync(path, 'utf-8');
    return JSON.parse(data) as Session;
  }

  /** List all sessions, sorted by updatedAt descending. */
  list(): Session[] {
    if (!existsSync(this.dir)) return [];
    const files = readdirSync(this.dir).filter(f => f.endsWith('.json'));
    const sessions = files.map(f => {
      const data = readFileSync(join(this.dir, f), 'utf-8');
      return JSON.parse(data) as Session;
    });
    return sessions.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  /** Delete a session. Returns true if deleted, false if not found. */
  delete(id: string): boolean {
    const path = this.filePath(id);
    if (!existsSync(path)) return false;
    unlinkSync(path);
    return true;
  }

  /** Add an entry to a session's history. */
  addEntry(id: string, input: SessionEntryInput): Session {
    const session = this.load(id);
    if (!session) {
      throw new Error(`Session not found: ${id}`);
    }

    const entry: SessionEntry = {
      type: input.type,
      timestamp: new Date().toISOString(),
      result: input.result,
      meta: input.meta,
    };

    session.history.push(entry);
    session.updatedAt = new Date().toISOString();
    writeFileSync(this.filePath(id), JSON.stringify(session, null, 2));
    return session;
  }

  /** Get all lenses from all reasoning entries in a session. */
  getAllLenses(id: string) {
    const session = this.load(id);
    if (!session) return [];
    return session.history
      .filter(e => e.type === 'reason')
      .flatMap(e => e.result.lenses);
  }

  /** Get the themes of all divisions already explored in a session. */
  getExploredThemes(id: string): string[] {
    const lenses = this.getAllLenses(id);
    return [...new Set(lenses.map(l => l.division.theme))];
  }
}

// --- Convenience functions using a default or custom store dir ---

export function createSession(problem: string, dir?: string): Session {
  return new SessionStore(dir).create(problem);
}

export function loadSession(id: string, dir?: string): Session | null {
  return new SessionStore(dir).load(id);
}

export function listSessions(dir?: string): Session[] {
  return new SessionStore(dir).list();
}

export function deleteSession(id: string, dir?: string): boolean {
  return new SessionStore(dir).delete(id);
}

export function addEntry(id: string, input: SessionEntryInput, dir?: string): Session {
  return new SessionStore(dir).addEntry(id, input);
}
