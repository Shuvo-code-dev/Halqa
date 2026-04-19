'use client';

import { useEffect, useRef } from 'react';
import styles from './Ballpit.module.css';

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

    // Interaction Force Calculation
    const dist = Math.sqrt((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2);
    if (dist < 100) {
      const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
      const force = (100 - dist) / 100;
      this.dx += Math.cos(angle) * force * 1.5;
      this.dy += Math.sin(angle) * force * 1.5;
    }

    // Velocity Friction (Liquid Feel)
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
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

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

    const handleTouchStart = (e: TouchEvent) => {
      if (paused) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (paused) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };

    const handleInteractionEnd = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    canvas.addEventListener('mouseleave', handleInteractionEnd);
    canvas.addEventListener('touchend', handleInteractionEnd);
    canvas.addEventListener('touchcancel', handleInteractionEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleInteractionEnd);
      canvas.removeEventListener('touchend', handleInteractionEnd);
      canvas.removeEventListener('touchcancel', handleInteractionEnd);
    };
  }, [paused]);

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.canvas}
    />
  );
}
