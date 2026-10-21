import { CoreSkills } from '@/components/feedback/core-skills';
import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';
import { latestSkills } from '@/lib/skills';

export default async function FeedbackPage() {
  const skills = await latestSkills();
  return (
    <>
      <PageHero title="Feedback" lead="Debriefs from your practice sessions, with the evidence for every note." />
      <Card variant="hero" className="mb-10">
        <CoreSkills skills={skills} />
      </Card>
      <SectionHeading>Latest debrief</SectionHeading>
      <Card>You named the number early and held it. Next time, pause after the first objection.</Card>
    </>
  );
}
