'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import { API_REGISTRY, API_CATEGORIES } from '@lib/apilab-registry';
import SharedSidebar from '@shared/SharedSidebar';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 12;

export default function ApiLabClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [prevId, setPrevId] = useState<string | null>(null);

  // Sync with URL ID without cascading effect warnings
  const currentId = searchParams.get('id');
  if (currentId !== prevId) {
    setPrevId(currentId);
    if (currentId) {
      const api = API_REGISTRY.find(a => a.id === currentId);
      if (api) {
        setSearchTerm(api.name);
      }
    }
  }
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter Logic
  const filteredAPIs = useMemo(() => {
    return API_REGISTRY.filter(api => {
      const matchCat = activeCategory === 'All' || api.category === activeCategory;
      const matchSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          api.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const visibleAPIs = filteredAPIs.slice(0, visibleCount);

  // GSAP Animations & Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid entrance
      gsap.from(`.${styles.card}`, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.2
      });

      // 3D Parallax Persistence
      const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
      const cleanupFns: (() => void)[] = [];

      cards.forEach((card) => {
        const setTilt = (e: MouseEvent) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;

          gsap.to(card, {
            rotationY: x * 12,
            rotationX: -y * 12,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const resetTilt = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)"
          });
        };

        card.addEventListener('mousemove', setTilt);
        card.addEventListener('mouseleave', resetTilt);
        cleanupFns.push(() => {
          card.removeEventListener('mousemove', setTilt);
          card.removeEventListener('mouseleave', resetTilt);
        });
      });

      return () => {
        cleanupFns.forEach(fn => fn());
      };
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory, searchTerm, visibleCount]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredAPIs.length) {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredAPIs, visibleCount]);

  const sidebarItems = useMemo(() => {
    return API_CATEGORIES.map(cat => ({ id: cat, label: cat }));
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
              <Link href={`/apilab/${api.id}`} key={api.id} className={`${styles.card} halqa-card`}>
                <div className={styles.cardHeader}>
                  <div className={styles.catRow}>
                     <span className={styles.catBadge}>{api.category}</span>
                     <span className={`${styles.methodBadge} ${styles[api.method.toLowerCase()]}`}>
                        {api.method}
                     </span>
                  </div>
                  <h3 className={styles.cardTitle}>{api.name}</h3>
                </div>
                
                <p className={styles.cardDesc}>{api.description}</p>
                
                <div className={styles.cardFooter}>
                  <div className={styles.endpointPreview}>
                     <code>{api.endpoint.substring(0, 30)}...</code>
                  </div>
                  <span className={styles.testBtn}>Test Live &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {visibleCount < filteredAPIs.length && (
            <div ref={loadMoreRef} className={styles.loader}>
              <div className={styles.spinner}></div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
