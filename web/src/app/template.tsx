'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(containerRef.current, 
      { 
        opacity: 0, 
        y: 20 
      }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out",
        clearProps: "all" 
      }
    );
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}
