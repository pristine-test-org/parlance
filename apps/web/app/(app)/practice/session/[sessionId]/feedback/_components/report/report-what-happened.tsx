import { SectionHeading } from '@/components/page-hero';

export function ReportWhatHappened({ moments }: { moments: { at: string; said: string; note: string }[] }) {
  return (
    <section className="space-y-3">
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
    </section>
  );
}
