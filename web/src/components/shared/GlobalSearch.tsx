'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from '@lib/gsap';

// Registries
import { API_REGISTRY } from '@lib/apilab-registry';
import { CODELAB_REGISTRY } from '@lib/codelab-registry';
import { ROADMAP_REGISTRY } from '@lib/roadmap-registry';
import { PROJECT_REGISTRY } from '@lib/project-registry';
import { RESOURCE_REGISTRY } from '@lib/resource-registry';

import styles from './GlobalSearch.module.css';

type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'API' | 'Component' | 'Roadmap' | 'Project' | 'Resource';
  link: string;
};

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Unified Search Index
  const searchIndex = useMemo(() => {
    const items: SearchItem[] = [];

    // Roadmaps
    Object.values(ROADMAP_REGISTRY).forEach(r => {
      items.push({
        id: r.id,
        title: r.title.replace(/<[^>]*>?/gm, ''), // Strip HTML
        description: r.subtitle,
        category: 'Education',
        type: 'Roadmap',
        link: `/roadmaps/${r.id}`
      });
    });

    // Components (Code Lab)
    CODELAB_REGISTRY.forEach(c => {
      items.push({
        id: c.id,
        title: c.name,
        description: c.description,
        category: c.category,
        type: 'Component',
        link: `/codelab?id=${c.id}` 
      });
    });

    // APIs
    API_REGISTRY.forEach(a => {
      items.push({
        id: a.id,
        title: a.name,
        description: a.description,
        category: a.category,
        type: 'API',
        link: `/apilab?id=${a.id}`
      });
    });

    // Projects
    Object.values(PROJECT_REGISTRY).forEach(p => {
      items.push({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.difficulty,
        type: 'Project',
        link: `/projects/${p.id}`
      });
    });

    // Static Resources
    RESOURCE_REGISTRY.forEach(res => {
        items.push({
            id: res.id,
            title: res.name,
            description: res.recommendation,
            category: res.category,
            type: 'Resource',
            link: res.url
        });
    });

    return items;
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click Outside detection
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync results for empty query during render to avoid effect warnings
  if (!query.trim() && results.length > 0) {
    setResults([]);
  }

  // Filter Logic
  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      const filtered = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limit results for performance
      
      setResults(filtered);
    }, 150); // Debounce

    return () => clearTimeout(timer);
  }, [query, searchIndex]);

  // Entrance Animation for Results
  useEffect(() => {
    if (results.length > 0 && isOpen) {
       gsap.fromTo(resultsRef.current!, 
         { opacity: 0, y: 10, scale: 0.98 },
         { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' }
       );
    }
  }, [results, isOpen]);

  const handleItemClick = (link: string) => {
    setIsOpen(false);
    setQuery('');
    if (link.startsWith('http')) {
        window.open(link, '_blank');
    } else {
        router.push(link);
    }
  };

  return (
    <div className={styles.searchWrapper} ref={searchRef}>
      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search ecosystem... (⌘K)" 
          className={styles.searchInput}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className={styles.kbd}>
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {isOpen && (results.length > 0 || query.trim() !== '') && (
        <div className={styles.resultsArea} ref={resultsRef}>
          {results.length > 0 ? (
            results.map((item) => (
              <div 
                key={`${item.type}-${item.id}`} 
                className={styles.resultItem}
                onClick={() => handleItemClick(item.link)}
              >
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemType}>{item.type}</span>
                </div>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
               No artifacts found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
