'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FRAGMENT_SHADER = `
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
    
    // Metallic chrome feel
    float brightness = 0.8 + 0.2 * sin(p.x * 10.0 + uTime);
    col = mix(vec3(0.1, 0.1, 0.15), vec3(brightness), col.r);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

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
}
