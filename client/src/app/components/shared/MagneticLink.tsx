"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function MagneticLink({
  href,
  children,
  strength = 0.3,
  className = "",
  onClick,
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const text = textRef.current;
    if (!link || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = link.getBoundingClientRect();
      const deltaX = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const deltaY = (e.clientY - (rect.top + rect.height / 2)) * strength;

      gsap.to(link, { duration: 0.3, x: deltaX, y: deltaY, rotationZ: 0.001, ease: "power2.out", force3D: true });
      gsap.to(text, { duration: 0.3, x: deltaX * 0.5, y: deltaY * 0.5, rotationZ: 0.001, ease: "power2.out", force3D: true });
    };

    const handleMouseLeave = () => {
      gsap.to(link, { duration: 0.5, x: 0, y: 0, rotationZ: 0.001, ease: "elastic.out(1, 0.3)", force3D: true });
      gsap.to(text, { duration: 0.5, x: 0, y: 0, rotationZ: 0.001, ease: "elastic.out(1, 0.3)", force3D: true });
    };

    link.addEventListener("mousemove", handleMouseMove);
    link.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      link.removeEventListener("mousemove", handleMouseMove);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={onClick}
      className={`inline-block relative cursor-pointer ${className}`}
      style={{ transform: "rotate(0.001deg)" }}
    >
      <span
        ref={textRef}
        className="block transition-colors duration-200"
        style={{ transform: "rotate(0.001deg)" }}
      >
        {children}
      </span>
    </a>
  );
}