"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import styles from './page.module.css';

// === PHASE 1 IMPORTS & PREVIEWS === //
const SplitText = ({ text = "Framer Motion", paused = false }: { text?: string, paused?: boolean }) => {
  const characters = text.split("");
  return (
    <h2 style={{ display: 'flex', gap: '2px', fontSize: '2rem', fontWeight: 800 }}>
      {characters.map((char, index) => (
        <motion.span key={index} initial={{ opacity: 0, y: 20 }} animate={paused ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

const NoiseBg = () => (
  <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: '#fff', fontWeight: 600, fontSize: '1.5rem' }}>Static Noise</div>
  </div>
);

const GradientFog = ({ paused = false }: { paused?: boolean }) => (
  <div className={styles.fogContainer}>
    <div className={styles.fogBlob + ' ' + styles.fogBlob1 + ' ' + (paused ? styles.paused : '')} />
    <div className={styles.fogBlob + ' ' + styles.fogBlob2 + ' ' + (paused ? styles.paused : '')} />
    <div className={styles.fogGlass} />
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems:'center', justifyContent: 'center' }}>
        <h3 className={styles.fogText}>Cosmic Fog</h3>
    </div>
  </div>
);

const MagneticButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });
  return (
    <motion.button ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} className={styles.demoHalqaBtn} style={{ scale: 1.1 }}>
      Magnetize Me
    </motion.button>
  );
};

const ShinyText = ({ paused = false }: { paused?: boolean }) => (
  <div className={styles.shinyText + ' ' + (paused ? styles.paused : '')}>
    Luminous Flow
  </div>
);

const ModernBento = () => (
  <div className={styles.bentoGrid}>
    <div className={styles.bentoItem + ' ' + styles.bentoWide}>Span 2</div>
    <div className={styles.bentoItem + ' ' + styles.bentoTall}>Vertical</div>
    <div className={styles.bentoItem}>Standard</div>
    <div className={styles.bentoItem}>Standard</div>
  </div>
);

const AntigravityHover = () => (
  <motion.div whileHover={{ y: -15, rotateX: 10, rotateY: 10, scale: 1.05 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }} style={{ width: 120, height: 120, background: 'linear-gradient(135deg, var(--bg-glass), var(--bg-glass-hover))', border: '1px solid var(--accent)', borderRadius: '16px', boxShadow: '0 10px 30px var(--accent-glow)' }} />
);

// === PHASE 2 PREVIEWS === //

const AppleBento = () => (
  <div className={styles.appleBento}>
    <div className={styles.appleBentoCard + ' ' + styles.appleBentoFeature}>
      <h4 className={styles.appleBentoText}>Pro Display</h4>
      <p className={styles.appleBentoSub}>120Hz Refresh Rate</p>
    </div>
    <div className={styles.appleBentoCard}>
      <h4 className={styles.appleBentoText}>A17 Bionic</h4>
    </div>
    <div className={styles.appleBentoCard}>
      <h4 className={styles.appleBentoText}>Titanium</h4>
    </div>
  </div>
);

const InfiniteMarquee = ({ paused = false }: { paused?: boolean }) => {
  const Row = () => (
    <div className={styles.marqueeTrack + ' ' + (paused ? styles.paused : '')}>
      <span className={styles.marqueeItem}>REACT</span>
      <span className={styles.marqueeItem}>TYPESCRIPT</span>
      <span className={styles.marqueeItem}>NEXT.JS</span>
      <span className={styles.marqueeItem}>FRAMER</span>
      <span className={styles.marqueeItem}>TAILWIND</span>
      <span className={styles.marqueeItem}>REACT</span>
      <span className={styles.marqueeItem}>TYPESCRIPT</span>
      <span className={styles.marqueeItem}>NEXT.JS</span>
      <span className={styles.marqueeItem}>FRAMER</span>
      <span className={styles.marqueeItem}>TAILWIND</span>
    </div>
  );
  return (
    <div className={styles.marqueeContainer}>
      <Row />
    </div>
  );
};

