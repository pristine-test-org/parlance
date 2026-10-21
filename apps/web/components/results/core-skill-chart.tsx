import { describeAgainstAverage, type SkillAgainstAverage } from '@/lib/voice/core-skill-average';
import { cn } from '@/lib/utils';

/** The small line of a skill's scores across the average window, the newest point the practice being read. */
function TrendLine({ trend, score, label }: { trend: number[]; score: number; label: string }) {
  const points = [...trend, score];
  if (points.length < 2) return null;
  const width = 96;
  const height = 24;
  const step = width / (points.length - 1);
  const path = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(height - (v / 100) * height).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-6 w-24 text-muted-foreground" role="img" aria-label={`${label} over your last ${trend.length} scored practices`}>
      <path d={path} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <circle cx={width} cy={height - (score / 100) * height} r={2.5} className="fill-accent" />
    </svg>
  );
}

/** The bar for one skill, with the average marked on it. */
function SkillBar({ score, average }: { score: number; average: number | null }) {
  return (
    <span className="relative block h-2 rounded-full bg-muted">
      <span className="block h-2 rounded-full bg-primary" style={{ width: `${score}%` }} />
      {average !== null ? (
        <span className="absolute -top-1 h-4 w-0.5 rounded-full bg-foreground" style={{ left: `${average}%` }} aria-hidden />
      ) : null}
    </span>
  );
}

const DIRECTION_TONE = {
  above: 'text-foreground',
  level: 'text-muted-foreground',
  below: 'text-destructive-label',
  unknown: 'text-muted-foreground',
} as const;

/** One practice's core skills, each with its bar, its average and how it moved. */
export function CoreSkillChart({ skills, showTrend = true }: { skills: SkillAgainstAverage[]; showTrend?: boolean }) {
  return (
    <ul className="space-y-4">
      {skills.map((skill) => (
        <li key={skill.id} className={cn('grid items-center gap-x-3 gap-y-1', showTrend ? 'grid-cols-[7rem_1fr_6rem_3rem]' : 'grid-cols-[7rem_1fr_3rem]')}>
          <span className="text-sm font-medium">{skill.label}</span>
          <SkillBar score={skill.score} average={skill.average} />
          {showTrend ? <TrendLine trend={skill.trend} score={skill.score} label={skill.label} /> : null}
          <span className="text-right font-mono text-sm tabular-nums">{skill.score}</span>
          <span className={cn('col-start-2 col-end-[-1] text-xs', DIRECTION_TONE[skill.direction])}>{describeAgainstAverage(skill)}</span>
        </li>
      ))}
    </ul>
  );
}

/** The key under the chart: what the mark on each bar means. */
export function CoreSkillChartKey({ window: count }: { window: number }) {
  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="inline-block h-3 w-0.5 rounded-full bg-foreground" aria-hidden />
      Your average over the last {count} scored practices
    </p>
  );
}
