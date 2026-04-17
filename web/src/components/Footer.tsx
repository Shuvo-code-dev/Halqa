import styles from './layout.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.footerText}>
          Built with ❤️ by the Halqa Community · Powered by Oi Applications
        </p>
      </div>
    </footer>
  );
}
