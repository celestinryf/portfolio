"use client";

import { useEffect, useState, useRef } from "react";

// Parallax hook
interface ParallaxOptions {
  speed: number;
  smoothness: number;
}

function useParallaxScroll<T extends HTMLElement = HTMLElement>(
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
  
  // Parallax refs with different speeds for layered effect
  const heroBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0, smoothness: 0.1 });
  const heroTextDesktopRef = useParallaxScroll<HTMLDivElement>({ speed: 0.3, smoothness: 0.1 });
  const heroTextMobileRef = useParallaxScroll<HTMLDivElement>({ speed: 0.9, smoothness: 0.15 });
  const locationPillRef = useParallaxScroll<HTMLDivElement>({ speed: 0.9, smoothness: 0.1 });
  const contentArea1Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3, smoothness: 0.1 });
  const contentArea2Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.2, smoothness: 0.1 });

  useEffect(() => {
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
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

        /* Smooth scrolling for better parallax effect */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Hero Section - Gray Background with Parallax */}
      <div ref={heroBackgroundRef} className="relative z-10 min-h-screen bg-stone-400">
        <div className="w-full max-w-8xl mx-auto">
          <div className="hidden md:grid grid-cols-2 gap-0 items-center min-h-screen">
            {/* Hero Text - Desktop with Parallax */}
            <div className="col-start-2 flex flex-col justify-center items-center text-left space-y-6">
              <div ref={heroTextDesktopRef} className="leading-tight tracking-tight whitespace-nowrap">
                <h1 
                  className={`leading-none font-normal mb-6 ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
                  style={{fontSize: 'clamp(1rem, 3.5vw, 2.75rem)'}}
                >
                  Project Manager &
                </h1>
                <h1 
                  className={`leading-none font-normal ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
                  style={{fontSize: 'clamp(1rem, 3.5vw, 2.75rem)'}}
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
              className={`leading-none font-normal mb-2 ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
              style={{fontSize: 'clamp(1.375rem, 3.5vw, 2.5rem)'}}
            >
              Project Manager &
            </h1>
            <h1 
              className={`leading-none font-normal ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
              style={{fontSize: 'clamp(1.375rem, 3.5vw, 2.5rem)'}}
            >
              Software Engineer
            </h1>
          </div>
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
      
      {/* Content Section - White Background */}
      <div className="relative bg-white min-h-[200vh]">
        {/* Content area 1 with Parallax */}
        <div className="relative h-screen flex items-center justify-center">
          <div ref={contentArea1Ref} className="relative z-10 text-black text-center">
            <h2 className="text-4xl font-light mb-4">Experience & Expertise</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Bridging the gap between technical excellence and strategic project management. 
              With dual citizenship and a global perspective, I bring innovative solutions 
              to complex challenges in software development and team leadership.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-500">
              <div>Project Management</div>
              <div>Software Engineering</div>
              <div>Team Leadership</div>
              <div>Strategic Planning</div>
            </div>
          </div>
        </div>
        
        {/* Content area 2 with Parallax */}
        <div className="relative h-screen flex items-center justify-center">
          <div ref={contentArea2Ref} className="relative z-10 text-black text-center">
            <h2 className="text-4xl font-light mb-4">Global Perspective</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Operating across international markets with deep understanding of both 
              American and European business cultures. Specialized in building 
              cross-functional teams that deliver exceptional results.
            </p>
            <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-stone-100 rounded-full mb-2"></div>
                <span>Agile Methodologies</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-stone-100 rounded-full mb-2"></div>
                <span>Technical Architecture</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-stone-100 rounded-full mb-2"></div>
                <span>International Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}