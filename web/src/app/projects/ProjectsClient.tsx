'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import { PROJECT_REGISTRY } from '@lib/project-registry';
import styles from './page.module.css';

export default function ProjectsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = Object.values(PROJECT_REGISTRY);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(`.${styles.card}`, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        delay: 0.2
      });

      // 3D Parallax Persistence with Cleanup
      const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
      const cleanupFns: (() => void)[] = [];

      cards.forEach((card) => {
        const setTilt = (e: MouseEvent) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;

          gsap.to(card, {
            rotationY: x * 15,
            rotationX: -y * 15,
            transformPerspective: 1000,
            duration: 0.6,
            ease: "power2.out"
          });
        };

        const resetTilt = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)"
          });
        };

        card.addEventListener('mousemove', setTilt);
        card.addEventListener('mouseleave', resetTilt);

        cleanupFns.push(() => {
          card.removeEventListener('mousemove', setTilt);
          card.removeEventListener('mouseleave', resetTilt);
        });
      });

      return () => {
        cleanupFns.forEach(fn => fn());
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Project <span className="text-gradient">Hub</span></h1>
        <p className={styles.subtitle}>
          Architect real-world applications by combining Roadmap logic with Code Lab components.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <Link 
            key={project.id} 
            href={`/projects/${project.id}`}
            className={`${styles.card} ${index === 0 ? styles.large : ''} halqa-card`}
          >
            <div className={styles.cardGlow} />
            
            <div className={styles.cardHeader}>
              <div className={styles.meta}>
                 <span className={styles.difficulty}>{project.difficulty}</span>
                 {project.isComingSoon && <span className={styles.comingSoonBadge}>Coming Soon</span>}
              </div>
              <h2 className={styles.cardTitle}>{project.title}</h2>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.techStack}>
              {project.techStack.slice(0, 3).map(tech => (
                <span key={tech} className={styles.techItem}>{tech}</span>
              ))}
              {project.techStack.length > 3 && <span className={styles.techMore}>+{project.techStack.length - 3}</span>}
            </div>

            <div className={styles.cardFooter}>
               <span className={styles.buildBtn}>Build Blueprint &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
