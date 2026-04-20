import globalRegistry from './global-tools-registry.json';

export interface Resource {
  id: string;
  name: string;
  url: string;
  category: 'Design Tools' | 'Dev Utilities' | 'Icons & Assets' | 'Learning Hubs' | 'General Resources';
  recommendation: string;
  quickCopy?: string; // Optional local field
  tier: 'Free' | 'Freemium' | 'Paid';
}

const PREMIUM_TOOLS: Resource[] = [
  {
    id: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/',
    category: 'Design Tools',
    recommendation: 'The undisputed king of collaborative interface design. Essential for high-fidelity prototyping and design systems.',
    tier: 'Freemium'
  },
  {
    id: 'framer',
    name: 'Framer',
    url: 'https://www.framer.com/',
    category: 'Design Tools',
    recommendation: 'The bridge between design and production code. Best-in-class for layout-driven web design and advanced motion.',
    tier: 'Freemium'
  },
  {
    id: 'spline',
    name: 'Spline',
    url: 'https://spline.design/',
    category: 'Design Tools',
    recommendation: 'The easiest way to integrate 3D experiences into the web. Perfect for premium hero sections and interactive objects.',
    tier: 'Freemium'
  },
  {
    id: 'postman',
    name: 'Postman',
    url: 'https://www.postman.com/',
    category: 'Dev Utilities',
    recommendation: 'Absolute standard for API development and testing. Robust workspace for documentation and team collaboration.',
    tier: 'Freemium'
  },
  {
    id: 'thunder-client',
    name: 'Thunder Client',
    url: 'https://www.thunderclient.com/',
    category: 'Dev Utilities',
    recommendation: 'The lightweight, VS Code native alternative to Postman. Blazingly fast for rapid local API testing.',
    tier: 'Free'
  },
  {
    id: 'responsively',
    name: 'Responsively App',
    url: 'https://responsively.app/',
    category: 'Dev Utilities',
    recommendation: 'Develop 5x faster by previewing all devices side-by-side. Our go-to for pixel-perfect mobile-first testing.',
    tier: 'Free',
    quickCopy: 'brew install --cask responsively'
  },
  {
    id: 'lucide',
    name: 'Lucide Icons',
    url: 'https://lucide.dev/',
    category: 'Icons & Assets',
    recommendation: 'Clean, consistent, and SVG-based. The standard icon library for modern React and Next.js applications.',
    tier: 'Free',
    quickCopy: 'npm install lucide-react'
  },
  {
    id: 'icons8',
    name: 'Icons8',
    url: 'https://icons8.com/',
    category: 'Icons & Assets',
    recommendation: 'Massive library of high-quality illustrations, photos, and specialized icon sets in varied styles.',
    tier: 'Freemium'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    url: 'https://unsplash.com/',
    category: 'Icons & Assets',
    recommendation: 'High-resolution professional photography. The industry standard for placeholder and production assets.',
    tier: 'Free'
  },
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/',
    category: 'Learning Hubs',
    recommendation: 'The source of truth for all web technology documentation. No fluff, just pure architectural knowledge.',
    tier: 'Free'
  },
  {
    id: 'jsinfo',
    name: 'JavaScript.info',
    url: 'https://javascript.info/',
    category: 'Learning Hubs',
    recommendation: 'The most comprehensive technical guide for deep-diving into modern JavaScript core concepts.',
    tier: 'Free'
  },
  {
    id: 'patterns',
    name: 'Patterns.dev',
    url: 'https://www.patterns.dev/',
    category: 'Learning Hubs',
    recommendation: 'Learn modern software design patterns and component architectures for scalable web applications.',
    tier: 'Free'
  }
];

// Deduplicate and Combine
const globalItems = (globalRegistry as any[]).map((item, index) => ({
  ...item,
  id: `global-${index}`,
  // Ensure category is one of the allowed types
  category: item.category as any,
  recommendation: item.recommendation || 'Community-Vetted Resource'
}));

// Filter out premium from global if they coexist by name
const filteredGlobal = globalItems.filter(g => 
  !PREMIUM_TOOLS.some(p => p.name.toLowerCase() === g.name.toLowerCase())
);

export const RESOURCE_REGISTRY: Resource[] = [
  ...PREMIUM_TOOLS,
  ...filteredGlobal
];
