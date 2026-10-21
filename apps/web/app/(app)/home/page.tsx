import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Welcome back" lead="Your next conversation is on Thursday. One more practice will get you there." />
      <SectionHeading>Up next</SectionHeading>
      <Card>Practise the salary review with Ren, your counterpart, for 6 minutes.</Card>
    </>
  );
}
