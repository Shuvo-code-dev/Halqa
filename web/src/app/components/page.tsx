"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

// === INTERNAL REACT PREVIEW COMPONENTS === //

const SplitText = ({ text = "Framer Motion", paused = false }: { text?: string, paused?: boolean }) => {
  const characters = text.split("");
  return (
    <h2 style={{ display: 'flex', gap: '2px', fontSize: '2rem', fontWeight: 800 }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={paused ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

const NoiseBg = () => (
  <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ 
       position: 'absolute', inset: 0, opacity: 0.15,
       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }} />
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: '#fff', fontWeight: 600, fontSize: '1.5rem' }}>Static Noise</div>
  </div>
);

const GradientFog = ({ paused = false }: { paused?: boolean }) => (
  <div className={styles.fogContainer}>
    <div className={`${styles.fogBlob} ${styles.fogBlob1} ${paused ? styles.paused : ''}`} />
    <div className={`${styles.fogBlob} ${styles.fogBlob2} ${paused ? styles.paused : ''}`} />
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
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={styles.demoHalqaBtn}
      style={{ scale: 1.1 }}
    >
      Magnetize Me
    </motion.button>
  );
};

const ShinyText = ({ paused = false }: { paused?: boolean }) => (
  <div className={`${styles.shinyText} ${paused ? styles.paused : ''}`}>
    Luminous Flow
  </div>
);

const ModernBento = () => (
  <div className={styles.bentoGrid}>
    <div className={`${styles.bentoItem} ${styles.bentoWide}`}>Span 2</div>
    <div className={`${styles.bentoItem} ${styles.bentoTall}`}>Vertical</div>
    <div className={styles.bentoItem}>Standard</div>
    <div className={styles.bentoItem}>Standard</div>
  </div>
);

