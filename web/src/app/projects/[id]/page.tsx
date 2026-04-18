'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import { PROJECT_REGISTRY } from '@lib/project-registry';
import styles from '../project-detail.module.css';

export default function ProjectBuildGuide() {
  const { id } = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const project = PROJECT_REGISTRY[id as string];

  useEffect(() => {
    if (!project) {
      router.push('/projects');
      return;
    }

    const ctx = gsap.context(() => {
      // Entrance Animations
      gsap.from(`header > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out"
      });

      gsap.from(`.${styles.timelineStep}`, {
        x: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        delay: 0.3
      });

      gsap.from(`.${styles.sidebarBlock}`, {
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project, router]);

  if (!project) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <Link href="/projects" className={styles.backLink}>
          &larr; Back to Projects
        </Link>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{project.title}</h1>
          <span className={styles.difficultyBadge}>{project.difficulty} Level</span>
        </div>
        <p className={styles.description}>{project.description}</p>
      </header>

      <div className={styles.mainGrid}>
        <section className={styles.content}>
          <h2 className={styles.sectionTitle}>Logic Breakdown</h2>
          <div className={styles.timeline}>
            {project.logicSteps.map((step, index) => (
              <div key={index} className={styles.timelineStep}>
                <div className={styles.stepDot} />
                <h3 className={styles.stepTitle}>Step 0{index + 1}: {step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarBlock}>
            <h4 className={styles.blockTitle}>Tech Stack</h4>
            <div className={styles.techStack}>
              {project.techStack.map(tech => (
                <span key={tech} className={styles.techItem}>{tech}</span>
              ))}
            </div>
          </div>

          <div className={styles.sidebarBlock}>
            <h4 className={styles.blockTitle}>Actions</h4>
            <div className={styles.actionGrid}>
               {!project.isComingSoon ? (
                 <>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    View Source
                  </a>
                  {project.forkUrl && (
                    <a href={project.forkUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryAction}>
                      Fork Template
                    </a>
                  )}
                 </>
               ) : (
                 <div className={styles.comingSoon}>
                    Repository Coming Soon
                 </div>
               )}
            </div>
          </div>

          <div className={styles.sidebarBlock}>
            <h4 className={styles.blockTitle}>Ecosystem Synergy</h4>
            <div className={styles.trinity}>
               <Link href={project.trinity.roadmap.link} className={styles.trinityItem}>
                  <span className={styles.trinityIcon}>{project.trinity.roadmap.icon}</span>
                  <div className={styles.trinityLabel}>
                     <span className={styles.trinityName}>{project.trinity.roadmap.name}</span>
                     <span className={styles.trinityType}>Roadmap Path</span>
                  </div>
               </Link>
               <Link href={project.trinity.code.link} className={styles.trinityItem}>
                  <span className={styles.trinityIcon}>{project.trinity.code.icon}</span>
                  <div className={styles.trinityLabel}>
                     <span className={styles.trinityName}>{project.trinity.code.name}</span>
                     <span className={styles.trinityType}>Code Component</span>
                  </div>
               </Link>
               <Link href={project.trinity.api.link} className={styles.trinityItem}>
                  <span className={styles.trinityIcon}>{project.trinity.api.icon}</span>
                  <div className={styles.trinityLabel}>
                     <span className={styles.trinityName}>{project.trinity.api.name}</span>
                     <span className={styles.trinityType}>API Solution</span>
                  </div>
               </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
