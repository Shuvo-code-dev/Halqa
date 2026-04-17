export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  why: string;
  topics: string[];
  guide: string;
  resource: string;
  related?: {
    label: string;
    link: string;
    id: string;
    type: 'Project' | 'Lab' | 'API';
  };
}

export interface RoadmapData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  completionTitle: string;
  completionText: string;
  stages: RoadmapStage[];
}

export const ROADMAP_REGISTRY: Record<string, RoadmapData> = {
  frontend: {
    id: 'frontend',
    title: 'Frontend <span class="text-gradient">Engineering</span>',
    subtitle: 'The path to building logic-driven, high-fidelity user interfaces.',
    icon: '🗺️',
    completionTitle: 'Frontend Mastered',
    completionText: 'You can now engineer any UI with the precision of a senior developer.',
    stages: [
      {
        id: '01',
        title: 'Modern HTML & CSS',
        description: 'Semantic structure and advanced layout systems (Grid/Flexbox).',
        why: 'Semantic HTML is the DNA of the web, and CSS is its skin. Mastering these ensures your apps are accessible and visually stunning.',
        topics: ['Semantic Tags', 'Flexbox & Grid', 'Responsive Design', 'CSS Variables'],
        guide: 'Build a fully responsive grid-based dashboard using only HTML and CSS. Focus on zero-JS layout shifts.',
        resource: 'https://web.dev/learn/css/',
        related: { label: 'Apple Bento Grid', link: '/codelab', id: 'bento', type: 'Lab' }
      },
      {
        id: '02',
        title: 'Advanced JavaScript',
        description: 'Master closures, async/await, and functional programming patterns.',
        why: 'JavaScript is the logic engine. Mastering it allows you to handle complex data and build interactive features.',
        topics: ['ES6+ Features', 'Promises & Async', 'Functional JS', 'DOM Performance'],
        guide: 'Implement a custom "Liquid Cursor" effect using vanilla JS and requestAnimationFrame.',
        resource: 'https://javascript.info/',
        related: { label: 'Oi QR Scanner', link: '/projects', id: 'oi-qr', type: 'Project' }
      },
      {
        id: '03',
        title: 'React & Ecosystem',
        description: 'Component architecture, State Management, and Next.js foundations.',
        why: 'Frameworks provide the structure needed for large-scale production apps. React is the industry standard.',
        topics: ['React Hooks', 'Context API', 'Next.js Router', 'Component Lifecycle'],
        guide: 'Refactor a legacy jQuery project into a modern React application. Use typed props and hooks.',
        resource: 'https://react.dev/',
        related: { label: 'Language Selection Modal', link: '/codelab', id: 'lang-modal', type: 'Lab' }
      }
    ]
  },
  backend: {
    id: 'backend',
    title: 'Backend <span class="text-gradient">Engineering</span>',
    subtitle: 'Scalable server-side logic and secure architectural foundations.',
    icon: '⚙️',
    completionTitle: 'Backend Mastered',
    completionText: 'You can now architect and deploy industrial-strength server systems.',
    stages: [
      {
        id: '01',
        title: 'Node.js & NPM',
        description: 'The foundation of modern JS backend. Understand the V8 engine.',
        why: 'Node.js allows you to use your JS skills on the server, leveraging a massive ecosystem.',
        topics: ['Event Loop', 'Package Management', 'File System API', 'Streams'],
        guide: 'Build a local script that parses a directory of files and generates a JSON manifest.',
        resource: 'https://nodejs.org/en/learn'
      },
      {
        id: '02',
        title: 'REST API Design',
        description: 'Master communication. Build endpoints with Express.',
        why: 'APIs are the language of the web. Structuring them correctly ensures reliable data fetching.',
        topics: ['Express.js', 'Middleware Pattern', 'HTTP Verbs', 'Error Handling'],
        guide: 'Create an API for a book library. Implement GET, POST, and DELETE routes.',
        resource: 'https://expressjs.com/en/guide/routing.html',
        related: { label: 'API Lab', link: '/apilab', id: 'api-lab', type: 'API' }
      }
    ]
  },
  mobile: {
    id: 'mobile',
    title: 'Mobile <span class="text-gradient">Innovation</span>',
    subtitle: 'The future of software is portable. Master cross-platform development.',
    icon: '📱',
    completionTitle: 'Mobile Mastered',
    completionText: 'You can now build premium cross-platform and native experiences.',
    stages: [
      {
        id: '01',
        title: 'Mobile Fundamentals',
        description: 'Understanding the mobile paradigm. Touch Targets and Sensors.',
        why: 'Mobile development requires a different mindset. Real-estate is limited and touch is primary.',
        topics: ['Mobile Viewports', 'Touch Events', 'Performance Optimization', 'Offline Support'],
        guide: 'Develop a mobile-first UI component that handles both swipe and long-press interactions.',
        resource: 'https://developer.mozilla.org/en-US/docs/Web/API/Touch_events',
        related: { label: 'Oi QR Scanner', link: '/projects', id: 'oi-qr', type: 'Project' }
      },
      {
        id: '02',
        title: 'Cross-Platform Frameworks',
        description: 'Build for both iOS and Android with React Native and Expo.',
        why: 'Write once, run anywhere. Reach 100% of the market with a single codebase.',
        topics: ['React Native Basics', 'Expo Ecosystem', 'Native Modules', 'Styling in RN'],
        guide: 'Set up a basic Expo project. Create a screen with a list of items and "Pull to Refresh".',
        resource: 'https://reactnative.dev/docs/getting-started',
        related: { label: 'Oi Wallet', link: '/projects', id: 'oi-wallet', type: 'Project' }
      }
    ]
  },
  fullstack: {
    id: 'fullstack',
    title: 'Full-Stack <span class="text-gradient">Engineering</span>',
    subtitle: 'The elite MERN + Next.js path mapping interfaces to production schemas.',
    icon: '🚀',
    completionTitle: 'Full-Stack Mastered',
    completionText: 'You can build, deploy, and scale anything on the modern web.',
    stages: [
      {
        id: '01',
        title: 'React & Component Architecture',
        description: 'The foundation of the modern stack. Master UI composition.',
        why: 'React logic drives the user experience. Reusable components are key to scaling.',
        topics: ['Hooks', 'Context API', 'Performance', 'Custom Hooks'],
        guide: 'Deconstruct a professional landing page into a hierarchy of atomic components.',
        resource: 'https://react.dev/learn',
        related: { label: 'Apple Bento Grid', link: '/codelab', id: 'bento', type: 'Lab' }
      },
      {
        id: '02',
        title: 'Node.js & REST Integration',
        description: 'Construct reliable server endpoints mapped to pure HTTP verbs.',
        why: 'Servers bridge UI to DB. REST remains the standard for stateless communication.',
        topics: ['Express Middleware', 'HTTP Codes', 'JSON Modeling', 'CORS'],
        guide: 'Connect your React frontend to a local Express server. Implement search features.',
        resource: 'https://expressjs.com/'
      }
    ]
  },
  apple: {
    id: 'apple',
    title: 'Apple <span class="text-gradient">Ecosystem</span>',
    subtitle: 'Build native, high-performance applications for iOS and macOS.',
    icon: '🍎',
    completionTitle: 'Apple Developer',
    completionText: 'You can now build and ship native Apple software.',
    stages: [
      {
        id: '01',
        title: 'Swift Syntax & Logic',
        description: "Master Apple's powerful, safe programming language.",
        why: "Swift is the native language for the ecosystem. Its strict type-safety prevents billions in errors.",
        topics: ['Optionals', 'Closures', 'Protocol-Oriented Programming', 'Generics'],
        guide: 'Build a small logic engine that handles raw mathematical transformations using protocols.',
        resource: 'https://docs.swift.org/swift-book/'
      },
      {
        id: '02',
        title: 'SwiftUI & App Lifecycle',
        description: 'Build modern, declarative interfaces with minimal code.',
        why: 'SwiftUI is the future. It allows for multi-platform reuse with native performance.',
        topics: ['State & Binding', 'Environment Objects', 'Composing Views', 'Animations'],
        guide: 'Create an app where every UI element reacts to a single @State source of truth.',
        resource: 'https://developer.apple.com/xcode/swiftui/'
      }
    ]
  },
  cs: {
    id: 'cs',
    title: 'Computer <span class="text-gradient">Science</span>',
    subtitle: 'The academic foundation of engineering. From binary logic to architecture.',
    icon: '🧬',
    completionTitle: 'Foundations Solidified',
    completionText: 'You now possess the theoretical depth of a senior engineer.',
    stages: [
      {
        id: '01',
        title: 'Data Structures',
        description: 'Master Arrays, Linked Lists, Stacks, and Queues.',
        why: 'Efficient data storage is the backbone of performance.',
        topics: ['Big O Analysis', 'Memory Management', 'Linear Structures', 'Hash Tables'],
        guide: 'Implement a Linked List from scratch in JS. Create methods for push, pop, find.',
        resource: 'https://visualgo.net/en/list'
      },
      {
        id: '02',
        title: 'Algorithms',
        description: 'The science of solving problems. Master Sorting and Searching.',
        why: 'Algorithms are the tools you use to manipulate data.',
        topics: ['Sorting', 'Binary Search', 'Recursion', 'Dynamic Programming'],
        guide: 'Write a recursive function for Fibonacci, then optimize using memoization.',
        resource: 'https://www.geeksforgeeks.org/'
      }
    ]
  },
  linux: {
    id: 'linux',
    title: 'Linux & <span class="text-gradient">DevOps</span>',
    subtitle: 'Master the engine that powers the web. Terminal mastery to deployment.',
    icon: '⚙️',
    completionTitle: 'System Mastered',
    completionText: 'Your infrastructure is now as robust as your code.',
    stages: [
      {
        id: '01',
        title: 'Terminal Mastery & Bash',
        description: 'Master the command line—the ultimate interface for automation.',
        why: 'The GUI is for users; the terminal is for engineers.',
        topics: ['Filesystem Navigation', 'Permissions', 'Bash Scripting', 'Pipe/Redirection'],
        guide: 'Write a Bash script that automates the creation of a new project directory structure.',
        resource: 'https://linuxjourney.com/'
      },
      {
        id: '02',
        title: 'Docker & Containerization',
        description: 'Ensure your code runs exactly the same everywhere.',
        why: '"It works on my machine" is solved by containers.',
        topics: ['Dockerfile', 'Docker Compose', 'Image Layering', 'Orchestration'],
        guide: 'Create a Dockerfile for a simple Node project. Use compose to run with a DB.',
        resource: 'https://docs.docker.com/get-started/'
      }
    ]
  }
};
