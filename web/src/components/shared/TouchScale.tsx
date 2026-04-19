'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TouchScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
  isLarge?: boolean;
}

/**
 * TouchScale Wrapper
 * ------------------
 * Provides a tactile scale-down effect (Haptic Feel) for interactive components.
 * Strictly applied to Large items as per Phase 34 UX directives.
 */
export default function TouchScale({ 
  children, 
  scale = 0.95, 
  className = "", 
  isLarge = true 
}: TouchScaleProps) {
  // Only apply scale effect if it's a large item or explicitly requested
  if (!isLarge) return <div className={className}>{children}</div>;

  return (
    <motion.div
      whileTap={{ scale: scale }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      style={{ width: '100%' }} // Ensure it doesn't break layout flow
    >
      {children}
    </motion.div>
  );
}
