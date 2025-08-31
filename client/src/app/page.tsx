"use client";

import { useEffect, useState } from "react";

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
      </div>
      
      <style jsx>{`
        .globe-container {
          perspective: 1000px;
        }
        
        .globe {
          width: 32px;
          height: 32px;
          position: relative;
          animation: globe-rotate 8s infinite linear;
          transform-style: preserve-3d;
          transform: rotateZ(15deg) rotateY(0deg);
        }
        
        .circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.6);
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
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .latitude:nth-child(4) {
          height: 60%;
          width: 60%;
          top: 20%;
          left: 20%;
          transform: rotateX(75deg) translateZ(8px);
        }
        
        .latitude:nth-child(5) {
          height: 60%;
          width: 60%;
          top: 20%;
          left: 20%;
          transform: rotateX(75deg) translateZ(-8px);
        }
        
        .latitude:nth-child(6) {
          height: 85%;
          width: 85%;
          top: 7.5%;
          left: 7.5%;
          transform: rotateX(75deg) translateZ(4px);
        }
        
        /* Equator */
        .equator {
          transform: rotateX(75deg);
          border: 1.2px solid rgba(255, 255, 255, 0.7);
        }
        
        @keyframes globe-rotate {
          0% {
            transform: rotateZ(15deg) rotateY(0deg);
          }
          100% {
            transform: rotateZ(15deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

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

        /* Location pill styling */
        .location-pill {
          position: fixed;
          bottom: 40px;
          left: 40px;
          background: rgba(40, 40, 40, 0.85);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          padding: 12px 20px 12px 52px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 50;
        }

        .globe-wrapper {
          position: absolute;
          left: 10px;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .location-pill {
            bottom: 30px;
            left: 20px;
            padding: 10px 16px 10px 48px;
          }
        }
      `}</style>

      {/* Hero Section - Gray Background */}
      <div className="relative z-10 min-h-screen bg-stone-400">
        <div className="w-full max-w-8xl mx-auto">
          <div className="hidden md:grid grid-cols-2 gap-0 items-center min-h-screen">
            {/* Hero Text - Desktop */}
            <div className="col-start-2 flex flex-col justify-center items-center text-left space-y-6">
              <div className="leading-tight tracking-tight whitespace-nowrap">
                <h1 
                  className={`leading-none font-normal mb-6 ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
                  style={{fontSize: 'clamp(1rem, 3.5vw, 2.5rem)'}}
                >
                  Project Manager &
                </h1>
                <h1 
                  className={`leading-none font-normal ${isLoaded ? 'animate-slide-in-1' : 'opacity-0'}`} 
                  style={{fontSize: 'clamp(1rem, 3.5vw, 2.5rem)'}}
                >
                  Software Engineer
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Text - Mobile (Bottom Left) */}
        <div className="absolute bottom-24 left-8 md:hidden">
          <div className="leading-tight tracking-tight">
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
        
        {/* Location Pill with Globe - Fixed Position Bottom Left */}
        <div className={`location-pill ${isLoaded ? 'animate-slide-from-left' : 'opacity-0'}`}>
          <div className={`globe-wrapper ${isLoaded ? 'animate-fade-in-scale' : 'opacity-0'}`}>
            <GlobeSpinner />
          </div>
          <span 
            className="text-white/90 whitespace-nowrap"
            style={{
              fontSize: '13px',
              fontWeight: '300',
              letterSpacing: '0.02em'
            }}
          >
            American & French Citizenship
          </span>
        </div>
      </div>
      
      {/* Content Section - White Background */}
      <div className="relative bg-white min-h-[200vh]">
        {/* Content area 1 */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-black">
            <h2 className="text-4xl font-light">Content Area 1</h2>
          </div>
        </div>
        
        {/* Content area 2 */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-black">
            <h2 className="text-4xl font-light">Content Area 2</h2>
          </div>
        </div>
      </div>
    </div>
  );
}