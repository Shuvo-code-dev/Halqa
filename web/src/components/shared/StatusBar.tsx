'use client';

import styles from './StatusBar.module.css';

export default function StatusBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.statusItem}>
                <span className={styles.dot}></span>
                Neural Link: <strong>Stable</strong>
            </div>
        </div>
        
        {/* Right section removed to strip redundancy (Bookmarks/Sync) */}
        <div className={styles.right}>
            <div className={styles.item}>
                <span className={styles.label}>CORE</span>
                <span className={styles.value}>Bulz</span>
            </div>
        </div>
      </div>
    </div>
  );
}
