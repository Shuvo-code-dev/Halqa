export interface LogicStep {
  title: string;
  description: string;
}

export interface ProjectTrinity {
  roadmap: { name: string; link: string; icon: string };
  code: { name: string; link: string; icon: string };
  api: { name: string; link: string; icon: string };
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  techStack: string[];
  githubUrl: string;
  forkUrl?: string;
  isComingSoon?: boolean;
  trinity: ProjectTrinity;
  logicSteps: LogicStep[];
}

export const PROJECT_REGISTRY: Record<string, ProjectData> = {
  'oi-qr': {
    id: 'oi-qr',
    title: 'Oi QR Scanner',
    description: 'High-performance, minimal QR scanning engine with custom visual overlays.',
    difficulty: 'Mid',
    techStack: ['React Native', 'Expo Camera', 'Zxing', 'GSAP'],
    githubUrl: 'https://github.com/Shuvo-code-dev/Oi-QR-Scanner',
    forkUrl: 'https://github.com/Shuvo-code-dev/Oi-QR-Scanner/fork',
    trinity: {
      roadmap: { name: 'Frontend Stage 02', link: '/roadmaps/frontend', icon: '🗺️' },
      code: { name: 'Click Spark Particles', link: '/codelab', icon: '🧪' },
      api: { name: 'QR Generator Engine', link: '/apilab', icon: '🔌' }
    },
    logicSteps: [
      {
        title: 'Camera Engine Integration',
        description: 'Initialize the hardware-accelerated camera layer using Expo Camera with optimal resolution scaling.'
      },
      {
        title: 'High-Speed Decoding',
        description: 'Implement a continuous frame-buffer scanning loop using Zxing for instant QR data extraction.'
      },
      {
        title: 'Halqa Visual Overlay',
        description: 'Design the scanning-line and border-glow animations using high-performance CSS and GSAP for 60fps movement.'
      },
      {
        title: 'Data Handling Logic',
        description: 'Haptic feedback on success and intelligent URL/Action parsing for the scanned payload.'
      }
    ]
  },
  'ai-chat': {
    id: 'ai-chat',
    title: 'Halqa Brain Interface',
    description: 'Specialized LLM interface powered by Google Gemini for ecosystem knowledge.',
    difficulty: 'Senior',
    techStack: ['Next.js 15', 'Gemini API', 'Vercel AI SDK', 'Tailwind'],
    githubUrl: 'https://github.com/Shuvo-code-dev/Halqa',
    trinity: {
      roadmap: { name: 'Full-Stack Stage 01', link: '/roadmaps/fullstack', icon: '🗺️' },
      code: { name: 'Glassmorphism UI', link: '/codelab', icon: '🧪' },
      api: { name: 'Google Gemini API', link: '/apilab', icon: '🔌' }
    },
    logicSteps: [
      {
        title: 'Secure API Orchestration',
        description: 'Establish server-side routes to communicate with Gemini Pro while protecting API keys and enforcing rate limits.'
      },
      {
        title: 'Contextual Brain Prompting',
        description: 'Implement "Brain" system instructions to specialize the AI response for Halqa ecosystem queries.'
      },
      {
        title: 'Streaming UI Rendering',
        description: 'Leverage Vercel AI SDK for real-time text streaming and premium "Shadow Typing" animations.'
      }
    ]
  },
  'oi-wallet': {
    id: 'oi-wallet',
    title: 'Oi Wallet',
    description: 'Next-gen crypto wallet focusing on visual clarity and transaction safety.',
    difficulty: 'Senior',
    techStack: ['Ethers.js', 'React Native', 'Wagmi', 'Lottie'],
    githubUrl: 'https://github.com/Shuvo-code-dev/Oi-Wallet',
    isComingSoon: true,
    trinity: {
      roadmap: { name: 'Full-Stack Stage 03', link: '/roadmaps/fullstack', icon: '🗺️' },
      code: { name: 'Shiny Text Effect', link: '/codelab', icon: '🧪' },
      api: { name: 'CoinGecko Market Feed', link: '/apilab', icon: '🔌' }
    },
    logicSteps: [
      {
        title: 'Secure Provider Connection',
        description: 'Connect to RPC nodes on Ethereum and Polygon with fallback mechanisms and state persistence.'
      },
      {
        title: 'Live Market Analytics',
        description: 'Integrate real-time gas prices and token trends via CoinGecko and optimized WebSocket feeds.'
      },
      {
        title: 'Visual Asset Management',
        description: 'Render NFT collections and token balances with premium "Halqa Glow" card variants.'
      }
    ]
  },
  'halqa-mobile': {
    id: 'halqa-mobile',
    title: 'Halqa Mobile',
    description: 'The portable ecosystem. Entire Halqa platform in your pocket.',
    difficulty: 'Senior',
    techStack: ['Expo', 'Native Stack', 'Reanimated', 'SQLite'],
    githubUrl: 'https://github.com/Shuvo-code-dev/Halqa-Mobile',
    isComingSoon: true,
    trinity: {
      roadmap: { name: 'Mobile Stage 01', link: '/roadmaps/mobile', icon: '🗺️' },
      code: { name: 'Apple Bento Grid', link: '/codelab', icon: '🧪' },
      api: { name: 'IP Geolocation API', link: '/apilab', icon: '🔌' }
    },
    logicSteps: [
      {
        title: 'Architecture Porting',
        description: 'Migrating the web logic-tree to React-Navigation while maintaining shared context states.'
      },
      {
        title: 'Native Animation Optimization',
        description: 'Refactoring GSAP animations into Reanimated 3 for native thread-level performance (60fps).'
      },
      {
        title: 'Offline Persistence',
        description: 'Implementing SQLite syncing for roadmap progress so users can learn without connectivity.'
      }
    ]
  }
};
