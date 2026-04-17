'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagnetButton({ text = "Magnetize", paused = false }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (paused || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * 0.4, y: distanceY * 0.4 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{
        padding: '1rem 2rem',
        background: 'var(--accent)',
        color: 'var(--bg-primary)',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '1.2rem',
        cursor: 'pointer',
        boxShadow: '0 0 20px var(--accent-glow)'
      }}
    >
      {text}
    </motion.button>
  );
}
