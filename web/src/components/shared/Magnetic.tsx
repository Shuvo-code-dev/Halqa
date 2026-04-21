'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '@lib/gsap';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic Wrapper
 * Pulls the element slightly toward the cursor when nearby.
 * Perfect for Primary Buttons and CTAs.
 */
export default function Magnetic({ 
  children, 
  strength = 0.35, // Adjust pull intensity
  className = "" 
}: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Magnetic Pull Logic
      gsap.to(el, {
        x: distanceX * strength,
        y: distanceY * strength,
        duration: 1,
        ease: "expo.out" // Mimics high-end OS spring-linear feel
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)" // Snaps back with character
      });
    };

    window.addEventListener('mousemove', (e) => {
      // Logic for proximity could be added here, 
      // but simple per-element mousemove is usually enough for cards/buttons.
    });

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
