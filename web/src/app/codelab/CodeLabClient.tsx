'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { REGISTRY_GROUPS, ComponentGroup, getComponentVariantData, RegistryItem } from '@lib/registry-service';
import { useRouter } from 'next/navigation';
import Spotlight from '@shared/Spotlight';
import TouchScale from '@shared/TouchScale';
import CopyNotification from '@shared/CopyNotification';

// Performance Optimization: React.memo for high-fidelity component previews
const DynamicPreview = React.memo(({ componentName }: { componentName: string }) => {
  const Component = useMemo(() => dynamic(() => import(`@modules/codelab/presets/${componentName}`), {
    ssr: false,
    loading: () => <div className={styles.loader}>Initializing Preview...</div>
  }), [componentName]);

  return <Component />;
});

DynamicPreview.displayName = 'DynamicPreview';

// High-Fidelity Custom Highlighter
const highlightCode = (code: string) => {
  if (!code) return { __html: '' };
  const highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(let|const|var|import|export|from|function|return|if|else|true|false|class|interface|type|extends|await|async|default)\b/g, '<span class="' + styles.codeKeyword + '">$1</span>')
    .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="' + styles.codeString + '">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="' + styles.codeComment + '">$1</span>');
  return { __html: highlighted };
};

export default function CodeLabClient() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<ComponentGroup | null>(() => {
    if (typeof window === 'undefined') return null;
    const id = new URLSearchParams(window.location.search).get('component');
    return REGISTRY_GROUPS.find(g => g.title === id) || REGISTRY_GROUPS[0] || null;
  });
  
  const [activeLang, setActiveLang] = useState<'TS' | 'JS'>('TS');
  const [activeStyle, setActiveStyle] = useState<'TW' | 'CSS'>('TW');
  const [currentVariantData, setCurrentVariantData] = useState<RegistryItem | null>(null);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);

  // Handle Selection Change and State Sync
  useEffect(() => {
    if (!selectedGroup) return;

    const variantId = `${selectedGroup.title}-${activeLang}-${activeStyle}`;
    const loadData = async () => {
      setIsLoadingCode(true);
      const data = await getComponentVariantData(variantId);
      setCurrentVariantData(data);
      setIsLoadingCode(false);
    };

    loadData();
  }, [selectedGroup, activeLang, activeStyle]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return REGISTRY_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    return REGISTRY_GROUPS.filter(g => 
      g.title.toLowerCase().includes(lowerQuery) || 
      g.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const handleSelect = (group: ComponentGroup) => {
    setSelectedGroup(group);
    const params = new URLSearchParams(window.location.search);
    params.set('component', group.title);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const copyCode = async () => {
    if (!currentVariantData?.files?.[0]?.content) return;
    try {
      await navigator.clipboard.writeText(currentVariantData.files[0].content);
      setIsNotifyVisible(true);
    } catch {
      // Silent fail
    }
  };

  // Pre-compiled presets list
  const PRE_BUILT = ['Ballpit', 'BlurText', 'ClickSpark', 'GlitchText', 'LiquidChrome', 'ShinyText', 'AuroraBg', 'AdaptiveBento', 'MagnetButton'];

  return (
    <div className={styles.explorerLayout} ref={containerRef}>
      {/* SIDEBAR: Registry Discovery */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
             <span className="text-gradient font-black">BULZ</span> LAB
          </div>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search components..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20, 
                  delay: index * 0.05 
                }}
              >
                <button 
                  onClick={() => handleSelect(group)}
                  className={`${styles.navItem} ${selectedGroup?.title === group.title ? styles.active : ''}`}
                >
                  <div className={styles.navItemMain}>
                    <span className={styles.navTitle}>{group.title}</span>
                    {selectedGroup?.title === group.title && <motion.div layoutId="nav-active" className={styles.navActiveIndicator} />}
                  </div>
                  <span className={styles.navSubtext}>{group.variants.length} variations</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredGroups.length === 0 && (
             <div className={styles.emptySidebar}>No components found</div>
          )}
        </nav>
      </aside>

      {/* MAIN VIEW: Component Details */}
      <main className={styles.mainContainer}>
        <AnimatePresence mode="wait">
          {selectedGroup ? (
            <motion.div 
              key={selectedGroup.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.6 }}
              className={styles.contentWrapper}
            >
              <div className={styles.contentGrid}>
                
                {/* Left Column: Info & Preview */}
                <div className={styles.infoCol}>
                  <header className={styles.contentHeader}>
                    <h1 className={styles.componentTitle}>{selectedGroup.title}</h1>
                    <p className={styles.componentDescription}>{selectedGroup.description}</p>
                  </header>

                  <div className={styles.configSection}>
                     <div className={styles.configItem}>
                        <span className={styles.configLabel}>Language</span>
                        <div className={styles.tabGroup}>
                          {['TS', 'JS'].map(lang => (
                            <button 
                              key={lang}
                              onClick={() => setActiveLang(lang as 'TS' | 'JS')} 
                              className={`${styles.tabBtn} ${activeLang === lang ? styles.active : ''}`}
                            >
                              {lang}
                              {activeLang === lang && <motion.div layoutId="lang-tab" className={styles.tabActive} />}
                            </button>
                          ))}
                        </div>
                     </div>
                     <div className={styles.configItem}>
                        <span className={styles.configLabel}>Styles</span>
                        <div className={styles.tabGroup}>
                          {[
                            { id: 'TW', label: 'Tailwind' },
                            { id: 'CSS', label: 'CSS' }
                          ].map(style => (
                            <button 
                              key={style.id}
                              onClick={() => setActiveStyle(style.id as 'TW' | 'CSS')} 
                              className={`${styles.tabBtn} ${activeStyle === style.id ? styles.active : ''}`}
                            >
                              {style.label}
                              {activeStyle === style.id && <motion.div layoutId="style-tab" className={styles.tabActive} />}
                            </button>
                          ))}
                        </div>
                     </div>
                  </div>

                  {PRE_BUILT.includes(selectedGroup.title) && (
                    <Spotlight className="rounded-2xl mt-8 overflow-hidden border border-border-glass shadow-2xl">
                      <div className={styles.previewContainer}>
                        <div className={styles.previewHeader}>Live Demo</div>
                        <div className={styles.previewWindow}>
                           <DynamicPreview componentName={selectedGroup.title} />
                        </div>
                      </div>
                    </Spotlight>
                  )}
                </div>

                {/* Right Column: Code Viewer */}
                <div className={styles.codeCol}>
                  <div className={styles.codeEditor}>
                    <div className={styles.editorHeader}>
                      <div className={styles.fileName}>
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                         {currentVariantData?.files?.[0]?.path || `${selectedGroup.title}.tsx`}
                      </div>
                      <TouchScale isLarge={false} scale={0.96}>
                        <button onClick={copyCode} className={styles.copyAction}>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                           Copy
                        </button>
                      </TouchScale>
                    </div>
                    <div className={styles.codeViewport}>
                      {isLoadingCode ? (
                        <div className={styles.viewerLoading}>
                           <div className={styles.loaderSpinner} />
                           <span>Syncing from registry...</span>
                        </div>
                      ) : (
                        <pre className={styles.preContent} dangerouslySetInnerHTML={highlightCode(currentVariantData?.files?.[0]?.content || '/* Source not found in registry */')} />
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.emptyPrompt}
            >
              <div className={styles.promptIcon}>🧬</div>
              <h2>Registry Explorer</h2>
              <p>Select an architectural pattern from the sidebar to inspect the source code.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CopyNotification 
        isVisible={isNotifyVisible} 
        onClose={() => setIsNotifyVisible(false)} 
      />
    </div>
  );
}
