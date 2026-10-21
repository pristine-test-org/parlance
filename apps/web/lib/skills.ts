export type SkillId = 'clarity' | 'listening' | 'composure' | 'asking' | 'closing';

export interface SkillScore {
  id: SkillId;
  label: string;
  /** What the skill means, in one line, for the tooltip and the list. */
  hint: string;
  /** This practice's score, 0 to 100. */
  score: number;
  /** Scores of the last ten scored practices, oldest first. */
  history: number[];
}

export const SKILL_HINTS: Record<SkillId, { label: string; hint: string }> = {
  clarity: { label: 'Clarity', hint: 'Said the point early and in plain words.' },
  listening: { label: 'Listening', hint: 'Picked up what the counterpart said and used it.' },
  composure: { label: 'Composure', hint: 'Stayed steady when the counterpart pushed back.' },
  asking: { label: 'Asking', hint: 'Asked for the outcome directly.' },
  closing: { label: 'Closing', hint: 'Left with a next step and a date.' },
};

/** The average of the last ten scored practices, or null with fewer than three. */
export function recentAverage(history: number[]): number | null {
  const last = history.slice(-10);
  if (last.length < 3) return null;
  return Math.round(last.reduce((sum, n) => sum + n, 0) / last.length);
}

/** How far this practice sits from the recent average, in points. */
export function deltaFromAverage(skill: SkillScore): number | null {
  const average = recentAverage(skill.history);
  return average === null ? null : skill.score - average;
}

export function describeDelta(delta: number | null): string {
  if (delta === null) return 'Not enough practices yet';
  if (delta === 0) return 'Level with your average';
  return delta > 0 ? `${delta} above your average` : `${Math.abs(delta)} below your average`;
}

const build = (id: SkillId, score: number, history: number[]): SkillScore => ({ id, ...SKILL_HINTS[id], score, history });

/** A debrief's skills as the sample on the landing page and the empty states show them. */
export const SAMPLE_SKILLS: SkillScore[] = [
  build('clarity', 78, [52, 55, 61, 58, 64, 66, 70, 69, 72, 74]),
  build('listening', 64, [60, 62, 59, 65, 63, 66, 61, 64, 67, 65]),
  build('composure', 71, [40, 44, 49, 53, 55, 58, 60, 63, 66, 68]),
  build('asking', 49, [58, 57, 55, 56, 54, 53, 55, 52, 51, 50]),
  build('closing', 82, [70, 71, 73, 72, 75, 74, 77, 78, 79, 80]),
];

/** The member's latest debrief, from the realtime service; the sample until it answers. */
export async function latestSkills(): Promise<SkillScore[]> {
  const base = process.env.REALTIME_API_URL;
  if (!base) return SAMPLE_SKILLS;
  const response = await fetch(`${base}/v1/debriefs/latest/skills`, { cache: 'no-store' });
  if (!response.ok) return SAMPLE_SKILLS;
  return (await response.json()) as SkillScore[];
}
