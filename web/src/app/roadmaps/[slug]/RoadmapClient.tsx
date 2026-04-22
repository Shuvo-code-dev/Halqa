'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import { ROADMAP_REGISTRY } from '@lib/roadmap-registry';
import styles from '../roadmap.module.css';

export default function RoadmapClient() {
  const { slug } = useParams();
  const router = useRouter();
  const [openStages, setOpenStages] = useState<string[]>([]);
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const roadmap = ROADMAP_REGISTRY[slug as string];

  useEffect(() => {
    if (!roadmap) {
      router.push('/roadmaps');
      return;
    }

    const ctx = gsap.context(() => {
      if (progressLineRef.current && timelineRef.current) {
        gsap.to(progressLineRef.current, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 25%",
            end: "bottom 75%",
            scrub: true,
          }
        });
      }

      gsap.from(`.${styles.stage}`, {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [roadmap, router]);

  if (!roadmap) return null;

  const toggleStage = (id: string) => {
    setOpenStages(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleComplete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setCompletedStages(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: roadmap.title }} />
        <p className={styles.subtitle}>{roadmap.subtitle}</p>
      </header>

      <div className={styles.timeline} ref={timelineRef} style={{ position: 'relative' }}>
        <div className={styles.progressContainer}>
           <div className={styles.progressLine} ref={progressLineRef} />
        </div>

        {roadmap.stages.map((stage) => {
          const isOpen = openStages.includes(stage.id);
          const isDone = completedStages.includes(stage.id);

          return (
            <div 
              key={stage.id} 
              className={`${styles.stage} ${isOpen ? styles.open : ''} ${isDone ? styles.completed : ''}`}
              onClick={() => toggleStage(stage.id)}
            >
              <div className={styles.stageNumber}>{stage.id}</div>
              
              <div className={styles.stageHeader}>
                <div>
                  <h3 className={styles.stageTitle}>{stage.title}</h3>
                  <p className={styles.stageDescription}>{stage.description}</p>
                </div>
                <div className={styles.chevron}>▼</div>
              </div>

              <div className={`${styles.stageDetails} ${isOpen ? styles.open : ''}`}>
                <div className={styles.detailsGrid}>
                   <div className={styles.detailBlock}>
                      <h4 className={styles.detailTitle}>Why this matters</h4>
                      <p className={styles.detailText}>{stage.why}</p>
                   </div>
                   <div className={styles.detailBlock}>
                      <h4 className={styles.detailTitle}>Key Topics</h4>
                      <ul className={styles.topicList}>
                        {stage.topics.map(topic => (
                          <li key={topic} className={styles.topicItem}>{topic}</li>
                        ))}
                      </ul>
                   </div>
                </div>

                <div className={styles.detailBlock} style={{ marginBottom: '2rem' }}>
                    <h4 className={styles.detailTitle}>Actionable Guide</h4>
                    <p className={styles.detailText}>{stage.guide}</p>
                </div>

                <div className={styles.resources}>
                  <h4 className={styles.resourceHeader}>Actionable Resources</h4>
                  {stage.resources.map((res, i) => (
                    <a 
                      key={i} 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.resourceItem}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.resourceInfo}>
                        <span className={styles.resourceName}>{res.name}</span>
                        <span className={styles.resourceType}>Official Resource</span>
                      </div>
                      <span className={styles.resourceBtn}>Learn &rarr;</span>
                    </a>
                  ))}
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button 
                        className={`${styles.completeToggle} ${isDone ? styles.isDone : ''}`}
                        onClick={(e) => toggleComplete(e, stage.id)}
                    >
                        {isDone ? '✓ Completed' : '○ Mark as Done'}
                    </button>

                    {stage.codelabId && (
                        <Link 
                            href={`/codelab?id=${stage.codelabId}`}
                            className={styles.deepDiveBtn}
                            onClick={(e) => e.stopPropagation()}
                        >
                            🚀 View Demo in Code Lab
                        </Link>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.completion}>
        <div className={styles.completionIcon}>{roadmap.icon}</div>
        <h2 className={styles.completionTitle}>{roadmap.completionTitle}</h2>
        <p className={styles.completionText}>{roadmap.completionText}</p>
        <Link href="/roadmaps" className={styles.primaryBtn} style={{ marginTop: '2rem' }}>
          Explore Another Path
        </Link>
      </div>
    </div>
  );
}
