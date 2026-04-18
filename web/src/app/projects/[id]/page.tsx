import { Metadata } from 'next';
import { PROJECT_REGISTRY } from '@lib/project-registry';
import ProjectBuildGuideClient from './ProjectBuildGuideClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECT_REGISTRY[id];

  if (!project) {
    return {
      title: 'Project Not Found | Halqa',
    };
  }

  return {
    title: `Halqa | Build ${project.title}`,
    description: project.description,
    openGraph: {
      title: `Build Guide: ${project.title} | Halqa`,
      description: project.description,
    }
  };
}

export default function ProjectBuildGuide() {
  return <ProjectBuildGuideClient />;
}
