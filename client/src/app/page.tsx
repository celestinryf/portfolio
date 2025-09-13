"use client";

import { useEffect, useState, useRef, useCallback } from "react";

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
  const contentBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0.4 }); // Independent white background parallax
  const heroTextDesktopRef = useParallaxScroll<HTMLDivElement>({ speed: 0.4 });
  const heroTextMobileRef = useParallaxScroll<HTMLDivElement>({ speed: 0.6 });
  const locationPillRef = useParallaxScroll<HTMLDivElement>({ speed: 0.8 });
  const contentArea1Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3});
  const contentArea2Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const project1Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const project2Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const project3Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });

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
  }, []);

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
      <div ref={heroBackgroundRef} className="relative z-10 min-h-screen bg-stone-400 snap-section">
        <div className="w-full max-w-8xl mx-auto">
          <div className="hidden md:grid grid-cols-2 gap-0 items-center min-h-screen">
            {/* Hero Text - Desktop with Parallax */}
            <div className="col-start-2 flex flex-col justify-center items-center text-left space-y-6">
              <div ref={heroTextDesktopRef} className="leading-tight tracking-tight whitespace-nowrap">
                <h1 
                  className={`leading-none font-normal mb-6 ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
                  style={{fontSize: 'clamp(1rem, 2vw, 2.75rem)'}}
                >
                  Project Manager &
                </h1>
                <h1 
                  className={`leading-none font-normal ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
                  style={{fontSize: 'clamp(1rem, 2vw, 2.75rem)'}}
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
      
      {/* Content Section - White Background with Parallax Gap Fix */}
      <div className="relative">
        {/* White Background with Dynamic Height to Prevent Gaps */}
        <div 
          ref={contentBackgroundRef} 
          className="absolute inset-0 bg-white dark:bg-black z-11 pointer-events-none"
          style={{ 
            // height: contentHeight, // Dynamic height based on parallax movement
            minHeight: '1000vh' // Fallback minimum coverage
          }}
        />
        
        {/* Experience Section */}
        <div 
          className="relative snap-section z-20 transition-colors duration-300 pointer-events-auto"
        >
          <div className="w-full md:w-[66vw] mx-auto" style={{ paddingTop: '10vh' }}>
            
            {/* Experience Header */}
            <div ref={contentArea1Ref} className="mb-20">
              <h2 className="text-5xl md:text-7xl font-light text-black dark:text-white tracking-tight">My experience</h2>
            </div>

            {/* === Project 1 === */}
            <div ref={project1Ref} className="mb-32">
              <div className="mx-auto">

                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                    <h4 className="text-4xl text-black dark:text-white font-normal">Cloud Solutions Architect</h4>
                    <p className="text-sm text-black dark:text-gray-300">Amazon Web Services</p>
                  </div>

                  <div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Designed and deployed multi-region, fault-tolerant architectures for Fortune 500 companies migrating to AWS.</p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Reduced infrastructure costs by 45% while improving system reliability to 99.99% uptime through automated scaling and monitoring.</p>
                    </div>
                    <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
                      <a href="/projects" className="inline-flex items-center text-black dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors">
                        Check Projects
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full h-[600px] bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-300/10 dark:to-red-300/10 rounded-lg shadow-lg mb-8"></div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">01</p>
                    <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">Enterprise Migration Suite</h5>
                    <p className="text-black dark:text-gray-300 text-sm mb-4">Cloud Transformation</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl text-black dark:text-white font-normal mb-2">Cloud Architecture</h3>
                      <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
                        Designing resilient, scalable cloud infrastructure solutions
                      </p>
                    </div>
                    <p className="text-black dark:text-gray-300 leading-relaxed">
                      Architected comprehensive cloud migration strategies for enterprise clients, facilitating the seamless transition of legacy systems to AWS infrastructure...
                    </p>
                    <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4">
                      View Case Study
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* === Project 2 === */}
            <div ref={project2Ref} className="mb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h4 className="text-xl md:text-2xl text-black dark:text-white font-normal">Senior Software Engineer</h4>
                  <p className="text-sm text-black dark:text-gray-300 mb-8">Spotify</p>
                  <div className="w-full h-[600px] bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-300/10 dark:to-emerald-300/10 shadow-lg"></div>
                </div>

                <div className="text-left">
                  <div className="mb-8">
                    <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">02</p>
                    <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">Discover Weekly Engine</h5>
                    <p className="text-black dark:text-gray-300 text-sm mb-4">Music Discovery</p>
                  </div>

                  <div className="mb-8">
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Architected and implemented the recommendation engine powering Spotify's Discover Weekly, serving 200M+ users.</p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Built microservices using Python, Go, and Kubernetes, reducing latency by 60% and improving user engagement by 35%.</p>
                    </div>
                    <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
                      <a href="/projects" className="inline-flex items-center text-black dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors">
                        Check Projects
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl text-black dark:text-white font-normal mb-2">Software Development</h3>
                      <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
                        Full-stack development with focus on scalable web applications
                      </p>
                    </div>
                    <p className="text-black dark:text-gray-300 leading-relaxed">
                      Led the technical implementation of Spotify's revolutionary Discover Weekly feature...
                    </p>
                    <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4">
                      View Case Study
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* === Project 3 === */}
            <div ref={project3Ref} className="mb-32" style={{
                marginBottom: 'calc(10rem - 70vh)'
              }}>
              <div className="mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                    <h4 className="text-xl md:text-2xl text-black dark:text-white font-normal">Lead DevOps Engineer</h4>
                    <p className="text-sm text-black dark:text-gray-300">Netflix</p>
                  </div>

                  <div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Built and maintained CI/CD pipelines serving 200M+ global users with 99.99% uptime across multiple regions.</p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 py-4">
                      <p className="text-black dark:text-gray-300">Implemented infrastructure as code using Terraform and Kubernetes, reducing deployment time by 80%.</p>
                    </div>
                    <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
                      <a href="/projects" className="inline-flex items-components text-black dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors">
                        Check Projects
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="w-full h-[600px] bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-300/10 dark:to-pink-300/10 shadow-lg"></div>
                  <div className="w-full h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-300/10 dark:to-purple-300/10 shadow-lg"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">03</p>
                    <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">Global Streaming Platform</h5>
                    <p className="text-black dark:text-gray-300 text-sm mb-4">Infrastructure & DevOps</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl text-black dark:text-white font-normal mb-2">DevOps Excellence</h3>
                      <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
                        Scalable infrastructure and deployment automation
                      </p>
                    </div>
                    <p className="text-black dark:text-gray-300 leading-relaxed">
                      Architected and maintained the infrastructure powering Netflix's global streaming platform...
                    </p>
                    <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4">
                      View Case Study
                    </button>
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

