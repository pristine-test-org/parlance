import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Scenarios" lead="Situations built from what you told us, ready to rehearse." />
      <SectionHeading>Your scenarios</SectionHeading>
      <Card>Salary review · Giving hard feedback · Saying no to a client</Card>
    </>
  );
}
