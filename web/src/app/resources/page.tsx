import styles from './page.module.css';

export default function Resources() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Resource <span className="text-gradient">Vault</span></h1>
        <p className={styles.subtitle}>
          No more getting lost in endless tutorials. Here are the absolute best, hand-picked free resources to accelerate your learning.
        </p>
      </header>

      <div className={styles.directory}>
        <section>
          <h2 className={styles.categoryTitle}>Cheat-sheets <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— For quick revisions</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>OverAPI HTML</h3>
                <span className={styles.resourceType}>Website</span>
              </div>
              <p className={styles.resourceDesc}>All HTML tags and CSS properties available on a single, easy-to-read page.</p>
              <a href="https://overapi.com/html" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
            
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Modern JS Cheatsheet</h3>
                <span className={styles.resourceType}>GitHub Repo</span>
              </div>
              <p className={styles.resourceDesc}>A comprehensive summary of everything in JavaScript from ES6 to the present.</p>
              <a href="https://github.com/mbeaudru/modern-js-cheatsheet" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>GitHub Git Cheat Sheet</h3>
                <span className={styles.resourceType}>PDF/Web</span>
              </div>
              <p className={styles.resourceDesc}>All the essential Git commands you need organized in one convenient place.</p>
              <a href="https://education.github.com/git-cheat-sheet-education.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Essential Tools <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— The best free tools</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>VS Code</h3>
                <span className={styles.resourceType}>Editor</span>
              </div>
              <p className={styles.resourceDesc}>The default editor choice for modern development. Highly extensible and fast.</p>
              <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Figma</h3>
                <span className={styles.resourceType}>Design</span>
              </div>
              <p className={styles.resourceDesc}>The industry standard for UI/UX design, prototyping, and collaboration.</p>
              <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Lucide Icons</h3>
                <span className={styles.resourceType}>Assets</span>
              </div>
              <p className={styles.resourceDesc}>A beautiful, customizable, and minimalist open-source icon set.</p>
              <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Google Fonts</h3>
                <span className={styles.resourceType}>Typography</span>
              </div>
              <p className={styles.resourceDesc}>An expansive library of premium, high-quality fonts available entirely for free.</p>
              <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Free Books <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— For deep learning</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Eloquent JavaScript</h3>
                <span className={styles.resourceType}>E-Book</span>
              </div>
              <p className={styles.resourceDesc}>One of the absolute best books for learning JavaScript, available free online.</p>
              <a href="https://eloquentjavascript.net/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Grokking Algorithms</h3>
                <span className={styles.resourceType}>E-Book</span>
              </div>
              <p className={styles.resourceDesc}>An excellent resource for learning complex algorithms visually through diagrams.</p>
              <a href="https://www.manning.com/books/grokking-algorithms" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
