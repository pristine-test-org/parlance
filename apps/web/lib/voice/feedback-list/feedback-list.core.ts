import type { FeedbackFilter, FeedbackItem, FeedbackListState, FeedbackListView } from './feedback-list.types';
import { AVERAGE_MINIMUM, AVERAGE_WINDOW } from '@/lib/voice/core-skill-average';

export const SAMPLE_FEEDBACK: FeedbackItem[] = [
  { practiceId: 'p-3', scenario: 'Salary review', endedAt: '2026-10-20T17:10:00Z', headline: 'You named the number early and held it.', weakest: 'asking', scored: true, weakestAgainstAverage: { delta: -6, direction: 'below' } },
  { practiceId: 'p-2', scenario: 'Hard feedback', endedAt: '2026-10-18T09:40:00Z', headline: 'Clear opening; the example came too late.', weakest: 'clarity', scored: true, weakestAgainstAverage: { delta: 1, direction: 'level' } },
  { practiceId: 'p-1', scenario: 'Saying no to a client', endedAt: '2026-10-15T15:05:00Z', headline: 'Steady under pressure, no next step agreed.', weakest: 'closing', scored: false },
];

export function initialFeedbackList(): FeedbackListState {
  return { items: SAMPLE_FEEDBACK, cursor: null, scoredCount: SAMPLE_FEEDBACK.filter((i) => i.scored).length };
}

/** The list as one filter shows it. */
export function viewOf(state: FeedbackListState, filter: FeedbackFilter): FeedbackListView {
  const items = state.items.filter((item) => {
    if (filter === 'scored') return item.scored;
    if (filter === 'below-average') return item.weakestAgainstAverage?.direction === 'below';
    return true;
  });
  return { filter, items, empty: items.length === 0 };
}

/** The line above the list: how many practices the averages read, and how many more they need. */
export function averageNote(state: FeedbackListState): string {
  const counted = Math.min(state.scoredCount, AVERAGE_WINDOW);
  if (counted < AVERAGE_MINIMUM) {
    const more = AVERAGE_MINIMUM - counted;
    return `Score ${more} more practice${more === 1 ? '' : 's'} to see your averages.`;
  }
  return `Averages read your last ${counted} scored practice${counted === 1 ? '' : 's'}.`;
}

/** The Monday that starts an item's week, as an ISO date. */
export function weekOf(endedAt: string): string {
  const day = new Date(endedAt);
  const offset = (day.getUTCDay() + 6) % 7;
  const monday = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate() - offset));
  return monday.toISOString().slice(0, 10);
}

export interface FeedbackWeek {
  week: string;
  items: FeedbackItem[];
  belowAverage: number;
}

/** The list grouped by week, newest week first, each with how many practices fell below average. */
export function groupByWeek(items: readonly FeedbackItem[]): FeedbackWeek[] {
  const weeks = new Map<string, FeedbackItem[]>();
  for (const item of [...items].sort((a, b) => b.endedAt.localeCompare(a.endedAt))) {
    const key = weekOf(item.endedAt);
    weeks.set(key, [...(weeks.get(key) ?? []), item]);
  }
  return [...weeks.entries()].map(([week, list]) => ({
    week,
    items: list,
    belowAverage: list.filter((i) => i.weakestAgainstAverage?.direction === 'below').length,
  }));
}

/** A week's heading: "This week", "Last week", or the Monday's date. */
export function weekLabel(week: string, today = new Date()): string {
  const thisWeek = weekOf(today.toISOString());
  if (week === thisWeek) return 'This week';
  const last = new Date(`${thisWeek}T00:00:00Z`);
  last.setUTCDate(last.getUTCDate() - 7);
  if (week === last.toISOString().slice(0, 10)) return 'Last week';
  return new Date(`${week}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
}

/** Adds a page of items, keeping each practice once and the newest first. */
export function appendPage(state: FeedbackListState, page: { items: FeedbackItem[]; cursor: string | null }): FeedbackListState {
  const seen = new Set(state.items.map((i) => i.practiceId));
  const items = [...state.items, ...page.items.filter((i) => !seen.has(i.practiceId))].sort((a, b) => b.endedAt.localeCompare(a.endedAt));
  return { items, cursor: page.cursor, scoredCount: items.filter((i) => i.scored).length };
}

/** Keeps the list's scroll position across visits in this tab. */
export function rememberScroll(key: string): () => void {
  const saved = Number(window.sessionStorage.getItem(key) ?? 0);
  window.scrollTo(0, saved);
  return () => window.sessionStorage.setItem(key, String(window.scrollY));
}
