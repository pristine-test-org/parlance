import { cn } from '@/lib/utils';

/** Ten small bars, the last one the practice being read; the dashed line is the recent average. */
export function SkillTrend({ history, score, average, label }: { history: number[]; score: number; average: number | null; label: string }) {
  const bars = [...history.slice(-9), score];
  return (
    <div className="relative flex h-10 items-end gap-0.5" role="img" aria-label={`${label}: ${score} this practice${average === null ? '' : `, average ${average}`}`}>
      {average !== null ? (
        <span className="pointer-events-none absolute inset-x-0 border-t border-dashed border-muted-foreground/60" style={{ bottom: `${average}%` }} aria-hidden />
      ) : null}
      {bars.map((value, i) => (
        <span
          key={i}
          className={cn('w-2 rounded-sm', i === bars.length - 1 ? 'bg-accent' : 'bg-muted-foreground/30')}
          style={{ height: `${Math.max(4, value)}%` }}
          aria-hidden
        />
      ))}
    </div>
  );
}
