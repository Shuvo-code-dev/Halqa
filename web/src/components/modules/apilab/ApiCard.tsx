'use client';

import { PublicApi } from '@/lib/api-service';
import { ExternalLink, Shield, Globe, Terminal, Info } from 'lucide-react';
import { useState } from 'react';
import TouchScale from '@/components/shared/TouchScale';
import styles from './ApiCard.module.css';

interface ApiCardProps {
  api: PublicApi;
}

export default function ApiCard({ api }: ApiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate a mock TypeScript interface based on the API name
  const mockInterface = `interface ${api.name.replace(/\s+/g, '')}Response {
  success: boolean;
  data: any;
  metadata: {
    auth: "${api.auth}";
    https: ${api.https};
    cors: "${api.cors}";
  };
}`;

  return (
    <TouchScale className="api-card-wrapper" isLarge={true} scale={0.98}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.catBadge}>
            {api.category}
          </span>
          <div className={styles.metaIcons}>
            {api.https && <Globe className="w-3.5 h-3.5 text-emerald-400" />}
            {api.auth !== 'No' && <Shield className="w-3.5 h-3.5 text-amber-400" />}
          </div>
        </div>

        <h3 className={styles.title}>{api.name}</h3>
        
        <p className={styles.description}>
          {api.description}
        </p>

        <div className={styles.footer}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={styles.toggleBtn}
          >
            <Terminal className="w-3.5 h-3.5" />
            {isExpanded ? 'Hide Interface' : 'View Interface'}
          </button>
          
          <a 
            href={api.link} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={styles.docLink}
            title="Open Documentation"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Expanded Interface View */}
        {isExpanded && (
          <div className={styles.interfacePanel}>
            <div className={styles.interfaceHeader}>
              <span className={styles.interfaceLabel}>TS_INTERFACE</span>
              <Info className="w-3 h-3 text-gray-500" />
            </div>
            <pre className={styles.codeBlock}>
              {mockInterface}
            </pre>
          </div>
        )}
      </div>
    </TouchScale>
  );
}
