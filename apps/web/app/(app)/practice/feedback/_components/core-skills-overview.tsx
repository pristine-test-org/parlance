import Link from 'next/link';
import { CoreSkillChart, CoreSkillChartKey } from '@/components/results/core-skill-chart';
import { SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';
import {
  AVERAGE_MINIMUM,
  type CoreSkillScore,
  AVERAGE_WINDOW,
  againstAverage,
  averageWindow,
  focusSkill,
  type ScoredPractice,
} from '@/lib/voice/core-skill-average';

/** The scored practices the overview reads until the scoring service answers. */
const HISTORY: ScoredPractice[] = Array.from({ length: 11 }, (_, i) => ({
  id: `h-${i}`,
  endedAt: new Date(Date.UTC(2026, 8, 1 + i * 4)).toISOString(),
  skills: [
    { id: 'clarity', score: 58 + i * 2 },
    { id: 'listening', score: 60 + (i % 4) },
    { id: 'composure', score: 45 + i * 2 },
    { id: 'asking', score: 57 - (i % 5) },
    { id: 'closing', score: 70 + i },
  ],
}));

const LATEST: ScoredPractice = {
  id: 'latest',
  endedAt: '2026-10-20T17:10:00Z',
  skills: [
    { id: 'clarity', score: 78 },
    { id: 'listening', score: 64 },
    { id: 'composure', score: 71 },
    { id: 'asking', score: 49 },
    { id: 'closing', score: 82 },
  ],
};

/**
 * The feedback page's Core Skills: the newest practice against the average of
 * the last ten scored practices, the skill to work on next, and how many
 * practices the average reads.
 */
export function CoreSkillsOverview({ scores, practice: given, history = HISTORY }: { scores?: CoreSkillScore[]; practice?: ScoredPractice; history?: ScoredPractice[] }) {
  // A caller that still passes bare scores gets them read as the newest practice.
  const practice = given ?? (scores ? { ...LATEST, skills: scores } : LATEST);
  const skills = againstAverage(practice, history);
  const counted = averageWindow(history, practice.id).length;
  const focus = focusSkill(skills);
  const ready = counted >= AVERAGE_MINIMUM;
  return (
    <section aria-labelledby="core-skills-heading" className="space-y-5">
      <div id="core-skills-heading">
        <SectionHeading>Core skills</SectionHeading>
      </div>
      {ready ? (
        <p className="max-w-prose text-pretty text-muted-foreground">
          Your newest practice against the average of your last {counted} scored practices.
        </p>
      ) : (
        <p className="max-w-prose text-pretty text-muted-foreground">
          Score {AVERAGE_MINIMUM - counted} more practice{AVERAGE_MINIMUM - counted === 1 ? '' : 's'} to compare each skill with your average.
        </p>
      )}
      {focus ? (
        <Card variant="hero">
          <p className="text-sm text-muted-foreground">Work on next</p>
          <p className="mt-1 text-lg font-semibold">{focus.label}</p>
          <p className="mt-1 max-w-prose text-pretty text-muted-foreground">{focus.hint}</p>
          <Link href="/practice" className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline">
            Practise {focus.label.toLowerCase()}
          </Link>
        </Card>
      ) : null}
      <CoreSkillChart skills={skills} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {skills.map((skill) => (
          <li key={skill.id} className="rounded-md border border-border p-3 [overflow-wrap:anywhere]">
            <p className="text-sm font-medium">{skill.label}</p>
            <p className="text-sm text-muted-foreground">{skill.hint}</p>
          </li>
        ))}
      </ul>
      {ready ? <CoreSkillChartKey window={Math.min(counted, AVERAGE_WINDOW)} /> : null}
    </section>
  );
}
