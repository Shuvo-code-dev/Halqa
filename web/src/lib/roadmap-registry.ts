export interface RoadmapResource {
  name: string;
  url: string;
}

export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  why: string;
  topics: string[];
  guide: string;
  resources: RoadmapResource[];
  codelabId?: string;
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
    subtitle: 'Master the art of building high-performance, logic-driven user interfaces.',
    icon: '🗺️',
    completionTitle: 'Frontend Mastered',
    completionText: 'You have mastered the modern frontend stack. Go build something legendary.',
    stages: [
      {
        id: '01',
        title: 'Modern HTML & Semantic Web',
        description: 'The DNA of the web. Master accessibility and structural SEO.',
        why: 'Semantic HTML ensures your code is readable by both browsers and assistive technologies, forming the bedrock of SEO.',
        topics: ['Semantic Elements', 'ARIA Roles', 'Meta Tags & OpenGraph', 'Form Validation'],
        guide: 'Construct a multi-page documentation site using 100% semantic tags. No generic divs allowed.',
        resources: [
          { name: 'MDN - HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics' },
          { name: 'FreeCodeCamp - Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
          { name: 'Fireship - HTML in 100 Seconds', url: 'https://www.youtube.com/watch?v=ok-plXXHlWw' }
        ]
      },
      {
        id: '02',
        title: 'CSS Architecture & Design Systems',
        description: 'Beyond basic styling. Master Flexbox, Grid, and Design Tokens.',
        why: 'Scalable CSS is the difference between a project that grows and one that collapses under its own weight.',
        topics: ['Flexbox & Grid Mastery', 'CSS Variables', 'BEM Methodology', 'Animations & Transitions'],
        guide: 'Build a high-fidelity Apple-style landing page using CSS Grid and Scroll-driven animations.',
        resources: [
          { name: 'MDN - CSS Layout', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout' },
          { name: 'Fireship - CSS in 100 Seconds', url: 'https://www.youtube.com/watch?v=OEV8gMkCHXQ' },
          { name: 'FreeCodeCamp - CSS Variables Guide', url: 'https://www.freecodecamp.org/news/css-variables-tutorial-how-to-use-custom-properties-for-better-styles/' }
        ],
        codelabId: 'aurora-bg'
      },
      {
        id: '03',
        title: 'Core JavaScript & Logic',
        description: 'closures, scope, and asynchronous execution patterns.',
        why: 'JavaScript is the heartbeat of every modern application. Understanding the Event Loop is non-negotiable.',
        topics: ['Event Loop', 'Closures & Scope', 'Promises & Async/Await', 'Functional Programming'],
        guide: 'Implement a custom "Liquid Cursor" effect using vanilla JS and requestAnimationFrame math.',
        resources: [
          { name: 'MDN - JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
          { name: 'Fireship - JS in 100 Seconds', url: 'https://www.youtube.com/watch?v=DHjqpvDnNGE' },
          { name: 'JS-Info - The Modern Tutorial', url: 'https://javascript.info/' }
        ],
        codelabId: 'ballpit'
      },
      {
        id: '04',
        title: 'React & Framework Mastery',
        description: 'Construct complex UIs using components, hooks, and efficient state tree.',
        why: 'Declarative UI modeling allows for predictable state management and rapid scaling.',
        topics: ['React Hooks Pattern', 'Context API vs Redux', 'Server Components', 'Performance Tuning'],
        guide: 'Build a real-time collaborative dashboard using Next.js and shared state hooks.',
        resources: [
          { name: 'React.dev Official Docs', url: 'https://react.dev/learn' },
          { name: 'Fireship - Next.js in 100 Seconds', url: 'https://www.youtube.com/watch?v=Sklc_fQBmcs' },
          { name: 'FreeCodeCamp - React Full Course', url: 'https://www.freecodecamp.org/news/free-react-course-2022/' }
        ],
        codelabId: 'blur-text'
      }
    ]
  },
  backend: {
    id: 'backend',
    title: 'Backend <span class="text-gradient">Engineering</span>',
    subtitle: 'Construct scalable server-side logic and elite architectural foundations.',
    icon: '⚙️',
    completionTitle: 'Backend Mastered',
    completionText: 'You can now architect and deploy industrial-strength server systems.',
    stages: [
      {
        id: '01',
        title: 'Node.js & Execution Context',
        description: 'Understand the V8 engine and the power of non-blocking I/O.',
        why: 'The Event Loop allows Node.js to handle thousands of concurrent connections efficiently on a single thread.',
        topics: ['Event Loop', 'Buffer & Streams', 'CommonJS vs ESM', 'Worker Threads'],
        guide: 'Build a local file-processing CLI that handles gigabyte-sized CSVs using streams.',
        resources: [
          { name: 'Node.js Docs - Introduction', url: 'https://nodejs.org/en/about' },
          { name: 'Fireship - Node.js in 100 Seconds', url: 'https://www.youtube.com/watch?v=jo_B4LTHi3I' },
          { name: 'FreeCodeCamp - Backend Certification', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/' }
        ]
      },
      {
        id: '02',
        title: 'API Design & Communication',
        description: 'Master REST, GraphQL, and high-performance communication protocols.',
        why: 'Standardized communication ensures your frontend and backend talk effectively and securely.',
        topics: ['RESTful Best Practices', 'GraphQL Schemas', 'WebSockets', 'Rate Limiting'],
        guide: 'Design and document a production-grade API for a multi-tenant SaaS application.',
        resources: [
          { name: 'MDN - HTTP Verbs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods' },
          { name: 'Fireship - GraphQL in 100 Seconds', url: 'https://www.youtube.com/watch?v=ed8SzLMEADs' },
          { name: 'FreeCodeCamp - API Guide', url: 'https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/' }
        ]
      },
      {
        id: '03',
        title: 'Database Architecture',
        description: 'Master SQL, NoSQL, and efficient data modeling strategies.',
        why: 'Your application is only as fast as its slowest query. Indexing and normalization are vital.',
        topics: ['PostgreSQL & Normalization', 'MongoDB & Sharding', 'Redis Caching', 'Prisma ORM'],
        guide: 'Schema-design a complex e-commerce database handling multiple vendors and real-time inventory.',
        resources: [
          { name: 'Fireship - SQL vs NoSQL', url: 'https://www.youtube.com/watch?v=ZS_kXvOeQ5Y' },
          { name: 'FreeCodeCamp - SQL for Beginners', url: 'https://www.freecodecamp.org/news/sql-and-databases-full-course/' },
          { name: 'MDN - Database Introduction', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction#databases' }
        ]
      }
    ]
  },
  mobile: {
    id: 'mobile',
    title: 'Mobile <span class="text-gradient">Innovation</span>',
    subtitle: 'The future is portable. Master cross-platform and native paradigms.',
    icon: '📱',
    completionTitle: 'Mobile Mastered',
    completionText: 'You can now build and ship premium mobile software across all ecosystems.',
    stages: [
      {
        id: '01',
        title: 'Mobile-First Paradigms',
        description: 'Visual ergonomics, touch targets, and offline-first logic.',
        why: 'Mobile device constraints force efficient design and high-performance network handling.',
        topics: ['Touch Targets', 'Haptic Feedback', 'Offline Persistence', 'Sensor API'],
        guide: 'Refactor a web dashboard into a mobile-native navigation flow with gesture support.',
        resources: [
          { name: 'Apple - HIG Design', url: 'https://developer.apple.com/design/human-interface-guidelines/' },
          { name: 'Fireship - Mobile App Dev', url: 'https://www.youtube.com/watch?v=0-S5a0eWli4' },
          { name: 'MDN - Mobile Web Best Practices', url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile' }
        ],
        codelabId: 'halqa-qr'
      },
      {
        id: '02',
        title: 'React Native & Expo',
        description: 'Build native iOS and Android apps using a single logic tree.',
        why: 'React Native maps React components to real native primitives, achieving 100% platform reach.',
        topics: ['Native Bridges', 'Expo Router', 'Animation (Reanimated)', 'Native Modules'],
        guide: 'Construct a native QR-based wallet app that integrates with biometric security.',
        resources: [
          { name: 'React Native - Official Docs', url: 'https://reactnative.dev/docs/getting-started' },
          { name: 'Fireship - React Native in 100 Seconds', url: 'https://www.youtube.com/watch?v=gvkqO98S0Bs' },
          { name: 'FreeCodeCamp - RN Course', url: 'https://www.freecodecamp.org/news/react-native-full-course/' }
        ]
      }
    ]
  },
  cs: {
    id: 'cs',
    title: 'Computer <span class="text-gradient">Science</span>',
    subtitle: 'The academic bedrock of software engineering. Logic, data, and complexity.',
    icon: '🧬',
    completionTitle: 'Foundations Solidified',
    completionText: 'You now possess the theoretical depth of a senior systems architect.',
    stages: [
      {
        id: '01',
        title: 'Algorithms & Complexity',
        description: 'Master Big O analysis and the science of optimal problem solving.',
        why: 'Algorithms are the tools you use to manipulate data with predictable performance markers.',
        topics: ['Big O Notation', 'Sorting & Searching', 'Recursion', 'Dynamic Programming'],
        guide: 'Fulfill the classic "N-Queens" problem using a recursive backtracking strategy.',
        resources: [
          { name: 'Fireship - Algorithms in 100 Seconds', url: 'https://www.youtube.com/watch?v=0IAPZzGSbME' },
          { name: 'FreeCodeCamp - Data Structures Course', url: 'https://www.freecodecamp.org/news/data-structures-and-algorithms-in-python-full-course/' },
          { name: 'VisuAlgo - Visual Learning', url: 'https://visualgo.net/en' }
        ]
      },
      {
        id: '02',
        title: 'Data Structures',
        description: 'Linked Lists, Hash Tables, and Trees. The containers of logic.',
        why: 'Choosing the right structure is the difference between an O(1) and an O(n) operation.',
        topics: ['Linked Lists', 'Binary Search Trees', 'Hash Tables', 'Graphs & Traversal'],
        guide: 'Implement a custom Graph structure in JS and traverse it using Breadth-First Search.',
        resources: [
          { name: 'FreeCodeCamp - CS Fundamentals', url: 'https://www.freecodecamp.org/news/computer-science-curriculum-computer-science-courses-free/' },
          { name: 'MDN - Data Structures in JS', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures' },
          { name: 'Harvard CS50 - Data Structures', url: 'https://www.youtube.com/watch?v=5_JmXCNX69w' }
        ]
      }
    ]
  },
  fullstack: {
    id: 'fullstack',
    title: 'Full-Stack <span class="text-gradient">Systems</span>',
    subtitle: 'Bridge the gap between client and server with cohesive, end-to-end architectures.',
    icon: '⚡',
    completionTitle: 'Architect Status Achieved',
    completionText: 'You can now design, build, and deploy entire digital ecosystems solo.',
    stages: [
      {
        id: '01',
        title: 'Monolithic vs Microservices',
        description: 'Understand the pros and cons of different architectural patterns.',
        why: 'Choosing the right architecture is the first step in building a scalable product.',
        topics: ['Docker & Containers', 'CI/CD Pipelines', 'System Design Basics'],
        guide: 'Containerize a Node/React application and deploy it to a private cloud instance.',
        resources: [
          { name: 'Docker Core Docs', url: 'https://docs.docker.com/get-started/' },
          { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }
        ]
      },
      {
        id: '02',
        title: 'Authentication & Security',
        description: 'Master JWT, OAuth2, and secure session management.',
        why: 'Security is paramount. A single vulnerability can compromise your entire ecosystem.',
        topics: ['JWT Patterns', 'OAuth2 Flow', 'PBKDF2 Hashing', 'CORS & CSP'],
        guide: 'Implement a zero-trust authentication layer for an AI-integrated dashboard.',
        resources: [
          { name: 'Auth0 Blog - JWT Guide', url: 'https://auth0.com/blog/beginner-s-guide-to-jwt/' },
          { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }
        ]
      }
    ]
  }
};
