import type { FeedbackItem, FeedbackListState } from './feedback-list.types';

export const SAMPLE_FEEDBACK: FeedbackItem[] = [
  { practiceId: 'p-3', scenario: 'Salary review', endedAt: '2026-10-20T17:10:00Z', headline: 'You named the number early and held it.', weakest: 'asking' },
  { practiceId: 'p-2', scenario: 'Hard feedback', endedAt: '2026-10-18T09:40:00Z', headline: 'Clear opening; the example came too late.', weakest: 'clarity' },
  { practiceId: 'p-1', scenario: 'Saying no to a client', endedAt: '2026-10-15T15:05:00Z', headline: 'Steady under pressure, no next step agreed.', weakest: 'closing' },
];

export function initialFeedbackList(): FeedbackListState {
  return { items: SAMPLE_FEEDBACK, cursor: null };
}

/** Keeps the list's scroll position across visits in this tab. */
export function rememberScroll(key: string): () => void {
  const saved = Number(window.sessionStorage.getItem(key) ?? 0);
  window.scrollTo(0, saved);
  return () => window.sessionStorage.setItem(key, String(window.scrollY));
}
