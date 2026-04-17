'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LanguageModal.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, LanguageDef } from '@/lib/languages';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { language, setLanguage } = useLanguage();
  const [search, setSearch] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const ctx = gsap.context(() => {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.fromTo(modalRef.current, 
          { scale: 0.9, opacity: 0, filter: 'blur(10px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: "back.out(1.7)" }
        );
        gsap.from(`.${styles.langCard}`, {
          y: 20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2
        });
      });
      return () => {
        ctx.revert();
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(search.toLowerCase()) || 
    lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    lang.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (code: string) => {
    setLanguage(code);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={onClose}>
      <div 
        className={styles.modal} 
        ref={modalRef} 
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>Global Language <span className="text-gradient">Selection</span></h2>
            <p className={styles.subtitle}>Select your preferred dialect to navigate the Halqa ecosystem.</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </header>

        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search language (e.g. Spanish, বাংলা...)" 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.grid}>
          {filteredLanguages.map((lang) => (
            <button 
              key={lang.code} 
              className={`${styles.langCard} ${language === lang.code ? styles.active : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <div className={styles.langInfo}>
                <span className={styles.nativeName}>{lang.nativeName}</span>
                <span className={styles.englishName}>{lang.name}</span>
              </div>
              {language === lang.code && <div className={styles.activeIndicator} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
