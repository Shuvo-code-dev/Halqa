'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';
import { ROADMAP_REGISTRY } from '@lib/roadmaps/data';
import SharedSidebar from '@shared/SharedSidebar';
import styles from '../roadmap.module.css';

export default function RoadmapPage() {
  const { slug } = useParams();
  const roadmap = ROADMAP_REGISTRY[slug as string];
  
  if (!roadmap) {
    notFound();
  }

  const { toggleStageCompletion, isStageCompleted, completedStages } = useUser();
  const { t } = useLanguage();
  const [expandedStage, setExpandedStage] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapPath = `/roadmaps/${slug}`;

  // GSAP Animations with high-performance cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stage Reveals with scroll trigger
      const stages = gsap.utils.toArray(`.${styles.stage}`);
      stages.forEach((stage: any) => {
        gsap.from(stage, {
          scrollTrigger: {
            trigger: stage,
            start: "top 92%",
            toggleActions: "play none none none"
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.4)"
        });
      });

      // Entry Stagger
      gsap.from(`header > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slug]);

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  const handleToggleDone = (e: React.MouseEvent, stageId: string) => {
    e.stopPropagation();
    toggleStageCompletion(roadmapPath, stageId);
  };

  const sidebarItems = useMemo(() => {
    return roadmap.stages.map(s => ({
      id: s.id,
      label: s.title,
      icon: isStageCompleted(roadmapPath, s.id) ? '✅' : '⏳'
    }));
  }, [completedStages, roadmap, slug]);

  const handleSidebarClick = (id: string) => {
    const stageIdx = roadmap.stages.findIndex(s => s.id === id);
    if (stageIdx !== -1) setExpandedStage(stageIdx);
    
    const el = document.getElementById(`stage-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="module-layout" ref={containerRef}>
      <SharedSidebar 
        title={roadmap.title}
        subtitle={roadmap.subtitle}
        searchTerm=""
        onSearchChange={() => {}}
        items={sidebarItems}
        activeItemId={expandedStage !== null ? roadmap.stages[expandedStage].id : ''}
        onItemClick={handleSidebarClick}
        itemTypeLabel="Journey Stages"
      />

      <main className="module-content">
        <header className={styles.header}>
          <Link href="/roadmaps" className={styles.backLink}>
            &larr; {t('common.backToRoadmaps') || 'Back to Roadmaps'}
          </Link>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: roadmap.title }} />
          <p className={styles.subtitle}>{roadmap.subtitle}</p>
        </header>

        <div className={styles.timeline}>
          {roadmap.stages.map((stage, index) => {
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
                      <div className={styles.proTipHeader}>🧪 Ecosystem Integration</div>
                      <p className={styles.proTipText}>
                        Ready to see this in action? Check out <strong>{stage.related.label}</strong> in our <Link href={stage.related.link} className={styles.proTipLink}>{stage.related.type}</Link>.
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
            <div className={styles.completionIcon}>{roadmap.icon}</div>
            <h3 className={styles.completionTitle}>{roadmap.completionTitle}</h3>
            <p className={styles.completionText}>{roadmap.completionText}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
