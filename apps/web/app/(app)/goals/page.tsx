import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Goals" lead="What you want the real conversation to achieve." />
      <SectionHeading>Active goals</SectionHeading>
      <Card>Leave the salary review with a number and a date.</Card>
    </>
  );
}
