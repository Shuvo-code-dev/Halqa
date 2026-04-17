'use client';

import { gsap } from '@lib/gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './layout.module.css';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray(`.${styles.navLink}`);
      links.forEach((link: any) => {
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
          Halqa<span className={styles.accent}>.</span>
        </Link>
        <nav className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/roadmaps" className={styles.navLink}>Roadmaps</Link>
          <Link href="/codelab" className={styles.navLink}>Code Lab</Link>
          <Link href="/apilab" className={styles.navLink}>API Lab</Link>
          <Link href="/projects" className={styles.navLink}>Projects</Link>
          <Link href="/resources" className={styles.navLink}>Resources</Link>
          <div className={styles.navDivider}></div>
          <LanguageSwitcher />
          <a href="https://github.com/Shuvo-code-dev/Halqa" target="_blank" rel="noopener noreferrer" className={styles.navBtn}>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
