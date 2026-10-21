import { PageHero, SectionHeading } from '@/components/page-hero';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <PageHero title="Design system" lead="Every primitive, in both themes. Internal." />
      <SectionHeading>Primitives</SectionHeading>
      <Card>Buttons, cards, headings and form fields as the app uses them.</Card>
    </>
  );
}
