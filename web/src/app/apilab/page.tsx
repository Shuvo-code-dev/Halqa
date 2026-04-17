'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './page.module.css';
import { API_REGISTRY, API_CATEGORIES, ApiEntry } from '@/lib/apilab-registry';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

const ITEMS_PER_PAGE = 12;

export default function ApiLab() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showToast, setShowToast] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter Logic
  const filteredAPIs = useMemo(() => {
    return API_REGISTRY.filter(api => {
      const matchCat = activeCategory === 'All' || api.category === activeCategory;
      const matchSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          api.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const visibleAPIs = filteredAPIs.slice(0, visibleCount);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [filteredAPIs]);

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, searchTerm]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.header} > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out"
      });

      gsap.from(`.${styles.card}`, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.3
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory, searchTerm]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch(err) {}
  };

  return (
    <div className={styles.dashboardContainer} ref={containerRef}>
      <aside className={styles.sidebar}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search APIs..." 
            className={styles.sidebarSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        <div className={styles.categoryList}>
          {API_CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>API <span className="text-gradient">Lab</span></h1>
          <p className={styles.subtitle}>
            A curated directory of elite public APIs for developers. Grab endpoints instantly and integrate top-tier data into your Halqa projects.
          </p>
        </header>

        <section className={styles.gridSection}>
          <div className={styles.resultMeta}>
            Found {filteredAPIs.length} APIs in {activeCategory}
          </div>
          
          <div className={styles.grid}>
            {visibleAPIs.map((api) => (
              <div key={api.id} className={`${styles.card} glass-panel`}>
                <div className={styles.cardHeader}>
                  <div className={styles.catBadge}>{api.category}</div>
                  <h3 className={styles.cardTitle}>{api.name}</h3>
                </div>
                
                <div className={styles.badgeRow}>
                  <span className={`${styles.statusBadge} ${api.auth === 'No Key' ? styles.success : styles.warning}`}>
                    {api.auth}
                  </span>
                  <span className={`${styles.statusBadge} ${api.https === 'Yes' ? styles.success : styles.error}`}>
                    HTTPS: {api.https}
                  </span>
                  <span className={`${styles.statusBadge} ${api.cors === 'Yes' ? styles.success : styles.neutral}`}>
                    CORS: {api.cors}
                  </span>
                </div>

                <p className={styles.cardDesc}>{api.description}</p>
                
                <div className={styles.actions}>
                  <button onClick={() => copyToClipboard(api.endpoint)} className={styles.actionBtn}>
                    Copy Endpoint
                  </button>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredAPIs.length && (
            <div ref={loadMoreRef} className={styles.loader}>
              <div className={styles.spinner}></div>
              Loading more APIs...
            </div>
          )}
        </section>

        <div className={`${styles.toast} ${showToast ? styles.show : ''}`}>
          Copied to clipboard! 🚀
        </div>
      </main>
    </div>
  );
}
