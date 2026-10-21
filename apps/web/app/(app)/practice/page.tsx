import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Practice" lead="Pick a scenario and talk it through out loud." />
      <SectionHeading>Recent sessions</SectionHeading>
      <Card>No sessions yet. Start with one of the scenarios.</Card>
    </>
  );
}
