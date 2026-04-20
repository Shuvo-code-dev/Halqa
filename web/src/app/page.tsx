'use client';

import { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { gsap } from '@lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { REGISTRY_GROUPS } from '@lib/registry-service';
import dynamic from 'next/dynamic';
import TouchScale from '@/components/shared/TouchScale';
import { ArrowRight, Sparkles } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic imports for the featured components
const HalqaQr = dynamic(() => import('@modules/codelab/presets/HalqaQr'), { ssr: false });
const Ballpit = dynamic(() => import('@modules/codelab/presets/Ballpit'), { ssr: false });
const GlitchText = dynamic(() => import('@modules/codelab/presets/GlitchText'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Featured Components (Case-Insensitive Target + Reliable Fallback)
  const featuredLabs = useMemo(() => {
    const targets = ['ballpit', 'glitchtext', 'halqaqr'];
    const found = REGISTRY_GROUPS.filter(group => 
      targets.includes(group.title.toLowerCase())
    );
    
    // Ensure we always have 3 items
    if (found.length < 3) {
      const remaining = REGISTRY_GROUPS.filter(group => 
        !targets.includes(group.title.toLowerCase())
      );
      return [...found, ...remaining].slice(0, 3);
    }
    
    return found;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.to(`.${styles.heroBadge}`, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" })
        .to(`.${styles.title}`, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, "-=0.6")
        .to(`.${styles.subtitle}`, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.7")
        .to(`.${styles.actions}`, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.7");

      // Featured Labs Reveal
      gsap.from(`.${styles.labCard}`, {
        scrollTrigger: {
          trigger: `.${styles.labsGrid}`,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out"
      });

      // Roadmap Path Ignition
      const steps = gsap.utils.toArray<HTMLElement>(`.${styles.pathStep}`);
      steps.forEach((step) => {
        const dot = step.querySelector(`.${styles.stepDot}`);
        gsap.to(dot, {
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            toggleClass: { targets: dot, className: styles.stepDotActive },
          }
        });
      });

      // Bento Philosophy Reveal
      gsap.from(`.${styles.bentoItem}`, {
        scrollTrigger: {
          trigger: `.${styles.bentoGrid}`,
          start: "top 75%",
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      });

      // CTA Entrance
      gsap.from(`.${styles.ctaSection}`, {
        scrollTrigger: {
          trigger: `.${styles.ctaSection}`,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.homeContainer} ref={containerRef}>
      {/* --- HERO --- */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <Sparkles className="w-3 h-3 inline-block mr-2" />
          YOUR ULTIMATE DEVELOPMENT RESOURCE PLATFORM
        </div>
        <h1 className={styles.title}>
          Master Coding, <br />
          <span className="text-gradient">Without the Noise.</span>
        </h1>
        <p className={styles.subtitle}>
          The minimalist developer ecosystem. High-performance roadmaps, premium UI components, and curated resources for modern engineers.
        </p>
        <div className={styles.actions}>
          <TouchScale isLarge={false} scale={0.96}>
            <Link href="/roadmaps" className={styles.primaryBtn}>
              Start with Roadmaps
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </TouchScale>
          <TouchScale isLarge={false} scale={0.96}>
            <Link href="/codelab" className={styles.secondaryBtn}>
              Explore Code Lab
            </Link>
          </TouchScale>
        </div>
      </section>

      {/* --- FEATURED LABS --- */}
      <section id="labs">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>The Lab</span>
          <h2 className={styles.sectionTitle}>Engineered for <span className="text-gradient">Performance.</span></h2>
        </div>
        <div className={styles.labsGrid}>
          {featuredLabs.map((lab) => {
            const lowTitle = lab.title.toLowerCase();
            return (
              <TouchScale key={lab.title} isLarge={true}>
                <div className={`${styles.labCard} halqa-card`}>
                  <div className={styles.previewArea}>
                    <div style={{ pointerEvents: 'none', transform: 'scale(0.8)', opacity: 0.7, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {lowTitle === 'halqaqr' && <HalqaQr />}
                      {lowTitle === 'ballpit' && <Ballpit paused />}
                      {lowTitle === 'glitchtext' && <GlitchText text="HALQA" />}
                      
                      {!['halqaqr', 'ballpit', 'glitchtext'].includes(lowTitle) && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--accent)', opacity: 0.3 }}>
                           <Sparkles size={64} strokeWidth={1} />
                           <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Preview Active</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.labMeta}>
                    <div>
                        <h3 className={styles.labName}>{lab.title}</h3>
                        <p className={styles.labDesc}>Hand-crafted tactile variants available.</p>
                    </div>
                    <Link href={`/codelab?id=${lab.title}`} className={styles.exploreLink}>
                      Explore Source <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </TouchScale>
            );
          })}
        </div>
      </section>

      {/* --- ROADMAP HIGHLIGHT --- */}
      <section id="roadmaps">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>The Path</span>
          <h2 className={styles.sectionTitle}>Structured for <span className="text-gradient">Clarity.</span></h2>
        </div>
        <div className={styles.roadmapsWrapper}>
          <TouchScale isLarge={true}>
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
              <Link href="/roadmaps" className={styles.primaryBtn} style={{ display: 'inline-flex' }}>
                 Start Learning
              </Link>
            </div>
          </TouchScale>

          <TouchScale isLarge={true}>
            <div className={`${styles.bentoItem} glass-panel`}>
               <span className={styles.bentoIcon}>📊</span>
               <h3 className={styles.bentoTitle}>Ecosystem Stats</h3>
               <div style={{ marginTop: 'auto', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Roadmaps</span>
                      <span style={{ fontWeight: 800 }}>12+</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Lab Components</span>
                      <span style={{ fontWeight: 800 }}>500+</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Free Resources</span>
                      <span style={{ fontWeight: 800 }}>1000+</span>
                  </div>
               </div>
            </div>
          </TouchScale>
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
          <div className={`${styles.bentoItem} ${styles.tall} glass-panel`} style={{ background: 'linear-gradient(to top, rgba(var(--accent-rgb), 0.1), transparent)' }}>
            <span className={styles.bentoIcon}>💎</span>
            <h3 className={styles.bentoTitle}>Elite Curation</h3>
            <p className={styles.bentoDesc}>
              Every resource and component is hand-picked and verified for high-performance use cases.
            </p>
          </div>
          <TouchScale isLarge={true}>
            <div className={`${styles.bentoItem} glass-panel`}>
              <span className={styles.bentoIcon}>🤖</span>
              <h3 className={styles.bentoTitle}>AI Assisted</h3>
              <p className={styles.bentoDesc}>
                Integrated AI guidance to help you navigate complex roadmaps.
              </p>
            </div>
          </TouchScale>
          <TouchScale isLarge={true}>
            <div className={`${styles.bentoItem} glass-panel`}>
              <span className={styles.bentoIcon}>🌎</span>
              <h3 className={styles.bentoTitle}>Open Source</h3>
              <p className={styles.bentoDesc}>
                Free forever. Community contribution driven.
              </p>
            </div>
          </TouchScale>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className={styles.ctaSection}>
         <h2 className={styles.ctaTitle}>Ready to <br/><span className="text-gradient">Elevate?</span></h2>
         <TouchScale isLarge={true}>
           <Link href="https://github.com/Shuvo-code-dev/Halqa/" className={styles.primaryBtn} style={{ display: 'inline-flex', padding: '1.5rem 4rem', fontSize: '1.4rem' }}>
              Join the Halqa Network
           </Link>
         </TouchScale>
      </section>
    </div>
  );
}
