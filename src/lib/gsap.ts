import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Observer } from 'gsap/Observer';

// Register all plugins once
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Observer);

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Observer };
