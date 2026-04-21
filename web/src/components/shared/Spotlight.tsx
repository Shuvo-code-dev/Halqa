'use client';

import { useRef, ReactNode, MouseEvent } from 'react';

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  color?: string;
  opacity?: number;
}

/**
 * Spotlight Wrapper
 * Adds a soft, cursor-following glow effect to its child container.
 * Perfect for Lab and Resource cards.
 */
export default function Spotlight({ 
  children, 
  className = "",
  color = "var(--accent)", // Default Halqa Teal
  opacity = 0.15
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Set CSS variables for high-performance visual updates
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        // Define the variables locally
        '--mouse-x': '-500px',
        '--mouse-y': '-500px',
        '--spotlight-color': color,
        '--spotlight-opacity': opacity
      } as any}
    >
      {/* The Glow Layer */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)`,
          opacity: 'var(--spotlight-opacity)',
          zIndex: 1
        }}
      />
      
      {/* Content wrapper to stay above the glow */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
