import styles from './layout.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.footerText}>
          &copy; {new Date().getFullYear()} Proudly made with ❤️ by Halqa Community.
        </p>
      </div>
    </footer>
  );
}
