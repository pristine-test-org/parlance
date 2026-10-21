import type { CoreSkillId } from '@/lib/voice/core-skill-average';

export interface FeedbackItem {
  practiceId: string;
  scenario: string;
  endedAt: string;
  headline: string;
  weakest: CoreSkillId;
}

export interface FeedbackListState {
  items: FeedbackItem[];
  cursor: string | null;
}
