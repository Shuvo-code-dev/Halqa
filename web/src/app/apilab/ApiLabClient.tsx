'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from '@lib/gsap';
import { Search, Layers, Database, Sparkles } from 'lucide-react';
import { 
  getFlattenedApis, 
  getApiCategories, 
  filterApis 
} from '@/lib/api-service';
import ApiCard from '@/components/modules/apilab/ApiCard';
import EmptyState from '@/components/shared/EmptyState';
import TouchScale from '@/components/shared/TouchScale';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 24;

export default function ApiLabClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [prevId, setPrevId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const currentId = searchParams.get('id');
  const allApis = useMemo(() => getFlattenedApis(), []);
  const categories = useMemo(() => getApiCategories(), []);

  // Sync with URL ID
  if (currentId !== prevId) {
    setPrevId(currentId);
    if (currentId) {
      const api = allApis.find(a => a.id === currentId);
      if (api) {
        setSearchTerm(api.name);
        setActiveCategory(api.category);
      }
    }
  }

  const filteredApis = useMemo(() => {
    return filterApis(allApis, searchTerm, activeCategory);
  }, [allApis, searchTerm, activeCategory]);

  const visibleApis = filteredApis.slice(0, visibleCount);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".api-card-wrapper", {
        y: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "expo.out",
        clearProps: "all"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory, searchTerm, visibleCount]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredApis.length) {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredApis.length, visibleCount]);

  return (
    <div className={styles.dashboardContainer} ref={containerRef} style={{ paddingTop: '8rem' }}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-4">
             <Sparkles className="w-3 h-3" />
             Lab Engine v2.0
           </div>
           <h1 className={styles.miniTitle}>API <span className="text-gradient">Lab</span></h1>
           <p className={styles.miniSubtitle}>Discovery & Integration</p>
        </div>

        <div className={styles.searchBox}>
           <TouchScale scale={0.98}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent transition-colors" />
                <input 
                  type="text"
                  placeholder="Search streams..."
                  className={styles.sidebarSearch}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
           </TouchScale>
        </div>

        <div className="mt-4">
           <h3 className={styles.sidebarTitle}>Categories</h3>
           <nav className={styles.categoryList}>
             <TouchScale scale={0.98} className="w-full">
               <button 
                 onClick={() => setActiveCategory('All')}
                 className={`${styles.filterBtn} ${activeCategory === 'All' ? styles.active : ''} w-full flex items-center gap-2`}
               >
                 <Layers className="w-4 h-4" />
                 All Streams
               </button>
             </TouchScale>
             {categories.map((cat) => (
               <TouchScale key={cat.name} scale={0.98} className="w-full">
                 <button 
                   onClick={() => setActiveCategory(cat.name)}
                   className={`${styles.filterBtn} ${activeCategory === cat.name ? styles.active : ''} w-full flex items-center justify-between`}
                 >
                   <span>{cat.name}</span>
                   <span className="text-[10px] opacity-50">{cat.count}</span>
                 </button>
               </TouchScale>
             ))}
           </nav>
        </div>
      </aside>

      {/* Main Results Area */}
      <main className={styles.mainContent}>
        <div className={styles.resultMeta}>
           <div className="flex items-center gap-4">
             <Database className="w-4 h-4" />
             <span>Showing {filteredApis.length} artifacts across {activeCategory}</span>
           </div>
        </div>

        {visibleApis.length > 0 ? (
          <div className={styles.grid}>
            {visibleApis.map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Data Stream Empty" 
            message={`Zero results detected for "${searchTerm}" in the current matrix.`}
            icon="filter"
          />
        )}

        {/* Load More Indicator */}
        {visibleCount < filteredApis.length && (
          <div ref={loadMoreRef} className={styles.loader}>
             <div className={styles.spinner} />
          </div>
        )}
      </main>
    </div>
  );
}
