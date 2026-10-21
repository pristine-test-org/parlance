import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Profile" lead="How Parlance knows you." />
      <SectionHeading>About you</SectionHeading>
      <Card>Product designer, five years in, preparing for a promotion case.</Card>
    </>
  );
}
