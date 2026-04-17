'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../frontend/page.module.css';

const STAGES = [
  {
    id: '01',
    title: 'Data Structures & Big O',
    description: 'Master the DNA of computer science. Understand how data is stored and retrieved.',
    why: 'Efficiency is the hallmark of a senior engineer. Big O analysis allows you to predict performance before a single line of code is run.',
    topics: ['Big O Notation', 'Arrays & Linked Lists', 'Stacks & Queues', 'Hash Tables'],
    guide: 'Implement a custom Hash Table in JavaScript. Focus on resolving collisions and understanding why O(1) lookup is the golden standard.',
    resource: 'https://www.bigocheatsheet.com/'
  },
  {
    id: '02',
    title: 'Algorithms & Sorting',
    description: 'Learn how to solve complex problems with logical precision.',
    why: 'Algorithmic thinking is the core of problem solving. Mastering sorting and searching allows you to handle massive datasets with minimal latency.',
    topics: ['QuickSort & MergeSort', 'Binary Search', 'Recursion Mastery', 'Tree Traversals (BFS/DFS)'],
    guide: 'Visualize the QuickSort algorithm. Write a recursive function that searches a Binary Search Tree (BST) for a specific node in O(log n) time.',
    resource: 'https://visualgo.net/en'
  },
  {
    id: '03',
    title: 'Memory Management',
    description: 'Understand the physical limits of hardware—Heap, Stack, and Pointers.',
    why: 'Software doesn\'t exist in a vacuum. Understanding memory allows you to prevent leaks and build high-performance systems.',
    topics: ['Heap vs Stack', 'Pointers & References', 'Garbage Collection', 'Thread Concurrency'],
    guide: 'Learn the difference between "Pass by Value" and "Pass by Reference". Sketch out a memory diagram of how a recursive function consumes the stack.',
    resource: 'https://cs50.harvard.edu/x/'
  }
];

export default function CSRoadmap() {
  const { toggleStageCompletion, isStageCompleted } = useUser();
  const [expandedStage, setExpandedStage] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapPath = '/roadmaps/cs';

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
        <h1 className={styles.title}>CS <span className="text-gradient">Fundamentals</span></h1>
        <p className={styles.subtitle}>
          The theoretical bedrock of engineering. Master the algorithms and architectures that define modern computing.
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
          <div className={styles.completionIcon}>🧬</div>
          <h3 className={styles.completionTitle}>Computer Scientist</h3>
          <p className={styles.completionText}>You have mastered the logical foundations of engineering.</p>
        </div>
      </div>
    </div>
  );
}
