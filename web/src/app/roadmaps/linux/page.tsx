'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../frontend/page.module.css';

const STAGES = [
  {
    id: '01',
    title: 'Terminal Mastery & Bash',
    description: 'Master the command line—the ultimate interface for automation and system control.',
    why: 'The GUI is for users; the terminal is for engineers. Mastering the command line allows for infinite scale and precision.',
    topics: ['Filesystem Navigation', 'Permission Logic (Chmod)', 'Bash Scripting', 'Pipe & Redirection'],
    guide: 'Open your terminal. Write a Bash script that automates the creation of a new project directory structure with index and css files.',
    resource: 'https://linuxjourney.com/'
  },
  {
    id: '02',
    title: 'Networking & SSH',
    description: 'Learn how computers talk to each other across the global network securely.',
    why: 'Deployment and server management require a deep understanding of how data packets move and how to encrypt that movement.',
    topics: ['SSH Key Management', 'OSI Model Basics', 'Firewalls (UFW)', 'DNS & HTTP Protocols'],
    guide: 'Configure an SSH key on your local machine and use it to connect to a remote VPS. Set up a firewall that only allows traffic on port 80 and 443.',
    resource: 'https://www.digitalocean.com/community/tutorial_series/networking-fundamentals'
  },
  {
    id: '03',
    title: 'Docker & Containerization',
    description: 'Master Docker to ensure your code runs exactly the same everywhere.',
    why: 'The "it works on my machine" problem is solved by containers. Docker ensures production environments match local development perfectly.',
    topics: ['Dockerfile Syntax', 'Docker Compose', 'Image Layering', 'Container Orchestration'],
    guide: 'Create a `Dockerfile` for a simple Node.js application. Use `docker-compose` to run your app alongside a database in isolated containers.',
    resource: 'https://docs.docker.com/get-started/'
  }
];

export default function LinuxRoadmap() {
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
        <h1 className={styles.title}>Linux & <span className="text-gradient">DevOps</span></h1>
        <p className={styles.subtitle}>
          Master the engine that powers the web. From terminal mastery to automated deployment pipelines.
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
                    Benchmarking server performance? Use the <Link href="/apilab" className={styles.proTipLink}>API Lab</Link> to inspect endpoint latency and response codes.
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
          <div className={styles.completionIcon}>⚙️</div>
          <h3 className={styles.completionTitle}>System Mastered</h3>
          <p className={styles.completionText}>Your infrastructure is now as robust as your code.</p>
        </div>
      </div>
    </div>
  );
}
