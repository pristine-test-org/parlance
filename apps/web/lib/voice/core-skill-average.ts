/**
 * Core skill scores and their running averages. Shared by every page that
 * shows a score, and by the practice session, which keeps the last scores in
 * the browser between sessions.
 */
export type CoreSkillId = 'clarity' | 'listening' | 'composure' | 'asking' | 'closing';

export const CORE_SKILLS: readonly { id: CoreSkillId; label: string; hint: string }[] = [
  { id: 'clarity', label: 'Clarity', hint: 'Said the point early and in plain words.' },
  { id: 'listening', label: 'Listening', hint: 'Picked up what the counterpart said and used it.' },
  { id: 'composure', label: 'Composure', hint: 'Stayed steady when the counterpart pushed back.' },
  { id: 'asking', label: 'Asking', hint: 'Asked for the outcome directly.' },
  { id: 'closing', label: 'Closing', hint: 'Left with a next step and a date.' },
];

export interface CoreSkillScore {
  id: CoreSkillId;
  score: number;
}

export interface ScoredPractice {
  id: string;
  endedAt: string;
  skills: CoreSkillScore[];
}

/** How many scored practices an average reads. */
export const AVERAGE_WINDOW = 5;

/** The mean of a list of scores, rounded; null for an empty list. */
export function mean(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/** A skill's average over the newest practices. */
export function skillAverage(practices: readonly ScoredPractice[], skill: CoreSkillId): number | null {
  const newest = [...practices].sort((a, b) => b.endedAt.localeCompare(a.endedAt)).slice(0, AVERAGE_WINDOW);
  return mean(newest.flatMap((p) => p.skills.filter((s) => s.id === skill).map((s) => s.score)));
}

const STORE_KEY = 'parlance.recent-scores';

/** The scores kept in this browser, newest last. */
export function readStoredPractices(): ScoredPractice[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORE_KEY) ?? '[]') as ScoredPractice[];
  } catch {
    return [];
  }
}

export function storePractice(practice: ScoredPractice): void {
  if (typeof window === 'undefined') return;
  const kept = [...readStoredPractices().filter((p) => p.id !== practice.id), practice].slice(-AVERAGE_WINDOW);
  window.localStorage.setItem(STORE_KEY, JSON.stringify(kept));
}
