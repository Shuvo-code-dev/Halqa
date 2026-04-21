'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, MouseEvent, TouchEvent } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface TouchScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
  isLarge?: boolean;
}

/**
 * High-fidelity tactile feedback wrapper.
 * Provides a 'liquid' scale-down effect and Active Ripples on tap.
 * Optimized for high-end OS feel (macOS/iOS).
 */
export default function TouchScale({ 
  children, 
  scale = 0.95, 
  className = "", 
  isLarge = true 
}: TouchScaleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  const tapScale = isLarge ? scale : (scale + 0.02);

  const createRipple = (x: number, y: number) => {
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handlePointerDown = (e: any) => {
    // Calculate relative coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top;
    createRipple(x, y);
  };

  return (
    <motion.div
      whileTap={{ scale: tapScale }}
      onPointerDown={handlePointerDown}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        mass: 0.8
      }}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        display: 'contents',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {/* Ripple Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[inherit]">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "linear" }}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
              marginLeft: -25,
              marginTop: -25,
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              zIndex: 0
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full h-full" style={{ display: 'contents' }}>
        {children}
      </div>
    </motion.div>
  );
}
