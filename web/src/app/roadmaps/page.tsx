'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import styles from './page.module.css';

export default function Roadmaps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(`.${styles.header} > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      });

      // Grid Animation
      gsap.from(`.${styles.card}`, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Learning <span className="text-gradient">Roadmaps</span></h1>
        <p className={styles.subtitle}>
          Step-by-step paths designed to take you from absolute beginner to job-ready developer, without the fluff.
        </p>
      </header>
      
      <div className={styles.grid}>
        <Link href="/roadmaps/frontend" className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Frontend</h2>
            <span className={`${styles.status} ${styles.active}`}>Active</span>
          </div>
          <p className={styles.description}>
            Master HTML, CSS, JavaScript, and React. Build beautiful user interfaces and responsive web applications.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>HTML & CSS</span>
            <span className={styles.step}>JavaScript</span>
            <span className={styles.step}>React</span>
          </div>
        </Link>

        <Link href="/roadmaps/backend" className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Backend</h2>
            <span className={`${styles.status} ${styles.active}`}>Partial</span>
          </div>
          <p className={styles.description}>
            Focus on server-side logic, databases, APIs, and system architecture using Node.js or Python.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Node.js / Python</span>
            <span className={styles.step}>Databases</span>
            <span className={styles.step}>APIs</span>
          </div>
        </Link>

        <Link href="/roadmaps/fullstack" className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Full-Stack</h2>
            <span className={`${styles.status} ${styles.active}`}>Active</span>
          </div>
          <p className={styles.description}>
            The ultimate path to building complete web applications from the browser interface down to the database schema.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Frontend</span>
            <span className={styles.step}>Backend</span>
            <span className={styles.step}>DevOps</span>
          </div>
        </Link>

        <Link href="/roadmaps/mobile" className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Mobile</h2>
            <span className={`${styles.status} ${styles.active}`}>Active</span>
          </div>
          <p className={styles.description}>
            Build cross-platform mobile applications using modern frameworks like React Native or Flutter.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Dart / JS</span>
            <span className={styles.step}>Flutter / React Native</span>
          </div>
        </Link>

        <Link href="/roadmaps/linux" className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Linux & DevOps</h2>
            <span className={`${styles.status} ${styles.active}`}>Active</span>
          </div>
          <p className={styles.description}>
            The engine room. Master the command line, server security, containers, and deployment automation.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Linux Terminal</span>
            <span className={styles.step}>Docker</span>
            <span className={styles.step}>CI/CD</span>
          </div>
        </Link>

        <Link href="/roadmaps/apple" className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>Apple Ecosystem</h2>
            <span className={`${styles.status} ${styles.active}`}>Active</span>
          </div>
          <p className={styles.description}>
            Design and build high-performance native apps for iOS and macOS using Swift and SwiftUI.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Swift</span>
            <span className={styles.step}>SwiftUI</span>
            <span className={styles.step}>App Store</span>
          </div>
        </Link>

        <Link href="/roadmaps/cs" className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.domain}>CS Fundamentals</h2>
            <span className={`${styles.status} ${styles.active}`}>Active</span>
          </div>
          <p className={styles.description}>
            The foundation of computer science. Understand data structures, algorithms, and binary logic.
          </p>
          <div className={styles.steps}>
            <span className={styles.step}>Algorithms</span>
            <span className={styles.step}>Data Structures</span>
            <span className={styles.step}>OS Basics</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
