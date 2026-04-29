'use client';

import { gsap } from '@lib/gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, Target, Zap, Code, Rocket, BookOpen } from 'lucide-react';
import styles from './page.module.css';
import { ROADMAP_REGISTRY } from '@lib/roadmap-registry';

export default function RoadmapsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmaps = Object.values(ROADMAP_REGISTRY);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation - only if elements exist
      const heroBadge = document.querySelector(`.${styles.heroBadge}`);
      const heroTitle = document.querySelector(`.${styles.heroTitle}`);
      const heroSubtitle = document.querySelector(`.${styles.heroSubtitle}`);
      
      if (heroBadge) {
        gsap.from(heroBadge, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "expo.out",
        });
      }

      if (heroTitle) {
        gsap.from(heroTitle, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "expo.out",
          delay: 0.2,
        });
      }

      if (heroSubtitle) {
        gsap.from(heroSubtitle, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "expo.out",
          delay: 0.4,
        });
      }

      // Bento Grid Animation
      const roadmapCards = document.querySelectorAll(`.${styles.roadmapCard}`);
      if (roadmapCards.length > 0) {
        gsap.from(roadmapCards, {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          delay: 0.6,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getRoadmapIcon = (id: string) => {
    switch (id.toLowerCase()) {
      case 'frontend':
        return <Code className="w-8 h-8" />;
      case 'backend':
        return <Zap className="w-8 h-8" />;
      case 'mobile':
        return <Rocket className="w-8 h-8" />;
      case 'computer-science':
        return <BookOpen className="w-8 h-8" />;
      default:
        return <Target className="w-8 h-8" />;
    }
  };

  return (
    <div className={styles.homeContainer} ref={containerRef} style={{ paddingInline: '1rem' }}>
      <section className={styles.hero} style={{ minHeight: '60vh' }}>
        <div className={styles.heroBadge}>CURATED PATHS</div>
        <h1 className={styles.title} style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
          Learning <span className="text-gradient">Roadmaps.</span>
        </h1>
        <p className={styles.subtitle}>
          Choose your learning path and start your journey to becoming an elite developer.
        </p>
      </section>
      
      <div className={styles.labsGrid} style={{ marginTop: '-4rem' }}>
        {roadmaps.map((roadmap, index) => {
          // Deterministic stats to avoid hydration mismatch
          const duration = (index % 4) + 8; // 8-11 weeks
          return (
            <Link 
              key={roadmap.id} 
              href={`/roadmaps/${roadmap.id}`}
              className={styles.labCardWrapper}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className={`${styles.labCard} bulz-card`} style={{ padding: '2rem', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    background: 'var(--accent-gradient)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem',
                    color: 'var(--bg-dark)'
                  }}>
                    {getRoadmapIcon(roadmap.id)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 className={styles.labName} style={{ margin: 0, textTransform: 'capitalize' }}>
                      {roadmap.id}
                    </h3>
                    <span style={{ 
                      color: 'var(--accent)', 
                      fontSize: '0.7rem', 
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      Free Access
                    </span>
                  </div>
                </div>
                
                <p className={styles.labDesc} style={{ minHeight: '4.5rem' }}>
                  {roadmap.subtitle}
                </p>
                
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--accent)' }}>
                      {roadmap.stages?.length || 0}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700' }}>
                      Stages
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--accent)' }}>
                      {duration}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700' }}>
                      Weeks
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--accent)' }}>
                      Pro
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700' }}>
                      Level
                    </div>
                  </div>
                </div>
                
                <div className={styles.exploreLink} style={{ margin: 0 }}>
                  Start Path <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
