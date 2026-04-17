import Link from 'next/link';
import styles from '../frontend/page.module.css';

export default function FullstackRoadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Full-Stack <span className="text-gradient">Engineering</span></h1>
        <p className={styles.subtitle}>
          The elite MERN + Next.js path mapping interface logic directly into database schemas.
          <br /><br />
          <span className={styles.stageNumber} style={{ position: 'relative', display: 'inline-block', left: 0, marginTop: '1rem' }}>Active Path</span>
        </p>
      </header>
      
      <div className={styles.timeline}>
        {/* Stage 1 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <h2 className={styles.stageTitle}>React & Global State</h2>
          <p className={styles.stageDescription}>
            Master UI composition via React hooks, context graphs, and advanced performance optimizations bridging interactive DOM layers.
          </p>

          <div className={styles.proTip}>
            <div className={styles.proTipHeader}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Antigravity Pro Tip
            </div>
            <div className={styles.proTipText}>
              See complex React composition in action. Check out the <Link href="/codelab" className={styles.proTipLink}>Apple-Style Bento Grid</Link> blueprint.
            </div>
          </div>

          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>React Official Docs</span>
                <span className={styles.resourceType}>Official Guide</span>
              </div>
              <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Read Guide
              </a>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>02</div>
          <h2 className={styles.stageTitle}>Node.js & REST APIs</h2>
          <p className={styles.stageDescription}>
            Construct reliable server endpoints mapped to pure HTTP verbs using Express. Handle CORS, Auth-headers, and async responses.
          </p>

          <div className={styles.proTip}>
            <div className={styles.proTipHeader}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              Antigravity Pro Tip
            </div>
            <div className={styles.proTipText}>
              Need immediate sandbox endpoints to test your fetch architecture? Pull native JSON limits globally from our <Link href="/apilab" className={styles.proTipLink}>API Lab Directory</Link>.
            </div>
          </div>

          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>MDN HTTP Architecture</span>
                <span className={styles.resourceType}>Open Syntax</span>
              </div>
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Analyze Specs
              </a>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>03</div>
          <h2 className={styles.stageTitle}>Next.js App Router (SSR)</h2>
          <p className={styles.stageDescription}>
            Shift into the Next.js `src/app` dimension. Master server-side rendering, React Server Components (RSC), and absolute edge caching.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Next.js Routing Specs</span>
                <span className={styles.resourceType}>Official Docs</span>
              </div>
              <a href="https://nextjs.org/docs/app" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Start Reading
              </a>
            </div>
          </div>
        </div>

        {/* Stage 4 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>04</div>
          <h2 className={styles.stageTitle}>Database & Authentication</h2>
          <p className={styles.stageDescription}>
            Unify the data stack mapping raw SQL/NoSQL to TypeScript using Prisma or Drizzle models. Protect routes structurally utilizing NextAuth or Clerk boundary logic.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Prisma ORM Crash Course</span>
                <span className={styles.resourceType}>Database Theory</span>
              </div>
              <a href="https://www.prisma.io/docs/getting-started" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                View Details
              </a>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Clerk Identity Integration</span>
                <span className={styles.resourceType}>Security</span>
              </div>
              <a href="https://clerk.com/docs" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Explore Identity
              </a>
            </div>
          </div>
        </div>

        <div className={styles.completion}>
          <div className={styles.completionIcon}>🏆</div>
          <h3 className={styles.completionTitle}>Full-Stack Engineer</h3>
          <p className={styles.completionText}>You possess the logic bindings required to architect anything.</p>
        </div>

      </div>
    </div>
  );
}
