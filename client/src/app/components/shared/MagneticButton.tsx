"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  isIcon?: boolean;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
  isIcon = false,
  style,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const innerTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    const innerText = innerTextRef.current;
    if (!button || !text || !innerText) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const deltaX = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const deltaY = (e.clientY - (rect.top + rect.height / 2)) * strength;

      gsap.to(button, { duration: 0.3, x: deltaX, y: deltaY, rotationZ: 0.001, ease: "power2.out", force3D: true });
      gsap.to(text, { duration: 0.3, x: deltaX * 0.5, y: deltaY * 0.5, rotationZ: 0.001, ease: "power2.out", force3D: true });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { duration: 0.5, x: 0, y: 0, rotationZ: 0.001, ease: "elastic.out(1, 0.3)", force3D: true });
      gsap.to(text, { duration: 0.5, x: 0, y: 0, rotationZ: 0.001, ease: "elastic.out(1, 0.3)", force3D: true });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`block relative cursor-pointer bg-transparent border-none ${className}`}
      style={{ transform: "rotate(0.001deg)", ...style }}
    >
      <span
        ref={textRef}
        className="block transition-colors duration-200"
        style={{ transform: "rotate(0.001deg)" }}
      >
        <span
          ref={innerTextRef}
          className={isIcon ? "flex items-center justify-center w-full h-full" : "block font-medium"}
          style={{ fontSize: isIcon ? "inherit" : "clamp(1rem, 1.8vw, 1.1rem)" }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}