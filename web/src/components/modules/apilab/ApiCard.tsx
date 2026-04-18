'use client';

import { PublicApi } from '@/lib/api-service';
import { ExternalLink, Shield, Globe, Terminal, Info } from 'lucide-react';
import { useState } from 'react';

interface ApiCardProps {
  api: PublicApi;
}

export default function ApiCard({ api }: ApiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate a mock TypeScript interface based on the API name
  const mockInterface = `interface ${api.name.replace(/\s+/g, '')}Response {
  success: boolean;
  data: any;
  message?: string;
  metadata: {
    auth: "${api.auth}";
    https: ${api.https};
    cors: "${api.cors}";
  };
}`;

  return (
    <div className="api-card-wrapper group">
      <div className="halqa-card relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-500 hover:border-accent hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)] overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-accent/20 text-accent rounded-full border border-accent/30">
              {api.category}
            </span>
            <div className="flex gap-2">
              {api.https && <Globe className="w-4 h-4 text-emerald-400 opacity-60" />}
              {api.auth !== 'No' && <Shield className="w-4 h-4 text-amber-400 opacity-60" />}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-accent transition-colors">
            {api.name}
          </h3>
          
          <p className="text-sm text-gray-400 line-clamp-2 mb-6 grow">
            {api.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-accent transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              {isExpanded ? 'Hide Interface' : 'View Details'}
            </button>
            <a 
              href={api.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-accent/20 rounded-lg text-gray-400 hover:text-accent transition-all"
              title="Documentation"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Expanded Interface View */}
          {isExpanded && (
            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-accent">TypeScript Interface</span>
                <Info className="w-3 h-3 text-gray-500" />
              </div>
              <pre className="text-[10px] font-mono text-emerald-300/80 leading-relaxed overflow-x-auto">
                {mockInterface}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
