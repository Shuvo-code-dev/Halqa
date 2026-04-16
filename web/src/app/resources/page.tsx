import styles from './page.module.css';

export default function Resources() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Curated <span className="text-gradient">Resources</span></h1>
        <p className={styles.subtitle}>
          No more getting lost in endless tutorials. Here are the absolute best, hand-picked free resources to accelerate your learning.
        </p>
      </header>

      <div className={styles.directory}>
        <section>
          <h2 className={styles.categoryTitle}>Frontend Development</h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>MDN Web Docs</h3>
                <span className={styles.resourceType}>Doc</span>
              </div>
              <p className={styles.resourceDesc}>The definitive resource for HTML, CSS, and web APIs. The standard for all web developers.</p>
              <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Visit &rarr;</a>
            </div>
            
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>JavaScript.info</h3>
                <span className={styles.resourceType}>Book</span>
              </div>
              <p className={styles.resourceDesc}>The modern JavaScript Tutorial. How it's done now. From the basics to advanced topics.</p>
              <a href="https://javascript.info/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Visit &rarr;</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Computer Science</h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>CS50 by Harvard</h3>
                <span className={styles.resourceType}>Course</span>
              </div>
              <p className={styles.resourceDesc}>Introduction to the intellectual enterprises of computer science and the art of programming.</p>
              <a href="https://cs50.harvard.edu/x/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Visit &rarr;</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
