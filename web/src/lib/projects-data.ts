export interface ProjectBlueprint {
  id: string;
  title: string;
  tag: string;
  githubLink: string;
  roadmap: { name: string; link: string; icon: string };
  code: { name: string; link: string; icon: string };
  api: { name: string; link: string; icon: string };
  progress?: number;
  steps: string[];
}

export const BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: "oi-qr",
    title: "Oi QR Scanner",
    tag: "High-Performance Utility",
    githubLink: "https://github.com/Shuvo-code-dev/Oi-QR-Scanner",
    roadmap: { name: "Frontend Stage 02", link: "/roadmaps/frontend", icon: "🗺️" },
    code: { name: "Click Spark Particles", link: "/codelab", icon: "🧪" },
    api: { name: "QR Generator Engine", link: "/apilab", icon: "🔌" },
    steps: [
      "Implement a robust camera view using the Expo Camera or Browser MediaDevices API.",
      "Integrate the Zxing or similar high-speed QR decoding library.",
      "Style the scanner overlay with Halqa custom-themed neon borders and scan-line animations."
    ]
  },
  {
    id: "ai-chat",
    title: "Halqa Brain Interface",
    tag: "Next.js + AI",
    githubLink: "https://github.com/Shuvo-code-dev/Halqa",
    roadmap: { name: "Full-Stack Stage 01", link: "/roadmaps/fullstack", icon: "🗺️" },
    code: { name: "Glassmorphism UI", link: "/codelab", icon: "🧪" },
    api: { name: "Google Gemini API", link: "/apilab", icon: "🔌" },
    steps: [
      "Securely init a Next.js App Router API route fetching directly from the Gemini Endpoint.",
      "Bind user interactive queries dynamically to the Halqa Glowing Input UI components.",
      "Implement the 'Brain' system prompt for specialized ecosystem knowledge."
    ]
  },
  {
    id: "oi-wallet",
    title: "Oi Wallet",
    tag: "Crypto & Blockchain",
    githubLink: "#",
    roadmap: { name: "Full-Stack Stage 03", link: "/roadmaps/fullstack", icon: "🗺️" },
    code: { name: "Shiny Text Effect", link: "/codelab", icon: "🧪" },
    api: { name: "CoinGecko Market Feed", link: "/apilab", icon: "🔌" },
    progress: 35,
    steps: [
      "Establish a secure Ethers.js provider connection to the Ethereum/Polygon networks.",
      "Fetch live gas prices and market trends using the CoinGecko public API.",
      "Render a premium, high-contrast wallet dashboard with Halqa visual effects."
    ]
  },
  {
    id: "halqa-mobile",
    title: "Halqa Mobile",
    tag: "Expo Native",
    githubLink: "#",
    roadmap: { name: "Mobile Stage 01", link: "/roadmaps/mobile", icon: "🗺️" },
    code: { name: "Apple Bento Grid", link: "/codelab", icon: "🧪" },
    api: { name: "IP Geolocation API", link: "/apilab", icon: "🔌" },
    progress: 60,
    steps: [
      "Convert the Halqa web navigation system into a React Navigation native stack.",
      "Optimize the high-end GSAP animations for mobile performance using useNativeDriver.",
      "Implement offline persistence using SQLite or AsyncStorage for roadmap progress."
    ]
  }
];
