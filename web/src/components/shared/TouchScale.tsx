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
 * High-fidelity tactile feedback wrapper.
 * Provides a 'liquid' scale-down effect (0.95 by default) when tapped.
 * Optimized for large interactive elements like Cards, Lab entries, and Primary Buttons.
 */
export default function TouchScale({ 
  children, 
  scale = 0.95, 
  className = "", 
  isLarge = true 
}: TouchScaleProps) {
  
  // Standard tactile parameters
  const tapScale = isLarge ? scale : (scale + 0.02); // Slightly less aggressive for small items

  return (
    <motion.div
      whileTap={{ scale: tapScale }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        mass: 0.8
      }}
      className={className}
      style={{ 
        display: 'contents' // Crucial: Allows children to respect the parent flex/grid layout directly
      }}
    >
      {children}
    </motion.div>
  );
}
