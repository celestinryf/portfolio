"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

type BigNameProps = {
  names: string[];
  speed?: number;
  className?: string;
};

function BigName({ names, speed = 50, className = "" }: BigNameProps) {
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
        x: (x) => {
          const val = parseFloat(x);
          return (val % -width) + "px";
        },
      },
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [speed, names]);

  // Render the full sequence of names separated by —
  const sequence = (
    <div
      className="name-wrap"
      style={{ userSelect: "none", whiteSpace: "nowrap" }}
    >
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
        {/* Duplicate sequence twice for infinite scroll */}
        {sequence}
        {sequence}
      </div>
    </div>
  );
}


// Centralized parallax controller to prevent drift between elements
class ParallaxController {
  private elements: Map<HTMLElement, { speed: number; smoothness: number; currentY: number; targetY: number }> = new Map();
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
      const rate = this.currentScrollY * -data.speed;
      data.targetY = rate;
      
      // Smooth interpolation
      data.currentY += (data.targetY - data.currentY) * data.smoothness;
      
      // Apply transform
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
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  stop() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

// Global controller instance
const parallaxController = new ParallaxController();

// Updated parallax hook that uses centralized controller
interface ParallaxOptions {
  speed: number;
  smoothness?: number;
}

function useParallaxScroll<T extends HTMLElement = HTMLElement>(
  options: ParallaxOptions
): React.RefObject<T | null> {
  const { speed, smoothness = 0.12 } = options; // Standardized smoothness
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    parallaxController.register(element, speed, smoothness);
    
    return () => {
      parallaxController.unregister(element);
    };
  }, [speed, smoothness]);

  return ref;
}

// Magnetic Link Component for Case Study Buttons
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

function MagneticLink({ href, children, strength = 0.3, className = "", onClick }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const text = textRef.current;
    
    if (!link || !text) return;

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
      className={`inline-block relative cursor-pointer ${className}`}
      style={{ transform: 'rotate(0.001deg)' }}
    >
      <span 
        ref={textRef}
        className="block transition-colors duration-200"
        style={{ transform: 'rotate(0.001deg)' }}
      >
        {children}
      </span>
    </a>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  isIcon?: boolean;
  style?: React.CSSProperties;
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
          }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}

