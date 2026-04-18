import { Metadata } from 'next';
import { Suspense } from 'react';
import CodeLabClient from './CodeLabClient';

export const metadata: Metadata = {
  title: 'Halqa | Code Lab',
  description: 'A premium library of glassmorphic, physics-animated UI components. Master modern design with direct source-code access.',
};

export default function CodeLab() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center gap-6 pt-32">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <span className="text-accent font-bold tracking-widest text-sm animate-pulse">
          PRE-LOADING VISUAL MODULES...
        </span>
      </div>
    }>
      <CodeLabClient />
    </Suspense>
  );
}
