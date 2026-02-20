"use client";

import { useEffect } from "react";
import { parallaxController, useParallaxScroll } from "@/app/utils/parallaxController";
import HeroSection from "@/app/components/sections/HeroSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ExperienceSection from "@/app/components/sections/ExperienceSection";

export default function Home() {
  // Background layer behind the content section — slight parallax for depth
  const contentBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });

  useEffect(() => {
    parallaxController.start();

    // Dynamically expand the bg layer to cover max parallax travel
    const bgLayer = contentBackgroundRef.current;
    const sizeTimer = setTimeout(() => {
      if (!bgLayer) return;
      const maxMovement = window.innerHeight * 0.5 * 0.8;
      bgLayer.style.minHeight = `calc(100% + ${maxMovement}px)`;
    }, 200);

    return () => {
      clearTimeout(sizeTimer);
      parallaxController.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative min-h-screen overflow-hidden pointer-events-none">
      {/* Override scroll-snap to mandatory for the landing page snap points */}
      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: auto;
        }
        @media (max-width: 768px) {
          html { scroll-snap-type: y proximity; }
        }
      `}</style>

      <HeroSection />

      <div className="relative">
        {/* Parallax background layer */}
        <div
          ref={contentBackgroundRef}
          className="absolute inset-0 bg-white dark:bg-black z-20 pointer-events-none"
          style={{ minHeight: "1000vh" }}
        />

        {/* Content */}
        <div className="relative snap-section z-20 transition-colors duration-300 pointer-events-auto">
          <div className="w-full max-w-[1880px] px-[5vw] mx-auto" style={{ paddingTop: "10vh" }}>
            <AboutSection />
            <ExperienceSection />
          </div>
        </div>
      </div>
    </div>
  );
}
