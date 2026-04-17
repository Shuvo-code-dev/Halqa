"use client";

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import { CODELAB_REGISTRY } from '@/lib/codelab-registry';
import { useLanguage } from '@/context/LanguageContext';

const DynamicPreview = ({ componentName, paused }: { componentName: string, paused: boolean }) => {
  const Component = useMemo(() => dynamic<{ paused: boolean }>(() => import(`@/components/codelab/presets/${componentName}`), {
    ssr: false,
    loading: () => <div className={styles.loader}>Loading Lab...</div>
  }), [componentName]);

  return <Component paused={paused} />;
};

export default function CodeLab() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openPanels, setOpenPanels] = useState<Record<string, string>>({});
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});
  const [pausedStates, setPausedStates] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const categories = ['All', 'Text', 'Animations', 'Backgrounds', 'UI'];
  
  const filteredComps = useMemo(() => {
    return CODELAB_REGISTRY.filter(comp => {
      const matchesCategory = activeCategory === 'All' || comp.category === activeCategory;
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const togglePanel = (id: string) => setOpenPanels(prev => prev[id] ? { ...prev, [id]: '' } : { ...prev, [id]: 'react' });
  const switchTab = (id: string, tab: string) => setOpenPanels(prev => ({ ...prev, [id]: tab }));
  const toggleAnimation = (id: string) => setPausedStates(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleDetails = (id: string) => setOpenDetails(prev => ({ ...prev, [id]: !prev[id] }));

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch(err) {}
  };

  const highlightCode = (code: string) => {
    let highlighted = code
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/(let|const|var|import|export|from|function|return|if|else|true|false)\b/g, '<span class="' + styles.codeKeyword + '">$1</span>');
    return { __html: highlighted };
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.searchBlock}>
          <input 
            type="text" 
            placeholder={t('codelab.searchPlaceholder')} 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <nav className={styles.sidebarNav}>
          <h3 className={styles.sidebarLabel}>{t('codelab.categories')}</h3>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={styles.filterBtn + ' ' + (activeCategory === cat ? styles.active : '')}>
              {cat === 'All' ? 'All Components' : cat}
            </button>
          ))}
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: t('codelab.title') }} />
          <p className={styles.subtitle}>{t('codelab.subtitle')}</p>
        </header>

        <div className={styles.grid}>
          {filteredComps.length > 0 ? filteredComps.map((item) => {
             const activeTab = openPanels[item.id] || '';
             const isPaused = pausedStates[item.id] || false;
             const isDetailsOpen = openDetails[item.id] || false;

             return (
              <div key={item.id} className={styles.card + ' glass-panel'}>
                <div className={styles.previewArea}>
                  <DynamicPreview componentName={item.componentName} paused={isPaused} />
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
                    {item.hasAnimation && (
                      <button onClick={() => toggleAnimation(item.id)} className={styles.actionBtn}>
                        {isPaused ? '▶' : '⏸'}
                      </button>
                    )}
                  </div>

                  {/* EDUCATIONAL DETAILS PANEL */}
                  <div className={styles.detailsTray + ' ' + (isDetailsOpen ? styles.open : '')}>
                    <div className={styles.detailsContent}>
                       <div className={styles.detailBlock}>
                         <div className={styles.detailLabel}>The "Why"</div>
                         <p className={styles.detailVal}>{t(`codelab.components.${item.id}.why`)}</p>
                       </div>
                       <div className={styles.detailBlock}>
                         <div className={styles.detailLabel}>Core Topics</div>
                         <div className={styles.topicsCloud}>
                            {(t(`codelab.components.${item.id}.topics`) as any || []).toString().split(',').map((topic: string) => (
                              <span key={topic} className={styles.topicTag}>{topic}</span>
                            ))}
                         </div>
                       </div>
                       <div className={styles.detailBlock}>
                         <div className={styles.detailLabel}>Actionable Guide</div>
                         <p className={styles.detailVal}>{t(`codelab.components.${item.id}.guide`)}</p>
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
                    <div className={styles.copyHeader}><button onClick={() => copyToClipboard(item.tsxCode)} className={styles.copyBtn}>Copy TSX</button></div>
                    <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.tsxCode)} />
                  </div>
                  <div className={styles.pane + ' ' + (activeTab === 'css' ? styles.active : '')}>
                    <div className={styles.copyHeader}><button onClick={() => copyToClipboard(item.cssCode)} className={styles.copyBtn}>Copy CSS</button></div>
                    <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.cssCode)} />
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

        <div className={styles.toast + ' ' + (showToast ? styles.show : '')}>Snippet copied 🚀</div>
      </main>
    </div>
  );
}
