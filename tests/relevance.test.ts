import { describe, it, expect } from 'vitest';
import { scoreRelevance, pickRelevantItems } from '../src/relevance.js';
import { organonLists } from '../src/data/organons.js';

describe('scoreRelevance', () => {
  it('scores items higher when they match problem keywords', () => {
    const items = ['Physics', 'Biology', 'Psychology', 'Art History', 'Cooking'];
    const scores = items.map(item => ({
      item,
      score: scoreRelevance(item, 'quantum physics experiment'),
    }));

    const physicsScore = scores.find(s => s.item === 'Physics')!.score;
    const cookingScore = scores.find(s => s.item === 'Cooking')!.score;
    expect(physicsScore).toBeGreaterThan(cookingScore);
  });

  it('returns 0 for completely unrelated items', () => {
    const score = scoreRelevance('Fermentation', 'How do I optimize database queries?');
    // May not be exactly 0 but should be very low
    expect(score).toBeLessThanOrEqual(1);
  });

  it('scores higher for direct substring matches', () => {
    const directScore = scoreRelevance('Emergence', 'How does emergence happen in complex systems?');
    const indirectScore = scoreRelevance('Erosion', 'How does emergence happen in complex systems?');
    expect(directScore).toBeGreaterThan(indirectScore);
  });

  it('is case-insensitive', () => {
    const score1 = scoreRelevance('Physics', 'PHYSICS problem');
    const score2 = scoreRelevance('physics', 'Physics problem');
    expect(score1).toBe(score2);
  });
});

describe('pickRelevantItems', () => {
  it('returns requested number of items', () => {
    const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const picked = pickRelevantItems(items, 'test', 4);
    expect(picked).toHaveLength(4);
  });

  it('picks more relevant items for science-related problems', () => {
    const sciencesList = organonLists.find(l => l.id === 'sciences')!;
    const picked = pickRelevantItems(
      sciencesList.items,
      'How does quantum entanglement affect information theory?',
      5
    );
    // Should include at least one of Physics, Quantum Mechanics, Information Theory
    const relevant = ['Physics', 'Quantum Mechanics', 'Information Theory'];
    const hasRelevant = picked.some(p => relevant.includes(p));
    expect(hasRelevant).toBe(true);
  });

  it('picks more relevant items for emotion-related problems', () => {
    const emotionsList = organonLists.find(l => l.id === 'emotions')!;
    const picked = pickRelevantItems(
      emotionsList.items,
      'Why do people feel anxious about public speaking?',
      5
    );
    // Should include at least one of Anxiety, Fear, Apprehension, Dread
    const relevant = ['Anxiety', 'Fear', 'Apprehension', 'Dread', 'Trepidation'];
    const hasRelevant = picked.some(p => relevant.includes(p));
    expect(hasRelevant).toBe(true);
  });

  it('is deterministic for same input', () => {
    const items = organonLists[0].items;
    const r1 = pickRelevantItems(items, 'test problem', 5);
    const r2 = pickRelevantItems(items, 'test problem', 5);
    expect(r1).toEqual(r2);
  });

  it('handles count > items length', () => {
    const items = ['a', 'b', 'c'];
    const picked = pickRelevantItems(items, 'test', 10);
    expect(picked).toHaveLength(3);
  });

  it('returns different items for different problems', () => {
    const sciencesList = organonLists.find(l => l.id === 'sciences')!;
    const r1 = pickRelevantItems(sciencesList.items, 'quantum physics mechanics', 5);
    const r2 = pickRelevantItems(sciencesList.items, 'social psychology behavior', 5);
    // At least some items should differ
    const overlap = r1.filter(i => r2.includes(i));
    expect(overlap.length).toBeLessThan(5);
  });
});
