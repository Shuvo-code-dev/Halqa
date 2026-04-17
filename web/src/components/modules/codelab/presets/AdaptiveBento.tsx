'use client';

import styles from './AdaptiveBento.module.css';

export default function AdaptiveBento() {
  return (
    <div className={styles.bentoContainer}>
      <div className={`${styles.item} ${styles.wide}`}>
        <span className={styles.label}>Feature Grid</span>
      </div>
      <div className={`${styles.item} ${styles.tall}`}>
         <span className={styles.label}>Analytics</span>
      </div>
      <div className={styles.item}>
         <span className={styles.label}>Cloud</span>
      </div>
      <div className={styles.item}>
         <span className={styles.label}>Security</span>
      </div>
    </div>
  );
}
