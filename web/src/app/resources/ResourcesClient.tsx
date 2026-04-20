'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from '@lib/gsap';
import { RESOURCE_REGISTRY, Resource } from '@lib/resource-registry';
import Fuse from 'fuse.js';
import styles from './page.module.css';

const BATCH_SIZE = 24;

export default function ResourcesClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Design Tools', 'Dev Utilities', 'Icons & Assets', 'Learning Hubs', 'General Resources'];

  // Initialize Fuse.js for high-fidelity fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(RESOURCE_REGISTRY, {
      keys: ['name', 'recommendation', 'category'],
      threshold: 0.35, // Balanced: not too loose, not too strict
      distance: 100,
      ignoreLocation: true
    });
  }, []);

  // Filtered & Searched Logic
  const filteredResources = useMemo(() => {
    let results: Resource[] = [];
    
    if (searchTerm.trim()) {
      results = fuse.search(searchTerm).map(r => r.item);
    } else {
      results = RESOURCE_REGISTRY;
    }

    if (activeCategory !== 'All') {
      results = results.filter(res => res.category === activeCategory);
    }

    return results;
  }, [searchTerm, activeCategory, fuse]);

  // Paginated Results
  const displayedResources = useMemo(() => {
    return filteredResources.slice(0, visibleCount);
  }, [filteredResources, visibleCount]);

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header and Toolbar stagger
      gsap.from(`header > *, .${styles.toolbar} > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out"
      });

      // Grid Scroll Reveal for the initial batch
      if (gridRef.current) {
        gsap.from(`.${styles.card}`, {
          y: 40,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []); // Only on mount

  // Reveal animation for newly loaded items
  useEffect(() => {
    if (visibleCount > BATCH_SIZE) {
       const newItems = document.querySelectorAll(`.${styles.card}:nth-child(n+${visibleCount - BATCH_SIZE + 1})`);
       gsap.from(newItems, {
         y: 30,
         opacity: 0,
         duration: 0.6,
         stagger: 0.03,
         ease: "power2.out"
       });
    }
  }, [visibleCount]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + BATCH_SIZE);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Developer <span className="text-gradient">Vault</span></h1>
        <p className={styles.subtitle}>
          The ultimate &quot;Swiss Army Knife&quot; for high-performance engineers. Ingesting Thousands of curated tools, elite recommendations, and rapid utilities.
        </p>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
           <div className={styles.searchIcon}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
           </div>
           <input 
             type="text" 
             placeholder="Search 500+ elite tools..." 
             className={styles.searchInput}
             value={searchTerm}
             onChange={(e) => {
               setSearchTerm(e.target.value);
               setVisibleCount(BATCH_SIZE); // Reset pagination on search
             }}
           />
        </div>

        <div className={styles.categories}>
           {categories.map(cat => (
             <button 
               key={cat} 
               className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
               onClick={() => {
                 setActiveCategory(cat);
                 setVisibleCount(BATCH_SIZE); // Reset pagination on category change
               }}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      <div className={styles.grid} ref={gridRef}>
        {displayedResources.map((res) => (
          <div key={res.id} className={`${styles.card} halqa-card`}>
            <div className={styles.cardTop}>
               <span className={styles.categoryTag}>{res.category}</span>
               <span className={styles.tierBadge}>{res.tier}</span>
            </div>
            
            <h3 className={styles.name}>{res.name}</h3>
            
            <p className={styles.recommendation}>
               <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Halqa Note:</span> {res.recommendation}
            </p>

            <div className={styles.cardFooter}>
               <a href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                  Open Tool &rarr;
               </a>
               {res.quickCopy && (
                 <button 
                   className={`${styles.copyBtn} ${copiedId === res.id ? styles.copied : ''}`}
                   onClick={() => handleCopy(res.id, res.quickCopy!)}
                   title="Quick Copy Asset/Command"
                 >
                   {copiedId === res.id ? (
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                   ) : (
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                   )}
                   <span className={styles.copyTooltip}>Copied!</span>
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredResources.length && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
            Load More High-Performance Tools ({filteredResources.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {displayedResources.length === 0 && (
         <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            No tools found matching your search. Try resetting the filters.
         </div>
      )}
    </div>
  );
}
