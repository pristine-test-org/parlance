import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Counterparts" lead="The people you practise with." />
      <SectionHeading>Your counterparts</SectionHeading>
      <Card>Ren, your manager · Odile, a demanding client</Card>
    </>
  );
}
