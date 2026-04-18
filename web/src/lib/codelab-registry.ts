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
  why?: string;
  topics?: string;
  guide?: string;
}


export const CODELAB_REGISTRY: ComponentMetadata[] = [
  {
    id: "halqa-qr",
    name: "Halqa QR Generator",
    category: "UI",
    description: "Functional, high-fidelity QR generator with custom accent mapping and mobile conversion CTA.",
    hasAnimation: false,
    componentName: "HalqaQr",
    why: "QR codes are essential for bridging the gap between physical and digital experiences in modern apps.",
    topics: "SVG Generation, State Management, Branding",
    guide: "Input your URL and select a brand-matching color. The generated SVG is export-ready.",
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
        <QRCodeSVG 
          value={text} 
          size={200}
          fgColor={color}
          bgColor="transparent"
          level="H"
          marginSize={4}
        />
      </div>
      
      <div className={styles.controls}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
          placeholder="Enter URL or Text"
        />
        <div className={styles.colorRow}>
            <span className={styles.label}>Accent Color</span>
            <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className={styles.colorPicker}
            />
        </div>
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaText}>Need a premium mobile scanner?</p>
        <a 
            href="https://github.com/Shuvo-code-dev/Oi-QR-Scanner" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaLink}
        >
          Get Oi QR Scanner on GitHub &rarr;
        </a>
      </div>
    </div>
  );
}`.replace(/\r/g, ''),
    cssCode: `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem;
  background: rgba(15, 15, 20, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.qrWrapper {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glass);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.08);
}

.colorRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.label {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.colorPicker {
    background: none;
    border: 1px solid var(--border-glass);
    width: 60px;
    height: 30px;
    padding: 0;
    cursor: pointer;
    border-radius: 4px;
}

.cta {
    margin-top: 1rem;
    padding-top: 2rem;
    width: 100%;
    border-top: 1px solid var(--border-glass);
    text-align: center;
}

.ctaText {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.ctaLink {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--accent);
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-block;
}

.ctaLink:hover {
    color: var(--text-primary);
    transform: translateY(-2px);
}`.replace(/\r/g, '')
  },
  {
    id: "ballpit",
    name: "Physics Ballpit",
    category: "Animations",
    description: "High-performance interactive physics playground using elastic circle collision.",
    hasAnimation: true,
    componentName: "Ballpit",
    why: "Understanding gravity and collision logic is fundamental for game development and advanced UI interactions.",
    topics: "Elastic Collisions, Velocity & Friction, Canvas Optimization",
    guide: "Interact with the balls using your mouse to observe force distribution and friction decay.",
    tsxCode: `'use client';


import { useEffect, useRef } from 'react';

class Ball {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(ctx: CanvasRenderingContext2D, width: number, height: number, balls: Ball[], mouse: { x: number, y: number }) {
    if (this.x + this.radius > width || this.x - this.radius < 0) this.dx = -this.dx;
    if (this.y + this.radius > height || this.y - this.radius < 0) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    const dist = Math.sqrt((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2);
    if (dist < 100) {
      const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
      const force = (100 - dist) / 100;
      this.dx += Math.cos(angle) * force * 1.5;
      this.dy += Math.sin(angle) * force * 1.5;
    }

    this.dx *= 0.99;
    this.dy *= 0.99;

    this.draw(ctx);
  }
}

export default function Ballpit({ paused = false }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const balls: Ball[] = [];
    const colors = ['#2dd4bf', '#a855f7', '#3b82f6', '#f43f5e'];

    for (let i = 0; i < 40; i++) {
      const radius = Math.random() * 10 + 5;
      const x = Math.random() * (width - radius * 2) + radius;
      const y = Math.random() * (height - radius * 2) + radius;
      balls.push(new Ball(x, y, radius, colors[Math.floor(Math.random() * colors.length)]));
    }

    const render = () => {
      if (!paused) {
        ctx.clearRect(0, 0, width, height);
        balls.forEach(ball => ball.update(ctx, width, height, balls, mouse.current));
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [paused]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: '100%', height: '100%', cursor: 'none' }} 
    />
  );
}`.replace(/\r/g, ''),
    cssCode: `canvas {
  width: 100%;
  height: 100%;
  background: #000;
}`.replace(/\r/g, '')
  },
  {
    id: "liquid-chrome",
    name: "Liquid Chrome",
    category: "Backgrounds",
    description: "Elite metallic shader effect using Three.js and custom GLSL noise displacement.",
    hasAnimation: true,
    componentName: "LiquidChrome",
    why: "Advanced shaders elevate the aesthetic quality of a site, providing a premium, high-end feel.",
    topics: "GLSL Shaders, Noise Functions, Vertex/Fragment Logic",
    guide: "Use this as a background for hero sections. It scales perfectly to any resolution via WebGL.",
    tsxCode: `'use client';


import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FRAGMENT_SHADER = \`
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.2;
    for(int i = 1; i < 6; i++) {
        p.x += 0.4 / float(i) * sin(float(i) * 3.0 * p.y + t);
        p.y += 0.4 / float(i) * sin(float(i) * 3.0 * p.x + t);
    }

    vec3 col = 0.5 + 0.5 * cos(uTime + p.xyx + vec3(0, 2, 4));
    col *= 0.5 + 0.5 * sin(p.x + p.y);
    
    float brightness = 0.8 + 0.2 * sin(p.x * 10.0 + uTime);
    col = mix(vec3(0.1, 0.1, 0.15), vec3(brightness), col.r);

    gl_FragColor = vec4(col, 1.0);
  }
\`;

const VERTEX_SHADER = \`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

export default function LiquidChrome({ paused = false }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 1;

    let animationFrameId: number;
    const animate = (time: number) => {
      if (!paused) {
        uniforms.uTime.value = time * 0.001;
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, [paused]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}`.replace(/\r/g, ''),
    cssCode: `div {
  width: 100%;
  height: 100%;
  position: relative;
}`.replace(/\r/g, '')
  },
  {
    id: "click-spark",
    name: "Click Spark",
    category: "Animations",
    description: "Vibrant particle emitter responding to user interaction.",
    hasAnimation: true,
    componentName: "ClickSpark",
    why: "Micro-interactions keep users engaged and provide immediate feedback for their actions.",
    topics: "Particle Systems, Emitter Logic, Life-cycle Management",
    guide: "Click anywhere in the area to spawn particles. Observe how they fade out over their lifecycle.",
    tsxCode: `'use client';


import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.color = color;
    this.life = 1.0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.02;
    this.size *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ClickSpark({ paused = false }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const colors = ['#2dd4bf', '#a855f7', '#fff'];

    const render = () => {
      if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.current.forEach((p, i) => {
          p.update();
          p.draw(ctx);
          if (p.life <= 0) particles.current.splice(i, 1);
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleClick = (e: MouseEvent) => {
      if (paused) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 15; i++) {
        particles.current.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    };

    canvas.addEventListener('mousedown', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleClick);
    };
  }, [paused]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={240} 
        style={{ width: '100%', height: '100%' }} 
      />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
         <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '0.8rem' }}>CLICK ANYWHERE</span>
      </div>
    </div>
  );
}`.replace(/\r/g, ''),
    cssCode: `canvas {
  width: 100%;
  height: 100%;
}`.replace(/\r/g, '')
  },
  {
    id: "glitch-text",
    name: "Glitch Text",
    category: "Text",
    description: "High-speed character scrambling effect using randomized iteration.",
    hasAnimation: true,
    componentName: "GlitchText",
    why: "Cyberpunk and tech-heavy aesthetics rely on glitch effects to communicate a high-velocity digital feel.",
    topics: "String Manipulation, Timing Functions, Randomization Logic",
    guide: "Best used for titles and core headings. Adjustable speed via the timing interval.",
    tsxCode: `'use client';


import { useEffect, useRef } from 'react';

export default function GlitchText({ text = "HALQA GLITCH", paused = false }) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || paused) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const originalText = text;
    let iteration = 0;
    
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
            iteration = 0;
        }
        iteration += 1 / 3;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, paused]);

  return (
    <div 
      ref={textRef} 
      style={{ 
        fontSize: '2.5rem', 
        fontWeight: 900, 
        color: 'white', 
        fontFamily: 'monospace',
        letterSpacing: '0.1em'
      }}
    >
      {text}
    </div>
  );
}`.replace(/\r/g, ''),
    cssCode: `div {
        fontSize: '2.5rem', 
        fontWeight: 900, 
        color: 'white', 
        fontFamily: 'monospace',
        letterSpacing: '0.1em'
}`.replace(/\r/g, '')
  },
  {
    id: "blur-text",
    name: "Blur Text",
    category: "Text",
    description: "A staggered, smooth Gaussian blur reveal effect.",
    hasAnimation: true,
    componentName: "BlurText",
    why: "Staggered reveals focus the user's attention on specific words, improving retention.",
    topics: "Framer Motion, Staggered Delays, Opacity Transitions",
    guide: "Change the split logic from words to characters for a more granular 'typing' feel.",
    tsxCode: `'use client';


import { motion } from 'framer-motion';

export default function BlurText({ text = "Halqa Lab", paused = false }) {
  const words = text.split(" ");

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
          animate={paused ? { filter: 'blur(10px)', opacity: 0 } : { filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}`.replace(/\r/g, ''),
    cssCode: `/* Pure Framer Motion animations */`.replace(/\r/g, '')
  },
  {
    id: "shiny-text",
    name: "Shiny Text",
    category: "Text",
    description: "A liquid metallic shimmer effect.",
    hasAnimation: true,
    componentName: "ShinyText",
    why: "Glossy effects create a premium, apple-like aesthetic that feels polished and state-of-the-art.",
    topics: "CSS Background Clip, Keyframe Animations, Gradients",
    guide: "Works best on heavy, bold fonts. Adjust the gradient stops to change the sheen sharpness.",
    tsxCode: `'use client';


import styles from './ShinyText.module.css';

export default function ShinyText({ text = "Shiny Glow", paused = false }) {
  return (
    <div className={\`\${styles.shinyContainer} \${paused ? styles.paused : ''}\`}>
      {text}
    </div>
  );
}`.replace(/\r/g, ''),
    cssCode: `.shinyContainer {
  font-size: 2.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    120deg,
    transparent 0%,
    transparent 40%,
    rgb(255, 255, 255) 50%,
    transparent 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  display: inline-block;
  animation: shine 3s linear infinite;
}

.paused {
  animation-play-state: paused;
}

@keyframes shine {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}`.replace(/\r/g, '')
  },
  {
    id: "aurora-bg",
    name: "Aurora Background",
    category: "Backgrounds",
    description: "Northern lights simulation.",
    hasAnimation: true,
    componentName: "AuroraBg",
    why: "Abstract, slow-moving backgrounds reduce cognitive load while maintaining visual interest.",
    topics: "Radial Gradients, CSS Filters, Spatial Math",
    guide: "Set this as a fixed background. Use with high-contrast text for maximum readability.",
    tsxCode: `'use client';


import styles from './AuroraBg.module.css';

export default function AuroraBg({ paused = false }) {
  return (
    <div className={styles.auroraContainer}>
      <div className={\`\${styles.aurora} \${paused ? styles.paused : ''}\`} />
      <div className={styles.overlay}>
         <h3 className={styles.label}>Aurora Borealis</h3>
      </div>
    </div>
  );
}`.replace(/\r/g, ''),
    cssCode: `.auroraContainer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #000;
}

.aurora {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(circle at 50% 50%, #2dd4bf 0%, #a855f7 30%, #3b82f6 60%, transparent 100%);
  filter: blur(80px);
  opacity: 0.5;
  animation: move 20s ease infinite;
}

.paused {
  animation-play-state: paused;
}

@keyframes move {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(10%, -10%) rotate(5deg); }
  66% { transform: translate(-5%, 5%) rotate(-5deg); }
}`.replace(/\r/g, '')
  },
  {
    id: "magnet-btn",
    name: "Magnet Button",
    category: "Animations",
    description: "Organically pulls toward the cursor.",
    hasAnimation: false,
    componentName: "MagnetButton",
    why: "Magnetic interactions increase the clickability of CTAs by providing tactile-like visual feedback.",
    topics: "Proximity Detection, Spring Physics, Framer Motion",
    guide: "Wrap any button in the magnet container to instantly upgrade its UX feel.",
    tsxCode: `'use client';


import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagnetButton({ text = "Magnetize", paused = false }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (paused || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * 0.4, y: distanceY * 0.4 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={styles.magnetBtn}
    >
      {text}
    </motion.button>
  );
}`.replace(/\r/g, ''),
    cssCode: `.magnetBtn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  background: var(--accent);
  color: #000;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.magnetBtn:hover {
  background: #fff;
}`.replace(/\r/g, '')
  },
  {
    id: "apple-bento",
    name: "Adaptive Bento",
    category: "UI",
    description: "Sophisticated asymmetrical feature grid inspired by premium design languages.",
    hasAnimation: false,
    componentName: "AdaptiveBento",
    why: "Bento grids are the gold standard for presenting complex feature sets in a clean, logical hierarchy.",
    topics: "CSS Grid, Fractional Units, Responsive Layouts",
    guide: "Add new items by defining their span values in the grid container.",
    tsxCode: `'use client';


import styles from './AdaptiveBento.module.css';

export default function AdaptiveBento() {
  const items = [
    { id: 1, title: 'Neural Engine', desc: '16-core architecture', size: 'large', color: '#a855f7' },
    { id: 2, title: 'Fluid UI', desc: '120Hz response', size: 'small', color: '#2dd4bf' },
    { id: 3, title: 'Optic Link', desc: 'Zero latency', size: 'small', color: '#3b82f6' },
    { id: 4, title: 'Secure Enclave', desc: 'End-to-end encryption', size: 'medium', color: '#f43f5e' },
  ];

  return (
    <div className={styles.bentoGrid}>
      {items.map(item => (
        <div 
          key={item.id} 
          className={\`\${styles.bentoItem} \${styles[item.size]}\`}
          style={{ '--accent-color': item.color } as React.CSSProperties}
        >
          <div className={styles.content}>
            <h4 className={styles.itemTitle}>{item.title}</h4>
            <p className={styles.itemDesc}>{item.desc}</p>
          </div>
          <div className={styles.glow} />
        </div>
      ))}
    </div>
  );
}`.replace(/\r/g, ''),
    cssCode: `.bentoGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 160px);
  gap: 1rem;
  width: 100%;
  max-width: 800px;
}

.bentoItem {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.bentoItem:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent-color);
  transform: translateY(-5px);
}

.large { grid-column: span 2; grid-row: span 2; }
.medium { grid-column: span 2; }
.small { grid-column: span 1; }

.itemTitle {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
  color: #fff;
}

.itemDesc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0.25rem 0 0;
}

.glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 120%, var(--accent-color), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.bentoItem:hover .glow {
  opacity: 0.2;
}`.replace(/\r/g, '')
  }
];
