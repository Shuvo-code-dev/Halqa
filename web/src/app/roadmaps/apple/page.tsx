'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../frontend/page.module.css';

const STAGES = [
  {
    id: '01',
    title: 'Swift Syntax & Logic',
    description: 'Master Apple\'s powerful, fast, and safe programming language.',
    why: 'Swift is the native language for the entire Apple ecosystem. Its strict type-safety and protocol-oriented nature prevent billions of dollars in runtime errors.',
    topics: ['Optionals & Unwrapping', 'Closures & High-Order Functions', 'Protocol-Oriented Programming', 'Generics'],
    guide: 'Download Swift Playgrounds. Master the "Option-Shift-Arrow" flow of logic. Build a small logic engine that handles raw mathematical transformations using strictly typed protocols.',
    resource: 'https://docs.swift.org/swift-book/'
  },
  {
    id: '02',
    title: 'SwiftUI & App Lifecycle',
    description: 'Build modern, declarative interfaces with minimal code.',
    why: 'SwiftUI is the future of Apple UI development. It allows for multi-platform (iOS, macOS, watchOS) code reuse with native performance.',
    topics: ['State & Binding', 'Environment Objects', 'Composing Views', 'Animations & Transitions'],
    guide: 'Open Xcode. Create a new App project. Build a "Dynamic Dashboard" where every UI element reacts to a single `@State` source of truth.',
    resource: 'https://developer.apple.com/xcode/swiftui/'
  },
  {
    id: '03',
    title: 'App Store Distribution',
    description: 'Master the "Final Flight"—getting your app to users globally.',
    why: 'The App Store is the most secure and profitable software marketplace in the world. Mastery of its submission cycle is a required professional gate.',
    topics: ['TestFlight Beta Testing', 'App Store Connect', 'Signing & Capabilities', 'Review Guidelines'],
    guide: 'Archive your app in Xcode. Upload it to App Store Connect. Create a TestFlight group and invite your external testers to provide telemetry.',
    resource: 'https://developer.apple.com/app-store/review/guidelines/'
  }
];

export default function AppleRoadmap() {
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Apple <span className="text-gradient">Ecosystem</span></h1>
        <p className={styles.subtitle}>
          Build native, high-performance applications for iOS, macOS, watchOS, and beyond using modern Swift.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {STAGES.map((stage, index) => (
          <div 
            key={stage.id} 
            className={`${styles.stage} ${expandedStage === index ? styles.open : ''}`}
            onClick={() => toggleStage(index)}
          >
            <div className={styles.stageNumber}>{stage.id}</div>
            
            <div className={styles.stageHeader}>
              <div>
                <h2 className={styles.stageTitle}>{stage.title}</h2>
                <p className={styles.stageDescription}>{stage.description}</p>
              </div>
              <div className={styles.chevron}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className={`${styles.stageDetails} ${expandedStage === index ? styles.open : ''}`}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailBlock}>
                  <div className={styles.detailTitle}>The "Why"</div>
                  <p className={styles.detailText}>{stage.why}</p>
                </div>

                <div className={styles.detailBlock}>
                  <div className={styles.detailTitle}>Core Topics</div>
                  <ul className={styles.topicList}>
                    {stage.topics.map((topic, tIdx) => (
                      <li key={tIdx} className={styles.topicItem}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.detailBlock}>
                  <div className={styles.detailTitle}>Actionable Guide</div>
                  <p className={styles.detailText}>{stage.guide}</p>
                </div>
              </div>

              {index === 1 && (
                <div className={styles.proTip} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.proTipHeader}>🧪 Lab Integration</div>
                  <p className={styles.proTipText}>
                    Nailing the Cupertino look? Grab the <Link href="/codelab" className={styles.proTipLink}>Apple Bento Grid</Link> or the <Link href="/codelab" className={styles.proTipLink}>Glassmorphic Container</Link> from our Code Lab.
                  </p>
                </div>
              )}

              <a 
                href={stage.resource} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.deepDiveBtn}
                onClick={(e) => e.stopPropagation()}
              >
                Deep Dive Resources
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        ))}

        <div className={styles.completion}>
          <div className={styles.completionIcon}>🍎</div>
          <h3 className={styles.completionTitle}>Apple Developer</h3>
          <p className={styles.completionText}>You can now build and ship native Apple software.</p>
        </div>
      </div>
    </div>
  );
}
