'use client';

import { gsap } from '@lib/gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './layout.module.css';
import GlobalSearch from './GlobalSearch';


export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray(`.${styles.navLink}`) as HTMLElement[];
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.inOut" });
        });
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <header className={`${styles.navbar} glass-panel`} ref={navRef}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          Bulz<span className={styles.accent}>.</span>
        </Link>
        
        <GlobalSearch />

        <nav className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/roadmaps" className={styles.navLink}>Roadmaps</Link>
          <Link href="/codelab" className={styles.navLink}>Code Lab</Link>
          <Link href="/apilab" className={styles.navLink}>API Lab</Link>
          <Link href="/projects" className={styles.navLink}>Projects</Link>
          <Link href="/resources" className={styles.navLink}>Resources</Link>
          <a href="https://github.com/Shuvo-code-dev/Bulz" target="_blank" rel="noopener noreferrer" className={styles.navBtn}>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
