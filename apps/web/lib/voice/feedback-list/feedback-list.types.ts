import type { CoreSkillId, SkillDirection } from '@/lib/voice/core-skill-average';

export interface FeedbackItem {
  practiceId: string;
  scenario: string;
  endedAt: string;
  headline: string;
  weakest: CoreSkillId;
  /** Whether every core skill was scored, so the practice counts towards the averages. */
  scored: boolean;
  /** The weakest skill against the average of the practices before this one. */
  weakestAgainstAverage?: { delta: number | null; direction: SkillDirection };
}

export interface FeedbackListState {
  items: FeedbackItem[];
  cursor: string | null;
  /** How many of the listed practices count towards the averages. */
  scoredCount: number;
}

export type FeedbackFilter = 'all' | 'scored' | 'below-average';

export interface FeedbackListView {
  filter: FeedbackFilter;
  items: FeedbackItem[];
  empty: boolean;
}
