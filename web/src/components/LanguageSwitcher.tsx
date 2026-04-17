'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import styles from './layout.module.css';
import LanguageModal from './LanguageModal';

export default function LanguageSwitcher() {
  const { language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const iconRef = useRef<SVGSVGElement>(null);

  const handleOpen = () => {
    setModalOpen(true);
    gsap.to(iconRef.current, {
      rotate: '+=360',
      duration: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <>
      <div className={styles.langSwitcher}>
        <button 
          onClick={handleOpen}
          className={styles.langBtn}
          aria-label="Selection Language"
        >
          <svg 
            ref={iconRef}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className={styles.langLabel}>
            {language.toUpperCase()}
          </span>
        </button>
      </div>

      <LanguageModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
}
