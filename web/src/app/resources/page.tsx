import { Metadata } from 'next';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Bulz | Development Toolks',
  description: 'The ultimate Swiss Army Knife for developers. Curated design tools, dev utilities, and elite learning hubs with expert Bulz insights.',
};

export default function Resources() {
  return <ResourcesClient />;
}
