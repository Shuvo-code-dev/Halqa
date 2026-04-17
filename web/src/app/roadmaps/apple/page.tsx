import Link from 'next/link';
import styles from '../frontend/page.module.css';

export default function AppleRoadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Apple <span className="text-gradient">Ecosystem</span></h1>
        <p className={styles.subtitle}>
          Build native, high-performance applications for iOS, macOS, watchOS, and beyond.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {/* Stage 1 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <h2 className={styles.stageTitle}>Swift Syntax & Logic</h2>
          <p className={styles.stageDescription}>
            Master Swift—Apple's powerful and intuitive programming language. Understand Optionals, Closures, and Protocol-Oriented Programming.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Swift Playgrounds</span>
                <span className={styles.resourceType}>Interactive App</span>
              </div>
              <a href="https://www.apple.com/swift/playgrounds/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Download App
              </a>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>02</div>
          <h2 className={styles.stageTitle}>SwiftUI & App Lifecycle</h2>
          <p className={styles.stageDescription}>
            Learn SwiftUI to build modern, declarative interfaces with minimal code. Master state management with @State, @Binding, and @EnvironmentObject.
          </p>
          
          <div className={styles.proTip}>
            <div className={styles.proTipHeader}>🧪 Lab Integration</div>
            <p className={styles.proTipText}>
              Designing for Apple? Grab the <Link href="/codelab" className={styles.proTipLink}>Apple Bento Grid</Link> or the <Link href="/codelab" className={styles.proTipLink}>Glassmorphism Container</Link> from our Code Lab to nail the Cupertino aesthetic.
            </p>
          </div>

          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>100 Days of SwiftUI</span>
                <span className={styles.resourceType}>Online Course</span>
              </div>
              <a href="https://www.hackingwithswift.com/100/swiftui" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Start Course
              </a>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>03</div>
          <h2 className={styles.stageTitle}>Distribution & App Store</h2>
          <p className={styles.stageDescription}>
            Navigate Xcode, TestFlight, and App Store Connect. Learn how to sign apps, manage certificates, and prepare your app for a global launch.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>App Store Review Guidelines</span>
                <span className={styles.resourceType}>Official Docs</span>
              </div>
              <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Read Guidelines
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
