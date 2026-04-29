import { Metadata } from 'next';
import { ROADMAP_REGISTRY } from '@lib/roadmap-registry';
import RoadmapClient from './RoadmapClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = ROADMAP_REGISTRY[slug];

  if (!roadmap) {
    return {
      title: 'Roadmap Not Found | Bulz',
    };
  }

  return {
    title: `Bulz | Learn ${roadmap.id.toUpperCase()}`,
    description: roadmap.subtitle,
    openGraph: {
      title: `Bulz | ${roadmap.id.toUpperCase()} Roadmap`,
      description: roadmap.subtitle,
    }
  };
}

export default function RoadmapViewer() {
  return <RoadmapClient />;
}
