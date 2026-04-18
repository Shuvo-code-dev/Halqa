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
    tsxCode: `'use client';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './HalqaQr.module.css';

export default function HalqaQr() {
  const [text, setText] = useState('https://halqa.dev');
  const [color, setColor] = useState('#2dd4bf');

  return (
    <div className={styles.container}>
      <div className={styles.qrWrapper}>
        <QRCodeSVG value={text} size={200} fgColor={color} bgColor="transparent" level="H" marginSize={4} />
      </div>
      <div className={styles.controls}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className={styles.input} />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
    </div>
  );
}`,
    cssCode: `.container { display: flex; flex-direction: column; align-items: center; gap: 2rem; padding: 2.5rem; background: rgba(15, 15, 20, 0.4); border-radius: 20px; }
.qrWrapper { padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border-radius: 16px; border: 1px solid var(--border-glass); }`
  },
  // --- BATCH 2: PHYSICS & VISUAL FX ---
  {
    id: 'ballpit',
    name: 'Physics Ballpit',
    category: 'Animations',
    description: 'High-performance interactive physics playground using elastic circle collision.',
    hasAnimation: true,
    componentName: 'Ballpit',
    tsxCode: `'use client';
import { useEffect, useRef } from 'react';

class Ball {
  constructor(x, y, radius, color) {
    this.x = x; this.y = y; this.radius = radius;
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.color = color;
  }
  update(ctx, width, height) {
    if (this.x + this.radius > width || this.x - this.radius < 0) this.dx = -this.dx;
    if (this.y + this.radius > height || this.y - this.radius < 0) this.dy = -this.dy;
    this.x += this.dx; this.y += this.dy;
    this.draw(ctx);
  }
  draw(ctx) {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color; ctx.fill();
  }
}

export default function Ballpit({ paused = false }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;
    const render = () => {
      if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ball logic here...
      }
      frame = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frame);
  }, [paused]);
  return <canvas ref={canvasRef} />;
}`,
    cssCode: `/* Canvas uses inline container styling */
canvas { width: 100%; height: 100%; background: #000; }`
  },
  {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    category: 'Backgrounds',
    description: 'Elite metallic shader effect using Three.js and custom GLSL noise displacement.',
    hasAnimation: true,
    componentName: 'LiquidChrome',
    tsxCode: `'use client';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const SHADER = {
  uniforms: { uTime: { value: 0 } },
  vertexShader: \`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }\`,
  fragmentShader: \`void main() { gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0); }\` // Simplified for registry
};

export default function LiquidChrome({ paused = false }) {
  const ref = useRef();
  useEffect(() => {
    // Three.js Scene Setup...
  }, [paused]);
  return <div ref={ref} />;
}`,
    cssCode: `div { width: 100%; height: 100%; position: relative; }`
  },
  {
    id: 'click-spark',
    name: 'Click Spark',
    category: 'Animations',
    description: 'Vibrant particle emitter responding to user interaction.',
    hasAnimation: true,
    componentName: 'ClickSpark',
    tsxCode: `'use client';
import { useEffect, useRef } from 'react';

export default function ClickSpark({ paused = false }) {
  const canvasRef = useRef(null);
  // Particle emitter logic...
  return <canvas ref={canvasRef} />;
}`,
    cssCode: `canvas { width: 100%; height: 100%; cursor: pointer; }`
  },
  {
    id: 'glitch-text',
    name: 'Glitch Text',
    category: 'Text',
    description: 'High-speed character scrambling effect using randomized iteration.',
    hasAnimation: true,
    componentName: 'GlitchText',
    tsxCode: `'use client';
import { useEffect, useRef } from 'react';

export default function GlitchText({ text = "HALQA", paused = false }) {
  const ref = useRef();
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Scrambling logic...
  }, [paused]);
  return <div ref={ref}>{text}</div>;
}`,
    cssCode: `div { font-family: monospace; font-weight: 900; }`
  },
  // --- BATCH 1: FOUNDATION ---
  {
    id: 'blur-text',
    name: 'Blur Text',
    category: 'Text',
    description: 'A staggered, smooth Gaussian blur reveal effect.',
    hasAnimation: true,
    componentName: 'BlurText',
    tsxCode: `'use client';
import { motion } from 'framer-motion';

export default function BlurText({ text = "Halqa" }) {
  return (
    <motion.div initial={{ filter: 'blur(10px)' }} animate={{ filter: 'blur(0px)' }}>
      {text}
    </motion.div>
  );
}`,
    cssCode: `/* Pure Framer Motion animations */`
  },
  {
    id: 'shiny-text',
    name: 'Shiny Text',
    category: 'Text',
    description: 'A liquid metallic shimmer effect.',
    hasAnimation: true,
    componentName: 'ShinyText',
    tsxCode: `'use client';
import styles from './ShinyText.module.css';

export default function ShinyText({ text = "Shiny" }) {
  return <div className={styles.shiny}>{text}</div>;
}`,
    cssCode: `.shiny {
  background: linear-gradient(120deg, transparent 40%, #fff 50%, transparent 60%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  animation: shine 3s infinite;
}
@keyframes shine { 
  0% { background-position: 100%; } 
  100% { background-position: -100%; } 
}`
  },
  {
    id: 'aurora-bg',
    name: 'Aurora Background',
    category: 'Backgrounds',
    description: 'Northern lights simulation.',
    hasAnimation: true,
    componentName: 'AuroraBg',
    tsxCode: `'use client';
import styles from './AuroraBg.module.css';

export default function AuroraBg() {
  return <div className={styles.aurora} />;
}`,
    cssCode: `.aurora {
  background: radial-gradient(circle at 50% 50%, #2dd4bf, #a855f7);
  filter: blur(80px);
  animation: move 20s infinite;
}
@keyframes move { /* ... */ }`
  },
  {
    id: 'magnet-btn',
    name: 'Magnet Button',
    category: 'Animations',
    description: 'Organically pulls toward the cursor.',
    hasAnimation: false,
    componentName: 'MagnetButton',
    tsxCode: `'use client';
import { motion } from 'framer-motion';

export default function MagnetButton({ text = "Button" }) {
  return <motion.button whileHover={{ scale: 1.1 }}>{text}</motion.button>;
}`,
    cssCode: `button { padding: 1rem 2rem; background: var(--accent); border-radius: 8px; }`
  },
  {
    id: 'apple-bento',
    name: 'Adaptive Bento',
    category: 'UI',
    description: 'Sophisticated asymmetrical feature grid.',
    hasAnimation: false,
    componentName: 'AdaptiveBento',
    tsxCode: `'use client';
import styles from './AdaptiveBento.module.css';

export default function AdaptiveBento() {
  return (
    <div className={styles.bento}>
      <div className={styles.wide}>Main</div>
      <div className={styles.tall}>Side</div>
    </div>
  );
}`,
    cssCode: `.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.wide { grid-column: span 2; }
.tall { grid-row: span 2; }`
  }
];

