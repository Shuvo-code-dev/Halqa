'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useUser } from '@/context/UserContext';
import { SUPPORTED_LANGUAGES } from '@lib/languages';
import styles from './StatusBar.module.css';

export default function StatusBar() {
  const { language } = useLanguage();
  const { bookmarks } = useUser();
  
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

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
                <span className={styles.label}>Language:</span>
                <span className={styles.value}>{currentLang.flag} {currentLang.name}</span>
            </div>
            <div className={styles.divider}></div>
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
