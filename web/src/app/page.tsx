'use client';

import { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { gsap } from '@lib/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { REGISTRY_GROUPS } from '@lib/registry-service';
import dynamic from 'next/dynamic';
import TouchScale from '@/components/shared/TouchScale';
import Magnetic from '@/components/shared/Magnetic';
import Spotlight from '@/components/shared/Spotlight';
import MeshBackground from '@/components/shared/MeshBackground';
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
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Featured Components (Curated Selection)
  const featuredLabs = useMemo(() => {
    const targets = ['ballpit', 'glitchtext', 'halqaqr'];
    const found = REGISTRY_GROUPS.filter(group => 
      targets.includes(group.title.toLowerCase())
    );
    
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

      // Continuous Ambient Motion for Hero Text
      gsap.to(`.${styles.title}`, {
        y: "+=8",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      // Featured Labs Reveal (Mobile-Optimized)
      const isMobile = window.innerWidth < 768;
      
      gsap.from(`.${styles.labCardWrapper}`, {
        scrollTrigger: {
          trigger: `.${styles.labsGrid}`,
          start: isMobile ? "top 95%" : "top 80%",
        },
        y: isMobile ? 20 : 40,
        opacity: 0,
        stagger: isMobile ? 0.1 : 0.15,
        duration: isMobile ? 0.6 : 1,
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

      // Bento Philosophy Reveal (Mobile-Optimized)
      gsap.from(`.${styles.bentoItemWrapper}`, {
        scrollTrigger: {
          trigger: `.${styles.bentoGrid}`,
          start: isMobile ? "top 90%" : "top 75%",
        },
        scale: isMobile ? 0.95 : 0.9,
        opacity: 0,
        stagger: isMobile ? 0.05 : 0.1,
        duration: isMobile ? 0.5 : 0.8,
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
      {/* --- HERO: Industrial Sanctuary --- */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBgWrapper}>
           <MeshBackground />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles className="w-3 h-3 inline-block mr-2" />
            VETTED DEVELOPMENT SANCTUARY
          </div>
          <h1 className={styles.title}>
            Master Coding, <br />
            <span className="text-gradient">Without the Noise.</span>
          </h1>
          <p className={styles.subtitle}>
            A curated, high-performance ecosystem for modern engineers. Zero-distraction roadmaps and premium architectural patterns.
          </p>
          <div className={styles.actions}>
            <Magnetic>
              <TouchScale isLarge={false} scale={0.96}>
                <Link href="/roadmaps" className={styles.primaryBtn}>
                  Start Roadmaps
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </TouchScale>
            </Magnetic>
            <TouchScale isLarge={false} scale={0.96}>
              <Link href="/codelab" className={styles.secondaryBtn}>
                Explore Lab
              </Link>
            </TouchScale>
          </div>
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
              <div key={lab.title} className={styles.labCardWrapper}>
                <Spotlight className="rounded-3xl h-full" color="var(--accent)" opacity={0.1}>
                  <TouchScale isLarge={true}>
                    <div className={`${styles.labCard} halqa-card`}>
                      <div className={styles.previewArea}>
                        <div className={styles.floatingPreview}>
                          {lowTitle === 'halqaqr' && <HalqaQr />}
                          {lowTitle === 'ballpit' && <Ballpit paused />}
                          {lowTitle === 'glitchtext' && <GlitchText text="HALQA" />}
                          
                          {!['halqaqr', 'ballpit', 'glitchtext'].includes(lowTitle) && (
                            <div className={styles.previewPlaceholder}>
                               <Sparkles size={64} strokeWidth={1} />
                               <span>Preview Active</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.labMeta}>
                        <div>
                            <h3 className={styles.labName}>{lab.title}</h3>
                            <p className={styles.labDesc}>Curated tactile variant available.</p>
                        </div>
                        <Link href={`/codelab?id=${lab.title}`} className={styles.exploreLink}>
                          Explore Source <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </TouchScale>
                </Spotlight>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- ROADMAP HIGHLIGHT & STATS --- */}
      <section id="roadmaps">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>The Path</span>
          <h2 className={styles.sectionTitle}>Structured for <span className="text-gradient">Clarity.</span></h2>
        </div>
        <div className={styles.roadmapsWrapper}>
          <div className={styles.bentoItemWrapper} style={{ flex: 2 }}>
            <Spotlight className="rounded-3xl h-full" opacity={0.05}>
              <TouchScale isLarge={true}>
                <div className={`${styles.roadmapFeatured} halqa-card`}>
                  <h3 className={styles.labName}>Modern Frontend Mastery</h3>
                  <p className={styles.labDesc}>From industrial foundations to high-performance Next.js architectures.</p>
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
            </Spotlight>
          </div>

          <div className={styles.bentoItemWrapper} style={{ flex: 1 }}>
            <Spotlight className="rounded-3xl h-full" opacity={0.08}>
              <TouchScale isLarge={true}>
                <div className={`${styles.bentoItem} glass-panel`}>
                   <span className={styles.bentoIcon}>📊</span>
                   <h3 className={styles.bentoTitle}>Resource Stats</h3>
                   <div className={styles.statsList}>
                      <div className={styles.statEntry}>
                          <span className={styles.statLabel}>Roadmaps</span>
                          <span className={styles.statValue}>12+</span>
                      </div>
                      <div className={styles.statEntry}>
                          <span className={styles.statLabel}>Curated Components</span>
                          <span className={styles.statValue}>500+</span>
                      </div>
                      <div className={styles.statEntry}>
                          <span className={styles.statLabel}>Industrial Assets</span>
                          <span className={styles.statValue}>Vetted</span>
                      </div>
                   </div>
                </div>
              </TouchScale>
            </Spotlight>
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
          <div className={`${styles.bentoItemWrapper} ${styles.large}`}>
            <Spotlight className="rounded-3xl h-full" opacity={0.05}>
              <div className={`${styles.bentoItem} glass-panel`}>
                <span className={styles.bentoIcon}>🪶</span>
                <h3 className={styles.bentoTitle}>Zero Distraction</h3>
                <p className={styles.bentoDesc}>
                  No ads, no trackers, no noise. Just you and the code. Halqa is designed to minimize cognitive load and maximize focus.
                </p>
              </div>
            </Spotlight>
          </div>
          
          <div className={`${styles.bentoItemWrapper} ${styles.tall}`}>
            <Spotlight className="rounded-3xl h-full" color="var(--accent)" opacity={0.08}>
              <div className={`${styles.bentoItem} glass-panel`} style={{ background: 'linear-gradient(to top, rgba(var(--accent-rgb), 0.1), transparent)' }}>
                <span className={styles.bentoIcon}>💎</span>
                <h3 className={styles.bentoTitle}>Elite Curation</h3>
                <p className={styles.bentoDesc}>
                  Every resource and component is hand-picked and verified for high-performance industrial use cases.
                </p>
              </div>
            </Spotlight>
          </div>

          <div className={styles.bentoItemWrapper}>
            <Spotlight className="rounded-3xl h-full" opacity={0.05}>
              <TouchScale isLarge={true}>
                <div className={`${styles.bentoItem} glass-panel`}>
                  <span className={styles.bentoIcon}>🤖</span>
                  <h3 className={styles.bentoTitle}>AI Assisted</h3>
                  <p className={styles.bentoDesc}>
                    Integrated AI guidance to help you navigate complex roadmaps.
                  </p>
                </div>
              </TouchScale>
            </Spotlight>
          </div>

          <div className={styles.bentoItemWrapper}>
            <Spotlight className="rounded-3xl h-full" opacity={0.05}>
              <TouchScale isLarge={true}>
                <div className={`${styles.bentoItem} glass-panel`}>
                  <span className={styles.bentoIcon}>🌎</span>
                  <h3 className={styles.bentoTitle}>Open Source</h3>
                  <p className={styles.bentoDesc}>
                    Free forever. Community contribution driven.
                  </p>
                </div>
              </TouchScale>
            </Spotlight>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className={styles.ctaSection}>
         <h2 className={styles.ctaTitle}>Ready to <br/><span className="text-gradient">Elevate?</span></h2>
         <TouchScale isLarge={true}>
           <Magnetic>
             <Link href="https://github.com/Shuvo-code-dev/Halqa/" className={`${styles.primaryBtn} ${styles.ctaBtn}`}>
                Join the Halqa Network
             </Link>
           </Magnetic>
         </TouchScale>
      </section>
    </div>
  );
}
