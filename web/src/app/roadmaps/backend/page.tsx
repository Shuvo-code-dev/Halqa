'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../frontend/page.module.css';
import { useUser } from '@/context/UserContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const STAGES = [
  {
    id: '01',
    title: 'Node.js & NPM',
    description: 'The foundation of modern JS backend. Understand the V8 engine and the module ecosystem.',
    why: 'Node.js allows you to use your JS skills on the server, leveraging a massive ecosystem of pre-built tools via NPM.',
    topics: ['Event Loop', 'Package Management', 'File System API', 'Streams & Buffers'],
    guide: 'Build a local script that parses a directory of files and generates a JSON manifest. Focus on using async `fs` promises.',
    resource: 'https://nodejs.org/en/learn'
  },
  {
    id: '02',
    title: 'REST API Design',
    description: 'Master the architecture of communication. Build endpoints with Express and middleware.',
    why: 'APIs are the language of the modern web. Structuring them correctly ensures your frontend can fetch data reliably.',
    topics: ['Express.js', 'Middleware Pattern', 'HTTP Verbs', 'Error Handling'],
    guide: 'Create an API for a book library. Implement GET, POST, and DELETE routes. Ensure you validate request bodies using a schema library like Zod.',
    resource: 'https://expressjs.com/en/guide/routing.html'
  },
  {
    id: '03',
    title: 'Relational Databases',
    description: 'Master data persistence and schema design using PostgreSQL and SQL.',
    why: 'Stateless servers are useless without a source of truth. SQL allows for powerful, relational queries and data integrity.',
    topics: ['PostgreSQL Basics', 'Schema Migrations', 'Relationships (1:N, N:M)', 'Indexing'],
    guide: 'Set up a local PostgreSQL instance. Write raw SQL queries to join two tables of data before moving on to an ORM.',
    resource: 'https://www.postgresqltutorial.com/'
  },
  {
    id: '04',
    title: 'Backend Security',
    description: 'Protect your data. Master JWT, Hashing, and Scoped Authentication.',
    why: 'A backend without security is a liability. You must protect user data and restrict access to specific assets.',
    topics: ['JWT Authentication', 'Password Hashing (Bcrypt)', 'CORS Policy', 'Environment Variables'],
    guide: 'Implement a login route that returns a signed token. Use middleware to protect "Admin" routes from unauthenticated requests.',
    resource: 'https://auth0.com/docs/get-started/authentication-and-authorization-concepts'
  }
];

export default function BackendRoadmap() {
  const { toggleStageCompletion, isStageCompleted } = useUser();
  const [expandedStage, setExpandedStage] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapPath = '/roadmaps/backend';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(`.${styles.header} > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      });

      // Stage Reveals
      const stages = gsap.utils.toArray(`.${styles.stage}`);
      stages.forEach((stage: any) => {
        gsap.from(stage, {
          scrollTrigger: {
            trigger: stage,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  const handleToggleDone = (e: React.MouseEvent, stageId: string) => {
    e.stopPropagation();
    toggleStageCompletion(roadmapPath, stageId);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Backend <span className="text-gradient">Engineering</span></h1>
        <p className={styles.subtitle}>
          The curated path to building robust, scalable server-side applications and secure architectural foundations.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {STAGES.map((stage, index) => {
          const isDone = isStageCompleted(roadmapPath, stage.id);
          
          return (
            <div 
              key={stage.id} 
              className={`${styles.stage} ${expandedStage === index ? styles.open : ''} ${isDone ? styles.completed : ''}`}
              onClick={() => toggleStage(index)}
            >
              <div className={styles.stageNumber}>
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : stage.id}
              </div>
              
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
                    <button 
                      className={`${styles.completeToggle} ${isDone ? styles.isDone : ''}`}
                      onClick={(e) => handleToggleDone(e, stage.id)}
                    >
                      <div className={styles.check}>
                        {isDone ? (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg>
                        )}
                      </div>
                      {isDone ? 'Completed' : 'Mark as Complete'}
                    </button>
                  </div>
                </div>

                {index === 1 && (
                  <div className={styles.proTip} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.proTipHeader}>🧪 Lab Integration</div>
                    <p className={styles.proTipText}>
                      Need to simulate real-world API responses for your testing? Pull live mock data from the <Link href="/apilab" className={styles.proTipLink}>API Lab Repository</Link>.
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
          );
        })}

        <div className={styles.completion}>
          <div className={styles.completionIcon}>🏆</div>
          <h3 className={styles.completionTitle}>Backend Mastered</h3>
          <p className={styles.completionText}>You can now architect and deploy industrial-strength server systems.</p>
        </div>
      </div>
    </div>
  );
}
