/**
 * Core skill scores and their running averages. Shared by every page that
 * shows a score, and by the practice session, which keeps the last scores in
 * the browser between sessions.
 *
 * Core Skills read against the average of the last ten scored practices
 * (COM-2738): a practice that was never scored, or was scored with fewer than
 * five skills, does not count towards it, and an average needs three scored
 * practices before it is shown at all.
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
export const AVERAGE_WINDOW = 10;

/** Fewer scored practices than this and no average is shown. */
export const AVERAGE_MINIMUM = 3;

/** A practice counts towards an average only when every core skill was scored. */
export function isFullyScored(practice: ScoredPractice): boolean {
  return CORE_SKILLS.every((skill) => practice.skills.some((s) => s.id === skill.id && Number.isFinite(s.score)));
}

/** The mean of a list of scores, rounded; null for an empty list. */
export function mean(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/** The newest fully scored practices, newest first, at most {@link AVERAGE_WINDOW}. */
export function averageWindow(practices: readonly ScoredPractice[], excluding?: string): ScoredPractice[] {
  return [...practices]
    .filter((p) => p.id !== excluding && isFullyScored(p))
    .sort((a, b) => b.endedAt.localeCompare(a.endedAt))
    .slice(0, AVERAGE_WINDOW);
}

/** A skill's average over the newest scored practices, or null with fewer than {@link AVERAGE_MINIMUM}. */
export function skillAverage(practices: readonly ScoredPractice[], skill: CoreSkillId, excluding?: string): number | null {
  const window_ = averageWindow(practices, excluding);
  if (window_.length < AVERAGE_MINIMUM) return null;
  return mean(window_.flatMap((p) => p.skills.filter((s) => s.id === skill).map((s) => s.score)));
}

export type SkillDirection = 'above' | 'level' | 'below' | 'unknown';

export interface SkillAgainstAverage {
  id: CoreSkillId;
  label: string;
  hint: string;
  score: number;
  average: number | null;
  delta: number | null;
  direction: SkillDirection;
  /** The skill's scores in the window, oldest first, for the small trend line. */
  trend: number[];
}

/** Points either side of the average that still read as level. */
export const LEVEL_BAND = 2;

export function directionOf(delta: number | null): SkillDirection {
  if (delta === null) return 'unknown';
  if (Math.abs(delta) <= LEVEL_BAND) return 'level';
  return delta > 0 ? 'above' : 'below';
}

/** One practice's core skills, each against the average of the practices before it. */
export function againstAverage(practice: ScoredPractice, history: readonly ScoredPractice[]): SkillAgainstAverage[] {
  const window_ = averageWindow(history, practice.id);
  return CORE_SKILLS.map((skill) => {
    const score = practice.skills.find((s) => s.id === skill.id)?.score ?? 0;
    const average = window_.length < AVERAGE_MINIMUM ? null : mean(window_.flatMap((p) => p.skills.filter((s) => s.id === skill.id).map((s) => s.score)));
    const delta = average === null ? null : score - average;
    const trend = [...window_].reverse().flatMap((p) => p.skills.filter((s) => s.id === skill.id).map((s) => s.score));
    return { ...skill, score, average, delta, direction: directionOf(delta), trend };
  });
}

/** The skill to work on next: the one furthest below its average, else the lowest score. */
export function focusSkill(skills: readonly SkillAgainstAverage[]): SkillAgainstAverage | null {
  if (skills.length === 0) return null;
  const below = skills.filter((s) => s.direction === 'below').sort((a, b) => (a.delta ?? 0) - (b.delta ?? 0));
  return below[0] ?? [...skills].sort((a, b) => a.score - b.score)[0] ?? null;
}

export function describeAgainstAverage(skill: Pick<SkillAgainstAverage, 'delta' | 'direction'>): string {
  switch (skill.direction) {
    case 'unknown':
      return `Your average shows after ${AVERAGE_MINIMUM} scored practices`;
    case 'level':
      return 'In line with your average';
    case 'above':
      return `${skill.delta} above your average`;
    case 'below':
      return `${Math.abs(skill.delta ?? 0)} below your average`;
  }
}

/** A skill's scores across every fully scored practice, oldest first. */
export function skillHistory(practices: readonly ScoredPractice[], skill: CoreSkillId): { practiceId: string; endedAt: string; score: number }[] {
  return [...practices]
    .filter(isFullyScored)
    .sort((a, b) => a.endedAt.localeCompare(b.endedAt))
    .map((p) => ({ practiceId: p.id, endedAt: p.endedAt, score: p.skills.find((s) => s.id === skill)?.score ?? 0 }));
}

/** The longest run of practices in a row where a skill was at or above its average at the time. */
export function bestStreak(practices: readonly ScoredPractice[], skill: CoreSkillId): number {
  const ordered = [...practices].filter(isFullyScored).sort((a, b) => a.endedAt.localeCompare(b.endedAt));
  let best = 0;
  let run = 0;
  ordered.forEach((practice, i) => {
    const before = ordered.slice(Math.max(0, i - AVERAGE_WINDOW), i);
    if (before.length < AVERAGE_MINIMUM) return;
    const average = mean(before.map((p) => p.skills.find((s) => s.id === skill)?.score ?? 0));
    const score = practice.skills.find((s) => s.id === skill)?.score ?? 0;
    run = average !== null && score >= average ? run + 1 : 0;
    best = Math.max(best, run);
  });
  return best;
}

/** How many skills moved each way, for the summary line above a debrief. */
export function directionCounts(skills: readonly SkillAgainstAverage[]): Record<SkillDirection, number> {
  const counts: Record<SkillDirection, number> = { above: 0, level: 0, below: 0, unknown: 0 };
  for (const skill of skills) counts[skill.direction] += 1;
  return counts;
}

/** One sentence on the whole practice against the average, or null before an average exists. */
export function summaryLine(skills: readonly SkillAgainstAverage[]): string | null {
  const counts = directionCounts(skills);
  if (counts.unknown === skills.length) return null;
  const parts: string[] = [];
  if (counts.above) parts.push(`${counts.above} above`);
  if (counts.level) parts.push(`${counts.level} in line with`);
  if (counts.below) parts.push(`${counts.below} below`);
  if (parts.length === 0) return null;
  const last = parts.pop();
  const joined = parts.length ? `${parts.join(', ')} and ${last}` : last;
  return `${joined} your average.`;
}

/** The overall score of a practice: the mean of its five skills. */
export function overallScore(practice: ScoredPractice): number | null {
  if (!isFullyScored(practice)) return null;
  return mean(practice.skills.map((s) => s.score));
}

/** The overall average across the window, for the line under the chart. */
export function overallAverage(practices: readonly ScoredPractice[], excluding?: string): number | null {
  const window_ = averageWindow(practices, excluding);
  if (window_.length < AVERAGE_MINIMUM) return null;
  return mean(window_.map((p) => overallScore(p) ?? 0));
}

const STORE_KEY = 'parlance.recent-scores';
/** Fired on the window when this browser's kept scores change, so open pages redraw their averages. */
export const SCORES_CHANGED = 'parlance:scores-changed';

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
  window.dispatchEvent(new CustomEvent(SCORES_CHANGED, { detail: { practiceId: practice.id, kept: kept.length } }));
}
