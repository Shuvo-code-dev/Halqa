import Link from 'next/link';
import styles from '../frontend/page.module.css';

export default function LinuxRoadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Linux & <span className="text-gradient">DevOps</span></h1>
        <p className={styles.subtitle}>
          Master the engine that powers the web. From terminal mastery to automated deployment pipelines.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {/* Stage 1 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <h2 className={styles.stageTitle}>Linux & Terminal Basics</h2>
          <p className={styles.stageDescription}>
            Learn to navigate the filesystem, manage permissions, and master Bash/Zsh. Understanding the command line is the superpower of every elite engineer.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Linux Journey</span>
                <span className={styles.resourceType}>Interactive Guide</span>
              </div>
              <a href="https://linuxjourney.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Learn Bash
              </a>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>02</div>
          <h2 className={styles.stageTitle}>SSH, Networking & Security</h2>
          <p className={styles.stageDescription}>
            Secure your servers with SSH, manage firewalls (UFW), and understand the OSI model. Learn how data moves across the global network securely.
          </p>
          
          <div className={styles.proTip}>
            <div className={styles.proTipHeader}>🧪 Lab Integration</div>
            <p className={styles.proTipText}>
              Struggling with server latency? Use the <Link href="/apilab" className={styles.proTipLink}>API Lab</Link> to inspect response logs and simulate high-latency environments for your staging servers.
            </p>
          </div>

          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>DigitalOcean Networking</span>
                <span className={styles.resourceType}>Technical Articles</span>
              </div>
              <a href="https://www.digitalocean.com/community/tutorials/an-introduction-to-networking-terminology-interfaces-and-protocols" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Explore Networking
              </a>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>03</div>
          <h2 className={styles.stageTitle}>Docker & CI/CD</h2>
          <p className={styles.stageDescription}>
            Containerize your applications with Docker and automate your deployment cycles with GitHub Actions. Scale your code from local dev to global production.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Docker Orientation</span>
                <span className={styles.resourceType}>Official Docs</span>
              </div>
              <a href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Start Docker
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
