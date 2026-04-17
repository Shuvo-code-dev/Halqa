import Link from 'next/link';
import styles from './page.module.css';

export default function FrontendRoadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Frontend <span className="text-gradient">Mastery</span></h1>
        <p className={styles.subtitle}>
          The curated path to building interactive, beautiful user interfaces that run in the browser. Start from zero and go to full React competency.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {/* Stage 1 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <h2 className={styles.stageTitle}>HTML Foundations</h2>
          <p className={styles.stageDescription}>
            HyperText Markup Language is the backbone of every website. You need to understand semantic structure, accessibility, and forms to build solid web applications.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>MDN HTML Documentation</span>
                <span className={styles.resourceType}>Official Specs & Guides</span>
              </div>
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Read Guide
              </a>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>02</div>
          <h2 className={styles.stageTitle}>Modern CSS</h2>
          <p className={styles.stageDescription}>
            Cascading Style Sheets turn boring documents into beautiful layouts. Learn Flexbox, Grid, Custom Properties (Variables), and responsive design principles.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>MDN CSS Basics</span>
                <span className={styles.resourceType}>Official Specs & Guides</span>
              </div>
              <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Read Guide
              </a>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>03</div>
          <h2 className={styles.stageTitle}>JavaScript Logic</h2>
          <p className={styles.stageDescription}>
            JavaScript is what makes the web interactive. You will learn data types, functions, DOM manipulation, asynchronous programming, so you can build dynamic apps.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>JavaScript.info</span>
                <span className={styles.resourceType}>The Modern JavaScript Tutorial</span>
              </div>
              <a href="https://javascript.info/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Read Tutorial
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
