'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SharedSidebar from '@/components/SharedSidebar';

const STAGES = [
  {
    id: '01',
    title: 'HTML & CSS Mastery',
    description: 'The bones and skin of the web. Semantic HTML5, Flexbox, and Modern Grid.',
    why: 'Structure and layout are the foundation of any web interface. Mastering these ensures your site is accessible and responsive across all devices.',
    topics: ['Semantic Tags', 'Accessibility (A11y)', 'Flexbox & CSS Grid', 'Custom Properties'],
    guide: 'Build a responsive landing page header without using any frameworks. Focus on perfect alignment and mobile-first responsiveness.',
    resource: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
    related: { label: 'Card Spotlight', link: '/codelab', id: 'card-spotlight', type: 'Lab' }
  },
  {
    id: '02',
    title: 'Modern JavaScript',
    description: 'The engine of interactivity. ES6+, Closures, and Async patterns.',
    why: 'JavaScript allows you to fetch data, handle user input, and build complex logic. It is the core language of the frontend developer.',
    topics: ['ES6 Syntax', 'Promises & Async/Await', 'DOM Manipulation', 'State Management Basics'],
    guide: 'Create a "To-Do" app using only Vanilla JS. Implement adding, deleting, and persistence using localStorage.',
    resource: 'https://javascript.info/',
    related: { label: 'QR Generator', link: '/codelab', id: 'halqa-qr', type: 'Lab' }
  },
  {
    id: '03',
    title: 'React.js Ecosystem',
    description: 'Declarative UI building. Hooks, Component Design, and Performance.',
    why: 'React is the industry standard for building scalable applications. Its component-based architecture makes code reusable and maintainable.',
    topics: ['Hooks (useState, useEffect)', 'Props & State Flow', 'React Router', 'Context API'],
    guide: 'Rewrite your "To-Do" app in React. Break it into components: Header, List, and Item. Use Context for global state if needed.',
    resource: 'https://react.dev/learn',
    related: { label: 'Apple Bento Grid', link: '/codelab', id: 'apple-bento', type: 'Lab' }
  },
  {
    id: '04',
    title: 'Next.js & Routing',
    description: 'Server-side rendering, API routes, and App Router architecture.',
    why: 'Next.js provides optimized performance and SEO out of the box. Mastering it allows you to build production-ready fullstack apps.',
    topics: ['App Router', 'Server Components', 'API Routes', 'Dynamic Metadata'],
    guide: 'Build a simple blog that fetches data from a mock API. Use Next.js dynamic routing to create a page for each post.',
    resource: 'https://nextjs.org/docs'
  }
];

export default function FrontendRoadmap() {
  const { toggleStageCompletion, isStageCompleted, completedStages } = useUser();
  const { t } = useLanguage();
  const [expandedStage, setExpandedStage] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapPath = '/roadmaps/frontend';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stage Reveals
      const stages = gsap.utils.toArray(`.${styles.stage}`);
      stages.forEach((stage: any) => {
        gsap.from(stage, {
          scrollTrigger: {
            trigger: stage,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
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

  const sidebarItems = useMemo(() => {
    return STAGES.map(s => ({
        id: s.id,
        label: s.title,
        icon: isStageCompleted(roadmapPath, s.id) ? '✅' : '⏳'
    }));
  }, [completedStages]);

  const handleSidebarClick = (id: string) => {
    const stageIdx = STAGES.findIndex(s => s.id === id);
    if (stageIdx !== -1) setExpandedStage(stageIdx);
    
    const el = document.getElementById(`stage-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="module-layout" ref={containerRef}>
      <SharedSidebar 
        title={t('roadmaps.frontend.title') || 'Frontend <span class="text-gradient">Architect</span>'}
        subtitle="Master the visual engine of the web."
        searchTerm=""
        onSearchChange={() => {}}
        items={sidebarItems}
        activeItemId={expandedStage !== null ? STAGES[expandedStage].id : ''}
        onItemClick={handleSidebarClick}
        itemTypeLabel="Journey Stages"
      />

      <main className="module-content">
        <header className={styles.header}>
            <Link href="/roadmaps" className={styles.backLink}>
                &larr; {t('common.backToRoadmaps') || 'Back to Roadmaps'}
            </Link>
            <h1 className={styles.title}>Frontend <span className="text-gradient">Architect</span></h1>
            <p className={styles.subtitle}>
            The complete journey to becoming a world-class UI engineer. From the basics of HTML to advanced React architectures.
            </p>
        </header>

        <div className={styles.timeline}>
          {STAGES.map((stage, index) => {
            const isDone = isStageCompleted(roadmapPath, stage.id);
            
            return (
              <div 
                key={stage.id} 
                id={`stage-${stage.id}`}
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

                  {stage.related && (
                    <div className={styles.proTip} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.proTipHeader}>🧪 Lab Integration</div>
                      <p className={styles.proTipText}>
                        Ready to practice? See a high-performance implementation of <strong>{stage.related.label}</strong> in our <Link href={stage.related.link} className={styles.proTipLink}>{stage.related.type}</Link>.
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
            <h3 className={styles.completionTitle}>Frontend Mastered</h3>
            <p className={styles.completionText}>You now have the skills to build production-grade interfaces.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
