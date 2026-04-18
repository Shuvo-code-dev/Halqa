import { Metadata } from 'next';
import { Suspense } from 'react';
import ApiLabClient from './ApiLabClient';

export const metadata: Metadata = {
  title: 'Halqa | API Lab',
  description: 'Master public data streams. Explore, test, and integrate high-performance APIs directly from the Halqa ecosystem.',
};

export default function ApiLab() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center gap-6 pt-32">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <span className="text-accent font-bold tracking-widest text-sm animate-pulse">
          INITIALIZING API DISCOVERY ENGINE...
        </span>
      </div>
    }>
      <ApiLabClient />
    </Suspense>
  );
}
