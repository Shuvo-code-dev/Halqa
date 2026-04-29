import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Bulz | Project Hub',
  description: 'Architect real-world applications. Combine roadmap logic with Code Lab components to build high-performance developer projects.',
};

export default function Projects() {
  return <ProjectsClient />;
}
