'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const STAGES = [
  {
    id: '01',
    title: 'HTML Foundations',
    description: 'HyperText Markup Language is the backbone of every website. Master semantic structure for SEO and accessibility.',
    why: 'Without proper HTML, search engines and assistive technology are blind. It is the structural integrity of your application.',
    topics: ['Semantic Elements', 'ARIA Roles', 'Forms & Tables', 'Meta Tags'],
    guide: 'Start by building a pure HTML skeletal layout of a complex dashboard. Focus strictly on using correct tags (<main>, <section>, <article>) before adding any CSS.',
    resource: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  {
    id: '02',
    title: 'Modern CSS',
    description: 'Cascading Style Sheets turn documents into professional layouts. Master Flexbox and CSS Grid.',
    why: 'Pixel-perfect precision and responsiveness are the hallmarks of a pro. Modern CSS allows for complex layouts without heavy JS.',
    topics: ['Flexbox & Grid', 'Custom Properties', 'Media Queries', 'CSS Transitions'],
    guide: 'Apply a "Mobile First" approach. Define your base styles for smaller screens and layer in Grid complexities as you move to desktop breakpoints.',
    resource: 'https://developer.mozilla.org/en-US/docs/Learn/CSS'
  },
  {
    id: '03',
    title: 'JavaScript Logic',
    description: 'The engine of the web. Master data types, async operations, and the Event Loop.',
    why: 'Logic is the difference between a static page and a functioning product. JavaScript handles every user interaction.',
    topics: ['ES6+ Syntax', 'Async/Await', 'DOM API', 'Closures & Scope'],
    guide: 'Avoid using libraries early on. Build a task manager using only vanilla JS and LocalStorage to understand state persistence and DOM updates.',
    resource: 'https://javascript.info/'
  },
  {
    id: '04',
    title: 'Version Control',
    description: 'Learn how to manage code, track changes, and collaborate with teams effectively using Git.',
    why: 'Collaborative engineering is impossible without Git. It provides a historical immutable record of your work.',
    topics: ['Branching Strategies', 'Pull Requests', 'Merge Conflicts', 'Rebasing'],
    guide: 'Use the CLI for Git. Mastering the command line commands (commit, push, rebase) is far faster and more reliable than any GUI.',
    resource: 'https://git-scm.com/doc'
  },
  {
    id: '05',
    title: 'React Mastery',
    description: 'Master state management, component composition, and hooks to build complex UIs.',
    why: 'React is the industry standard for UI architecture. It allows for declarative, predictable, and reusable component systems.',
    topics: ['Hooks API', 'Context Provider', 'Props Drilling', 'Memoization'],
    guide: 'Focus on "Thinking in React". Break down your UI into a hierarchy of components and identify the minimal representation of state.',
    resource: 'https://react.dev/learn'
  },
  {
    id: '06',
    title: 'Next.js & Deployment',
    description: 'Build production-ready, SEO-optimized, full-stack React framework apps.',
    why: 'Next.js bridges the gap between frontend and backend, providing absolute performance and developer experience.',
    topics: ['App Router', 'Server Components', 'Edge Caching', 'API Routes'],
    guide: 'Migrate your React apps to Next.js to leverage Server-Side Rendering (SSR). Deploy your result to Vercel for instant public access.',
    resource: 'https://nextjs.org/learn'
  }
];

import { useUser } from '@/context/UserContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

export default function FrontendRoadmap() {
  const { toggleStageCompletion, isStageCompleted } = useUser();
  const [expandedStage, setExpandedStage] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapPath = '/roadmaps/frontend';

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
        <h1 className={styles.title}>Frontend <span className="text-gradient">Mastery</span></h1>
        <p className={styles.subtitle}>
          Master the art of building beautiful, responsive, and performance-optimized user interfaces.
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
              </div>

              {index === 4 && (
                <div className={styles.proTip} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.proTipHeader}>🧪 Lab Integration</div>
                  <p className={styles.proTipText}>
                    Ready to practice global state? See a high-performance implementation in our <Link href="/codelab" className={styles.proTipLink}>Apple-Style Bento Grid</Link>.
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
          <div className={styles.completionIcon}>🏆</div>
          <h3 className={styles.completionTitle}>Frontend Mastered</h3>
          <p className={styles.completionText}>You now have the skills to build production-grade interfaces.</p>
        </div>
      </div>
    </div>
  );
}
