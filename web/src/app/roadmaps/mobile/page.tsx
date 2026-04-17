import Link from 'next/link';
import styles from '../frontend/page.module.css';

export default function MobileRoadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Mobile <span className="text-gradient">Engineering</span></h1>
        <p className={styles.subtitle}>
          The direct bridge to building native iOS and Android experiences leveraging cross-platform React Native and Expo architectures.
          <br /><br />
          <span className={styles.stageNumber} style={{ position: 'relative', display: 'inline-block', left: 0, marginTop: '1rem' }}>Active Path</span>
        </p>
      </header>
      
      <div className={styles.timeline}>
        {/* Stage 1 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <h2 className={styles.stageTitle}>Expo Ecosystem & CLI</h2>
          <p className={styles.stageDescription}>
            Bypass heavy Xcode/Android Studio setups. Understand the Expo Go app matrix and deploy your first native sandbox utilizing absolute zero build configurations.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Expo Quick Start</span>
                <span className={styles.resourceType}>Official Docs</span>
              </div>
              <a href="https://docs.expo.dev/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Init Project
              </a>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>02</div>
          <h2 className={styles.stageTitle}>React Native Core</h2>
          <p className={styles.stageDescription}>
            Transition away from DOM elements (`div`, `span`). Master primitive iOS/Android mapping utilizing `&lt;View&gt;`, `&lt;Text&gt;`, and massive optimized `&lt;FlatList&gt;` arrays.
          </p>

          <div className={styles.proTip}>
            <div className={styles.proTipHeader}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              Antigravity Pro Tip
            </div>
            <div className={styles.proTipText}>
              Need heavy state data to test your `&lt;FlatList&gt;` infinity scroll? Inject absolute fake payloads routing directly from the Testing section in the <Link href="/apilab" className={styles.proTipLink}>API Lab</Link>.
            </div>
          </div>

          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>React Native Components</span>
                <span className={styles.resourceType}>Native Mapping</span>
              </div>
              <a href="https://reactnative.dev/docs/components-and-apis" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Read Specs
              </a>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>03</div>
          <h2 className={styles.stageTitle}>Device Native APIs</h2>
          <p className={styles.stageDescription}>
            Connect physics to code. Invoke the core operating system layers mapping the Camera, Geolocation tracking, Push Notifications, and Secure Storage logic.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Expo SDK Modules</span>
                <span className={styles.resourceType}>Architecture Reference</span>
              </div>
              <a href="https://docs.expo.dev/versions/latest/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Explore APIs
              </a>
            </div>
          </div>
        </div>

        {/* Stage 4 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>04</div>
          <h2 className={styles.stageTitle}>Store Deployment & CI/CD</h2>
          <p className={styles.stageDescription}>
            Compile the final native binary arrays (AAB/IPA). Utilize EAS (Expo Application Services) to construct internal testing channels and finally deploy your code to the Apple App Store and Google Play Store frameworks.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>EAS Build Pipeline</span>
                <span className={styles.resourceType}>DevOps</span>
              </div>
              <a href="https://docs.expo.dev/build/introduction/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Launch Build
              </a>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>App Store Guidelines</span>
                <span className={styles.resourceType}>Legal & Review</span>
              </div>
              <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Check Apple Rules
              </a>
            </div>
          </div>
        </div>

        <div className={styles.completion}>
          <div className={styles.completionIcon}>📱</div>
          <h3 className={styles.completionTitle}>Native Architect</h3>
          <p className={styles.completionText}>You can ship code natively to billions of supercomputers worldwide.</p>
        </div>

      </div>
    </div>
  );
}
