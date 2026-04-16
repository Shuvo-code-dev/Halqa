import styles from './layout.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.footerText}>
          &copy; {new Date().getFullYear()} Halqa Community. Open source and free forever.
        </p>
      </div>
    </footer>
  );
}
