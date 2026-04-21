'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESOURCE_REGISTRY, Resource } from '@lib/resource-registry';
import Fuse from 'fuse.js';
import Spotlight from '@shared/Spotlight';
import TouchScale from '@shared/TouchScale';
import CopyNotification from '@shared/CopyNotification';
import styles from './page.module.css';

const BATCH_SIZE = 24;

export default function ResourcesClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  
  const categories = ['All', 'Design Tools', 'Dev Utilities', 'Icons & Assets', 'Learning Hubs', 'General Resources'];

  // Initialize Fuse.js for high-fidelity fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(RESOURCE_REGISTRY, {
      keys: ['name', 'recommendation', 'category'],
      threshold: 0.35,
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsNotifyVisible(true);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + BATCH_SIZE);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.19, 1, 0.22, 1], duration: 1 }}
          className={styles.title}
        >
          Developer <span className="text-gradient">Vault</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.19, 1, 0.22, 1], duration: 1, delay: 0.1 }}
          className={styles.subtitle}
        >
          The ultimate &quot;Swiss Army Knife&quot; for high-performance engineers. Thousands of curated tools, elite recommendations, and rapid utilities.
        </motion.p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.19, 1, 0.22, 1], duration: 1, delay: 0.2 }}
        className={styles.toolbar}
      >
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
               setVisibleCount(BATCH_SIZE);
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
                 setVisibleCount(BATCH_SIZE);
               }}
             >
               {cat}
               {activeCategory === cat && <motion.div layoutId="res-cat-active" className={styles.activeIndicator} />}
             </button>
           ))}
        </div>
      </motion.div>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {displayedResources.map((res, index) => (
            <motion.div 
              key={res.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: (index % BATCH_SIZE) * 0.03,
                restDelta: 0.001
              }}
            >
              <TouchScale isLarge={true} scale={0.98}>
                <Spotlight className="h-full group rounded-2xl">
                  <div className={`${styles.card} halqa-card`}>
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
                           className={styles.copyBtn}
                           onClick={() => handleCopy(res.quickCopy!)}
                           title="Quick Copy Asset/Command"
                         >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                         </button>
                       )}
                    </div>
                  </div>
                </Spotlight>
              </TouchScale>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < filteredResources.length && (
        <div className={styles.loadMoreWrapper}>
          <TouchScale>
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              Load More Tools ({filteredResources.length - visibleCount} remaining)
            </button>
          </TouchScale>
        </div>
      )}

      {displayedResources.length === 0 && (
         <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            No tools found matching your search. Try resetting the filters.
         </div>
      )}

      {/* Sleek Copy Notification */}
      <CopyNotification 
        isVisible={isNotifyVisible} 
        onClose={() => setIsNotifyVisible(false)} 
      />
    </div>
  );
}
