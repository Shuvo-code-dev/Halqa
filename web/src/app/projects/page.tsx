"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const BLUEPRINTS = [
  {
    id: "oi-qr",
    title: "Oi QR Scanner",
    tag: "High-Performance Utility",
    githubLink: "https://github.com/Shuvo-code-dev/Oi-QR-Scanner",
    roadmap: { name: "Frontend Stage 02", link: "/roadmaps/frontend", icon: "🗺️" },
    code: { name: "Click Spark Particles", link: "/codelab", icon: "🧪" },
    api: { name: "QR Generator Engine", link: "/apilab", icon: "🔌" },
    steps: [
      "Implement a robust camera view using the Expo Camera or Browser MediaDevices API.",
      "Integrate the Zxing or similar high-speed QR decoding library.",
      "Style the scanner overlay with Halqa custom-themed neon borders and scan-line animations."
    ]
  },
  {
    id: "ai-chat",
    title: "Halqa Brain Interface",
    tag: "Next.js + AI",
    githubLink: "https://github.com/Shuvo-code-dev/Halqa",
    roadmap: { name: "Full-Stack Stage 01", link: "/roadmaps/fullstack", icon: "🗺️" },
    code: { name: "Glassmorphism UI", link: "/codelab", icon: "🧪" },
    api: { name: "Google Gemini API", link: "/apilab", icon: "🔌" },
    steps: [
      "Securely init a Next.js App Router API route fetching directly from the Gemini Endpoint.",
      "Bind user interactive queries dynamically to the Halqa Glowing Input UI components.",
      "Implement the 'Brain' system prompt for specialized ecosystem knowledge."
    ]
  },
  {
    id: "oi-wallet",
    title: "Oi Wallet",
    tag: "Crypto & Blockchain",
    githubLink: "#", // Coming soon
    roadmap: { name: "Full-Stack Stage 03", link: "/roadmaps/fullstack", icon: "🗺️" },
    code: { name: "Shiny Text Effect", link: "/codelab", icon: "🧪" },
    api: { name: "CoinGecko Market Feed", link: "/apilab", icon: "🔌" },
    steps: [
      "Establish a secure Ethers.js provider connection to the Ethereum/Polygon networks.",
      "Fetch live gas prices and market trends using the CoinGecko public API.",
      "Render a premium, high-contrast wallet dashboard with Halqa visual effects."
    ]
  },
  {
    id: "halqa-mobile",
    title: "Halqa Mobile",
    tag: "Expo Native",
    githubLink: "#", // Coming soon
    roadmap: { name: "Mobile Stage 01", link: "/roadmaps/mobile", icon: "🗺️" },
    code: { name: "Apple Bento Grid", link: "/codelab", icon: "🧪" },
    api: { name: "IP Geolocation API", link: "/apilab", icon: "🔌" },
    steps: [
      "Convert the Halqa web navigation system into a React Navigation native stack.",
      "Optimize the high-end GSAP animations for mobile performance using useNativeDriver.",
      "Implement offline persistence using SQLite or AsyncStorage for roadmap progress."
    ]
  }
];

export default function Projects() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(`.${styles.header} > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      });

      // Grid Animation
      gsap.from(`.${styles.card}`, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });

      // Parallax Mouse Effect
      const cards = gsap.utils.toArray(`.${styles.card}`);
      cards.forEach((card: any) => {
        const speed = 20; // max px offset
        
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;

          gsap.to(card, {
            x: x * speed,
            y: y * speed,
            rotationX: -y * 10,
            rotationY: x * 10,
            duration: 0.4,
            ease: "power3.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleDrawer = (id: string) => {
    setOpenDrawer(openDrawer === id ? null : id);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Project <span className="text-gradient">Hub</span></h1>
        <p className={styles.subtitle}>
          The final piece of the Halqa puzzle. Combine theoretical roadmap learning directly with Code Lab components and live API Lab data to architect real applications.
        </p>
      </header>

      <div className={styles.grid}>
        {BLUEPRINTS.map((bp) => {
          const isOpen = openDrawer === bp.id;

          return (
            <div key={bp.id} className={styles.card + ' glass-panel'}>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{bp.title}</h3>
                  <span className={styles.techTag}>{bp.tag}</span>
                </div>

                {/* The "Connect the Dots" Trinity UI */}
                <div className={styles.trinity}>
                  <div className={styles.trinityItem}>
                    <div className={styles.trinityIcon}>{bp.roadmap.icon}</div>
                    <Link href={bp.roadmap.link} className={styles.trinityLink}>
                      {bp.roadmap.name} <span>View Path &rarr;</span>
                    </Link>
                  </div>
                  <div className={styles.trinityItem}>
                    <div className={styles.trinityIcon}>{bp.code.icon}</div>
                    <Link href={bp.code.link} className={styles.trinityLink}>
                      {bp.code.name} <span>Grab Code &rarr;</span>
                    </Link>
                  </div>
                  <div className={styles.trinityItem}>
                    <div className={styles.trinityIcon}>{bp.api.icon}</div>
                    <Link href={bp.api.link} className={styles.trinityLink}>
                      {bp.api.name} <span>Get Data &rarr;</span>
                    </Link>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button 
                    onClick={() => toggleDrawer(bp.id)} 
                    className={styles.actionBtn + ' ' + (isOpen ? styles.open : '')}
                  >
                    {isOpen ? 'Close Blueprint' : 'Start Building'}
                  </button>
                  {bp.githubLink && bp.githubLink !== "#" && (
                    <a 
                      href={bp.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.githubBtn}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                      GitHub
                    </a>
                  )}
                  {bp.githubLink === "#" && (
                     <button className={styles.githubBtnDisabled} disabled>
                       Coming Soon
                     </button>
                  )}
                </div>
              </div>

              {/* Expandable Checklist Drawer */}
              <div className={styles.expandable + ' ' + (isOpen ? styles.open : '')}>
                <div className={styles.drawerContent}>
                  <ul className={styles.stepList}>
                    {bp.steps.map((step, index) => (
                      <li key={index} className={styles.stepItem}>
                        <b>Step 0{index + 1}:</b> {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
