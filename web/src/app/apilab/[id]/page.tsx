import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getApiById } from '@/lib/api-service';
import TesterClient from './TesterClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const api = getApiById(id);

  if (!api) {
    return {
      title: 'API Not Found | Halqa',
    };
  }

  return {
    title: `Halqa | Test ${api.name}`,
    description: `Real-time testing and integration for the ${api.name} API. View documentation and hit live endpoints.`,
    openGraph: {
      title: `API Tester: ${api.name} | Halqa`,
      description: api.description,
    }
  };
}

export default async function ApiTesterPage({ params }: Props) {
  const { id } = await params;
  const api = getApiById(id);

  if (!api) notFound();

  return <TesterClient api={api} />;
}
