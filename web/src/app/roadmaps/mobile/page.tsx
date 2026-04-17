'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../frontend/page.module.css';

const STAGES = [
  {
    id: '01',
    title: 'JSX & Native Components',
    description: 'Learn how to translate web knowledge into the native mobile world.',
    why: "Mobile uses native primitives (&lt;View&gt;, &lt;Text&gt;) instead of HTML. Understanding this bridge is essential for performance.",
    topics: ['View, Text, Image', 'StyleSheet API', 'Platform Specific Code', 'Native Bridging'],
    guide: "Initialize a project using Expo. Create a simple profile screen using only Native components. Focus on vertical and horizontal alignment.",
    resource: 'https://reactnative.dev/docs/getting-started'
  },
  {
    id: '02',
    title: 'Mobile Flexbox & Layout',
    description: 'Master the specific nuances of Flexbox for mobile screen variety.',
    why: "Mobile layouts are dynamic and must handle thousands of devices. Mastering Flexbox is the only way to ensure consistency.",
    topics: ['Flex Direction (Column)', 'Justify vs Align', 'Safe Area Views', 'Dimensions API'],
    guide: "Build a grid system that adapts to both iPhone and Android sizes. Use the `SafeAreaView` to ensure your content is never hidden by \"notches\".",
    resource: 'https://reactnative.dev/docs/flexbox'
  },
  {
    id: '03',
    title: 'Navigation & State',
    description: 'Master the user flow between screens using React Navigation.',
    why: "Unlike the web, mobile \"stack\" navigation is physical and state-dependent. Proper flow ensures a premium app feel.",
    topics: ['Stack Navigation', 'Tab Bars', 'Passing Params', 'Deep Linking'],
    guide: "Implement a multi-screen app with a bottom tab bar. Ensure state persists correctly when navigating between \"Home\" and \"Settings\".",
    resource: 'https://reactnavigation.org/docs/getting-started/'
  },
  {
    id: '04',
    title: 'TestFlight & Distribution',
    description: 'Learn the "Last Mile" of app development—getting into users\' hands.',
    why: "A perfect app is useless if it's trapped on your computer. Distribution is a complex technical hurdle of its own.",
    topics: ['App Store Connect', 'Signing & Certificates', 'TestFlight Beta', 'Fastlane Automation'],
    guide: "Generate a production build using Expo Application Services (EAS). Upload your binary to TestFlight and invite your first group of beta testers.",
    resource: 'https://docs.expo.dev/build/introduction/'
  }
];

import { useUser } from '@/context/UserContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

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
        <h1 className={styles.title}>Mobile <span className="text-gradient">Engineering</span></h1>
        <p className={styles.subtitle}>
          Build cross-platform mobile applications using modern frameworks like React Native and the Expo ecosystem.
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
                  <div className={styles.detailTitle}>Actionable Guide</div>
                  <p className={styles.detailText}>{stage.guide}</p>
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
        ))}

        <div className={styles.completion}>
          <div className={styles.completionIcon}>🏆</div>
          <h3 className={styles.completionTitle}>Mobile Mastered</h3>
          <p className={styles.completionText}>You can now build and ship native apps to millions of devices.</p>
        </div>
      </div>
    </div>
  );
}
