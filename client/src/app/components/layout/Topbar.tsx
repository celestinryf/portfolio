"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useParallaxScroll } from '../../hooks/useParallaxScroll';

// Magnetic Link Component using GSAP
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  strength?: number;
}

function MagneticLink({ href, children, strength = 0.3 }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const innerTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const text = textRef.current;
    const innerText = innerTextRef.current;
    
    if (!link || !text || !innerText) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      // Move the link container with matrix3d for hardware acceleration
      gsap.to(link, {
        duration: 0.3,
        x: deltaX,
        y: deltaY,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
      
      // Move the text with less intensity
      gsap.to(text, {
        duration: 0.3,
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
    };

    const handleMouseLeave = () => {
      // Return to original position with elastic ease
      gsap.to(link, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
      
      gsap.to(text, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
    };

    link.addEventListener('mousemove', handleMouseMove);
    link.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      link.removeEventListener('mousemove', handleMouseMove);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <a
      ref={linkRef}
      href={href}
      className="block relative cursor-pointer"
      style={{ transform: 'rotate(0.001deg)' }}
    >
      <span 
        ref={textRef}
        className="block transition-colors duration-200"
        style={{ transform: 'rotate(0.001deg)' }}
      >
        <span 
          ref={innerTextRef}
          className="block font-medium"
          style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', 
            transform: 'translateY(calc(0.8vw - 0.5rem)) rotate(0.001deg)'
          }}
        >
          {children}
        </span>
      </span>
    </a>
  );
}

export default function TopNavigation() {
  // Use the custom hook with default options
  const navRef = useParallaxScroll();

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-20 py-6 px-12">
      <div className="flex justify-between items-center max-w-8xl mx-auto">
        {/* Name/Logo */}
        <MagneticLink href="#" strength={0.3}>
          Celestin Ryf
        </MagneticLink>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10">
          <MagneticLink href="#work" strength={0.3}>
            Work
          </MagneticLink>
          <MagneticLink href="#about" strength={0.3}>
            About
          </MagneticLink>
          <MagneticLink href="#contact" strength={0.3}>
            Contact
          </MagneticLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <MagneticLink href="#menu" strength={0.3}>
            Menu
          </MagneticLink>
        </div>
      </div>
    </nav>
  );
}