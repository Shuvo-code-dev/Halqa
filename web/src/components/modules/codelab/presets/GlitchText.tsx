'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './GlitchText.module.css';

export default function GlitchText({ text = "HALQA GLITCH", paused = false }) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || paused) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const originalText = text;
    let iteration = 0;
    
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
            iteration = 0; // Loop the glitch effect
        }
        iteration += 1 / 3;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, paused]);

  return (
    <div 
      ref={textRef} 
      className={styles.glitchText}
    >
      {text}
    </div>
  );
}
