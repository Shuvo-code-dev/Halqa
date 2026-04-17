'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './MeshBackground.module.css';

export default function MeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray(`.${styles.blob}`);
      
      blobs.forEach((blob: any, i) => {
        gsap.to(blob, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          duration: "random(15, 25)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  );
}
