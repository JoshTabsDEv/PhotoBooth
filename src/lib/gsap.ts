import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

// Register all plugins once
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText };
