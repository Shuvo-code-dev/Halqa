"use client";

import { useState } from 'react';
import styles from './page.module.css';

type FilterOption = 'All' | 'Web' | 'Mobile' | 'Free Only';

const CATEGORY_SUBTITLES: Record<string, string> = {
  'Cheat-sheets': '— Rapid reference',
  'App Frameworks': '— Core technologies',
  'Cross-Platform Tools': '— Accelerators',
  'Mobile UI/UX': '— Design systems',
  'Essential Tools': '— Every developer needs these',
  'Dev Helpers': '— Utilities',
  'Visual Assets': '— Graphics & Typography',
  'Backend & BaaS': '— Power your apps',
  'Learning Platforms': '— Deep dives'
};

const RESOURCE_DATA = [
  // Web
  { name: 'OverAPI HTML', field: 'Web', tier: 'Free', desc: 'All HTML tags and CSS properties available on a single, easy-to-read page.', url: 'https://overapi.com/html', category: 'Cheat-sheets', section: '🌐 Web Development' },
  { name: 'Modern JS Cheatsheet', field: 'Web', tier: 'Free', desc: 'A comprehensive summary of everything in JavaScript from ES6 to the present.', url: 'https://github.com/mbeaudru/modern-js-cheatsheet', category: 'Cheat-sheets', section: '🌐 Web Development' },
  
  // App
  { name: 'Flutter', field: 'Cross-Platform', tier: 'Free', desc: 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.', url: 'https://flutter.dev/', category: 'App Frameworks', section: '📱 App Development' },
  { name: 'React Native', field: 'Cross-Platform', tier: 'Free', desc: 'Create native apps for Android and iOS using React under the hood. Powered by Meta.', url: 'https://reactnative.dev/', category: 'App Frameworks', section: '📱 App Development' },
  { name: 'Swift', field: 'Mobile', tier: 'Free', desc: 'A powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS.', url: 'https://www.swift.org/', category: 'App Frameworks', section: '📱 App Development' },
  { name: 'Expo', field: 'Cross-Platform', tier: 'Freemium', desc: 'An open-source platform for making universal native apps for Android, iOS, and the web with React and JavaScript.', url: 'https://expo.dev/', category: 'Cross-Platform Tools', section: '📱 App Development' },
  { name: 'Material Design', field: 'Mobile', tier: 'Free', desc: 'Google\'s comprehensive design system containing guidelines, components, and tools that support scalable UI design.', url: 'https://m3.material.io/', category: 'Mobile UI/UX', section: '📱 App Development' },
  { name: 'Apple HIG', field: 'Mobile', tier: 'Free', desc: 'Human Interface Guidelines by Apple. Essential principles and best practices for designing great iOS experiences.', url: 'https://developer.apple.com/design/human-interface-guidelines', category: 'Mobile UI/UX', section: '📱 App Development' },
  
  // Universal
  { name: 'VS Code', field: 'Universal', tier: 'Free', desc: 'The default editor choice for modern development. Highly extensible and fast.', url: 'https://code.visualstudio.com/', category: 'Essential Tools', section: '🛠️ Universal & Infrastructure' },
  { name: 'Figma', field: 'Universal', tier: 'Freemium', desc: 'The industry standard for UI/UX design, prototyping, and collaboration.', url: 'https://www.figma.com/', category: 'Essential Tools', section: '🛠️ Universal & Infrastructure' },
  
  { name: 'Git Cheat Sheet', field: 'Universal', tier: 'Free', desc: 'All the essential Git commands you need organized in one convenient place.', url: 'https://education.github.com/git-cheat-sheet-education.pdf', category: 'Dev Helpers', section: '🛠️ Universal & Infrastructure' },
  { name: 'Responsively', field: 'Web', tier: 'Free', desc: 'Develop responsive web apps 5x faster by previewing all devices side-by-side.', url: 'https://responsively.app/', category: 'Dev Helpers', section: '🛠️ Universal & Infrastructure' },
  { name: 'Can I Use', field: 'Web', tier: 'Free', desc: 'Up-to-date browser support tables for support of front-end web technologies.', url: 'https://caniuse.com/', category: 'Dev Helpers', section: '🛠️ Universal & Infrastructure' },
  
  { name: 'Unsplash', field: 'Universal', tier: 'Free', desc: 'Beautiful, high-quality free images and photos you can download and use for any project.', url: 'https://unsplash.com/', category: 'Visual Assets', section: '🛠️ Universal & Infrastructure' },
  { name: 'Lucide Icons', field: 'Universal', tier: 'Free', desc: 'A beautiful, customizable, and minimalist open-source icon set built for React and modern apps.', url: 'https://lucide.dev/', category: 'Visual Assets', section: '🛠️ Universal & Infrastructure' },
  { name: 'Google Fonts', field: 'Universal', tier: 'Free', desc: 'An expansive library of premium, high-quality fonts available entirely for free.', url: 'https://fonts.google.com/', category: 'Visual Assets', section: '🛠️ Universal & Infrastructure' },
  
  { name: 'Appwrite', field: 'Universal', tier: 'Free', desc: 'Secure open-source backend server for Web, Mobile & Flutter developers. Huge free capabilities.', url: 'https://appwrite.io/', category: 'Backend & BaaS', section: '🛠️ Universal & Infrastructure' },
  { name: 'Supabase', field: 'Universal', tier: 'Freemium', desc: 'Open source Firebase alternative. Great free tier with Postgres DB, Auth, and instant APIs.', url: 'https://supabase.com/', category: 'Backend & BaaS', section: '🛠️ Universal & Infrastructure' },
  { name: 'Firebase', field: 'Universal', tier: 'Freemium', desc: 'Google\'s deeply integrated application development platform featuring auth, DBs, and analytics.', url: 'https://firebase.google.com/', category: 'Backend & BaaS', section: '🛠️ Universal & Infrastructure' },
  { name: 'MongoDB Atlas', field: 'Universal', tier: 'Freemium', desc: 'The ultimate NoSQL database free tier. Build faster with a developer data platform.', url: 'https://www.mongodb.com/atlas/database', category: 'Backend & BaaS', section: '🛠️ Universal & Infrastructure' },
  { name: 'DigitalOcean', field: 'Universal', tier: 'Paid', desc: 'Simple, robust cloud computing designed for developers. Host your backend seamlessly.', url: 'https://www.digitalocean.com/', category: 'Backend & BaaS', section: '🛠️ Universal & Infrastructure' },
  
  { name: 'Eloquent JavaScript', field: 'Web', tier: 'Free', desc: 'One of the absolute best books for learning JavaScript, available free online.', url: 'https://eloquentjavascript.net/', category: 'Learning Platforms', section: '🛠️ Universal & Infrastructure' },
  { name: 'Udemy', field: 'Universal', tier: 'Freemium', desc: 'Massive catalog of developer courses. Look out for heavy discounts or free foundation courses.', url: 'https://www.udemy.com/', category: 'Learning Platforms', section: '🛠️ Universal & Infrastructure' },
  { name: 'Grokking Algorithms', field: 'Universal', tier: 'Paid', desc: 'An excellent resource for learning complex algorithms visually through simple diagrams.', url: 'https://www.manning.com/books/grokking-algorithms', category: 'Learning Platforms', section: '🛠️ Universal & Infrastructure' },
  { name: 'Frontend Masters', field: 'Web', tier: 'Paid', desc: 'In-depth, expert-led premium courses for advanced frontend and full-stack engineering.', url: 'https://frontendmasters.com/', category: 'Learning Platforms', section: '🛠️ Universal & Infrastructure' }
];

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  
  const filters: FilterOption[] = ['All', 'Web', 'Mobile', 'Free Only'];

  const filteredResources = RESOURCE_DATA.filter((res) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Web') return res.field === 'Web' || res.field === 'Universal';
    if (activeFilter === 'Mobile') return res.field === 'Mobile' || res.field === 'Cross-Platform' || res.field === 'Universal';
    if (activeFilter === 'Free Only') return res.tier === 'Free';
    return true;
  });

  const groupedData: Record<string, Record<string, typeof RESOURCE_DATA>> = {};

  filteredResources.forEach(res => {
    if (!groupedData[res.section]) groupedData[res.section] = {};
    if (!groupedData[res.section][res.category]) groupedData[res.section][res.category] = [];
    groupedData[res.section][res.category].push(res);
  });

  const sectionOrder = ['🌐 Web Development', '📱 App Development', '🛠️ Universal & Infrastructure'];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Universal <span className="text-gradient">Directory</span></h1>
        <p className={styles.subtitle}>
          The ultimate vault for top-tier developer tools across Web, Mobile, and Infrastructure. 
          Everything you need in one perfectly curated place.
        </p>
      </header>

      <div className={styles.filterRow}>
        {filters.map(filter => (
          <button
            key={filter}
            className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div key={activeFilter} className={styles.directory} style={{ animation: 'fadeIn 0.35s ease-out forwards' }}>
        {filteredResources.length === 0 ? (
          <p className={styles.emptyState}>No resources found in this category. Try stepping back into the circle.</p>
        ) : (
          sectionOrder.map(section => {
            const cats = groupedData[section];
            if (!cats || Object.keys(cats).length === 0) return null;

            return (
              <div key={section}>
                <h2 className={styles.fieldHeading}>{section}</h2>
                {Object.keys(cats).map(catName => (
                  <section key={catName}>
                    <h2 className={styles.categoryTitle}>
                      {catName} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>{CATEGORY_SUBTITLES[catName] || ''}</span>
                    </h2>
                    <div className={styles.resourceList}>
                      {cats[catName].map(res => (
                        <div key={res.name} className={`${styles.resourceCard} glass-panel`}>
                          <div className={styles.resourceHeader}>
                            <h3 className={styles.resourceName}>{res.name}</h3>
                            <div className={styles.resourceTags}>
                              <span className={styles.fieldTag}>{res.field}</span>
                              <span className={`${styles.tierBadge} ${res.tier === 'Free' ? styles.tierFree : res.tier === 'Freemium' ? styles.tierFreemium : styles.tierPaid}`}>
                                {res.tier}
                              </span>
                            </div>
                          </div>
                          <p className={styles.resourceDesc}>{res.desc}</p>
                          <a href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
