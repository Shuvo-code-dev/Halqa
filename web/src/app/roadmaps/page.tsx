import { Metadata } from 'next';
import RoadmapsClient from './RoadmapsClient';

export const metadata: Metadata = {
  title: 'Bulz | Learning Roadmaps',
  description: 'Master the code with high-performance roadmaps. Step-by-step paths for Frontend, Backend, Mobile, and Computer Science.',
};

export default function Roadmaps() {
  return <RoadmapsClient />;
}
