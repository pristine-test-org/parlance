import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';
import { CoreSkillsOverview } from '../practice/feedback/_components/core-skills-overview';

const LATEST = [
  { id: 'clarity', score: 78 },
  { id: 'listening', score: 64 },
  { id: 'composure', score: 71 },
  { id: 'asking', score: 49 },
  { id: 'closing', score: 82 },
] as const;

export default function FeedbackPage() {
  return (
    <>
      <PageHero title="Feedback" lead="Debriefs from your practice sessions, with the evidence for every note." />
      <CoreSkillsOverview scores={[...LATEST]} />
      <div className="mt-10">
        <SectionHeading>Latest debrief</SectionHeading>
        <Card>You named the number early and held it. Next time, pause after the first objection.</Card>
      </div>
    </>
  );
}
