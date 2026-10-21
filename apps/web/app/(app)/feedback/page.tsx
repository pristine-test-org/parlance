import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Feedback" lead="Debriefs from your practice sessions, with the evidence for every note." />
      <SectionHeading>Latest debrief</SectionHeading>
      <Card>You named the number early and held it. Next time, pause after the first objection.</Card>
    </>
  );
}
