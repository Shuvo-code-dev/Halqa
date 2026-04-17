'use client';

import { motion } from 'framer-motion';

export default function BlurText({ text = "Halqa Lab", paused = false }) {
  const words = text.split(" ");

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
          animate={paused ? { filter: 'blur(10px)', opacity: 0 } : { filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
