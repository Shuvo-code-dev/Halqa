"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import SharedSidebar from '@shared/SharedSidebar';
import { BLUEPRINTS } from '@lib/projects-data';
import styles from './page.module.css';

export default function Projects() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter Logic for Sidebar/Search
  const filteredBlueprints = useMemo(() => {
    return BLUEPRINTS.filter(bp => 
      bp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bp.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid Animation
      gsap.from(`.${styles.card}`, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });

      // Parallax Mouse Effect (Refactored to GSAP defaults)
      const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
      cards.forEach((card) => {
        const speed = 15;
        
        const onMouseMove = (e: MouseEvent) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;

          gsap.to(card, {
            x: x * speed,
            y: y * speed,
            rotationX: -y * 8,
            rotationY: x * 8,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
          });
        };

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);
        
        // Return cleanup for these specific listeners if needed, 
        // though ctx.revert() doesn't handle native event listeners automatically.
        // For A-Z Sanitization, we'll keep it simple for now or move to a hook.
      });
    }, containerRef);

    return () => ctx.revert();
  }, [searchTerm]);

  const toggleDrawer = (id: string) => {
    setOpenDrawer(openDrawer === id ? null : id);
  };

  const sidebarItems = useMemo(() => {
    return BLUEPRINTS.map(bp => ({
      id: bp.id,
      label: bp.title,
      icon: bp.progress === 100 ? '✅' : '🚀'
    }));
  }, []);

  const handleSidebarClick = (id: string) => {
    const el = document.getElementById(`project-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setOpenDrawer(id);
  };

  return (
    <div className="module-layout" ref={containerRef}>
      <SharedSidebar 
        title='Project <span class="text-gradient">Hub</span>'
        subtitle="Architect your future."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        items={sidebarItems}
        activeItemId={openDrawer || ''}
        onItemClick={handleSidebarClick}
        itemTypeLabel="Blueprints"
      />

      <main className="module-content">
        <header className={styles.header}>
          <h1 className={styles.title}>Project <span className="text-gradient">Hub</span></h1>
          <p className={styles.subtitle}>
            Combine theoretical roadmap learning with Code Lab components and live API Lab data to architect real applications.
          </p>
        </header>

        <div className={styles.grid}>
          {filteredBlueprints.map((bp) => {
            const isOpen = openDrawer === bp.id;

            return (
              <div key={bp.id} id={`project-${bp.id}`} className={styles.card + ' halqa-card'}>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardTitle}>{bp.title}</h3>
                    <span className={styles.techTag}>{bp.tag}</span>
                  </div>

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

                  {bp.progress !== undefined && (
                    <div className={styles.progressContainer}>
                      <div className={styles.progressLabel}>
                        <span>Development Status</span>
                        <span>{bp.progress}%</span>
                      </div>
                      <div className={styles.progressTrack}>
                        <div 
                          className={styles.progressBar} 
                          style={{ width: `${bp.progress}%` }}
                        >
                          <div className={styles.progressGlow} />
                        </div>
                      </div>
                    </div>
                  )}

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

                <div className={styles.expandable + ' ' + (isOpen ? styles.open : '')}>
                  <div className={styles.drawerContent}>
                    <ul className={styles.stepList}>
                      {bp.steps.map((step, index) => (
                        <li key={index} className={styles.stepItem}>
                          <b>Step 0{index + 1}:</b> {step}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.drawerFooter}>
                      <button onClick={() => toggleDrawer(bp.id)} className={styles.backToLabBtn}>
                          &larr; Back to Blueprint List
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
