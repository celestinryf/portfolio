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
  
  // Parallax refs with consistent smoothness and strategic speeds
  const heroBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0 });
  const contentBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0.4 }); // Independent white background parallax
  const heroTextDesktopRef = useParallaxScroll<HTMLDivElement>({ speed: 0.4 });
  const heroTextMobileRef = useParallaxScroll<HTMLDivElement>({ speed: 0.6 });
  const locationPillRef = useParallaxScroll<HTMLDivElement>({ speed: 0.8 });
  const contentArea1Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3});
  const contentArea2Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const project1Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const project2Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.2 });
  const project3Ref = useParallaxScroll<HTMLDivElement>({ speed: 0.1 });

  useEffect(() => {
    // Start the centralized parallax controller
    parallaxController.start();
    
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      parallaxController.stop();
    };
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
      
      {/* Content Section - White Background with Independent Parallax */}
      <div className="relative min-h-[200vh]">
        {/* White Background with Independent Parallax */}
        <div 
          ref={contentBackgroundRef} 
          className="absolute inset-0 bg-white z-11"
          style={{ height: '100%' }}
        />
        
        {/* Experience Section */}
        <div className="relative min-h-screen px-8 md:px-16 py-20 snap-section z-11">
          {/* Experience Header */}
          <div ref={contentArea1Ref} className="mb-20 ">
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">Experience</h2>
          </div>

          {/* Project 1 */}
          <div ref={project1Ref} className="mb-32">
            {/* Top Row - Skill and Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Main Skill */}
              <div className="max-w-full md:max-w-[33vw]">
                <h3 className="text-2xl md:text-3xl font-normal mb-2">Product Management</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Led cross-functional teams to deliver
                  enterprise cloud solutions
                </p>
              </div>
              
              {/* Position */}
              <div className="text-left md:text-right">
                <h4 className="text-xl md:text-2xl font-normal">Senior Product Manager</h4>
                <p className="text-sm text-gray-600">Microsoft Azure</p>
              </div>
            </div>

            {/* Info Table */}
            <div className="mb-12 max-w-4xl">
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700">Led the development of Azure's next-generation container orchestration platform, managing a team of 12 engineers and designers to deliver enterprise-grade solutions.</p>
              </div>
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700">Drove product strategy, roadmap definition, and go-to-market execution resulting in 40% YoY growth in enterprise adoption.</p>
              </div>
              <div className="border-t border-b border-gray-300 py-4">
                <a href="/projects" className="inline-flex items-center text-black hover:text-gray-600 transition-colors">
                  Check Projects
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project Image */}
            <div className="mb-12 flex justify-center">
              <div className="project-image w-full md:w-[66vw] h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-lg"></div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Title */}
              <div className="flex flex-col items-center text-center">
                <h5 className="text-3xl md:text-4xl font-light mb-3">Azure Container Platform</h5>
                <p className="text-gray-600">Cloud Infrastructure</p>
              </div>
              
              {/* Right Column - Description and Button */}
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-left">
                  Spearheaded the development of Azure's container orchestration platform, enabling enterprises to deploy and manage containerized applications at scale. The platform now serves over 10,000 enterprise customers globally, processing millions of container deployments daily. My role involved defining the product vision, managing stakeholder relationships, and ensuring seamless integration with existing Azure services.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                  View Case Study
                </button>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div ref={project2Ref} className="mb-32">
            {/* Top Row - Skill and Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Main Skill */}
              <div className="max-w-full md:max-w-[33vw]">
                <h3 className="text-2xl md:text-3xl font-normal mb-2">Software Development</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Full-stack development with focus on
                  scalable web applications
                </p>
              </div>
              
              {/* Position */}
              <div className="text-left md:text-right">
                <h4 className="text-xl md:text-2xl font-normal">Senior Software Engineer</h4>
                <p className="text-sm text-gray-600">Spotify</p>
              </div>
            </div>

            {/* Info Table */}
            <div className="mb-12 max-w-4xl">
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700">Architected and implemented the recommendation engine powering Spotify's Discover Weekly, serving 200M+ users.</p>
              </div>
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700">Built microservices using Python, Go, and Kubernetes, reducing latency by 60% and improving user engagement by 35%.</p>
              </div>
              <div className="border-t border-b border-gray-300 py-4">
                <a href="/projects" className="inline-flex items-center text-black hover:text-gray-600 transition-colors">
                  Check Projects
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project Image */}
            <div className="mb-12 flex justify-center">
              <div className="w-full md:w-[66vw] h-[400px] bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg shadow-lg"></div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Title */}
              <div className="flex flex-col items-center text-center">
                <h5 className="text-3xl md:text-4xl font-light mb-3">Discover Weekly Engine</h5>
                <p className="text-gray-600">Music Discovery</p>
              </div>
              
              {/* Right Column - Description and Button */}
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-left">
                  Led the technical implementation of Spotify's revolutionary Discover Weekly feature, utilizing machine learning algorithms and collaborative filtering to deliver personalized music recommendations. The system processes billions of data points weekly, analyzing listening patterns, user preferences, and musical attributes to create unique playlists for each user. This feature became one of Spotify's most beloved features, significantly increasing user retention.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                  View Case Study
                </button>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div ref={project3Ref} className="mb-32">
            {/* Top Row - Skill and Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Main Skill */}
              <div className="max-w-full md:max-w-[33vw]">
                <h3 className="text-2xl md:text-3xl font-normal mb-2">Cloud Architecture</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Designing resilient, scalable cloud
                  infrastructure solutions
                </p>
              </div>
              
              {/* Position */}
              <div className="text-left md:text-right">
                <h4 className="text-xl md:text-2xl font-normal">Cloud Solutions Architect</h4>
                <p className="text-sm text-gray-600">Amazon Web Services</p>
              </div>
            </div>

            {/* Info Table */}
            <div className="mb-12 max-w-4xl">
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700">Designed and deployed multi-region, fault-tolerant architectures for Fortune 500 companies migrating to AWS.</p>
              </div>
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700">Reduced infrastructure costs by 45% while improving system reliability to 99.99% uptime through automated scaling and monitoring.</p>
              </div>
              <div className="border-t border-b border-gray-300 py-4">
                <a href="/projects" className="inline-flex items-center text-black hover:text-gray-600 transition-colors">
                  Check Projects
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project Image */}
            <div className="mb-12 flex justify-center">
              <div className="w-full md:w-[66vw] h-[400px] bg-gradient-to-br from-orange-100 to-red-100 rounded-lg shadow-lg"></div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Title */}
              <div className="flex flex-col items-center text-center">
                <h5 className="text-3xl md:text-4xl font-light mb-3">Enterprise Migration Suite</h5>
                <p className="text-gray-600">Cloud Transformation</p>
              </div>
              
              {/* Right Column - Description and Button */}
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-left">
                  Architected comprehensive cloud migration strategies for enterprise clients, facilitating the seamless transition of legacy systems to AWS infrastructure. Developed automated migration tools and frameworks that reduced migration time by 70% while ensuring zero downtime. The solution included real-time monitoring, disaster recovery protocols, and cost optimization strategies that saved clients millions in operational expenses.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                  View Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content area 2 with Parallax */}
        <div className="relative h-screen flex items-center justify-center snap-section z-10">
        </div>
      </div>
    </div>
  );
}