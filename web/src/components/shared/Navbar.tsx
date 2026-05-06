'use client';

import { gsap } from '@lib/gsap';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import styles from './layout.module.css';
import GlobalSearch from './GlobalSearch';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray(`.${styles.navLink}`) as HTMLElement[];
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, { color: 'var(--accent)', duration: 0.2, ease: 'power2.out' });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { color: 'var(--text-secondary)', duration: 0.2, ease: 'power2.inOut' });
        });
      });
    }, navRef);

    // Close mobile menu on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      ctx.revert();
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (menuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(menuRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.2
        });
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.2
        });
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <header className={`${styles.navbar} glass-panel`} ref={navRef}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          Bulz<span className={styles.accent}>.</span>
        </Link>
        
        <div className={styles.navCenter}>
          <GlobalSearch />
        </div>

        {/* Desktop Navigation */}
        <nav className={`${styles.navLinks} ${styles.desktopNav}`}>
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

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`${styles.mobileNav}`}
        ref={menuRef}
        aria-hidden={!isMobileMenuOpen}
      >
        <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link href="/roadmaps" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Roadmaps</Link>
        <Link href="/codelab" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Code Lab</Link>
        <Link href="/apilab" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>API Lab</Link>
        <Link href="/projects" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
        <Link href="/resources" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
        <a href="https://github.com/Shuvo-code-dev/Bulz" target="_blank" rel="noopener noreferrer" className={styles.mobileNavLink}>
          GitHub
        </a>
      </nav>
    </header>
  );
}
