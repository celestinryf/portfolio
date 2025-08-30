"use client";

import Image from "next/image";
import { useParallaxScroll } from "../app/hooks/useParallaxScroll";

export default function Home() {
  // Main text parallax (fastest)
  const textRef = useParallaxScroll<HTMLDivElement>({
    speed: 1.5,
    smoothness: 0.1
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
              
              <div className="hidden md:block">
                {/* Optional: Add logo, subtitle, or other content here */}
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Section 2</h2>
            <p className="text-lg text-gray-600 max-w-md">
              This section container moves at 0.6x speed, while the background moves at 1.8x speed, 
              creating a layered parallax effect.
            </p>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Section 3</h2>
            <p className="text-lg text-gray-600 max-w-md">
              This section moves at 0.4x speed, while its background moves at 2.2x speed, 
              creating an even more dramatic parallax effect.
            </p>
          </div>
          
          {/* Floating Elements for Extra Visual Interest */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/15 rounded-full blur-md"></div>
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-white/25 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}