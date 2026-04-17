'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

export default function GsapRegistry() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return null;
}
