'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { gsap, ScrollTrigger } from '@lib/gsap';
import { CODELAB_REGISTRY } from '@lib/codelab-registry';
import dynamic from 'next/dynamic';

// Dynamic imports for the featured components to keep initial load light
const HalqaQr = dynamic(() => import('@modules/codelab/presets/HalqaQr'), { ssr: false });
const Ballpit = dynamic(() => import('@modules/codelab/presets/Ballpit'), { ssr: false });
const GlitchText = dynamic(() => import('@modules/codelab/presets/GlitchText'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Featured Components for the showcase
  const featuredLabs = CODELAB_REGISTRY.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.to(`.${styles.heroBadge}`, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" })
        .to(`.${styles.title}`, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, "-=0.6")
        .to(`.${styles.subtitle}`, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.7")
        .to(`.${styles.actions}`, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.7");

      // Scroll Reveals
      const sections = gsap.utils.toArray('section');
      sections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.homeContainer} ref={containerRef}>
      {/* --- HERO --- */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>V2.0 ECOSYSTEM NOW LIVE</div>
        <h1 className={styles.title}>
          Master Coding, <br />
          <span className="text-gradient">Without the Noise.</span>
        </h1>
        <p className={styles.subtitle}>
          The minimalist developer ecosystem. High-performance roadmaps, premium UI components, and curated resources for modern engineers.
        </p>
        <div className={styles.actions}>
          <Link href="/roadmaps" className={styles.primaryBtn}>
            Explore Roadmaps
          </Link>
          <Link href="/codelab" className={styles.secondaryBtn}>
            Enter the Lab
          </Link>
        </div>
      </section>

      {/* --- FEATURED LABS --- */}
      <section id="labs">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>The Lab</span>
          <h2 className={styles.sectionTitle}>Engineered for <span className="text-gradient">Performance.</span></h2>
        </div>
        <div className={styles.labsGrid}>
          {featuredLabs.map((lab) => (
            <div key={lab.id} className={`${styles.labCard} halqa-card`}>
              <div className={styles.previewArea}>
                {/* Static Preview: Rendered but non-interactive for performance */}
                <div style={{ pointerEvents: 'none', transform: 'scale(0.8)', opacity: 0.7 }}>
                  {lab.id === 'halqa-qr' && <HalqaQr />}
                  {lab.id === 'ballpit' && <Ballpit paused />}
                  {lab.id === 'glitch-text' && <GlitchText text="HALQA" />}
                </div>
              </div>
              <div className={styles.labMeta}>
                <div>
                    <h3 className={styles.labName}>{lab.name}</h3>
                    <p className={styles.labDesc}>{lab.description}</p>
                </div>
                <Link href="/codelab" className={styles.exploreLink}>
                  Explore Source &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ROADMAP HIGHLIGHT --- */}
      <section id="roadmaps">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>The Path</span>
          <h2 className={styles.sectionTitle}>Structured for <span className="text-gradient">Clarity.</span></h2>
        </div>
        <div className={styles.roadmapsWrapper}>
          <div className={`${styles.roadmapFeatured} halqa-card`}>
            <h3 className={styles.labName}>Modern Frontend Mastery</h3>
            <p className={styles.labDesc}>From HTML fundamentals to high-performance Next.js architectures.</p>
            <div className={styles.pathLine}>
                <div className={styles.pathStep}>
                    <div className={styles.stepDot}></div>
                    <h4 className={styles.stepTitle}>Phase 1: Foundations</h4>
                    <p className={styles.stepDesc}>DOM, Semantic HTML, and Modern CSS Architectures.</p>
                </div>
                <div className={styles.pathStep}>
                    <div className={styles.stepDot}></div>
                    <h4 className={styles.stepTitle}>Phase 2: React Core</h4>
                    <p className={styles.stepDesc}>Hooks, Context, and State Management at scale.</p>
                </div>
                <div className={styles.pathStep}>
                    <div className={styles.stepDot}></div>
                    <h4 className={styles.stepTitle}>Phase 3: The Lab</h4>
                    <p className={styles.stepDesc}>Animation, WebGL, and High-fidelity Performance.</p>
                </div>
            </div>
            <Link href="/roadmaps" className={styles.primaryBtn} style={{ display: 'inline-block' }}>
               Start Learning
            </Link>
          </div>
          <div className={`${styles.bentoItem} glass-panel`}>
             <span className={styles.bentoIcon}>📊</span>
             <h3 className={styles.bentoTitle}>Ecosystem Stats</h3>
             <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Roadmaps</span>
                    <span style={{ fontWeight: 800 }}>12+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Lab Components</span>
                    <span style={{ fontWeight: 800 }}>10+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Free Resources</span>
                    <span style={{ fontWeight: 800 }}>500+</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY --- */}
      <section id="philosophy">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Our Vision</span>
          <h2 className={styles.sectionTitle}>A Developer <span className="text-gradient">Sanctuary.</span></h2>
        </div>
        <div className={styles.bentoGrid}>
          <div className={`${styles.bentoItem} ${styles.large} glass-panel`}>
            <span className={styles.bentoIcon}>🪶</span>
            <h3 className={styles.bentoTitle}>Zero Distraction</h3>
            <p className={styles.bentoDesc}>
              No ads, no trackers, no noise. Just you and the code. Halqa is designed to minimize cognitive load and maximize focus.
            </p>
          </div>
          <div className={`${styles.bentoItem} ${styles.tall} glass-panel`} style={{ background: 'linear-gradient(to top, var(--accent-muted), transparent)' }}>
            <span className={styles.bentoIcon}>💎</span>
            <h3 className={styles.bentoTitle}>Elite Curation</h3>
            <p className={styles.bentoDesc}>
              Every resource and component is hand-picked and verified for high-performance use cases.
            </p>
          </div>
          <div className={`${styles.bentoItem} glass-panel`}>
            <span className={styles.bentoIcon}>🤖</span>
            <h3 className={styles.bentoTitle}>AI Assisted</h3>
            <p className={styles.bentoDesc}>
              Integrated AI guidance to help you navigate complex roadmaps.
            </p>
          </div>
          <div className={`${styles.bentoItem} glass-panel`}>
            <span className={styles.bentoIcon}>🌎</span>
            <h3 className={styles.bentoTitle}>Open Ecosystem</h3>
            <p className={styles.bentoDesc}>
              Free forever. Community contribution driven.
            </p>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section style={{ textAlign: 'center', padding: '6rem 0' }}>
         <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Ready to <span className="text-gradient">Elevate?</span></h2>
         <Link href="/roadmaps" className={styles.primaryBtn}>
            Join the Halqa Network
         </Link>
      </section>
    </div>
  );
}
