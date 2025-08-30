"use client";

import Image from "next/image";
import { useParallaxScroll } from "../app/hooks/useParallaxScroll";

// Globe Spinner Component
const GlobeSpinner = ({ className = "" }) => {
  return (
    <div className={`globe-container ${className}`}>
      <div className="globe">
        {/* Longitude lines (vertical circles) */}
        <div className="circle longitude" />
        <div className="circle longitude" />
        <div className="circle longitude" />
        
        {/* Latitude lines (horizontal circles) */}
        <div className="circle latitude" />
        <div className="circle latitude" />
        <div className="circle latitude" />
        
        {/* Equator - slightly thicker */}
        <div className="circle equator" />
        
        {/* Poles */}
        <div className="pole north" />
        <div className="pole south" />
      </div>
      
      <style jsx>{`
        .globe-container {
          perspective: 1000px;
        }
        
        .globe {
          width: 80px;
          height: 80px;
          position: relative;
          animation: globe-rotate 4s infinite linear;
          transform-style: preserve-3d;
          transform: rotateX(-15deg) rotateY(0deg);
        }
        
        .circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          background: transparent;
        }
        
        /* Longitude lines (vertical circles) */
        .longitude:nth-child(1) {
          transform: rotateY(0deg);
        }
        
        .longitude:nth-child(2) {
          transform: rotateY(60deg);
        }
        
        .longitude:nth-child(3) {
          transform: rotateY(120deg);
        }
        
        /* Latitude lines (horizontal circles) */
        .latitude {
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        
        .latitude:nth-child(4) {
          height: 60%;
          width: 60%;
          top: 20%;
          left: 20%;
          transform: rotateX(90deg) translateZ(20px);
        }
        
        .latitude:nth-child(5) {
          height: 60%;
          width: 60%;
          top: 20%;
          left: 20%;
          transform: rotateX(90deg) translateZ(-20px);
        }
        
        .latitude:nth-child(6) {
          height: 85%;
          width: 85%;
          top: 7.5%;
          left: 7.5%;
          transform: rotateX(90deg) translateZ(10px);
        }
        
        /* Equator */
        .equator {
          transform: rotateX(90deg);
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        
        /* Poles */
        .pole {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .north {
          top: -3px;
        }
        
        .south {
          bottom: -3px;
        }
        
        @keyframes globe-rotate {
          0% {
            transform: rotateX(-15deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(-15deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  // Main text parallax (fastest)
  const textRef = useParallaxScroll<HTMLDivElement>({
    speed: 1.5,
    smoothness: 0.1
  });

  // Globe parallax (subtle movement)
  const globeRef = useParallaxScroll<HTMLDivElement>({
    speed: 0.3,
    smoothness: 0.2
  });

  // Section parallax effects with different speeds
  const section2Ref = useParallaxScroll<HTMLDivElement>({
    speed: 0.6,
    smoothness: 0.12
  });

  const section2ImageRef = useParallaxScroll<HTMLDivElement>({
    speed: 1.8,
    smoothness: 0.08
  });

  const section3Ref = useParallaxScroll<HTMLDivElement>({
    speed: 0.4,
    smoothness: 0.15
  });

  const section3ImageRef = useParallaxScroll<HTMLDivElement>({
    speed: 2.2,
    smoothness: 0.06
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-400">
      <div className="h-[300vh]">
        
        {/* Hero Section */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-8xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-screen">
              
              {/* Left side with Globe */}
              <div className="hidden md:flex md:col-start-1 justify-center items-center">
                <div 
                  ref={globeRef}
                  className="relative"
                >
                  <GlobeSpinner className="scale-150 opacity-80" />
                  {/* Optional: Add text below globe */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <p className="text-sm text-gray-600 tracking-wider">GLOBAL PERSPECTIVE</p>
                  </div>
                </div>
              </div>

              {/* Hero Text with Fast Parallax */}
              <div 
                ref={textRef}
                className="hidden md:flex md:col-start-2 flex-col justify-center items-center text-left space-y-6 min-h-[80vh] md:min-h-0"
              >
                <div className="leading-tight tracking-tight whitespace-nowrap">
                  <h1 className="leading-none font-normal mb-6" style={{fontSize: 'clamp(1rem, 3.5vw, 2.5rem)'}}>
                    Project Manager &
                  </h1>
                  <h1 className="leading-none font-normal" style={{fontSize: 'clamp(1rem, 3.5vw, 2.5rem)'}}>
                    Software Engineer
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Floating mini globes for decoration */}
          <div className="absolute top-20 right-20 opacity-30 scale-50">
            <GlobeSpinner />
          </div>
          <div className="absolute bottom-32 left-32 opacity-20 scale-75">
            <GlobeSpinner />
          </div>
        </div>
        
        {/* Section 2 - Container with slower parallax, image with faster parallax */}
        <div 
          ref={section2Ref}
          className="relative h-screen bg-gray-300 flex items-center justify-center overflow-hidden"
        >
          {/* Background Image with Faster Parallax */}
          <div 
            ref={section2ImageRef}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-30">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                  backgroundSize: '60px 60px'
                }}></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Global Projects</h2>
            <p className="text-lg text-gray-600 max-w-md mb-8">
              Managing cross-functional teams and developing solutions that span continents, 
              bringing innovation to a worldwide scale.
            </p>
            {/* Small globe as section accent */}
            <div className="flex justify-center">
              <GlobeSpinner className="opacity-60" />
            </div>
          </div>
        </div>
        
        {/* Section 3 - Different parallax speeds */}
        <div 
          ref={section3Ref}
          className="relative h-screen bg-gray-400 flex items-center justify-center overflow-hidden"
        >
          {/* Background Image with Even Faster Parallax */}
          <div 
            ref={section3ImageRef}
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
          >
            <div className="relative w-full h-full bg-gradient-to-tr from-green-400 to-blue-500 opacity-25">
              {/* Geometric pattern background */}
              <div className="absolute inset-0 opacity-60">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(45deg, transparent 40%, white 40%, white 60%, transparent 60%)`,
                  backgroundSize: '100px 100px'
                }}></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Technical Excellence</h2>
            <p className="text-lg text-gray-600 max-w-md">
              Combining project management expertise with deep technical knowledge 
              to deliver solutions that work seamlessly across platforms and regions.
            </p>
          </div>
          
          {/* Floating Elements for Extra Visual Interest */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/15 rounded-full blur-md"></div>
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-white/25 rounded-full"></div>
          
          {/* Floating globe in corner */}
          <div className="absolute top-16 right-16 opacity-40">
            <GlobeSpinner />
          </div>
        </div>
      </div>
    </div>
  );
}