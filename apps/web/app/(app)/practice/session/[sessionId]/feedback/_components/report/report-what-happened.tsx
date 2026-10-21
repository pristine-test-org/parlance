import { CoreSkillChart } from '@/components/results/core-skill-chart';
import { SectionHeading } from '@/components/page-hero';
import { againstAverage, focusSkill, isFullyScored, type ScoredPractice } from '@/lib/voice/core-skill-average';

interface Moment {
  at: string;
  said: string;
  note: string;
}

/**
 * The report's "What happened": the moments that mattered, then this
 * practice's Core Skills against the average of the practices before it.
 */
export function ReportWhatHappened({ moments, practice, history = [] }: { moments: Moment[]; practice?: ScoredPractice; history?: ScoredPractice[] }) {
  const scored = practice ? isFullyScored(practice) : false;
  const skills = practice && scored ? againstAverage(practice, history) : [];
  const focus = focusSkill(skills);
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <SectionHeading>What happened</SectionHeading>
        <ol className="space-y-4">
          {moments.map((m) => (
            <li key={m.at} className="grid grid-cols-[4rem_1fr] gap-3">
              <span className="font-mono text-sm text-muted-foreground">{m.at}</span>
              <div>
                <p>“{m.said}”</p>
                <p className="text-sm text-muted-foreground">{m.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-3">
        <SectionHeading>Core skills</SectionHeading>
        {scored ? (
          <>
            <CoreSkillChart skills={skills} showTrend={false} />
            {focus ? (
              <p className="max-w-prose text-pretty text-muted-foreground">
                Next time, work on <span className="font-medium text-foreground">{focus.label.toLowerCase()}</span>: {focus.hint.charAt(0).toLowerCase()}
                {focus.hint.slice(1)}
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-muted-foreground">This practice was too short to score every skill, so it does not count towards your averages.</p>
        )}
      </div>
    </section>
  );
}
