"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative z-10 min-h-screen bg-stone-300 snap-section">
      <Image
        src="/assets/auraFarmingCelestin.jpg"
        alt="Celestin Ryf"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
