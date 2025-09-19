"use client";

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useParallaxScroll } from '../../hooks/useParallaxScroll';
import { AlignJustify } from 'lucide-react';

// Magnetic Link Component using GSAP
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  underlineStyle?: 'desktop' | 'mobile' | 'none';
}

function MagneticLink({ href, children, strength = 0.3, className = "", onClick, underlineStyle = 'none' }: MagneticLinkProps) {
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

  const getTextClasses = () => {
    let baseClasses = "block transition-colors duration-200 relative";
    if (underlineStyle === 'desktop') {
      baseClasses += " nav-link-text";
    } else if (underlineStyle === 'mobile') {
      baseClasses += " nav-link-text-mobile";
    }
    return baseClasses;
  };

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
        className={getTextClasses()}
        style={{ transform: 'rotate(0.001deg)' }}
      >
        <span 
          ref={innerTextRef}
          className="block font-normal"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2em)', 
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
  isIcon?: boolean; // Added prop to handle icon content differently
  style?: React.CSSProperties; // Added style prop for dynamic styling
}

function MagneticButton({ children, strength = 0.3, className = "", onClick, isIcon = false, style }: MagneticButtonProps) {
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
      style={{ transform: 'rotate(0.001deg)', ...style }}
    >
      <span 
        ref={textRef}
        className="block transition-colors duration-200"
        style={{ transform: 'rotate(0.001deg)' }}
      >
        <span 
          ref={innerTextRef}
          className={isIcon ? "flex items-center justify-center w-full h-full" : "block font-medium"}
          style={{
            fontSize: isIcon ? 'inherit' : 'clamp(1rem, 1.8vw, 1.1rem)', 
            transform: isIcon ? 'none' : 'translateY(calc(0.8vw - 0.5rem)) rotate(0.001deg)'
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollBurger, setShowScrollBurger] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollBurgerRef = useRef<HTMLDivElement>(null);
  
  // Use the custom hook with default options
  const navRef = useParallaxScroll();

  useEffect(() => {
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navHeight = 120; // Approximate height of nav + some buffer
      setIsScrolled(scrollY > navHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          scrollBurgerRef.current && !scrollBurgerRef.current.contains(event.target as Node)) {
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

  // Animate scroll burger menu in and out
  useEffect(() => {
    const scrollBurger = scrollBurgerRef.current;
    
    if (isScrolled && isLoaded) {
      // Show the burger and animate in
      setShowScrollBurger(true);
      
      // Small delay to ensure element is mounted before animating
      setTimeout(() => {
        if (scrollBurger) {
          gsap.fromTo(scrollBurger,
            {
              opacity: 0,
              scale: 0.8,
              y: -20
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "back.out(1.7)"
            }
          );
        }
      }, 10);
    } else if (!isScrolled && showScrollBurger && scrollBurger) {
      // Animate out
      gsap.to(scrollBurger, {
        opacity: 0,
        scale: 0.8,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setShowScrollBurger(false);
          // Also close the menu if it's open
          setIsMenuOpen(false);
        }
      });
    }
  }, [isScrolled, isLoaded, showScrollBurger]);

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

        /* Navigation link underline animation - attached to text span */
        .nav-link-text::after {
          content: '';
          position: absolute;
          bottom: -16px;
          left: 50%;
          width: 100%;
          height: 2px;
          background-color: white;
          border-radius: 1.5px;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-link:hover .nav-link-text::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* Mobile dropdown link styles - attached to text span */
        .nav-link-text-mobile::after {
          content: '';
          position: absolute;
          bottom: -16px;
          left: 50%;
          width: 100%;
          height: 2px;
          background-color: #374151;
          border-radius: 1.5px;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-link-mobile:hover .nav-link-text-mobile::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* Scroll burger menu styles */
        .scroll-burger-button {
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }

        .scroll-burger-button:hover {
          transform: scale(1.05);
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

      {/* Main Navigation */}
      <nav 
        ref={navRef} 
        className={`fixed top-0 left-0 right-0 z-20 py-6 px-12 text-white ${isLoaded ? 'nav-container' : 'opacity-0'}`}
      >
        <div className="flex justify-between items-center max-w-8xl mx-auto">
          {/* Name/Logo */}
          <MagneticLink 
            href="#" 
            strength={0.4}
            className={isLoaded ? 'nav-logo' : 'opacity-0'}
          >
            Célestin Ryf
          </MagneticLink>

          {/* Navigation Links - Hidden when scrolled */}
          <div className={`hidden md:flex space-x-10 transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <MagneticLink 
              href="#work" 
              strength={0.4}
              className={`nav-link ${isLoaded ? 'nav-item-1' : 'opacity-0'}`}
              underlineStyle="desktop"
            >
              Work
            </MagneticLink>
            <MagneticLink 
              href="#about" 
              strength={0.4}
              className={`nav-link ${isLoaded ? 'nav-item-2' : 'opacity-0'}`}
              underlineStyle="desktop"
            >
              About
            </MagneticLink>
            <MagneticLink 
              href="#contact" 
              strength={0.4}
              className={`nav-link ${isLoaded ? 'nav-item-3' : 'opacity-0'}`}
              underlineStyle="desktop"
            >
              Contact
            </MagneticLink>
          </div>

          {/* Mobile Menu Button - Always visible on mobile */}
          <div className={`md:hidden relative ${isLoaded ? 'nav-menu' : 'opacity-0'}`} ref={dropdownRef}>
            <MagneticButton 
              onClick={toggleMenu}
              strength={0.3}
              isIcon={true}
              className="rounded-full flex items-center justify-center !bg-black dark:!bg-white border border-white/10 dark:border-black/10 hover:!bg-gray-900 dark:hover:!bg-gray-100 transition-all duration-300"
              style={{
                width: 'clamp(50px, 10vw, 60px)',
                height: 'clamp(50px, 10vw, 60px)',
              }}
            >
              <AlignJustify 
                size={20}
                className="text-white dark:text-black"
                style={{
                  width: 'clamp(18px, 4vw, 22px)',
                  height: 'clamp(18px, 4vw, 22px)',
                }}
              />
            </MagneticButton>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="dropdown-menu absolute right-0 top-full mt-2 py-4 px-6 bg-white/90 dropdown-backdrop rounded-lg border border-gray-100/50 min-w-[120px]">
                <div className="flex flex-col space-y-3">
                  <MagneticLink 
                    href="#work" 
                    strength={0.2}
                    className="nav-link-mobile text-sm transition-colors"
                    underlineStyle="mobile"
                    onClick={closeMenu}
                  >
                    Work
                  </MagneticLink>
                  <MagneticLink 
                    href="#about" 
                    strength={0.2}
                    className="nav-link-mobile text-sm transition-colors"
                    underlineStyle="mobile"
                    onClick={closeMenu}
                  >
                    About
                  </MagneticLink>
                  <MagneticLink 
                    href="#contact" 
                    strength={0.2}
                    className="nav-link-mobile text-sm transition-colors"
                    underlineStyle="mobile"
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

      {/* Scroll Burger Menu - Appears when scrolled on desktop */}
      {showScrollBurger && (
        <div 
          ref={scrollBurgerRef}
          className="fixed top-6 right-6 z-30 hidden md:block"
        >
          <MagneticButton
            onClick={toggleMenu}
            strength={0.3}
            isIcon={true}
            className="scroll-burger-button rounded-full flex items-center justify-center !bg-black dark:!bg-white border border-white/10 dark:border-black/10 hover:!bg-gray-900 dark:hover:!bg-gray-100 transition-all duration-300"
            style={{
              width: 'clamp(60px, 6vw, 90px)',
              height: 'clamp(60px, 6vw, 90px)',
            }}
          >
            <AlignJustify 
              size={24}
              className="text-white dark:text-black"
              style={{
                width: 'clamp(18px, 1.5vw, 26px)',
                height: 'clamp(18px, 1.5vw, 26px)',
              }}
            />
          </MagneticButton>

          {/* Scroll Burger Dropdown */}
          {isMenuOpen && (
            <div className="dropdown-menu absolute right-0 top-full mt-4 py-4 px-6 bg-white/90 dropdown-backdrop rounded-lg border border-gray-100/50 min-w-[120px]">
              <div className="flex flex-col space-y-3">
                <MagneticLink 
                  href="#work" 
                  strength={0.2}
                  className="nav-link-mobile text-sm transition-colors"
                  underlineStyle="mobile"
                  onClick={closeMenu}
                >
                  Work
                </MagneticLink>
                <MagneticLink 
                  href="#about" 
                  strength={0.2}
                  className="nav-link-mobile text-sm transition-colors"
                  underlineStyle="mobile"
                  onClick={closeMenu}
                >
                  About
                </MagneticLink>
                <MagneticLink 
                  href="#contact" 
                  strength={0.2}
                  className="nav-link-mobile text-sm transition-colors"
                  underlineStyle="mobile"
                  onClick={closeMenu}
                >
                  Contact
                </MagneticLink>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}