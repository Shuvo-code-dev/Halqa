'use client';

import { gsap } from '@lib/gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';
import { ROADMAP_REGISTRY } from '@lib/roadmap-registry';

export default function RoadmapsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmaps = Object.values(ROADMAP_REGISTRY);

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

      // Grid Animation
      gsap.from(`.${styles.card}`, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Learning <span className="text-gradient">Roadmaps</span></h1>
        <p className={styles.subtitle}>
          Step-by-step paths designed to take you from absolute beginner to job-ready developer, without the fluff.
        </p>
      </header>
      
      <div className={styles.grid}>
        {roadmaps.map((roadmap) => (
          <Link key={roadmap.id} href={`/roadmaps/${roadmap.id}`} className={`${styles.card} halqa-card`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.domain}>{roadmap.id.toUpperCase()}</h2>
              <span className={`${styles.status} ${styles.active}`}>Active</span>
            </div>
            <p className={styles.description}>
              {roadmap.subtitle}
            </p>
            <div className={styles.steps}>
              {roadmap.stages.slice(0, 3).map(stage => (
                <span key={stage.id} className={styles.step}>{stage.title}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
