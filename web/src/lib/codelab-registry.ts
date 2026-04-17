import React from 'react';

export type ComponentCategory = 'All' | 'Text' | 'Animations' | 'Backgrounds' | 'UI';

export interface ComponentMetadata {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  hasAnimation: boolean;
  tsxCode: string;
  cssCode: string;
  componentName: string; 
}

export const CODELAB_REGISTRY: ComponentMetadata[] = [
  // --- BATCH 3: ECOSYSTEM EXPANSION ---
  {
    id: 'halqa-qr',
    name: 'Halqa QR Generator',
    category: 'UI',
    description: 'Functional, high-fidelity QR generator with custom accent mapping and mobile conversion CTA.',
    hasAnimation: false,
    componentName: 'HalqaQr',
    tsxCode: `/* qrcode.react implementation */`,
    cssCode: `/* Glassmorphism containers */`
  },
  // --- BATCH 2: PHYSICS & VISUAL FX ---
  {
    id: 'ballpit',
    name: 'Physics Ballpit',
    category: 'Animations',
    description: 'High-performance interactive physics playground using elastic circle collision.',
    hasAnimation: true,
    componentName: 'Ballpit',
    tsxCode: `/* Canvas physics implementation */`,
    cssCode: `/* Uses inline canvas styling */`
  },
  {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    category: 'Backgrounds',
    description: 'Elite metallic shader effect using Three.js and custom GLSL noise displacement.',
    hasAnimation: true,
    componentName: 'LiquidChrome',
    tsxCode: `/* Three.js Shader logic */`,
    cssCode: `/* Uses inline container styling */`
  },
  {
    id: 'click-spark',
    name: 'Click Spark',
    category: 'Animations',
    description: 'Vibrant particle emitter responding to user interaction.',
    hasAnimation: true,
    componentName: 'ClickSpark',
    tsxCode: `/* Particle class and emitter */`,
    cssCode: `/* Canvas-based */`
  },
  {
    id: 'glitch-text',
    name: 'Glitch Text',
    category: 'Text',
    description: 'High-speed character scrambling effect using randomized iteration.',
    hasAnimation: true,
    componentName: 'GlitchText',
    tsxCode: `/* Scrambling iteration logic */`,
    cssCode: `/* CSS defined in component */`
  },
  // --- BATCH 1: FOUNDATION ---
  {
    id: 'blur-text',
    name: 'Blur Text',
    category: 'Text',
    description: 'A staggered, smooth Gaussian blur reveal effect.',
    hasAnimation: true,
    componentName: 'BlurText',
    tsxCode: `/* Framer Motion stagger reveal */`,
    cssCode: `/* Inline styles */`
  },
  {
    id: 'shiny-text',
    name: 'Shiny Text',
    category: 'Text',
    description: 'A liquid metallic shimmer effect.',
    hasAnimation: true,
    componentName: 'ShinyText',
    tsxCode: `/* CSS gradient animation */`,
    cssCode: `.shiny { animation: shine 3s infinite; }`
  },
  {
    id: 'aurora-bg',
    name: 'Aurora Background',
    category: 'Backgrounds',
    description: 'Northern lights simulation.',
    hasAnimation: true,
    componentName: 'AuroraBg',
    tsxCode: `/* Radial gradient move */`,
    cssCode: `.aurora { filter: blur(80px); }`
  },
  {
    id: 'magnet-btn',
    name: 'Magnet Button',
    category: 'Animations',
    description: 'Organically pulls toward the cursor.',
    hasAnimation: false,
    componentName: 'MagnetButton',
    tsxCode: `/* Proximity tracking */`,
    cssCode: `/* Spring transition */`
  },
  {
    id: 'apple-bento',
    name: 'Adaptive Bento',
    category: 'UI',
    description: 'Sophisticated asymmetrical feature grid.',
    hasAnimation: false,
    componentName: 'AdaptiveBento',
    tsxCode: `/* CSS Grid layout */`,
    cssCode: `.grid { display: grid; }`
  }
];
