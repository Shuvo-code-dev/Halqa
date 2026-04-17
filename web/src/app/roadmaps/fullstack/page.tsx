'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../frontend/page.module.css';

const STAGES = [
  {
    id: '01',
    title: 'React & Component Architecture',
    description: 'The foundation of the modern stack. Master UI composition and hooks.',
    why: 'React logic drives the user experience. Mastering reusable components is key to scaling frontend complexity.',
    topics: ['Hooks (useState, useEffect)', 'Context API', 'Performance (Memoization)', 'Custom Hooks'],
    guide: 'Deconstruct a professional landing page into a hierarchy of atomic components. Focus on minimizing state complexity.',
    resource: 'https://react.dev/learn'
  },
  {
    id: '02',
    title: 'Node.js & REST Integration',
    description: 'Construct reliable server endpoints mapped to pure HTTP verbs.',
    why: 'Servers bridge the UI to the database. REST remains the standard for robust, stateless communication.',
    topics: ['Express Middleware', 'HTTP Codes & Verbs', 'JSON Modeling', 'CORS & Security'],
    guide: 'Connect your React frontend to a local Express server. Implement a search feature that fetches data purely through your custom API.',
    resource: 'https://expressjs.com/'
  },
  {
    id: '03',
    title: 'Next.js App Router (SSR)',
    description: 'Shift into the Next.js src/app dimension. Master Server Components.',
    why: 'Next.js provides the best performance for SEO and user interaction by balancing server and client logic.',
    topics: ['Server Components', 'Streaming (Suspense)', 'Edge Caching', 'Static vs Dynamic Rendering'],
    guide: 'Rebuild your application using the App Router. Use Server Components for data fetching to eliminate client-side waterfall effects.',
    resource: 'https://nextjs.org/docs'
  },
  {
    id: '04',
    title: 'Database Persistence (ORM)',
    description: 'Unify the stack with type-safe database models using Prisma or Drizzle.',
    why: 'Type-safety shouldn\'t end at the API. ORMs ensure your database schema matches your frontend types perfectly.',
    topics: ['Prisma Schema Design', 'Relational Mapping', 'NextAuth Identity', 'Deployment (Vercel)'],
    guide: 'Integrate Prisma with your Next.js app. Use the `prisma-client` inside your Server Components to fetch and mutate data securely.',
    resource: 'https://www.prisma.io/docs'
  }
];

export default function FullstackRoadmap() {
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Full-Stack <span className="text-gradient">Engineering</span></h1>
        <p className={styles.subtitle}>
          The elite MERN + Next.js path mapping interface logic directly into production database schemas.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {STAGES.map((stage, index) => (
          <div 
            key={stage.id} 
            className={`${styles.stage} ${expandedStage === index ? styles.open : ''}`}
            onClick={() => toggleStage(index)}
          >
            <div className={styles.stageNumber}>{stage.id}</div>
            
            <div className={styles.stageHeader}>
              <div>
                <h2 className={styles.stageTitle}>{stage.title}</h2>
                <p className={styles.stageDescription}>{stage.description}</p>
              </div>
              <div className={styles.chevron}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className={`${styles.stageDetails} ${expandedStage === index ? styles.open : ''}`}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailBlock}>
                  <div className={styles.detailTitle}>The "Why"</div>
                  <p className={styles.detailText}>{stage.why}</p>
                </div>

                <div className={styles.detailBlock}>
                  <div className={styles.detailTitle}>Core Topics</div>
                  <ul className={styles.topicList}>
                    {stage.topics.map((topic, tIdx) => (
                      <li key={tIdx} className={styles.topicItem}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.detailBlock}>
                  <div className={styles.detailTitle}>Actionable Guide</div>
                  <p className={styles.detailText}>{stage.guide}</p>
                </div>
              </div>

              {index === 0 && (
                <div className={styles.proTip} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.proTipHeader}>🧪 Lab Integration</div>
                  <p className={styles.proTipText}>
                    Want to see elite component composition? Pull the <Link href="/codelab" className={styles.proTipLink}>Apple-Style Bento Grid</Link> into your next project.
                  </p>
                </div>
              )}

              <a 
                href={stage.resource} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.deepDiveBtn}
                onClick={(e) => e.stopPropagation()}
              >
                Deep Dive Resources
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        ))}

        <div className={styles.completion}>
          <div className={styles.completionIcon}>🚀</div>
          <h3 className={styles.completionTitle}>Full-Stack Mastered</h3>
          <p className={styles.completionText}>You can build, deploy, and scale anything on the modern web.</p>
        </div>
      </div>
    </div>
  );
}
