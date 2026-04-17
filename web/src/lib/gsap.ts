import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Global defaults for liquid feel
gsap.defaults({
  ease: "power2.out",
  duration: 0.4
});

export { gsap, ScrollTrigger, ScrollToPlugin };
export default gsap;
