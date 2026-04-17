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

        {/* Stage 4 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>04</div>
          <h2 className={styles.stageTitle}>Version Control (Git & GitHub)</h2>
          <p className={styles.stageDescription}>
            Learn how to manage code, track changes, and collaborate with teams effectively. Essential for any professional developer.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Git & GitHub for Beginners</span>
                <span className={styles.resourceType}>freeCodeCamp Course</span>
              </div>
              <a href="https://www.freecodecamp.org/news/git-and-github-crash-course/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Watch Course
              </a>
            </div>
          </div>
        </div>

        {/* Stage 5 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>05</div>
          <h2 className={styles.stageTitle}>React Mastery</h2>
          <p className={styles.stageDescription}>
            Master state management, components, hooks, and lifecycle events to build complex user interfaces using the foremost frontend library.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>React.dev</span>
                <span className={styles.resourceType}>Official Interactive Docs</span>
              </div>
              <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Start Learning
              </a>
            </div>
          </div>
        </div>

        {/* Stage 6 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>06</div>
          <h2 className={styles.stageTitle}>Next.js & Deployment</h2>
          <p className={styles.stageDescription}>
            Build production-ready, SEO-optimized, full-stack React framework apps and deploy them seamlessly to Vercel.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Next.js Learn Dashboard</span>
                <span className={styles.resourceType}>Official Next.js Tutorial</span>
              </div>
              <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Build Dashboard
              </a>
            </div>
          </div>
        </div>

        {/* Completion */}
        <div className={styles.completion}>
          <div className={styles.completionIcon}>🏆</div>
          <h3 className={styles.completionTitle}>Frontend Mastered</h3>
          <p className={styles.completionText}>You now have the skills to build and deploy production-grade frontend applications.</p>
        </div>

      </div>
    </div>
  );
}
