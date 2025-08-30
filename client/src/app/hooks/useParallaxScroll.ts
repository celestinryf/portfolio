import { useRef, useEffect } from 'react';

interface ParallaxOptions {
  speed: number;
  smoothness: number;
}

// Generic hook that accepts any HTML element type
// Make the entire options parameter optional
export function useParallaxScroll<T extends HTMLElement = HTMLElement>(
  options?: Partial<ParallaxOptions>
): React.RefObject<T | null> {
  const { speed = 1, smoothness = 0.1 } = options || {};
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrame: number;
    let currentY = 0;
    let targetY = 0;

    const updatePosition = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -speed;
      
      targetY = rate;
      
      // Smooth interpolation
      currentY += (targetY - currentY) * smoothness;
      
      // Apply transform
      element.style.transform = `translateY(${currentY}px)`;
      
      animationFrame = requestAnimationFrame(updatePosition);
    };

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(updatePosition);
      }
    };

    // Initial setup
    updatePosition();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [speed, smoothness]);

  return ref;
}