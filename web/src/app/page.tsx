'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Code, Zap, Users, TrendingUp } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles className="w-4 h-4" />
            <span>Developer Excellence Platform</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Build Faster,<br />
            Code Smarter
          </h1>
          
          <p className={styles.heroSubtitle}>
            The ultimate developer ecosystem with premium components, 
            optimized workflows, and cutting-edge tools for modern engineering.
          </p>
          
          <div className={styles.heroActions}>
            <Link href="/roadmaps" className={`${styles.btn} ${styles.btnPrimary}`}>
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/codelab" className={`${styles.btn} ${styles.btnSecondary}`}>
              Explore Components
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Features</span>
            <h2 className={styles.sectionTitle}>
              Everything You Need to Excel
            </h2>
            <p className={styles.sectionDescription}>
              Comprehensive tools and resources designed to accelerate your development workflow
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className={styles.featureTitle}>Premium Components</h3>
              <p className={styles.featureDescription}>
                Access a curated library of high-performance, production-ready UI components built with modern best practices.
              </p>
              <Link href="/codelab" className={styles.featureLink}>
                Explore Components
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className={styles.featureTitle}>Lightning Fast</h3>
              <p className={styles.featureDescription}>
                Optimized for performance with cutting-edge technologies and best-in-class development workflows.
              </p>
              <Link href="/roadmaps" className={styles.featureLink}>
                View Roadmaps
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className={styles.featureTitle}>Community Driven</h3>
              <p className={styles.featureDescription}>
                Join thousands of developers contributing to an open-source ecosystem of innovation and collaboration.
              </p>
              <Link href="/projects" className={styles.featureLink}>
                Join Community
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Impact</span>
            <h2 className={styles.sectionTitle}>
              By the Numbers
            </h2>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Premium Components</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statNumber}>12+</div>
              <div className={styles.statLabel}>Expert Roadmaps</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Active Developers</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>Uptime Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Development?
            </h2>
            <p className={styles.ctaDescription}>
              Join thousands of developers who are already building faster, 
              smarter, and better with Halqa's comprehensive platform.
            </p>
            <Link 
              href="https://github.com/Shuvo-code-dev/Halqa" 
              className={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

