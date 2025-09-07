import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { ResultsDashboard } from '@/app/_components/results/ResultsDashboard';

export default async function ResultsPage({ params }) {
  const { id } = params;
  const cookieStore = cookies();
  const resultCookie = cookieStore.get(`analysis-result-${id}`);
  if (!resultCookie) {
    notFound();
  }
  const decodedData = Buffer.from(resultCookie.value, 'base64').toString('utf8');
  const cookieData = JSON.parse(decodedData);
  
  // Pass the entire cookieData object now
  return <ResultsDashboard reportData={cookieData} resultId={id} />;
}