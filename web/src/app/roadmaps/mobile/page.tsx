'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../frontend/page.module.css';
import { useUser } from '@/context/UserContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const STAGES = [
  {
    id: '01',
    title: 'Mobile Fundamentals',
    description: 'Understanding the mobile paradigm. Viewports, Touch Targets, and Sensors.',
    why: 'Mobile development requires a different mindset. Screen real-estate is limited, and users interact primarily with touch, not cursors.',
    topics: ['Mobile Viewports', 'Touch Events', 'Performance Optimization', 'Offline Support'],
    guide: 'Develop a mobile-first UI component that handles both swipe and long-press interactions using the Pointer Events API.',
    resource: 'https://developer.mozilla.org/en-US/docs/Web/API/Touch_events'
  },
  {
    id: '02',
    title: 'Cross-Platform Frameworks',
    description: 'Build for both iOS and Android with React Native and Expo.',
    why: 'Write once, run anywhere. Cross-platform tools allow you to reach 100% of the mobile market with a single codebase.',
    topics: ['React Native Basics', 'Expo Ecosystem', 'Native Modules', 'Styling in RN'],
    guide: 'Set up a basic Expo project. Create a screen that shows a list of items fetched from an API, with a "Pull to Refresh" feature.',
    resource: 'https://reactnative.dev/docs/getting-started'
  },
  {
    id: '03',
    title: 'Progressive Web Apps (PWA)',
    description: 'Web apps that feel like native apps. Service Workers and App Manifests.',
    why: 'PWAs are the bridge between web and mobile. They allow for installation, offline access, and push notifications without the app store fees.',
    topics: ['Service Workers', 'Caching Strategies', 'Web App Manifest', 'Push API'],
    guide: 'Convert a simple website into a PWA. Ensure it scores 100/100 on the Lighthouse PWA audit and works without internet.',
    resource: 'https://web.dev/progressive-web-apps/'
  },
  {
    id: '04',
    title: 'Mobile UX & UI Design',
    description: 'Mastering the ergonomics of thumb-driven interfaces.',
    why: 'A mobile app is only as good as its UX. Ergonomics and micro-interactions determine whether a user stays or deletes your app.',
    topics: ['Ergonomic Design', 'Gesture Navigation', 'Mobile Typography', 'Haptic Feedback'],
    guide: 'Audit a popular mobile app. Identify three areas where gesture navigation could be improved and sketch your solutions.',
    resource: 'https://material.io/design/platform-guidance/android-navigation.html'
  }
];

export default function MobileRoadmap() {
  const { toggleStageCompletion, isStageCompleted } = useUser();
  const [expandedStage, setExpandedStage] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapPath = '/roadmaps/mobile';

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

      // Stage Reveals
      const stages = gsap.utils.toArray(`.${styles.stage}`);
      stages.forEach((stage: any) => {
        gsap.from(stage, {
          scrollTrigger: {
            trigger: stage,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  const handleToggleDone = (e: React.MouseEvent, stageId: string) => {
    e.stopPropagation();
    toggleStageCompletion(roadmapPath, stageId);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>Mobile <span className="text-gradient">Innovation</span></h1>
        <p className={styles.subtitle}>
          The future of software is portable. Master cross-platform development and high-performance native experiences.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {STAGES.map((stage, index) => {
          const isDone = isStageCompleted(roadmapPath, stage.id);
          
          return (
            <div 
              key={stage.id} 
              className={`${styles.stage} ${expandedStage === index ? styles.open : ''} ${isDone ? styles.completed : ''}`}
              onClick={() => toggleStage(index)}
            >
              <div className={styles.stageNumber}>
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : stage.id}
              </div>
              
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
                    <button 
                      className={`${styles.completeToggle} ${isDone ? styles.isDone : ''}`}
                      onClick={(e) => handleToggleDone(e, stage.id)}
                    >
                      <div className={styles.check}>
                        {isDone ? (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg>
                        )}
                      </div>
                      {isDone ? 'Completed' : 'Mark as Complete'}
                    </button>
                  </div>
                </div>

                {index === 0 && (
                  <div className={styles.proTip} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.proTipHeader}>🧪 Lab Integration</div>
                    <p className={styles.proTipText}>
                      Applying web styles to mobile? Remember to escape your JSX tags. See our <Link href="/projects" className={styles.proTipLink}>Mobile Blueprints</Link> for ready-made examples.
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
          );
        })}

        <div className={styles.completion}>
          <div className={styles.completionIcon}>🏆</div>
          <h3 className={styles.completionTitle}>Mobile Mastery</h3>
          <p className={styles.completionText}>You can now build premium cross-platform and native experiences.</p>
        </div>
      </div>
    </div>
  );
}
