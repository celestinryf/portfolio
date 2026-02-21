"use client";

import HeroSection from "@/app/components/sections/HeroSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ExperienceSection from "@/app/components/sections/ExperienceSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
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
        {/* Background */}
        <div className="absolute inset-0 bg-white dark:bg-black z-20 pointer-events-none" />

        {/* Content */}
        <div className="relative snap-section z-20 transition-colors duration-300">
          <div className="w-full max-w-[1880px] px-[5vw] mx-auto" style={{ paddingTop: "10vh" }}>
            <AboutSection />
            <ExperienceSection />
          </div>
        </div>
      </div>
    </div>
  );
}
