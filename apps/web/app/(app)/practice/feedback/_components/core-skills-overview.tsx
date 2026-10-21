import { CoreSkillChart } from '@/components/results/core-skill-chart';
import { SectionHeading } from '@/components/page-hero';
import type { CoreSkillScore } from '@/lib/voice/core-skill-average';

export function CoreSkillsOverview({ scores }: { scores: CoreSkillScore[] }) {
  return (
    <section className="space-y-3">
      <SectionHeading>Core skills</SectionHeading>
      <CoreSkillChart scores={scores} />
    </section>
  );
}
