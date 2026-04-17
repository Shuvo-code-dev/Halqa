import Link from 'next/link';
import styles from './layout.module.css';

export default function Navbar() {
  return (
    <header className={`${styles.navbar} glass-panel`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          Halqa<span className={styles.accent}>.</span>
        </Link>
        <nav className={styles.navLinks}>
          <Link href="/roadmaps" className={styles.navLink}>Roadmaps</Link>
          <Link href="/resources" className={styles.navLink}>Resources</Link>
          <a href="https://github.com/Shuvo-code-dev/Halqa" target="_blank" rel="noopener noreferrer" className={styles.navBtn}>
            Contribute
          </a>
        </nav>
      </div>
    </header>
  );
}
