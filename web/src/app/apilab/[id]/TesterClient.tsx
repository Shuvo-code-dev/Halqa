'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@lib/gsap';
import styles from '../page.module.css';
import { ApiEntry } from '@lib/apilab-registry';

export default function TesterClient({ api }: { api: ApiEntry }) {
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

  const runTest = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(api.endpoint, { method: api.method });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data = await res.json();
      setResponse(data);
    } catch (err: unknown) {
      setResponse({ error: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.testerLayout} ref={containerRef}>
      <aside className={styles.docsSection}>
        <Link href="/apilab" className="back-link" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>
          &larr; Back to API Lab
        </Link>
        <div className={styles.metaHeader}>
          <div className={styles.catRow}>
             <span className={styles.catBadge}>{api.category}</span>
             <span className={`${styles.methodBadge} ${styles[api.method.toLowerCase()]}`}>
                {api.method}
             </span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>{api.name}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>{api.description}</p>
        </div>

        <div className="halqa-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Official Specs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <p><strong>Endpoint:</strong> <code>{api.endpoint}</code></p>
             <p><strong>Auth Model:</strong> <span className="text-gradient" style={{ fontWeight: 700 }}>{api.auth}</span></p>
             <p><strong>HTTPS Required:</strong> {api.https}</p>
             <p><strong>CORS Support:</strong> {api.cors}</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
            <a 
              href={api.docsUrl || `https://github.com/Shuvo-code-dev/Halqa`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn"
              style={{ padding: '0.8rem 1.5rem', borderRadius: '0.5rem', display: 'inline-block' }}
            >
              Master Documentation &rarr;
            </a>
        </div>
      </aside>

      <section className={styles.consoleSection}>
        <div className={styles.consoleHeader}>
          <span className={styles.consoleTitle}>Live Execution Environment</span>
          <button 
            className={styles.runBtn} 
            onClick={runTest}
            disabled={loading}
          >
            {loading ? 'Running...' : 'Execute Request'}
          </button>
        </div>

        <div className={styles.responseArea}>
          {loading ? (
            <div className={styles.loader}>
              <div className={styles.spinner}></div>
            </div>
          ) : response ? (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '4rem' }}>
              Click &quot;Execute Request&quot; to initialize data stream...
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