const AntigravityHover = () => (
  <motion.div 
     whileHover={{ y: -15, rotateX: 10, rotateY: 10, scale: 1.05 }}
     transition={{ type: 'spring', stiffness: 200, damping: 10 }}
     style={{ width: 120, height: 120, background: 'linear-gradient(135deg, var(--bg-glass), var(--bg-glass-hover))', border: '1px solid var(--accent)', borderRadius: '16px', boxShadow: '0 10px 30px var(--accent-glow)' }}
  />
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

const COMPONENTS: ComponentItem[] = [
  {
    id: 'split-text', category: 'Text Effects', name: 'Split Text', hasAnimation: true,
    description: 'A staggered character reveal utilizing Framer Motion. Ideal for powerful landing page typography.',
    props: [
      { name: 'text', type: 'string', default: '"Framer Motion"', desc: 'The string boundary to split and animate.' },
      { name: 'delayFactor', type: 'number', default: '0.05', desc: 'The time delay gap between each character flip.' }
    ],
    preview: (paused) => <SplitText paused={paused} />,
    tsxCode: `import { motion } from 'framer-motion';

export const SplitText = ({ text = "Framer Motion" }) => {
  const characters = text.split("");
  return (
    <h2 style={{ display: 'flex', gap: '2px' }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};`,
    cssCode: `/* No external CSS required. Relies on Inline Motion Maps. */`
  },
  {
    id: 'noise-bg', category: 'Backgrounds', name: 'Noise Background', hasAnimation: false,
    description: 'A deeply textured static noise overlay utilizing SVG fractals embedded directly via base64 data.',
    props: [],
    preview: () => <NoiseBg />,
    tsxCode: `export const NoiseBg = () => (
  <div className="noise-container">
    <div className="noise-layer" />
    <div className="content">Static Noise</div>
  </div>
);`,
    cssCode: `.noise-container {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n}\n\n.noise-layer {\n  position: absolute;\n  inset: 0;\n  opacity: 0.15;\n  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");\n}\n\n.content {\n  position: relative;\n  z-index: 1;\n}`
  },
  {
    id: 'gradient-fog', category: 'Backgrounds', name: 'Gradient Fog', hasAnimation: true,
    description: 'A dynamic, fluid blob background that floats infinitely beneath a heavy glassmorphism blur.',
    props: [],
    preview: (paused) => <GradientFog paused={paused} />,
    tsxCode: `export const GradientFog = () => (
  <div className="fog-container">
    <div className="fog-blob fog-blob-1" />
    <div className="fog-blob fog-blob-2" />
    <div className="fog-glass" />
  </div>
);`,
    cssCode: `.fog-container {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  background: #020202;\n}\n\n.fog-blob {\n  position: absolute;\n  filter: blur(40px);\n  border-radius: 50%;\n  opacity: 0.5;\n  animation: float 8s ease-in-out infinite;\n}\n\n.fog-blob-1 {\n  background: #2dd4bf;\n  width: 150px;\n  height: 150px;\n}\n\n.fog-blob-2 {\n  background: #7c3aed;\n  width: 200px;\n  height: 200px;\n  animation-delay: -4s;\n}\n\n.fog-glass {\n  position: absolute;\n  inset: 0;\n  backdrop-filter: blur(60px);\n  z-index: 1;\n}\n\n@keyframes float {\n  0%, 100% { transform: translateY(0) scale(1); }\n  50% { transform: translateY(20px) scale(1.1); }\n}`
  },
  {
    id: 'magnetic-btn', category: 'Micro-Interactions', name: 'Magnetic Button', hasAnimation: false,
    description: 'Tracks cursor proximity to organically pull the element towards the pointer using fluid physics.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', desc: 'The button inner content.' }
    ],
    preview: () => <MagneticButton />,
    tsxCode: `import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export const MagneticButton = ({ children }) => {
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
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
};`,
    cssCode: `/* Attach standard button CSS as desired. Framer handles structural transform maps. */`
  },
  {
    id: 'shiny-text', category: 'Micro-Interactions', name: 'Shiny Text', hasAnimation: true,
    description: 'A luminous fluid light sweep passing constantly over text surfaces representing premium states.',
    props: [
      { name: 'text', type: 'string', default: '"Shiny"', desc: 'The text to apply the clip gradient map to.' }
    ],
    preview: (paused) => <ShinyText paused={paused} />,
    tsxCode: `export const ShinyText = ({ text = "Luminous Flow" }) => (
  <div className="shiny-text">{text}</div>
);`,
    cssCode: `.shiny-text {\n  font-size: 2rem;\n  font-weight: 800;\n  background: linear-gradient(\n    to right,\n    #71717a 20%,\n    #ffffff 50%,\n    #71717a 80%\n  );\n  background-size: 200% auto;\n  color: #000;\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: shine 3s linear infinite;\n}\n\n@keyframes shine {\n  to {\n    background-position: 200% center;\n  }\n}`
  },
  {
    id: 'bento-grid', category: 'Layouts', name: 'Modern Bento Grid', hasAnimation: false,
    description: 'Sophisticated asymmetrical grid engine mimicking the famous Apple widget matrix layouts.',
    props: [],
    preview: () => <ModernBento />,
    tsxCode: `export const ModernBento = () => (
  <div className="bento-grid">
    <div className="bento-item bento-wide">Span 2</div>
    <div className="bento-item bento-tall">Vertical</div>
    <div className="bento-item">Standard</div>
    <div className="bento-item">Standard</div>
  </div>
);`,
    cssCode: `.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(2, 100px);\n  gap: 0.5rem;\n  width: 100%;\n}\n\n.bento-item {\n  background: rgba(255,255,255,0.05);\n  border-radius: 8px;\n  border: 1px solid rgba(255,255,255,0.1);\n}\n\n.bento-wide { grid-column: span 2; }\n.bento-tall { grid-row: span 2; }`
  },
  {
    id: 'antigrav-hover', category: 'Special', name: 'Antigravity Hover', hasAnimation: false,
    description: 'Levitates and breaks logical 2D axes simultaneously when approached by the user pointer.',
    props: [],
    preview: () => <AntigravityHover />,
    tsxCode: `import { motion } from 'framer-motion';

export const AntigravityHover = () => (
  <motion.div 
     whileHover={{ y: -15, rotateX: 10, rotateY: 10, scale: 1.05 }}
     transition={{ type: 'spring', stiffness: 200, damping: 10 }}
     className="antigrav-box"
  />
);`,
    cssCode: `.antigrav-box {\n  width: 120px;\n  height: 120px;\n  border-radius: 16px;\n}`
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
    .replace(/(padding|margin|color|background|border|border-radius|cursor|transition|box-shadow|outline|backdrop-filter|font-size|font-weight|width|max-width|position|inset|overflow|display|align-items|justify-content|z-index|animation|filter|opacity|grid-template-columns|grid-template-rows|gap):/g, '<span class="' + styles.codeAttr + '">$1</span>:')
    .replace(/(:hover|:focus|::placeholder)/g, '<span class="' + styles.codeKeyword + '">$1</span>')
    .replace(/\b(import|export|const|let|var|return|function|from)\b/g, '<span class="' + styles.codeKeyword + '">$1</span>')
    .replace(/\b(useState|useRef|useEffect|motion)\b/g, '<span class="' + styles.codeVariable + '">$1</span>');
    
  return { __html: highlighted };
};

