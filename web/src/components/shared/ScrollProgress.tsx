'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll Progress Indicator
 * A thin, subtle bar at the top of the viewport tracking scroll depth.
 * Integrated below the navbar with Bulz's accent glow.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Create a spring-based scale for the progress bar (iOS/macOS style smoothness)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-[64px] left-0 right-0 h-[2px] bg-accent origin-left pointer-events-none"
      style={{ 
        scaleX,
        zIndex: 1000,
        boxShadow: '0 0 10px var(--accent), 0 0 5px var(--accent-glow)'
      }}
    />
  );
}
