import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Journal" lead="How the real conversations went." />
      <SectionHeading>Entries</SectionHeading>
      <Card>
        <p>Nothing logged yet. Add an entry after your next real conversation.</p>
        <p className="mt-2 text-sm text-muted-foreground">Try three lines: what you asked for, what they said, what you would change.</p>
      </Card>
    </>
  );
}