// === MAIN RENDER EXPORT === //
export default function ComponentsLibrary() {
  const [openPanels, setOpenPanels] = useState<Record<string, string>>({}); // string maps to active tab inside the panel
  const [pausedStates, setPausedStates] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const togglePanel = (id: string) => {
    setOpenPanels(prev => prev[id] ? { ...prev, [id]: '' } : { ...prev, [id]: 'react' });
  };

  const switchTab = (id: string, tab: string) => {
    setOpenPanels(prev => ({ ...prev, [id]: tab }));
  };

  const toggleAnimation = (id: string) => {
    setPausedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Grouping components by Category
  const categorized = COMPONENTS.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, ComponentItem[]>);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Code <span className="text-gradient">Library</span></h1>
        <p className={styles.subtitle}>
          Premium UI blueprints tailored for absolute performance. Grasp the React abstractions 
          and structural CSS modules ready for exact deployment.
        </p>
      </header>

      {Object.entries(categorized).map(([catName, comps]) => (
        <section key={catName}>
          <h2 className={styles.categoryTitle}>{catName}</h2>
          <div className={styles.grid}>
            {comps.map((item) => {
               const activeTab = openPanels[item.id] || '';
               const isPaused = pausedStates[item.id] || false;

               return (
                <div key={item.id} className={`${styles.card} glass-panel`}>
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

                  <div className={`${styles.viewContainer} ${activeTab ? styles.open : ''}`}>
                    <div className={styles.tabs}>
                      <button className={`${styles.tab} ${activeTab === 'react' ? styles.active : ''}`} onClick={() => switchTab(item.id, 'react')}>React</button>
                      <button className={`${styles.tab} ${activeTab === 'css' ? styles.active : ''}`} onClick={() => switchTab(item.id, 'css')}>CSS</button>
                      <button className={`${styles.tab} ${activeTab === 'props' ? styles.active : ''}`} onClick={() => switchTab(item.id, 'props')}>Props</button>
                    </div>

                    <div className={`${styles.pane} ${activeTab === 'react' ? styles.active : ''}`}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                        <button onClick={() => copyToClipboard(item.tsxCode)} className={styles.actionBtn} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Copy</button>
                      </div>
                      <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.tsxCode)} />
                    </div>

                    <div className={`${styles.pane} ${activeTab === 'css' ? styles.active : ''}`}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                        <button onClick={() => copyToClipboard(item.cssCode)} className={styles.actionBtn} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Copy</button>
                      </div>
                      <pre className={styles.pre} dangerouslySetInnerHTML={highlightCode(item.cssCode)} />
                    </div>

                    <div className={`${styles.pane} ${activeTab === 'props' ? styles.active : ''}`}>
                      {item.props.length > 0 ? (
                        <table className={styles.propsTable}>
                          <thead>
                            <tr>
                              <th>Prop</th>
                              <th>Type</th>
                              <th>Default</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.props.map((p, i) => (
                              <tr key={i}>
                                <td>{p.name}</td>
                                <td><span className={styles.propBadge}>{p.type}</span></td>
                                <td>{p.default}</td>
                                <td>{p.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>This component does not require mapped properties.</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className={`${styles.toast} ${showToast ? styles.show : ''}`}>
        Copied to clipboard! 🚀
      </div>
    </div>
  );
}
