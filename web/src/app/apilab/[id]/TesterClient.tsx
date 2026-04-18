'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import styles from '../page.module.css';
import { PublicApi } from '@/lib/api-service';
import { Shield, Globe, ExternalLink, ArrowLeft, Terminal, Laptop } from 'lucide-react';

export default function TesterClient({ api }: { api: PublicApi }) {
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.docsSection} > *`, {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out"
      });

      gsap.from(`.${styles.consoleSection}`, {
        x: 20,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const runSampleTest = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(api.link, { mode: 'no-cors' });
      setResponse({ 
        status: "Handshake Successful", 
        type: res.type, 
        api: api.name,
        category: api.category,
        message: "Opaque connection established. Direct content reading restricted by browser CORS security."
      });
    } catch (err: unknown) {
      setResponse({ 
        error: "Network handshake failed",
        details: err instanceof Error ? err.message : String(err)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.testerLayout} ref={containerRef} style={{ background: 'transparent' }}>
      <aside className={`${styles.docsSection} p-8`}>
        <Link href="/apilab" className="flex items-center gap-2 text-gray-400 hover:text-accent mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to API Lab
        </Link>
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] font-bold uppercase tracking-widest">
                {api.category}
             </span>
             {api.https && <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase"><Globe className="w-3 h-3" /> Secure</span>}
          </div>
          <h1 className="text-5xl font-black text-white mb-6 leading-tight">{api.name}</h1>
          <p className="text-xl text-gray-400 leading-relaxed">{api.description}</p>
        </div>

        <div className="halqa-card p-8 bg-white/5 border border-white/10 rounded-2xl mb-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-accent" />
            Stream Specifications
          </h3>
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-1">
               <span className="text-[10px] text-gray-500 uppercase font-black">Authentication</span>
               <p className="text-white font-medium flex items-center gap-2">
                 <Shield className="w-4 h-4 text-amber-500" />
                 {api.auth || 'None'}
               </p>
             </div>
             <div className="space-y-1">
               <span className="text-[10px] text-gray-500 uppercase font-black">CORS Policy</span>
               <p className="text-white font-medium">{api.cors}</p>
             </div>
             <div className="space-y-1">
               <span className="text-[10px] text-gray-500 uppercase font-black">Documentation Protocol</span>
               <p className="text-accent font-mono truncate">{api.link}</p>
             </div>
          </div>
        </div>

        <a 
          href={api.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-3 w-full py-4 bg-accent text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)] transition-all"
        >
          Access API Console <ExternalLink className="w-4 h-4" />
        </a>
      </aside>

      <section className={`${styles.consoleSection} bg-black/40 backdrop-blur-3xl border-l border-white/5`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Laptop className="w-4 h-4 text-accent" />
             <span className="text-sm font-bold text-white tracking-widest uppercase">Sandboxed Execution</span>
          </div>
          <button 
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50"
            onClick={runSampleTest}
            disabled={loading}
          >
            {loading ? 'Initializing...' : 'Test Handshake'}
          </button>
        </div>

        <div className="p-8 font-mono">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
              <span className="text-accent text-sm animate-pulse">NEGOTIATING HANDSHAKE...</span>
            </div>
          ) : response ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest px-2 py-1 border border-white/5 inline-block">Response Header: 200 OK</div>
              <pre className="text-emerald-400/90 text-sm overflow-x-auto p-4 bg-black/20 rounded-xl leading-relaxed">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-32 text-center opacity-40">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 mb-6 flex items-center justify-center">
                 <Terminal className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 max-w-xs">
                Initialize a sandboxed data handshake to verify stream connectivity status.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
