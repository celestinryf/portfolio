"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BigNameProps {
  names: string[];
  speed?: number;
  className?: string;
}

export default function BigName({ names, speed = 50, className = "" }: BigNameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nameWrap = container.querySelector(".name-wrap") as HTMLElement;
    if (!nameWrap) return;

    const width = nameWrap.offsetWidth;

    animationRef.current?.kill();
    animationRef.current = gsap.to(container, {
      x: -width,
      ease: "linear",
      duration: width / speed,
      repeat: -1,
      modifiers: {
        x: (x) => (parseFloat(x) % -width) + "px",
      },
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [speed, names]);

  const sequence = (
    <div className="name-wrap" style={{ userSelect: "none", whiteSpace: "nowrap" }}>
      {names.map((n, idx) => (
        <h1
          key={idx}
          className="inline-block text-[clamp(3rem,13vw,25rem)] font-normal text-black dark:text-white leading-none"
        >
          {n}
          <span className="mx-8">—</span>
        </h1>
      ))}
    </div>
  );

  return (
    <div
      className={`big-name relative overflow-hidden whitespace-nowrap select-none ${className}`}
      style={{ willChange: "transform" }}
    >
      <div ref={containerRef} className="flex" style={{ transform: "translate3d(0,0,0)" }}>
        {sequence}
        {sequence}
      </div>
    </div>
  );
}