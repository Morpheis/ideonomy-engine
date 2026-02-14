import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import {
  createSession,
  loadSession,
  listSessions,
  deleteSession,
  addEntry,
  SessionStore,
} from '../src/sessions.js';
import { reason } from '../src/engine.js';

let tempDir: string;
let store: SessionStore;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'ideonomy-test-'));
  store = new SessionStore(tempDir);
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('SessionStore', () => {
  it('creates a session with an id and problem', () => {
    const session = store.create('How do I improve collaboration?');
    expect(session.id).toBeTruthy();
    expect(session.problem).toBe('How do I improve collaboration?');
    expect(session.history).toHaveLength(0);
    expect(session.createdAt).toBeTruthy();
    expect(session.updatedAt).toBeTruthy();
  });

  it('generates unique session ids', () => {
    const s1 = store.create('problem 1');
    const s2 = store.create('problem 2');
    expect(s1.id).not.toBe(s2.id);
  });

  it('persists session to disk', () => {
    const session = store.create('test persistence');
    const filePath = join(tempDir, `${session.id}.json`);
    expect(existsSync(filePath)).toBe(true);
  });

  it('loads a session by id', () => {
    const session = store.create('load test');
    const loaded = store.load(session.id);
    expect(loaded).toBeDefined();
    expect(loaded!.id).toBe(session.id);
    expect(loaded!.problem).toBe('load test');
  });

  it('returns null for nonexistent session', () => {
    const loaded = store.load('nonexistent-id');
    expect(loaded).toBeNull();
  });

  it('lists all sessions', () => {
    store.create('session 1');
    store.create('session 2');
    store.create('session 3');
    const sessions = store.list();
    expect(sessions).toHaveLength(3);
  });

  it('list returns sessions sorted by updatedAt descending', () => {
    const s1 = store.create('first');
    const s2 = store.create('second');
    // Add an entry to s1 to make it most recently updated
    const result = reason('first');
    store.addEntry(s1.id, { type: 'reason', result });

    const sessions = store.list();
    // s1 was updated most recently (via addEntry), should be first
    expect(sessions[0].id).toBe(s1.id);
  });

  it('deletes a session', () => {
    const session = store.create('delete me');
    expect(store.load(session.id)).not.toBeNull();
    store.delete(session.id);
    expect(store.load(session.id)).toBeNull();
  });

  it('delete returns false for nonexistent session', () => {
    const result = store.delete('nonexistent');
    expect(result).toBe(false);
  });
});

describe('Session entries', () => {
  it('adds a reasoning entry to a session', () => {
    const session = store.create('test entries');
    const result = reason('test entries', { profile: 'creative', lensCount: 3 });

    store.addEntry(session.id, {
      type: 'reason',
      result,
    });

    const loaded = store.load(session.id)!;
    expect(loaded.history).toHaveLength(1);
    expect(loaded.history[0].type).toBe('reason');
    expect(loaded.history[0].timestamp).toBeTruthy();
    expect(loaded.history[0].result).toBeDefined();
  });

  it('adds multiple entries preserving order', () => {
    const session = store.create('multi entry');
    const r1 = reason('multi entry', { profile: 'creative', lensCount: 2 });
    const r2 = reason('multi entry', { profile: 'technical', lensCount: 2 });

    store.addEntry(session.id, { type: 'reason', result: r1 });
    store.addEntry(session.id, { type: 'reason', result: r2 });

    const loaded = store.load(session.id)!;
    expect(loaded.history).toHaveLength(2);
    expect(loaded.history[0].result.meta.profileUsed).toBe('creative');
    expect(loaded.history[1].result.meta.profileUsed).toBe('technical');
  });

  it('updates updatedAt when adding entries', () => {
    const session = store.create('update time');
    const originalUpdated = new Date(session.updatedAt).getTime();

    const result = reason('update time');
    store.addEntry(session.id, { type: 'reason', result });

    const loaded = store.load(session.id)!;
    const newUpdated = new Date(loaded.updatedAt).getTime();
    // updatedAt should be >= original (same ms is fine, just not before)
    expect(newUpdated).toBeGreaterThanOrEqual(originalUpdated);
    // And it should be a valid ISO string
    expect(new Date(loaded.updatedAt).toISOString()).toBe(loaded.updatedAt);
  });

  it('throws when adding entry to nonexistent session', () => {
    const result = reason('orphan');
    expect(() => store.addEntry('nonexistent', { type: 'reason', result }))
      .toThrow();
  });
});

describe('Convenience functions (default store)', () => {
  it('createSession returns a session', () => {
    const session = createSession('convenience test', tempDir);
    expect(session.id).toBeTruthy();
    expect(session.problem).toBe('convenience test');
  });

  it('loadSession retrieves a created session', () => {
    const session = createSession('load convenience', tempDir);
    const loaded = loadSession(session.id, tempDir);
    expect(loaded).not.toBeNull();
    expect(loaded!.problem).toBe('load convenience');
  });

  it('listSessions returns all sessions', () => {
    createSession('s1', tempDir);
    createSession('s2', tempDir);
    const sessions = listSessions(tempDir);
    expect(sessions).toHaveLength(2);
  });

  it('deleteSession removes a session', () => {
    const session = createSession('delete me', tempDir);
    deleteSession(session.id, tempDir);
    expect(loadSession(session.id, tempDir)).toBeNull();
  });

  it('addEntry adds to a session', () => {
    const session = createSession('entry test', tempDir);
    const result = reason('entry test');
    addEntry(session.id, { type: 'reason', result }, tempDir);
    const loaded = loadSession(session.id, tempDir)!;
    expect(loaded.history).toHaveLength(1);
  });
});
