import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Support" lead="We answer within a working day." />
      <SectionHeading>Contact</SectionHeading>
      <Card>Write to help@parlance.example and include what you were doing.</Card>
    </>
  );
}
