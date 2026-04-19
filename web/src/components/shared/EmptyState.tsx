'use client';

import { motion } from 'framer-motion';
import { SearchX, FilterX, ArchiveX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'search' | 'filter' | 'archive';
}

export default function EmptyState({ 
  title = "No Artifacts Found", 
  message = "Try adjusting your filters or search terms to discover new data streams.",
  icon = 'search'
}: EmptyStateProps) {
  
  const IconComponent = icon === 'filter' ? FilterX : icon === 'archive' ? ArchiveX : SearchX;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-24 px-8 text-center border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.02] backdrop-blur-sm"
    >
      <div className="relative inline-flex mb-8">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-500 shadow-2xl"
        >
          <IconComponent className="w-12 h-12" />
        </motion.div>
        <div className="absolute -inset-4 bg-accent/5 blur-2xl rounded-full"></div>
      </div>
      
      <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
        {title}
      </h3>
      <p className="max-w-md mx-auto text-gray-400 text-lg leading-relaxed">
        {message}
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
        className="mt-10 px-8 py-3 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white/20 transition-all"
      >
        Reset Data Stream
      </motion.button>
    </motion.div>
  );
}
