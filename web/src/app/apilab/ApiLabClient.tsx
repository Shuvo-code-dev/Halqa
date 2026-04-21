'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicApi } from '@/lib/api-service';
import ApiCard from '@/components/modules/apilab/ApiCard';
import { Search, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import styles from './page.module.css';

interface ApiLabClientProps {
  initialApis: PublicApi[];
}

/**
 * Industrial-grade API Discovery Dashboard.
 * Optimized for high-density data and tactile feedback.
 */
export default function ApiLabClient({ initialApis }: ApiLabClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Categorization Logic
  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialApis.map(api => api.category)));
    return ['All', ...cats.sort()];
  }, [initialApis]);

  // Filtering Logic
  const filteredApis = useMemo(() => {
    return initialApis.filter(api => {
      const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          api.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || api.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialApis, searchQuery, selectedCategory]);

  return (
    <div className={styles.dashboardContainer}>
      {/* STICKY SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-4">
             <Sparkles className="w-3 h-3" />
             Lab Engine
           </div>
           <h1 className={styles.miniTitle}>API <span className="text-gradient">Lab</span></h1>
           <p className={styles.miniSubtitle}>Discovery & Integration</p>
        </div>

        <div className={styles.sidebarSection}>
            <label className={styles.sidebarLabel}>Global Discovery</label>
            <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Search Lab..." 
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        <div className={styles.sidebarSection}>
            <div className="flex items-center justify-between mb-4">
                <label className={styles.sidebarLabel}>Categories</label>
                <SlidersHorizontal className="w-3 h-3 text-gray-500" />
            </div>
            <div className={styles.categoryList}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                    >
                        {cat}
                        {selectedCategory === cat && <motion.div layoutId="sidebar-active" className={styles.activeIndicator} />}
                    </button>
                ))}
            </div>
        </div>
      </aside>

      {/* MAIN DISCOVERY GRID */}
      <main className={styles.discoveryContent}>
        <div className={styles.discoveryHeader}>
           <div className="flex items-center gap-4">
                <div className={styles.statBox}>
                    <span className={styles.statValue}>{filteredApis.length}</span>
                    <span className={styles.statLabel}>Resources Found</span>
                </div>
           </div>
           <button className={styles.sortBtn}>
                <ArrowUpDown className="w-4 h-4" />
                Latest Release
           </button>
        </div>

        {/* Liquid Grid with Staggered Reveals */}
        <div className={styles.gridContainer}>
           <AnimatePresence mode="popLayout">
            {filteredApis.slice(0, 40).map((api, index) => (
                <motion.div
                    key={api.name}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.05,
                      restDelta: 0.001
                    }}
                >
                    <ApiCard api={api} />
                </motion.div>
            ))}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
