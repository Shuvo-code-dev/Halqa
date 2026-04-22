'use client';

import { useRef, ReactNode, useEffect } from 'react';
import { gsap } from '@lib/gsap';

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  color?: string;
  opacity?: number;
}

/**
 * Spotlight Wrapper (Industrial Grade)
 * Adds a soft, cursor-following glow effect using GSAP expo.out easing.
 * Perfect for Lab and Resource cards in the Halqa Sanctuary.
 */
export default function Spotlight({ 
  children, 
  className = "",
  color = "var(--accent)", 
  opacity = 0.15
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // GSAP-powered smooth tracking with expo.out
      gsap.to(glow, {
        x: x,
        y: y,
        duration: 0.6,
        ease: "expo.out",
        overwrite: "auto"
      });
    };

    const onMouseEnter = () => {
      gsap.to(glow, { opacity: opacity, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.5 });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [opacity]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {/* The Glow Layer (Centered on cursor via x/y) */}
      <div 
        ref={glowRef}
        className="pointer-events-none absolute"
        style={{
          width: '600px',
          height: '600px',
          left: '-300px',
          top: '-300px',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: 0,
          zIndex: 1,
          filter: 'blur(40px)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
