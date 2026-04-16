import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Master Coding, <br />
          <span className="text-gradient">Without the Noise.</span>
        </h1>
        <p className={styles.subtitle}>
          A minimalist, community-driven platform providing structured roadmaps and hand-picked, high-quality, completely free programming resources.
        </p>
        <div className={styles.actions}>
          <Link href="/roadmaps" className={styles.primaryBtn}>
            Explore Roadmaps
          </Link>
          <Link href="/resources" className={styles.secondaryBtn}>
            Browse Resources
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={`${styles.featureCard} glass-panel`}>
          <div className={styles.featureIcon}>🗺️</div>
          <h3 className={styles.featureTitle}>Structured Paths</h3>
          <p className={styles.featureDesc}>
            Step-by-step guides from absolute beginner to job-ready. We eliminate the guesswork so you can focus on learning.
          </p>
        </div>
        <div className={`${styles.featureCard} glass-panel`}>
          <div className={styles.featureIcon}>💎</div>
          <h3 className={styles.featureTitle}>Curated Resources</h3>
          <p className={styles.featureDesc}>
            No information overload. Only the absolute best, free books, videos, and interactive sites selected by the community.
          </p>
        </div>
        <div className={`${styles.featureCard} glass-panel`}>
          <div className={styles.featureIcon}>🪶</div>
          <h3 className={styles.featureTitle}>Distraction-Free</h3>
          <p className={styles.featureDesc}>
            A minimalist, premium interface designed exclusively to keep you focused. No ads, no popups. Just pure learning.
          </p>
        </div>
      </section>
    </>
  );
}
