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
      title: 'Roadmap Not Found | Halqa',
    };
  }

  return {
    title: `Halqa | Learn ${roadmap.id.toUpperCase()}`,
    description: roadmap.subtitle,
    openGraph: {
      title: `Halqa | ${roadmap.id.toUpperCase()} Roadmap`,
      description: roadmap.subtitle,
    }
  };
}

export default function RoadmapViewer() {
  return <RoadmapClient />;
}
