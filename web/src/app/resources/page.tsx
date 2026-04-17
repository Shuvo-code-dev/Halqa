import styles from './page.module.css';

export default function Resources() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Universal <span className="text-gradient">Directory</span></h1>
        <p className={styles.subtitle}>
          The ultimate vault for top-tier developer tools across Web, Mobile, and Infrastructure. 
          Everything you need in one perfectly curated place.
        </p>
      </header>

      <div className={styles.directory}>

        {/* =========================================
            WEB DEVELOPMENT FIELD
        ========================================= */}
        <h2 className={styles.fieldHeading}>🌐 Web Development</h2>

        <section>
          <h2 className={styles.categoryTitle}>Cheat-sheets <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Rapid reference</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>OverAPI HTML</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Web</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>All HTML tags and CSS properties available on a single, easy-to-read page.</p>
              <a href="https://overapi.com/html" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
            
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Modern JS Cheatsheet</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Web</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>A comprehensive summary of everything in JavaScript from ES6 to the present.</p>
              <a href="https://github.com/mbeaudru/modern-js-cheatsheet" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>


        {/* =========================================
            APP DEVELOPMENT FIELD
        ========================================= */}
        <h2 className={styles.fieldHeading}>📱 App Development</h2>

        <section>
          <h2 className={styles.categoryTitle}>App Frameworks <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Core technologies</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Flutter</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Cross-Platform</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.</p>
              <a href="https://flutter.dev/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>React Native</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Cross-Platform</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Create native apps for Android and iOS using React under the hood. Powered by Meta.</p>
              <a href="https://reactnative.dev/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Swift</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Mobile</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>A powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS.</p>
              <a href="https://www.swift.org/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Cross-Platform Tools <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Accelerators</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Expo</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Cross-Platform</span>
                  <span className={`${styles.tierBadge} ${styles.tierFreemium}`}>Freemium</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>An open-source platform for making universal native apps for Android, iOS, and the web with React and JavaScript.</p>
              <a href="https://expo.dev/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Mobile UI/UX <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Design systems</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Material Design</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Mobile</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Google's comprehensive design system containing guidelines, components, and tools that support scalable UI design.</p>
              <a href="https://m3.material.io/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
             <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Apple HIG</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Mobile</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Human Interface Guidelines by Apple. Essential principles and best practices for designing great iOS experiences.</p>
              <a href="https://developer.apple.com/design/human-interface-guidelines" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>


        {/* =========================================
            UNIVERSAL & INFRASTRUCTURE FIELD
        ========================================= */}
        <h2 className={styles.fieldHeading}>🛠️ Universal & Infrastructure</h2>

        <section>
          <h2 className={styles.categoryTitle}>Essential Tools <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Every developer needs these</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>VS Code</h3>
                <div className={styles.resourceTags}>
                 <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>The default editor choice for modern development. Highly extensible and fast.</p>
              <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Figma</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFreemium}`}>Freemium</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>The industry standard for UI/UX design, prototyping, and collaboration.</p>
              <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Dev Helpers <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Utilities</span></h2>
          <div className={styles.resourceList}>
           <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Git Cheat Sheet</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>All the essential Git commands you need organized in one convenient place.</p>
              <a href="https://education.github.com/git-cheat-sheet-education.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Responsively</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Web</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Develop responsive web apps 5x faster by previewing all devices side-by-side.</p>
              <a href="https://responsively.app/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Can I Use</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Web</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Up-to-date browser support tables for support of front-end web technologies.</p>
              <a href="https://caniuse.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Visual Assets <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Graphics & Typography</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Unsplash</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Beautiful, high-quality free images and photos you can download and use for any project.</p>
              <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
            
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Lucide Icons</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>A beautiful, customizable, and minimalist open-source icon set built for React and modern apps.</p>
              <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

             <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Google Fonts</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>An expansive library of premium, high-quality fonts available entirely for free.</p>
              <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Backend & BaaS <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Power your apps</span></h2>
          <div className={styles.resourceList}>
             <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Appwrite</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Secure open-source backend server for Web, Mobile & Flutter developers. Huge free capabilities.</p>
              <a href="https://appwrite.io/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Supabase</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFreemium}`}>Freemium</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Open source Firebase alternative. Great free tier with Postgres DB, Auth, and instant APIs.</p>
              <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

             <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Firebase</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFreemium}`}>Freemium</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Google's deeply integrated application development platform featuring auth, DBs, and analytics.</p>
              <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
            
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>MongoDB Atlas</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFreemium}`}>Freemium</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>The ultimate NoSQL database free tier. Build faster with a developer data platform.</p>
              <a href="https://www.mongodb.com/atlas/database" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>DigitalOcean</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierPaid}`}>Paid</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Simple, robust cloud computing designed for developers. Host your backend seamlessly.</p>
              <a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.categoryTitle}>Learning Platforms <span style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400}}>— Deep dives</span></h2>
          <div className={styles.resourceList}>
            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Eloquent JavaScript</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Web</span>
                  <span className={`${styles.tierBadge} ${styles.tierFree}`}>Free</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>One of the absolute best books for learning JavaScript, available free online.</p>
              <a href="https://eloquentjavascript.net/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Udemy</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierFreemium}`}>Freemium</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>Massive catalog of developer courses. Look out for heavy discounts or free foundation courses.</p>
              <a href="https://www.udemy.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Grokking Algorithms</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Universal</span>
                  <span className={`${styles.tierBadge} ${styles.tierPaid}`}>Paid</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>An excellent resource for learning complex algorithms visually through simple diagrams.</p>
              <a href="https://www.manning.com/books/grokking-algorithms" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>

            <div className={`${styles.resourceCard} glass-panel`}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceName}>Frontend Masters</h3>
                <div className={styles.resourceTags}>
                  <span className={styles.fieldTag}>Web</span>
                  <span className={`${styles.tierBadge} ${styles.tierPaid}`}>Paid</span>
                </div>
              </div>
              <p className={styles.resourceDesc}>In-depth, expert-led premium courses for advanced frontend and full-stack engineering.</p>
              <a href="https://frontendmasters.com/" target="_blank" rel="noopener noreferrer" className={styles.resourceBtn}>Open</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
