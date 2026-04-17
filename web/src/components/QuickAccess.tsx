'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './QuickAccess.module.css';

export default function QuickAccess() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Only show on Roadmap pages
  if (!pathname.includes('/roadmaps/')) return null;

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.toggle} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Quick Access"
      >
        <div className={styles.icon}>
            <span></span>
            <span></span>
            <span></span>
        </div>
      </button>

      <div className={styles.menu}>
        <div className={styles.label}>Neural Links</div>
        <Link href="/codelab" className={styles.item}>
          <span className={styles.itemIcon}>🧪</span>
          <div className={styles.itemText}>
            <strong>Code Lab</strong>
            <span>UI Registry</span>
          </div>
        </Link>
        <Link href="/apilab" className={styles.item}>
          <span className={styles.itemIcon}>🔌</span>
          <div className={styles.itemText}>
            <strong>API Lab</strong>
            <span>Data Streams</span>
          </div>
        </Link>
        <Link href="/projects" className={styles.item}>
          <span className={styles.itemIcon}>🏗️</span>
          <div className={styles.itemText}>
            <strong>Project Hub</strong>
            <span>Build Real Apps</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
