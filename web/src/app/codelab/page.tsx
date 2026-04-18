import { Metadata } from 'next';
import CodeLabClient from './CodeLabClient';

export const metadata: Metadata = {
  title: 'Halqa | Code Lab',
  description: 'A premium library of glassmorphic, physics-animated UI components. Master modern design with direct source-code access.',
};

export default function CodeLab() {
  return <CodeLabClient />;
}
