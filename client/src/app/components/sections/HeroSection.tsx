"use client";

import { useParallaxScroll } from "@/app/utils/parallaxController";

export default function HeroSection() {
  const heroBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0 });

  return (
    <div
      ref={heroBackgroundRef}
      className="relative z-10 min-h-screen bg-stone-300 bg-cover bg-center snap-section"
      style={{ backgroundImage: "url('/assets/auraFarmingCelestin.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
