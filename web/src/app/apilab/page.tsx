import { Metadata } from 'next';
import ApiLabClient from './ApiLabClient';

export const metadata: Metadata = {
  title: 'Halqa | API Lab',
  description: 'Master public data streams. Explore, test, and integrate high-performance APIs directly from the Halqa ecosystem.',
};

export default function ApiLab() {
  return <ApiLabClient />;
}