// Globe Spinner Component with Tailwind
const GlobeSpinner = ({ className = "" }) => {
  return (
    <div className={`w-8 h-8 ${className}`} style={{ perspective: '1000px' }}>
      <div 
        className="relative w-full h-full animate-spin"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateZ(15deg)',
          animationDuration: '8s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        {/* Longitude lines (vertical circles) */}
        <div 
          className="absolute inset-0 border border-white/60 rounded-full bg-transparent"
          style={{ transform: 'rotateY(0deg)' }}
        />
        <div 
          className="absolute inset-0 border border-white/60 rounded-full bg-transparent"
          style={{ transform: 'rotateY(60deg)' }}
        />
        <div 
          className="absolute inset-0 border border-white/60 rounded-full bg-transparent"
          style={{ transform: 'rotateY(120deg)' }}
        />
        
        {/* Latitude lines (horizontal circles) */}
        <div 
          className="absolute border border-white/50 rounded-full bg-transparent"
          style={{
            height: '60%',
            width: '60%',
            top: '20%',
            left: '20%',
            transform: 'rotateX(75deg) translateZ(8px)'
          }}
        />
        <div 
          className="absolute border border-white/50 rounded-full bg-transparent"
          style={{
            height: '60%',
            width: '60%',
            top: '20%',
            left: '20%',
            transform: 'rotateX(75deg) translateZ(-8px)'
          }}
        />
        <div 
          className="absolute border border-white/50 rounded-full bg-transparent"
          style={{
            height: '85%',
            width: '85%',
            top: '7.5%',
            left: '7.5%',
            transform: 'rotateX(75deg) translateZ(4px)'
          }}
        />
        
        {/* Equator - slightly thicker */}
        <div 
          className="absolute inset-0 rounded-full bg-transparent"
          style={{
            transform: 'rotateX(75deg)',
            border: '1.2px solid rgba(255, 255, 255, 0.7)'
          }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [contentHeight, setContentHeight] = useState('300vh');
  
  // Parallax refs with consistent smoothness and strategic speeds
  const heroBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0 });
  const contentBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0.3 }); // Independent white background parallax
  const heroTextDesktopRef = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const heroTextMobileRef = useParallaxScroll<HTMLDivElement>({ speed: 0.5 });
  const locationPillRef = useParallaxScroll<HTMLDivElement>({ speed: 0.7 });
  const aboutSectionRef = useParallaxScroll<HTMLDivElement>({ speed: 0.2 }); // Same speed as experience section
  const contentArea1Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.2});
  const contentArea2Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.2 });
  const project1Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.2 });
  const project2Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.2 });
  const project3Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.2 });

  useEffect(() => {
    // Start the centralized parallax controller
    parallaxController.start();
    
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Calculate dynamic height for content section to prevent gaps
    const calculateContentHeight = () => {
      // Calculate maximum parallax movement based on expected scroll distance
      const maxParallaxSpeed = 0.8; // Highest speed from your elements
      const estimatedScrollDistance = window.innerHeight * 0.5; // Estimate based on content
      const maxParallaxMovement = estimatedScrollDistance * maxParallaxSpeed;
      
      // Set height to cover parallax movement plus extra buffer
      const dynamicHeight = `calc(100% + ${maxParallaxMovement}px)`;
      setContentHeight(dynamicHeight);
    };

    const heightTimer = setTimeout(calculateContentHeight, 200);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(heightTimer);
      parallaxController.stop();
    };
  }, []);const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden pointer-events-none">
      <style jsx global>{`
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-1 {
          opacity: 0;
          animation: slideInFromBottom 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.2s;
        }

        .animate-fade-in-scale {
          opacity: 0;
          animation: fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.6s;
        }

        .animate-slide-from-left {
          opacity: 0;
          animation: slideInFromLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.8s;
        }

        /* Remove conflicting smooth scrolling and add section snapping */
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: auto; /* Let parallax handle smoothing */
        }

        /* Snap points for main sections */
        .snap-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        /* Better mobile scroll snapping */
        @media (max-width: 768px) {
          html {
            scroll-snap-type: y proximity; /* Less aggressive on mobile */
          }
        }
      `}</style>

      {/* Hero Section - Gray Background with Parallax */}
      <div ref={heroBackgroundRef}   className="relative z-10 min-h-screen bg-stone-300 bg-cover bg-center snap-section"
        style={{ backgroundImage: "url('/assets/aurafarmingcelestin.jpg')" }}
      >
        <div className="w-full max-w-8xl mx-auto">
          <div className="hidden md:grid grid-cols-2 gap-0 items-center min-h-screen">
            
            {/* Hero Text - Desktop with Parallax */}
            <div className="col-start-2 flex flex-col justify-center items-center text-left space-y-6">
              <div ref={heroTextDesktopRef} className="leading-tight tracking-tight whitespace-nowrap">
                <h1 
                  className={`leading-none font-normal text-black dark:text-white ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
                  style={{fontSize: 'clamp(1.5rem, 2vw, 2.75rem)'}}
                >
                  Software Engineer
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Text - Mobile (Bottom Left) with Parallax */}
        <div className="absolute bottom-24 left-8 md:hidden">
          <div ref={heroTextMobileRef} className="leading-tight tracking-tight">
            <h1 
              className={`leading-none font-normal text-white ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
              style={{fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)'}}
            >
              Software Engineer
            </h1>
          </div>
        </div>

          <div className="absolute bottom-35 md:bottom-40 z-50">
            <BigName 
              names={["Organizer", "President", "Systems Architect"]} 
              speed={150} 
              className="opacity-200"
            />
          </div>
        
        {/* Location Pill with Globe - Using Tailwind */}
        <div 
          ref={locationPillRef} 
          className={`absolute bottom-10 left-8 md:bottom-10 md:left-10 bg-black backdrop-blur-md rounded-full px-5 py-3 pl-14 flex items-center gap-3 z-50 ${isLoaded ? 'animate-slide-from-left' : 'opacity-0'}`}
        >
          {/* Globe Wrapper - Using Tailwind */}
          <div className={`absolute left-2.5 w-8 h-8 flex items-center justify-center ${isLoaded ? 'animate-fade-in-scale' : 'opacity-0'}`}>
            <GlobeSpinner />
          </div>
          <span 
            className="text-white/90 whitespace-nowrap text-xs font-light tracking-wide"
          >
            American & French Citizenship
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={contentBackgroundRef} 
          className="absolute inset-0 bg-white dark:bg-black z-20 pointer-events-none"
          style={{ 
            minHeight: '1000vh', // Fallback minimum coverage
          }}
        />
        
        {/* Experience Section */}
        <div 
          className="relative snap-section z-20 transition-colors duration-300 pointer-events-auto"
        >
        <div
          className="w-full max-w-[1880px] px-[5vw] mx-auto"
          style={{ paddingTop: '10vh' }}
        >        
            {/* About Me Introduction */}
            <div ref={aboutSectionRef} className="mb-32 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Text on the left */}
                <div className="max-w-4xl">
                  <p className="text-black/80 dark:text-white/80 font-normal leading-relaxed" style={{ fontSize: 'clamp(25px, 1.1vw, 30px)' }}>
                    I'm a software engineer with experience in designing, developing, and maintaining scalable applications. 
                    I elevate teams, architect solutions for clients, and put users first in an agent centered world.
                  </p>
                </div>
                
                {/* About Me Circular Button on the right */}
                <div ref={aboutSectionRef} className="flex justify-center md:justify-end">
                  <MagneticButton 
                    onClick={() => router.push('/about')}
                    strength={0.4}
                    className="flex items-center justify-center rounded-full !bg-black dark:!bg-white text-white dark:text-black hover:scale-105 transition-all cursor-pointer"
                    style={{
                      width: 'clamp(120px, 12vw, 225px)',
                      height: 'clamp(120px, 12vw, 225px)',
                    }}
                  >
                    <span className="font-medium" style={{ fontSize: 'clamp(14px, 1.1vw, 20px)' }}>About me</span>
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Experience Header */}
            <div ref={contentArea1Ref} className="mb-20">
              <h2 className="text-5xl md:text-7xl font-light text-black dark:text-white tracking-tight">My experience</h2>
            </div>

            {/* === Project 1 === */}
            <div ref={project1Ref} className="mb-16">
              <div className="border-t border-gray-300 dark:border-gray-700 py-8"></div>
              <div className="mx-auto">

                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                  <h4 className="text-4xl text-black dark:text-white font-normal">Software Engineer Intern</h4>
                  <p className="text-m text-black dark:text-gray-300 mb-8">University of Washington</p>
                  </div>

                  <div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Built an ML-powered Document Ingestion pipeline using OCR (Tesseract) and pattern matching in Python, migrating over 50,000 legacy files to a structured PostgreSQL database and reducing manual data entry by over 90%.</p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Developed a Document Search feature full-stack using Next.js, TypeScript, GraphQL, and REST APIs, enabling real-time data access for 500+ professors and automating reporting workflows across departments.</p>
                    </div>
                    <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">actual development experience, feature or architecture decision</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[500px] flex items-center justify-center rounded-lg mb-8 overflow-hidden">
                  <img
                    src="/assets/SETlib.png"
                    alt="Description"
                    className="object-contain max-h-fill"
                  />
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">Professional Project 01</p>
                    <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">SETlib</h5>
                    <p className="text-black dark:text-gray-300 text-sm mb-4">Document Management System</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {["Go", "Java Spring", "Python", "TypeScript", "Docker", "Kubernetes", "AWS", "GraphQL", "CI/CD", "next.js", "GitHub Actions"].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-black dark:text-gray-300 leading-relaxed">
                      Approached by the Chair & Co-Chair of UW's CS program to build SETlib for their Seminar courses on a 12-month contract.
                    </p>
                    <MagneticLink 
                      href="/SETlib" 
                      strength={0.4}
                      className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4"
                    >
                      View Case Study
                    </MagneticLink>
                  </div>
                </div>
              </div>
            </div>

            {/* === Project 2 === */}
            <div ref={project2Ref} className="mb-16">
              <div className="border-t border-gray-300 dark:border-gray-700 py-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-left">
                    <h4 className="text-4xl text-black dark:text-white font-normal">Software Engineer Intern</h4>
                    <p className="text-m text-black dark:text-gray-300 mb-8">Insights Emerge</p>
                  <div className="w-full h-[600px] rounded-lg mb-8 overflow-hidden">                  
                  <img
                    src="/assets/lms.png"
                    alt="Description"
                    className="object-contain max-h-fill"
                  /></div>
                </div>

                <div className="text-left">
                  <div className="mb-8">
                    <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">Professional Project 02</p>
                    <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">Illuminance Esthetics</h5>
                    <p className="text-black dark:text-gray-300 text-sm mb-4">Beauty School LMS</p>
                  </div>

                  <div className="mb-8">
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Designed and built 5+ interactive prototypes using React, TypeScript, and Redux, improving render efficiency and reducing page load times by 40% to enhance user experience for early-stage product testing.</p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Engineered monolithic Node.js/Express backend into a microservices architecture, introducing asynchronous patterns and Redis caching, which decreased API response latency by 38% and improved system scalability.</p>
                    </div>
                    <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Shipped production-ready features using CI/CD pipelines with automated testing frameworks, achieving 95% code coverage, and implemented an event-driven architecture with Kafka to support 10K+ concurrent users.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {["Next.js", "Node.js", "TypeScript", "Tailwind", "Docker", "Kubernetes", "Redux", "CI/CD", "Stakeholder Communication"].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-black dark:text-gray-300 leading-relaxed">
                      Led the technical implementation of Spotify's revolutionary Discover Weekly feature...
                    </p>
                    <MagneticLink 
                      href="/work" 
                      strength={0.4}
                      className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4"
                    >
                      View Case Study
                    </MagneticLink>
                  </div>
                </div>
              </div>
            </div>

            {/* === Project 3 === */}
            <div ref={project3Ref} className="mb-16" style={{
                marginBottom: 'calc(10rem - 70vh)'
              }}>
              <div className="border-t border-gray-300 dark:border-gray-700 py-8"></div>
              <div className="mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                    <h4 className="text-4xl text-black dark:text-white font-normal">President & Founder </h4>
                    <p className="text-m text-black dark:text-gray-300 mb-8">Tech Startup Club</p>
                  </div>

                  <div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Manager and Senior Developer for Software Development Consultancy startup founded, funded, and ran by UW students. Leading end-to-end software projects for clients from design through deployment.</p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Lead organizer and Host of UHackathon, the largest ever hackathon south of Seattle. Secured $5,000 in sponsorship funding and oversaw all financial planning, budgeting, and expense tracking. Awarded $10,000 contract for 2 further years.</p>
                    </div>
                    <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Implemented infrastructure as code using Terraform and Kubernetes, reducing deployment time by 80%.</p>
                    </div>
                  </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="w-full h-[600px] rounded-lg mb-8 overflow-hidden">                  
                  <img
                    src="/assets/meeting4.jpg"
                    alt="Description"
                    className="object-contain max-h-fill"
                  /></div>
                  <div className="w-full h-[600px] rounded-lg mb-8 overflow-hidden">                  
                    <img
                      src="/assets/umarket (1).png"
                      alt="Description"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">Professional Project 03</p>
                    <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">UHackathon</h5>
                    <p className="text-black dark:text-gray-300 text-sm mb-4">Largest Ever Hackathon South of Seattle</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {["Project Managment", "Leadership", "JavaScript", "TypeScript", "React", "Node.js", "Go", "Docker", "Trello"].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-black dark:text-gray-300 leading-relaxed">
                      Architected and maintained the infrastructure powering Netflix's global streaming platform...
                    </p>
                    <MagneticLink 
                      href="/work" 
                      strength={0.4}
                      className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4"
                    >
                      View Case Study
                    </MagneticLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}