import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Journal" lead="How the real conversations went." />
      <SectionHeading>Entries</SectionHeading>
      <Card>Nothing logged yet. Add an entry after your next real conversation.</Card>
    </>
  );
}
