import Link from 'next/link';
import styles from '../frontend/page.module.css';

export default function BackendRoadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Backend <span className="text-gradient">Engineering</span></h1>
        <p className={styles.subtitle}>
          The curated path to building robust, scalable server-side applications, APIs, and databases.
          <br /><br />
          <span className={styles.stageNumber} style={{ position: 'relative', display: 'inline-block', left: 0, marginTop: '1rem' }}>Partial Path Available</span>
        </p>
      </header>
      
      <div className={styles.timeline}>
        {/* Stage 1 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <h2 className={styles.stageTitle}>Node.js Basics</h2>
          <p className={styles.stageDescription}>
            Understand the runtime, NPM, and how to run JavaScript outside the browser. This forms the foundation of modern backend JS infrastructure.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Node.js Official Guides</span>
                <span className={styles.resourceType}>Official Docs</span>
              </div>
              <a href="https://nodejs.org/en/learn" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Read Guide
              </a>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className={styles.completion}>
          <div className={styles.completionIcon}>🚧</div>
          <h3 className={styles.completionTitle}>More Stages Constructing</h3>
          <p className={styles.completionText}>Stay tuned as we curate the absolute best resources for Databases, APIs, and System Architecture.</p>
        </div>

      </div>
    </div>
  );
}
