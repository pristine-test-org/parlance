import { PageHero } from '@/components/page-hero';
import { ReportWhatHappened } from './_components/report/report-what-happened';

const MOMENTS = [
  { at: '0:42', said: 'I would like us to talk about my role this year.', note: 'A clear opening that names the topic.' },
  { at: '2:15', said: 'I think around ninety would be fair.', note: 'The number came early. Hold it after the first objection.' },
  { at: '5:30', said: 'Could we look at it again next quarter?', note: 'You conceded the date. Ask for a specific one.' },
];

export default async function PracticeReportPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  return (
    <>
      <PageHero title="Practice report" lead={`Session ${sessionId}`} />
      <ReportWhatHappened moments={MOMENTS} />
    </>
  );
}
