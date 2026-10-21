import Link from 'next/link';
import { CoreSkills } from '@/components/feedback/core-skills';
import { PageHero } from '@/components/page-hero';
import { Button } from '@/components/ui/button';
import { latestSkills } from '@/lib/skills';

export default async function PracticeFeedbackPage() {
  const skills = await latestSkills();
  return (
    <>
      <PageHero title="How that practice went" lead="Each skill against your last ten scored practices." />
      <CoreSkills skills={skills} title="This practice" />
      <div className="mt-10 flex gap-3">
        <Button asChild><Link href="/practice">Practise again</Link></Button>
        <Button asChild variant="outline"><Link href="/journal">Log the real conversation</Link></Button>
      </div>
    </>
  );
}
