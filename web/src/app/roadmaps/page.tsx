import styles from './page.module.css';

export default function Roadmaps() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Learning <span className="text-gradient">Roadmaps</span></h1>
        <p className={styles.subtitle}>
          Step-by-step paths designed to take you from absolute beginner to job-ready developer, without the fluff.
        </p>
      </header>
      
      <div className={styles.grid}>
        <div className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Frontend</h2>
            <span className={`${styles.status} ${styles.soon}`}>Coming Soon</span>
          </div>
          <p className={styles.description}>
            Master HTML, CSS, JavaScript, and React. Build beautiful user interfaces and responsive web applications.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>HTML & CSS</span>
            <span className={styles.step}>JavaScript</span>
            <span className={styles.step}>React</span>
          </div>
        </div>

        <div className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Backend</h2>
            <span className={`${styles.status} ${styles.soon}`}>Coming Soon</span>
          </div>
          <p className={styles.description}>
            Focus on server-side logic, databases, APIs, and system architecture using Node.js or Python.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Node.js / Python</span>
            <span className={styles.step}>Databases</span>
            <span className={styles.step}>APIs</span>
          </div>
        </div>

        <div className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Mobile</h2>
            <span className={`${styles.status} ${styles.soon}`}>Coming Soon</span>
          </div>
          <p className={styles.description}>
            Build cross-platform mobile applications using modern frameworks like React Native or Flutter.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Dart / JS</span>
            <span className={styles.step}>Flutter / React Native</span>
          </div>
        </div>
      </div>
    </div>
  );
}
