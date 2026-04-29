import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bulz | Privacy Policy',
  description: 'Bulz is an open-source educational platform. We respect your privacy and do not track your personal data.',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>Privacy <span className="text-gradient">Policy</span></h1>
      
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
        <p style={{ marginBottom: '2rem' }}>
          At Bulz, we believe documentation and education should be free of noise and intrusion. 
          As an open-source project, our philosophy is simple: **Zero Trackers. Zero Data Collection.**
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
        <p>
          Bulz is a static-optimized educational platform. We do not require account creation, 
          and we do not store personal information on our servers. Any progress tracked (like roadmap completion) 
          is stored locally on your device via browser local storage.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>2. Third-Party Services</h2>
        <p>
          We link to external resources like MDN, GitHub, and various dev tools. These sites have their own 
          privacy policies, and we encourage you to review them. Bulz itself does not share data with any third-party marketing services.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>3. Open Source Transparency</h2>
        <p>
          You can verify our data handling logic yourself by reviewing our source code on 
          <a href="https://github.com/Shuvo-code-dev/Bulz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', marginLeft: '5px' }}>GitHub</a>.
        </p>

        <div style={{ marginTop: '5rem' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>&larr; Return Home</Link>
        </div>
      </div>
    </div>
  );
}
