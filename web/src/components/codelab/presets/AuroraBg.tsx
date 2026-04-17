'use client';

import styles from './AuroraBg.module.css';

export default function AuroraBg({ paused = false }) {
  return (
    <div className={styles.auroraContainer}>
      <div className={`${styles.aurora} ${paused ? styles.paused : ''}`} />
      <div className={styles.overlay}>
         <h3 className={styles.label}>Aurora Borealis</h3>
      </div>
    </div>
  );
}
