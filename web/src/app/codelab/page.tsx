"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import { CODELAB_REGISTRY } from '@lib/codelab-registry';
import { useLanguage } from '@/context/LanguageContext';
import { useUser } from '@/context/UserContext';
import { gsap } from '@lib/gsap';
import SharedSidebar from '@shared/SharedSidebar';

const DynamicPreview = ({ componentName, paused }: { componentName: string, paused: boolean }) => {
  const Component = useMemo(() => dynamic<{ paused: boolean }>(() => import(`@modules/codelab/presets/${componentName}`), {
    ssr: false,
    loading: () => <div className={styles.loader}>Loading Lab...</div>
  }), [componentName]);

  return <Component paused={paused} />;
};

const CATEGORIES = ['All', 'Bookmarks', 'Text', 'Animations', 'Backgrounds', 'UI'];

export default function CodeLab() {
  const { t } = useLanguage();
  const { toggleBookmark, isBookmarked, bookmarks } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(`.${styles.header} > *`, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      });

      // Grid Animation
      gsap.from(`.${styles.card}`, {
        y: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });
      // Search Bar Animation
      const searchInput = containerRef.current?.querySelector(`.${styles.searchInput}`);
      if (searchInput) {
        searchInput.addEventListener('focus', () => {
          gsap.to(searchInput, { 
            scale: 1.02, 
            borderColor: "rgba(255,255,255,0.4)", 
            duration: 0.4, 
            ease: "expo.out" 
          });
        });
        searchInput.addEventListener('blur', () => {
          gsap.to(searchInput, { 
            scale: 1, 
            borderColor: "rgba(255,255,255,0.1)", 
            duration: 0.4, 
            ease: "expo.out" 
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openPanels, setOpenPanels] = useState<Record<string, string>>({});
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});
  const [pausedStates, setPausedStates] = useState<Record<string, boolean>>({});
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);

  
  const filteredComps = useMemo(() => {
    return CODELAB_REGISTRY.filter(comp => {
      const matchesCategory = activeCategory === 'All' 
        ? true 
        : activeCategory === 'Bookmarks' 
          ? isBookmarked(comp.id) 
          : comp.category === activeCategory;
      
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, isBookmarked]);

  const togglePanel = (id: string) => setOpenPanels(prev => prev[id] ? { ...prev, [id]: '' } : { ...prev, [id]: 'react' });
  const switchTab = (id: string, tab: string) => setOpenPanels(prev => ({ ...prev, [id]: tab }));
  const toggleAnimation = (id: string) => setPausedStates(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleDetails = (id: string) => setOpenDetails(prev => ({ ...prev, [id]: !prev[id] }));

  const copyToClipboard = async (id: string, code: string, type: 'react' | 'css') => {
    try {
      await navigator.clipboard.writeText(code);
      const key = `${id}-${type}`;
      setCopyStatus(prev => ({ ...prev, [key]: 'Copied!' }));
      setShowToast(true);
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [key]: '' }));
        setShowToast(false);
      }, 2000);
    } catch {
      // Error handled silently
    }
  };

  const highlightCode = (code: string) => {
    const highlighted = code
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/(let|const|var|import|export|from|function|return|if|else|true|false)\b/g, '<span class="' + styles.codeKeyword + '">$1</span>');
    return { __html: highlighted };
  };

  const sidebarItems = useMemo(() => {
    return CATEGORIES.map(cat => ({
      id: cat,
      label: cat === 'All' ? 'All Components' : cat,
      count: cat === 'Bookmarks' ? bookmarks.length : undefined,
    }));
  }, [bookmarks.length]);

  return (
    <div className="module-layout" ref={containerRef}>
      <SharedSidebar 
        title={t('codelab.title') || 'Code <span class="text-gradient">Lab</span>'}
        subtitle={t('codelab.subtitle')}
        searchTerm={searchQuery}
        onSearchChange={setSearchQuery}
        items={sidebarItems}
        activeItemId={activeCategory}
        onItemClick={setActiveCategory}
      />

      <main className="module-content">
        <header className={styles.header}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: t('codelab.title') }} />
          <p className={styles.subtitle}>{t('codelab.subtitle')}</p>
        </header>

        <div className={styles.grid}>
          {filteredComps.length > 0 ? filteredComps.map((item) => {
             const activeTab = openPanels[item.id] || '';
             const isPaused = pausedStates[item.id] || false;
             const isDetailsOpen = openDetails[item.id] || false;
             const bookmarked = isBookmarked(item.id);

             return (
              <div key={item.id} className={styles.card + ' halqa-card'}>
                <div className={styles.previewArea}>
                  <DynamicPreview componentName={item.componentName} paused={isPaused} />
                  <button 
                    onClick={() => toggleBookmark(item.id)} 
                    className={`${styles.bookmarkBtn} ${bookmarked ? styles.isBookmarked : ''}`}
                    aria-label="Bookmark Component"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </button>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{t(`codelab.components.${item.id}.name`) || item.name}</h3>
                    <span className={styles.catBadge}>{item.category}</span>
                  </div>
                  <p className={styles.cardDesc}>{t(`codelab.components.${item.id}.desc`) || item.description}</p>
                  
                  <div className={styles.actions}>
                    <button onClick={() => togglePanel(item.id)} className={styles.actionBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                      {activeTab ? 'Hide' : 'Code'}
                    </button>
                    <button onClick={() => toggleDetails(item.id)} className={styles.actionBtn}>
                      {isDetailsOpen ? 'Hide Info' : 'Details'}
                    </button>
                    <a href="https://playroomjs.com" target="_blank" rel="noopener noreferrer" className={styles.actionBtn} title="Open in Playground">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                    {item.hasAnimation && (
                      <button onClick={() => toggleAnimation(item.id)} className={styles.actionBtn}>
                        {isPaused ? '▶' : '⏸'}
                      </button>
                    )}
                  </div>

                  <div className={styles.detailsTray + ' ' + (isDetailsOpen ? styles.open : '')}>
                    <div className={styles.detailsContent}>
                        <div className={styles.detailBlock}>
                          <div className={styles.detailLabel}>The &quot;Why&quot;</div>
                          <p className={styles.detailVal}>{t(`codelab.components.${item.id}.why`)}</p>
                        </div>
                       <div className={styles.detailBlock}>
                         <div className={styles.detailLabel}>Core Topics</div>
                          <div className={styles.topicsCloud}>
                             {(t(`codelab.components.${item.id}.topics`) as string || '').split(',').map((topic: string) => (
                               <span key={topic} className={styles.topicTag}>{topic}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className={styles.viewContainer + ' ' + (activeTab ? styles.open : '')}>
                  <div className={styles.tabs}>
                    <button className={styles.tab + ' ' + (activeTab === 'react' ? styles.active : '')} onClick={() => switchTab(item.id, 'react')}>React</button>
                    <button className={styles.tab + ' ' + (activeTab === 'css' ? styles.active : '')} onClick={() => switchTab(item.id, 'css')}>CSS</button>
                  </div>
                  <div className={styles.pane + ' ' + (activeTab === 'react' ? styles.active : '')}>
                    <div className={styles.copyHeader}>
                       <button onClick={() => copyToClipboard(item.id, item.tsxCode, 'react')} className={styles.copyBtn}>
                          {copyStatus[`${item.id}-react`] || 'Copy TSX'}
                       </button>
                    </div>
                    <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.tsxCode)} />
                  </div>
                  <div className={styles.pane + ' ' + (activeTab === 'css' ? styles.active : '')}>
                    <div className={styles.copyHeader}>
                       <button onClick={() => copyToClipboard(item.id, item.cssCode, 'css')} className={styles.copyBtn}>
                          {copyStatus[`${item.id}-css`] || 'Copy CSS'}
                       </button>
                    </div>
                    <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.cssCode)} />
                  </div>
                  <div className={styles.viewFooter}>
                    <button onClick={() => togglePanel(item.id)} className={styles.backToLabBtn}>
                        &larr; Back to Component List
                    </button>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className={styles.emptyResults}>
               <h3 className={styles.emptyTitle}>{t('codelab.noResults.title')}</h3>
               <p className={styles.emptyText}>{t('codelab.noResults.text')}</p>
            </div>
          )}
        </div>

        <div className={styles.toast + ' ' + (showToast ? styles.show : '')}>Done! 🚀</div>
      </main>
    </div>
  );
}
