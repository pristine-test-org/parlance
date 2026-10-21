import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Settings" lead="Notifications, voice and privacy." />
      <SectionHeading>Notifications</SectionHeading>
      <Card>Email me a reminder the day before a planned conversation.</Card>
    </>
  );
}
