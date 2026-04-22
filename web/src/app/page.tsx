'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Zap, Code, Target, Sparkles, Rocket, Monitor } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mouse tracking for floating elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

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

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement learning path search logic here
  };

  return (
    <div className={styles.homeContainer}>
      {/* ===== ANIMATED BACKGROUND ELEMENTS ===== */}
      <div className={styles.animatedGrid} />
      <div className={styles.radialGlow} />
      <div 
        className={`${styles.floatingElement} ${styles.floatingElement1}`}
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      <div 
        className={`${styles.floatingElement} ${styles.floatingElement2}`}
        style={{
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
        }}
      />
      <div 
        className={`${styles.floatingElement} ${styles.floatingElement3}`}
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles className="w-4 h-4" />
            <span>Completely Free Education Platform</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Master Code,<br />
            Build Tomorrow
          </h1>
          
          <p className={styles.heroSubtitle}>
            Learn modern development through structured roadmaps, interactive components, 
            and real-world projects. Completely free for everyone, forever.
          </p>
          
          {/* ===== LEARNING SEARCH BAR ===== */}
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchBar}>
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                <Search className="w-5 h-5" />
                Explore Paths
              </button>
            </form>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/roadmaps" className={styles.magneticButton}>
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/codelab" className={`${styles.magneticButton} ${styles.magneticButtonSecondary}`}>
              Explore Code Lab
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LEARNING FEATURES SECTION ===== */}
      <section className={styles.bentoSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Learning Paths</span>
            <h2 className={styles.sectionTitle}>
              Structured for Mastery
            </h2>
          </div>
          
          <div className={styles.bentoGrid}>
            {/* Large Feature Card - Roadmaps */}
            <div className={`${styles.bentoItem} ${styles.bentoItemLarge}`}>
              <div className={styles.bentoIcon}>
                <Target className="w-8 h-8" />
              </div>
              <h3 className={styles.bentoTitle}>Expert Roadmaps</h3>
              <p className={styles.bentoDescription}>
                Step-by-step learning paths from industry experts. Master Frontend, Backend, Mobile, and Computer Science fundamentals.
              </p>
              <div className={styles.bentoFeature}>12+ Comprehensive Paths</div>
              <div className={styles.bentoFeature}>Industry-Validated Curriculum</div>
              <div className={styles.bentoFeature}>Progress Tracking</div>
            </div>
            
            {/* Medium Feature Cards */}
            <div className={`${styles.bentoItem} ${styles.bentoItemMedium}`}>
              <div className={styles.bentoIcon}>
                <Code className="w-8 h-8" />
              </div>
              <h3 className={styles.bentoTitle}>Code Lab</h3>
              <p className={styles.bentoDescription}>
                Premium library of glassmorphic, physics-animated UI components with direct source access.
              </p>
              <div className={styles.bentoFeature}>500+ Interactive Components</div>
              <div className={styles.bentoFeature}>Live Code Editor</div>
            </div>
            
            <div className={`${styles.bentoItem} ${styles.bentoItemMedium}`}>
              <div className={styles.bentoIcon}>
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className={styles.bentoTitle}>Real Projects</h3>
              <p className={styles.bentoDescription}>
                Build production-ready applications combining roadmap knowledge with Code Lab components.
              </p>
              <div className={styles.bentoFeature}>20+ Project Templates</div>
              <div className={styles.bentoFeature}>Step-by-Step Guides</div>
            </div>
            
            <div className={`${styles.bentoItem} ${styles.bentoItemMedium}`}>
              <div className={styles.bentoIcon}>
                <Zap className="w-8 h-8" />
              </div>
              <h3 className={styles.bentoTitle}>API Lab</h3>
              <p className={styles.bentoDescription}>
                Interactive API testing and exploration environment for mastering backend development.
              </p>
              <div className={styles.bentoFeature}>REST & GraphQL</div>
              <div className={styles.bentoFeature}>Live Testing Tools</div>
            </div>
            
            <div className={`${styles.bentoItem} ${styles.bentoItemMedium}`}>
              <div className={styles.bentoIcon}>
                <Monitor className="w-8 h-8" />
              </div>
              <h3 className={styles.bentoTitle}>AI Assistant</h3>
              <p className={styles.bentoDescription}>
                Get personalized help and code explanations from our AI-powered learning assistant.
              </p>
              <div className={styles.bentoFeature}>24/7 Available</div>
              <div className={styles.bentoFeature}>Code Review & Debugging</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY IMPACT SECTION ===== */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Community</span>
            <h2 className={styles.sectionTitle}>
              Learning Without Limits
            </h2>
          </div>
          
          <div className={styles.pricingGrid}>
            {/* Learners Card */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingTier}>LEARNERS</div>
              <div className={styles.pricingPrice}>
                50K+<span>Active</span>
              </div>
              <p className={styles.pricingDescription}>
                Join thousands of developers learning and growing together in our free community.
              </p>
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeature}>Complete Access to All Roadmaps</li>
                <li className={styles.pricingFeature}>500+ Interactive Components</li>
                <li className={styles.pricingFeature}>Real-World Projects</li>
                <li className={styles.pricingFeature}>Community Support</li>
                <li className={styles.pricingFeature}>Progress Tracking</li>
              </ul>
              <button className={styles.magneticButton}>
                Join Community
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Contributors Card */}
            <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
              <div className={styles.pricingTier}>CONTRIBUTORS</div>
              <div className={styles.pricingPrice}>
                100%<span>Open Source</span>
              </div>
              <p className={styles.pricingDescription}>
                Contribute to the future of free education. Help us build better learning tools for everyone.
              </p>
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeature}>Shape the Platform</li>
                <li className={styles.pricingFeature}>Create Learning Content</li>
                <li className={styles.pricingFeature}>Build New Components</li>
                <li className={styles.pricingFeature}>Mentor Other Learners</li>
                <li className={styles.pricingFeature}>Community Recognition</li>
                <li className={styles.pricingFeature}>GitHub Contributors</li>
                <li className={styles.pricingFeature}>Free Forever</li>
              </ul>
              <button className={styles.magneticButton}>
                Contribute on GitHub
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Impact Card */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingTier}>IMPACT</div>
              <div className={styles.pricingPrice}>
                Global<span>Reach</span>
              </div>
              <p className={styles.pricingDescription}>
                Together we&apos;re making quality coding education accessible to everyone, everywhere.
              </p>
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeature}>150+ Countries Reached</li>
                <li className={styles.pricingFeature}>No Barriers to Learning</li>
                <li className={styles.pricingFeature}>Industry-Relevant Skills</li>
                <li className={styles.pricingFeature}>Career Transformations</li>
                <li className={styles.pricingFeature}>Community Driven</li>
                <li className={styles.pricingFeature}>Always Free</li>
                <li className={styles.pricingFeature}>Open Knowledge</li>
              </ul>
              <button className={`${styles.magneticButton} ${styles.magneticButtonSecondary}`}>
                Share the Mission
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

