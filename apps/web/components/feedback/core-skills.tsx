import { SkillRow } from '@/components/feedback/skill-row';
import { SectionHeading } from '@/components/page-hero';
import type { SkillScore } from '@/lib/skills';

/** The five core skills of one practice, each against the average of the last ten scored practices. */
export function CoreSkills({ skills, title = 'Core skills', compact = false }: { skills: SkillScore[]; title?: string; compact?: boolean }) {
  const ranked = [...skills].sort((a, b) => a.score - b.score);
  const weakest = ranked[0];
  return (
    <section aria-labelledby="core-skills-heading" className="space-y-3">
      <div id="core-skills-heading">
        <SectionHeading>{title}</SectionHeading>
      </div>
      {weakest && !compact ? (
        <p className="max-w-prose text-pretty text-muted-foreground">
          Work on <span className="font-medium text-foreground">{weakest.label.toLowerCase()}</span> next: {weakest.hint.charAt(0).toLowerCase() + weakest.hint.slice(1)}
        </p>
      ) : null}
      <ul className="divide-y divide-border">
        {skills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} compact={compact} />
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">The dashed line is your average over the last ten scored practices.</p>
    </section>
  );
}
