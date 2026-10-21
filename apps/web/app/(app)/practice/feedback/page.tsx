import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { CoreSkillsOverview } from './_components/core-skills-overview';
import { SAMPLE_FEEDBACK } from '@/lib/voice/feedback-list/feedback-list.core';

const LATEST = [
  { id: 'clarity', score: 78 },
  { id: 'listening', score: 64 },
  { id: 'composure', score: 71 },
  { id: 'asking', score: 49 },
  { id: 'closing', score: 82 },
] as const;

export default function PracticeFeedbackPage() {
  return (
    <>
      <PageHero title="Your practice feedback" lead="Every debrief, newest first." />
      <CoreSkillsOverview scores={[...LATEST]} />
      <ul className="mt-10 divide-y divide-border">
        {SAMPLE_FEEDBACK.map((item) => (
          <li key={item.practiceId} className="py-3">
            <Link href={`/practice/session/${item.practiceId}/feedback`} className="font-medium hover:underline">{item.scenario}</Link>
            <p className="text-sm text-muted-foreground">{item.headline}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
