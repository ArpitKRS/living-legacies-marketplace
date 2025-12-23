import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// AFTERLIFE GSAP ANIMATION HOOKS
// Organic, slow, emotional animations
// ============================================

/**
 * Hook for fade-in animation on scroll
 */
export const useFadeInOnScroll = <T extends HTMLElement>(
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
  } = {}
) => {
  const ref = useRef<T>(null);
  const { delay = 0, duration = 1, y = 50, stagger = 0.1 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = element.children.length > 0 ? element.children : [element];

    gsap.set(children, { opacity: 0, y });

    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, duration, y, stagger]);

  return ref;
};

/**
 * Hook for parallax effect on scroll
 */
export const useParallax = <T extends HTMLElement>(speed: number = 0.5) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const animation = gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return ref;
};

/**
 * Hook for staggered reveal of children elements
 */
export const useStaggerReveal = <T extends HTMLElement>(
  options: {
    stagger?: number;
    duration?: number;
    from?: 'start' | 'end' | 'center' | 'edges' | 'random';
  } = {}
) => {
  const ref = useRef<T>(null);
  const { stagger = 0.15, duration = 0.8, from = 'start' } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = element.children;

    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 30, scale: 0.95 });

    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger: { amount: stagger * children.length, from },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, [stagger, duration, from]);

  return ref;
};

/**
 * Hook for timeline grow animation (for product life timeline)
 */
export const useTimelineGrow = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top' });

    const animation = gsap.to(lineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 0.5,
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return { containerRef, lineRef };
};

/**
 * Hook for hover scale animation
 */
export const useHoverScale = <T extends HTMLElement>(scale: number = 1.02) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale]);

  return ref;
};

/**
 * Hook for floating/breathing animation
 */
export const useFloatingAnimation = <T extends HTMLElement>(
  options: {
    amplitude?: number;
    duration?: number;
    rotation?: number;
  } = {}
) => {
  const ref = useRef<T>(null);
  const { amplitude = 10, duration = 6, rotation = 2 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const animation = gsap.to(element, {
      y: -amplitude,
      rotation: rotation,
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      animation.kill();
    };
  }, [amplitude, duration, rotation]);

  return ref;
};

/**
 * Hook for text reveal animation (typewriter effect)
 */
export const useTextReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const text = element.textContent || '';
    
    // Clear and prepare for animation
    element.textContent = '';
    element.style.visibility = 'visible';

    const chars = text.split('');
    chars.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      element.appendChild(span);
    });

    const spans = element.querySelectorAll('span');

    const animation = gsap.to(spans, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.03,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
      element.textContent = text;
    };
  }, []);

  return ref;
};

/**
 * Hook for progress ring animation
 */
export const useProgressRing = (
  progress: number,
  options: { duration?: number; delay?: number } = {}
) => {
  const ref = useRef<SVGCircleElement>(null);
  const { duration = 1.5, delay = 0 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const circle = ref.current;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (progress / 100) * circumference;

    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    const animation = gsap.to(circle, {
      strokeDashoffset: offset,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: circle,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, [progress, duration, delay]);

  return ref;
};

/**
 * Hook for card stack effect (for reviews)
 */
export const useCardStack = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const cards = container.children;

    if (cards.length === 0) return;

    Array.from(cards).forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        y: 50,
        rotation: (index % 2 === 0 ? 1 : -1) * (Math.random() * 3),
        scale: 1 - index * 0.02,
      });
    });

    const animation = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return ref;
};

/**
 * Hook for page transition
 */
export const usePageTransition = () => {
  const enterAnimation = useCallback((element: HTMLElement) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  const exitAnimation = useCallback((element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    });
  }, []);

  return { enterAnimation, exitAnimation };
};

/**
 * Hook for magnetic cursor effect on buttons
 */
export const useMagneticHover = <T extends HTMLElement>(strength: number = 0.3) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

/**
 * Utility: Create scroll-linked timeline
 */
export const createScrollTimeline = (
  trigger: HTMLElement,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const { start = 'top center', end = 'bottom center', scrub = true } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  });

  return timeline;
};