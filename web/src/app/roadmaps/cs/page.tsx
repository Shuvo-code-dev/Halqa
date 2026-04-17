import Link from 'next/link';
import styles from '../frontend/page.module.css';

export default function CSRoadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/roadmaps" className={styles.backLink}>
          &larr; Back to Roadmaps
        </Link>
        <h1 className={styles.title}>CS <span className="text-gradient">Fundamentals</span></h1>
        <p className={styles.subtitle}>
          The DNA of software engineering. Master data structures, algorithms, and low-level system design.
        </p>
      </header>
      
      <div className={styles.timeline}>
        {/* Stage 1 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>01</div>
          <h2 className={styles.stageTitle}>Data Structures & Complexity</h2>
          <p className={styles.stageDescription}>
            Understand Big O notation, Arrays, Linked Lists, Stacks, and Queues. Learn how to choose the right structure for optimal time and space efficiency.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>Big O Cheat Sheet</span>
                <span className={styles.resourceType}>Visual Reference</span>
              </div>
              <a href="https://www.bigocheatsheet.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                View Charts
              </a>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>02</div>
          <h2 className={styles.stageTitle}>Algorithms & Trees</h2>
          <p className={styles.stageDescription}>
            Master Sorting (QuickSort, MergeSort), Searching (Binary Search), and Tree traversals (DFS, BFS). Build the logical intuition to solve complex problems.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>VisuAlgo</span>
                <span className={styles.resourceType}>Visualizer</span>
              </div>
              <a href="https://visualgo.net/en" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Watch Algorithms
              </a>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className={styles.stage}>
          <div className={styles.stageNumber}>03</div>
          <h2 className={styles.stageTitle}>Memory & Threads</h2>
          <p className={styles.stageDescription}>
            Dive deep into Heap vs Stack memory, Pointers, and Multithreading. Understand how software interacts with the physical CPU and RAM.
          </p>
          <div className={styles.resources}>
            <div className={styles.resourceHeader}>Primary Resources</div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>CS50 Introduction</span>
                <span className={styles.resourceType}>Course</span>
              </div>
              <a href="https://cs50.harvard.edu/x/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>
                Take Course
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