const DockIcon = ({ mouseX }: { mouseX: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  return <motion.div ref={ref} style={{ width, height: width }} className={styles.dockIcon} />
};

const FloatingDock = () => {
  const mouseX = useMotionValue(Infinity);
  return (
    <div className={styles.dockContainer} onMouseMove={(e) => mouseX.set(e.pageX)} onMouseLeave={() => mouseX.set(Infinity)}>
      {[1, 2, 3, 4, 5].map((i) => <DockIcon key={i} mouseX={mouseX} />)}
    </div>
  )
};

const CmdPalette = () => (
  <div className={styles.cmdModal}>
    <div className={styles.cmdInputWrap}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="text" className={styles.cmdInput} placeholder="Type a command or search..." readOnly />
    </div>
    <div className={styles.cmdList}>
      <div className={styles.cmdItem + ' ' + styles.active}>
        <span>Create Component...</span>
        <span className={styles.cmdHotKey}>⌘ C</span>
      </div>
      <div className={styles.cmdItem}>
        <span>Deploy to Vercel</span>
        <span className={styles.cmdHotKey}>⇧ D</span>
      </div>
    </div>
  </div>
);

// === DATA MODEL === //

type PropDef = { name: string; type: string; default: string; desc: string };

type ComponentItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  hasAnimation: boolean;
  props: PropDef[];
  preview: (paused: boolean) => React.ReactNode;
  tsxCode: string;
  cssCode: string;
};

const RAW_COMPONENTS: ComponentItem[] = [
  {
    id: 'apple-bento', category: 'High-End Layouts', name: 'Apple-Style Bento', hasAnimation: false,
    description: 'A sophisticated asymmetrical feature grid using structural geometries and deep glassmorphism.',
    props: [],
    preview: () => <AppleBento />,
    tsxCode: `export const AppleBento = () => (
  <div className="apple-bento">
    <div className="apple-bento-card feature">
      <h4>Pro Display</h4>
    </div>
    <div className="apple-bento-card" />
    <div className="apple-bento-card" />
  </div>
);`,
    cssCode: `/* Check page.module.css for complete appleBento definitions */`
  },
  {
    id: 'inf-marquee', category: 'High-End Layouts', name: 'Infinite Marquee', hasAnimation: true,
    description: 'A buttery smooth CSS-only horizontal infinite text scroller.',
    props: [],
    preview: (paused) => <InfiniteMarquee paused={paused} />,
    tsxCode: `export const Marquee = () => (
  <div className="marquee-container">
    <div className="marquee-track">
      <span>REACT</span><span>NEXT</span>
      {/* Duplicated track inline or mapped */}
    </div>
  </div>
);`,
    cssCode: `@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}`
  },
  {
    id: 'mac-dock', category: 'Navigation Masterclass', name: 'Floating macOS Dock', hasAnimation: false,
    description: 'Calculates cursor distances directly to drive scaling magnification physics identically to macOS.',
    props: [],
    preview: () => <FloatingDock />,
    tsxCode: `import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// Complete logic mapped in open source preview repo`,
    cssCode: `.dock-container { position: absolute; ... }`
  },
  {
    id: 'cmd-palette', category: 'Navigation Masterclass', name: 'Command Palette UI', hasAnimation: false,
    description: 'A pristine dark-mode search overlay that acts as the command center for power users.',
    props: [],
    preview: () => <CmdPalette />,
    tsxCode: `export const CmdPalette = () => (
  <div className="cmd-modal">
    <input type="text" placeholder="Search..." />
    <div className="cmd-results">...</div>
  </div>
);`,
    cssCode: `.cmd-modal { background: #111; ... }`
  },
  // -- Phase 1 Legacy Injections Below -- //
  {
    id: 'split-text', category: 'Text Effects', name: 'Split Text', hasAnimation: true,
    description: 'A staggered character reveal utilizing Framer Motion. Ideal for powerful landing page typography.',
    props: [], preview: (paused) => <SplitText paused={paused} />, tsxCode: '/* View GitHub Repo for Full Snippet */', cssCode: ''
  },
  {
    id: 'gradient-fog', category: 'Backgrounds', name: 'Gradient Fog', hasAnimation: true,
    description: 'A dynamic, fluid blob background that floats infinitely beneath a heavy glassmorphism blur.',
    props: [], preview: (paused) => <GradientFog paused={paused} />, tsxCode: '/* View GitHub Repo for Full Snippet */', cssCode: ''
  },
  {
    id: 'magnetic-btn', category: 'Micro-Interactions', name: 'Magnetic Button', hasAnimation: false,
    description: 'Tracks cursor proximity to organically pull the element towards the pointer using fluid physics.',
    props: [], preview: () => <MagneticButton />, tsxCode: '/* View GitHub Repo for Full Snippet */', cssCode: ''
  },
  {
    id: 'antigrav-hover', category: 'Special', name: 'Antigravity Hover', hasAnimation: false,
    description: 'Levitates and breaks logical 2D axes simultaneously when approached by the user pointer.',
    props: [], preview: () => <AntigravityHover />, tsxCode: '/* View GitHub Repo for Full Snippet */', cssCode: ''
  }
];

