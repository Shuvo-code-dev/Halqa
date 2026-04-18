'use client';

import { useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './layout.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const nextStep = useMemo(() => {
    if (pathname === '/') return { text: "Explore our expert Roadmaps", link: "/roadmaps", label: "View Paths" };
    if (pathname.includes('/roadmaps')) return { text: "Ready to implement? Get raw data", link: "/apilab", label: "Go to API Lab" };
    if (pathname.includes('/apilab')) return { text: "Master these components", link: "/codelab", label: "View Code Lab" };
    if (pathname.includes('/codelab')) return { text: "Scale into a real-world app", link: "/projects", label: "Build a Project" };
    if (pathname.includes('/projects')) return { text: "Return to the Neural Center", link: "/", label: "Halqa Home" };
    return { text: "Continue your journey", link: "/roadmaps", label: "View Roadmaps" };
  }, [pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef} style={{ transform: 'translateY(20px)' }}>
      <div className={styles.nextStepArea}>
        <div className={styles.nextStepContent}>
            <span className={styles.nextLabel}>What&apos;s Next?</span>
            <h3 className={styles.nextTitle}>{nextStep.text}</h3>
            <Link href={nextStep.link} className={styles.nextBtn}>
                {nextStep.label} &rarr;
            </Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <p className={styles.footerText}>
              © 2026 Halqa Ecosystem
            </p>
            <p className={styles.footerTagline}>Powered by Oi Applications</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <a href="https://github.com/Shuvo-code-dev/Halqa/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">GPL-3.0 License</a>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href="https://github.com/Shuvo-code-dev" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
