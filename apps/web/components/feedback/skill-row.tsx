import { SkillTrend } from '@/components/feedback/skill-trend';
import { deltaFromAverage, describeDelta, recentAverage, type SkillScore } from '@/lib/skills';
import { cn } from '@/lib/utils';

export function SkillRow({ skill, compact = false }: { skill: SkillScore; compact?: boolean }) {
  const average = recentAverage(skill.history);
  const delta = deltaFromAverage(skill);
  return (
    <li className={cn('grid items-center gap-4 py-3', compact ? 'grid-cols-[1fr_auto]' : 'grid-cols-[minmax(0,1fr)_auto_7rem]')}>
      <div className="min-w-0">
        <p className="font-medium">{skill.label}</p>
        {compact ? null : <p className="truncate text-sm text-muted-foreground">{skill.hint}</p>}
      </div>
      <SkillTrend history={skill.history} score={skill.score} average={average} label={skill.label} />
      {compact ? null : (
        <div className="text-right">
          <p className="font-mono text-lg tabular-nums">{skill.score}</p>
          <p className={cn('text-xs', delta !== null && delta < 0 ? 'text-destructive-label' : 'text-muted-foreground')}>{describeDelta(delta)}</p>
        </div>
      )}
    </li>
  );
}
