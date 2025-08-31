"use client";

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useParallaxScroll } from '../../hooks/useParallaxScroll';

// Magnetic Link Component using GSAP
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

function MagneticLink({ href, children, strength = 0.3, className = "", onClick }: MagneticLinkProps) {
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
      onClick={onClick}
      className={`block relative cursor-pointer ${className}`}
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
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', 
            transform: 'translateY(calc(0.8vw - 0.5rem)) rotate(0.001deg)'
          }}
        >
          {children}
        </span>
      </span>
    </a>
  );
}

// Magnetic Button Component for the menu trigger
interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

function MagneticButton({ children, strength = 0.3, className = "", onClick }: MagneticButtonProps) {
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
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      gsap.to(button, {
        duration: 0.3,
        x: deltaX,
        y: deltaY,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
      
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
      gsap.to(button, {
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

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`block relative cursor-pointer bg-transparent border-none ${className}`}
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
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', 
            transform: 'translateY(calc(0.8vw - 0.5rem)) rotate(0.001deg)'
          }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}

export default function TopNavigation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Use the custom hook with default options
  const navRef = useParallaxScroll();

  useEffect(() => {
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Animate dropdown open/close
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    if (isMenuOpen) {
      gsap.fromTo(dropdown, 
        { 
          opacity: 0, 
          y: -20,
          scale: 0.95
        }, 
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes navSlideIn {
          from {
            transform: translateY(-60px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes navItemSlideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes navFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .nav-container {
          opacity: 0;
          animation: navFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.1s;
        }

        .nav-logo {
          opacity: 0;
          animation: navItemSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.3s;
        }

        .nav-item-1 {
          opacity: 0;
          animation: navItemSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.4s;
        }

        .nav-item-2 {
          opacity: 0;
          animation: navItemSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.5s;
        }

        .nav-item-3 {
          opacity: 0;
          animation: navItemSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.6s;
        }

        .nav-menu {
          opacity: 0;
          animation: navItemSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.5s;
        }

        .dropdown-menu {
          animation: dropdownSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Subtle hover glow effect */
        @keyframes navGlow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        .nav-loaded {
          animation: navGlow 3s ease-in-out infinite;
          animation-delay: 2s;
        }

        /* Backdrop blur effect */
        .dropdown-backdrop {
          backdrop-filter: blur(8px);
          background: rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <nav 
        ref={navRef} 
        className={`fixed top-0 left-0 right-0 z-20 py-6 px-12 ${isLoaded ? 'nav-container' : 'opacity-0'}`}
      >
        <div className="flex justify-between items-center max-w-8xl mx-auto">
          {/* Name/Logo */}
          <MagneticLink 
            href="#" 
            strength={0.4}
            className={isLoaded ? 'nav-logo' : 'opacity-0'}
          >
            Celestin Ryf
          </MagneticLink>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-10">
            <MagneticLink 
              href="#work" 
              strength={0.4}
              className={isLoaded ? 'nav-item-1' : 'opacity-0'}
            >
              Work
            </MagneticLink>
            <MagneticLink 
              href="#about" 
              strength={0.4}
              className={isLoaded ? 'nav-item-2' : 'opacity-0'}
            >
              About
            </MagneticLink>
            <MagneticLink 
              href="#contact" 
              strength={0.4}
              className={isLoaded ? 'nav-item-3' : 'opacity-0'}
            >
              Contact
            </MagneticLink>
          </div>

          {/* Mobile Menu Button with Dropdown */}
          <div className={`md:hidden relative ${isLoaded ? 'nav-menu' : 'opacity-0'}`} ref={dropdownRef}>
            <MagneticButton 
              onClick={toggleMenu}
              strength={0.3}
              className="text-inherit"
            >
              Menu
            </MagneticButton>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="dropdown-menu absolute right-0 top-full mt-4 py-4 px-6 bg-white/90 dropdown-backdrop rounded-lg shadow-lg border border-gray-100/50 min-w-[120px]">
                <div className="flex flex-col space-y-3">
                  <MagneticLink 
                    href="#work" 
                    strength={0.2}
                    className="text-sm transition-colors"
                    onClick={closeMenu}
                  >
                    Work
                  </MagneticLink>
                  <MagneticLink 
                    href="#about" 
                    strength={0.2}
                    className="text-sm transition-colors"
                    onClick={closeMenu}
                  >
                    About
                  </MagneticLink>
                  <MagneticLink 
                    href="#contact" 
                    strength={0.2}
                    className="text-sm hover:text-gray-600 transition-colors"
                    onClick={closeMenu}
                  >
                    Contact
                  </MagneticLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}