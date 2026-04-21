'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface CopyNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

/**
 * Copy Notification
 * A sleek, high-fidelity slide-in toast for tactical feedback.
 * Uses easeOutExpo style transitions for a premium OS feel.
 */
export default function CopyNotification({ 
  isVisible, 
  onClose,
  message = "Copied to Clipboard!"
}: CopyNotificationProps) {
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25,
            restDelta: 0.001
          }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2"
          style={{ zIndex: 10000 }}
        >
          <div 
            className="flex items-center gap-3 px-6 py-3 rounded-full border"
            style={{ 
              backgroundColor: 'var(--accent)', 
              color: 'var(--bg-primary)',
              boxShadow: '0 10px 30px rgba(var(--accent-rgb), 0.4)',
              borderColor: 'rgba(var(--accent-rgb), 0.2)'
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-bold tracking-tight">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
