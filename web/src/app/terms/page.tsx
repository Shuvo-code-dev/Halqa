import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bulz | Terms of Service',
  description: 'Bulz is an open-source educational platform. Our terms of service emphasize community-driven learning and collective improvement.',
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>Terms of <span className="text-gradient">Service</span></h1>
      
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
        <p style={{ marginBottom: '2rem' }}>
          By using Bulz, you agree to join a community of builders. Bulz is provided &quot;as is&quot; under the 
          GPL-3.0 License.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>1. Educational Usage</h2>
        <p>
          Bulz is an educational directory. While we strive for 100% technical accuracy in our roadmaps and 
          components, we are not liable for any specific engineering decisions made by users in their 
          external production environments.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>2. Open Source Contributions</h2>
        <p>
          Contributors to the Bulz ecosystem maintain their respective copyright but agree to release 
          the work under the GPL-3.0 License. This ensures the collective roadmap remains free for all developers, forever.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>3. Prohibited Content</h2>
        <p>
          Users contributing to the forum or GitHub repositories must adhere to standard professional conduct. 
          Abusive, non-constructive, or malicious contributions will be purged from the ecosystem.
        </p>

        <div style={{ marginTop: '5rem' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>&larr; Return Home</Link>
        </div>
      </div>
    </div>
  );
}