// === HIGHLIGHT ENGINE === //
const highlightCode = (code: string) => {
  let highlighted = code
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(=)(\s*(["']).*?\3)/g, '$1<span class="' + styles.codeString + '">$2</span>')
    .replace(/(&lt;[A-Za-z0-9]+)/g, '<span class="' + styles.codeTag + '">$1</span>')
    .replace(/(&lt;\/[A-Za-z0-9]+&gt;)/g, '<span class="' + styles.codeTag + '">$1</span>')
    .replace(/([A-Za-z0-9-]+)(=)/g, '<span class="' + styles.codeAttr + '">$1</span>$2')
    .replace(/(let|const|var|import|export|from|function|return|if|else|true|false)\b/g, '<span class="' + styles.codeKeyword + '">$1</span>');
  return { __html: highlighted };
};

export default function CodeLab() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openPanels, setOpenPanels] = useState<Record<string, string>>({});
  const [pausedStates, setPausedStates] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const categories = ['All', ...Array.from(new Set(RAW_COMPONENTS.map(c => c.category)))];
  
  const filteredComps = activeCategory === 'All' 
    ? RAW_COMPONENTS 
    : RAW_COMPONENTS.filter(c => c.category === activeCategory);

  const categorized = filteredComps.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, ComponentItem[]>);

  const togglePanel = (id: string) => setOpenPanels(prev => prev[id] ? { ...prev, [id]: '' } : { ...prev, [id]: 'react' });
  const switchTab = (id: string, tab: string) => setOpenPanels(prev => ({ ...prev, [id]: tab }));
  const toggleAnimation = (id: string) => setPausedStates(prev => ({ ...prev, [id]: !prev[id] }));

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch(err) {}
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={styles.filterBtn + ' ' + (activeCategory === cat ? styles.active : '')}
          >
            {cat}
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Code <span className="text-gradient">Lab</span></h1>
          <p className={styles.subtitle}>
            A curated massive vault of elite-tier React + CSS blocks ready to copy-paste.
          </p>
        </header>

        {Object.entries(categorized).map(([catName, comps]) => (
          <section key={catName} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{catName}</h2>
            <div className={styles.grid}>
              {comps.map((item) => {
                 const activeTab = openPanels[item.id] || '';
                 const isPaused = pausedStates[item.id] || false;

                 return (
                  <div key={item.id} className={styles.card + ' glass-panel'}>
                    <div className={styles.previewArea}>
                      {item.preview(isPaused)}
                    </div>
                    
                    <div className={styles.cardBody}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>{item.name}</h3>
                      </div>
                      <p className={styles.cardDesc}>{item.description}</p>
                      
                      <div className={styles.actions}>
                        <button onClick={() => togglePanel(item.id)} className={styles.actionBtn}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                          {openPanels[item.id] ? 'Hide' : 'Code'}
                        </button>
                        {item.hasAnimation && (
                          <button onClick={() => toggleAnimation(item.id)} className={styles.actionBtn}>
                            {isPaused ? '▶ Play' : '⏸ Pause'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={styles.viewContainer + ' ' + (activeTab ? styles.open : '')}>
                      <div className={styles.tabs}>
                        <button className={styles.tab + ' ' + (activeTab === 'react' ? styles.active : '')} onClick={() => switchTab(item.id, 'react')}>React</button>
                        <button className={styles.tab + ' ' + (activeTab === 'css' ? styles.active : '')} onClick={() => switchTab(item.id, 'css')}>CSS</button>
                      </div>
                      <div className={styles.pane + ' ' + (activeTab === 'react' ? styles.active : '')}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                          <button onClick={() => copyToClipboard(item.tsxCode)} className={styles.actionBtn} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Copy</button>
                        </div>
                        <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.tsxCode)} />
                      </div>
                      <div className={styles.pane + ' ' + (activeTab === 'css' ? styles.active : '')}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                          <button onClick={() => copyToClipboard(item.cssCode)} className={styles.actionBtn} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Copy</button>
                        </div>
                        <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.cssCode)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className={styles.toast + ' ' + (showToast ? styles.show : '')}>
          Copied to clipboard! 🚀
        </div>
      </main>
    </div>
  );
}
