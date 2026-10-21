import { describe, expect, it } from 'vitest';
import { againstAverage, bestStreak, focusSkill, skillAverage, summaryLine, type ScoredPractice } from '../core-skill-average';

const practice = (id: string, day: number, score: number): ScoredPractice => ({
  id,
  endedAt: new Date(Date.UTC(2026, 9, day)).toISOString(),
  skills: (['clarity', 'listening', 'composure', 'asking', 'closing'] as const).map((skill) => ({ id: skill, score })),
});

describe('core skills: focus', () => {
  const history = Array.from({ length: 12 }, (_, i) => practice(`p${i}`, i + 1, 50 + i));

  it('reads the last ten scored practices', () => {
    expect(skillAverage(history, 'clarity')).toBe(Math.round((52 + 61) / 2));
  });

  it('needs three practices before it shows an average', () => {
    expect(skillAverage(history.slice(0, 2), 'clarity')).toBeNull();
  });

  it('compares a practice with the ones before it', () => {
    const skills = againstAverage(practice('now', 20, 80), history);
    expect(skills.every((s) => s.direction === 'above')).toBe(true);
    expect(focusSkill(skills)?.id).toBeDefined();
    expect(summaryLine(skills)).toBe('5 above your average.');
  });

  it('counts a streak of practices at or above average', () => {
    expect(bestStreak(history, 'clarity')).toBeGreaterThan(0);
  });
});
