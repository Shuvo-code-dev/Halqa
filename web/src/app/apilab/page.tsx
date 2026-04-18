'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './page.module.css';
import { API_REGISTRY, API_CATEGORIES } from '@lib/apilab-registry';
import { gsap } from '@lib/gsap';
import SharedSidebar from '@shared/SharedSidebar';

const ITEMS_PER_PAGE = 12;

export default function ApiLab() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showToast, setShowToast] = useState(false);
  const [prevFilters, setPrevFilters] = useState({ activeCategory, searchTerm });
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Reset visible count on filter change (Render-time fix for cascading render error)
  if (prevFilters.activeCategory !== activeCategory || prevFilters.searchTerm !== searchTerm) {
    setPrevFilters({ activeCategory, searchTerm });
    setVisibleCount(ITEMS_PER_PAGE);
  }

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
    } catch {
      // Error handled silently
    }
  };

  const sidebarItems = useMemo(() => {
    return API_CATEGORIES.map(cat => ({
      id: cat,
      label: cat,
    }));
  }, []);

  return (
    <div className="module-layout" ref={containerRef}>
      <SharedSidebar 
        title="API <span class='text-gradient'>Lab</span>"
        subtitle="Master public data streams."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        items={sidebarItems}
        activeItemId={activeCategory}
        onItemClick={setActiveCategory}
      />

      <main className="module-content">

        <section className={styles.gridSection}>
          <div className={styles.resultMeta}>
            Found {filteredAPIs.length} APIs in {activeCategory}
          </div>
          
          <div className={styles.grid}>
            {visibleAPIs.map((api) => (
              <div key={api.id} className={`${styles.card} halqa-card`}>
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

