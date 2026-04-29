'use client';

import { motion } from 'framer-motion';
import styles from './BlurText.module.css';

export default function BlurText({ text = "Bulz Lab", paused = false }) {
  const words = text.split(" ");

  return (
    <div className={styles.container}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
          animate={paused ? { filter: 'blur(10px)', opacity: 0 } : { filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          className={styles.word}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
