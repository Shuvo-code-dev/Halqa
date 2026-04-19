'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from '@lib/gsap';
import { Search, Filter, Layers, Database, Sparkles } from 'lucide-react';
import { 
  getFlattenedApis, 
  getApiCategories, 
  filterApis 
} from '@/lib/api-service';
import ApiCard from '@/components/modules/apilab/ApiCard';
import EmptyState from '@/components/shared/EmptyState';

const ITEMS_PER_PAGE = 24;

export default function ApiLabClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [prevId, setPrevId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Sync with URL ID during render to prevent cascading renders
  const currentId = searchParams.get('id');
  const allApis = useMemo(() => getFlattenedApis(), []);
  const categories = useMemo(() => getApiCategories(), []);

  if (currentId !== prevId) {
    setPrevId(currentId);
    if (currentId) {
      const api = allApis.find(a => a.id === currentId);
      if (api) {
        setSearchTerm(api.name);
        setActiveCategory(api.category);
      }
    }
  }

  // Filtering Logic
  const filteredApis = useMemo(() => {
    return filterApis(allApis, searchTerm, activeCategory);
  }, [allApis, searchTerm, activeCategory]);

  const visibleApis = filteredApis.slice(0, visibleCount);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".api-card-wrapper", {
        y: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "expo.out",
        clearProps: "all"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory, searchTerm, visibleCount]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredApis.length) {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredApis, visibleCount]);

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8 lg:px-12" ref={containerRef}>
      {/* Header Section */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold uppercase tracking-widest mb-6 animate-pulse-slow">
          <Sparkles className="w-4 h-4" />
          API Lab Engine v2.0
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          Infinite <span className="text-gradient">Data Streams</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed">
          The most comprehensive collection of public APIs for modern engineering. 
          Dynamic discovery, real-time filtering, and ready-to-use schemas.
        </p>
      </section>

      {/* Search & Filter Controls */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="flex flex-col gap-6">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-500 group-focus-within:text-accent transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="Search across 260+ production APIs..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-white text-lg focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === 'All' 
                ? 'bg-accent text-black border-accent' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              <Layers className="w-4 h-4" />
              All Streams
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.name 
                  ? 'bg-accent text-black border-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                }`}
              >
                {cat.name}
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat.name ? 'bg-black/20' : 'bg-white/10'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Meta */}
      <section className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
          <Database className="w-4 h-4" />
          <span>Showing {filteredApis.length} results</span>
          {activeCategory !== 'All' && (
            <span className="flex items-center gap-2">
              in <span className="text-white px-2 py-0.5 bg-white/10 rounded-lg">{activeCategory}</span>
            </span>
          )}
        </div>
      </section>

      {/* API Grid */}
      <main className="max-w-7xl mx-auto">
        {visibleApis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleApis.map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Data Stream Empty" 
            message={`We couldn't find any APIs matching "${searchTerm}" in the ${activeCategory} category.`}
            icon="filter"
          />
        )}

        {/* Infinite Scroll Trigger */}
        {visibleCount < filteredApis.length && (
          <div ref={loadMoreRef} className="py-20 flex justify-center">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
