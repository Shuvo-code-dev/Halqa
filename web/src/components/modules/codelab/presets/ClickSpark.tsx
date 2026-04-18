'use client';

import { useEffect, useRef } from 'react';
import styles from './ClickSpark.module.css';

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
    <div className={styles.container}>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={240} 
        className={styles.canvas}
      />
      <div className={styles.overlay}>
         <span className={styles.hint}>CLICK ANYWHERE</span>
      </div>
    </div>
  );
}
