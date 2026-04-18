'use client';

import { useUser } from '@/context/UserContext';
import styles from './StatusBar.module.css';

export default function StatusBar() {
  const { bookmarks } = useUser();
  
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.statusItem}>
                <span className={styles.dot}></span>
                Neural Link: <strong>Stable</strong>
            </div>
        </div>

        <div className={styles.right}>
            <div className={styles.item}>
                <span className={styles.label}>Bookmarks:</span>
                <span className={styles.value}>{bookmarks.length}</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.item}>
                <span className={styles.label}>Sync:</span>
                <span className={styles.value}>Local</span>
            </div>
        </div>
      </div>
    </div>
  );
}

