"use client";

import { useEffect, useRef } from "react";

// Centralized parallax controller — prevents drift between elements by
// running a single rAF loop and interpolating all registered elements together.
class ParallaxController {
  private elements: Map<
    HTMLElement,
    { speed: number; smoothness: number; currentY: number; targetY: number }
  > = new Map();
  private animationFrame: number | null = null;
  private currentScrollY: number = 0;

  register(element: HTMLElement, speed: number, smoothness: number) {
    this.elements.set(element, { speed, smoothness, currentY: 0, targetY: 0 });
  }

  unregister(element: HTMLElement) {
    this.elements.delete(element);
  }

  private updatePositions = () => {
    this.elements.forEach((data, element) => {
      data.targetY = this.currentScrollY * -data.speed;
      data.currentY += (data.targetY - data.currentY) * data.smoothness;
      element.style.transform = `translateY(${data.currentY}px)`;
    });
    this.animationFrame = requestAnimationFrame(this.updatePositions);
  };

  private handleScroll = () => {
    this.currentScrollY = window.scrollY;
    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(this.updatePositions);
    }
  };

  start() {
    this.updatePositions();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  stop() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

// Singleton shared across all landing page sections
export const parallaxController = new ParallaxController();

// ---

export interface ParallaxOptions {
  speed: number;
  smoothness?: number;
}

export function useParallaxScroll<T extends HTMLElement = HTMLElement>(
  options: ParallaxOptions
): React.RefObject<T | null> {
  const { speed, smoothness = 0.12 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    parallaxController.register(element, speed, smoothness);
    return () => parallaxController.unregister(element);
  }, [speed, smoothness]);

  return ref;
}