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
      {/* Role line over the hero: the page's h1 and its stable LCP text
          candidate (a bare full-viewport image is excluded from LCP by
          Chrome, which fails the Lighthouse CI gate) — the name itself
          already lives in the topbar */}
      <div className="absolute bottom-0 left-0 right-0 px-[5vw] pb-[10vh]">
        <h1
          className="text-white font-light tracking-tight leading-tight"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          Software engineer · CS student at the University of Washington
        </h1>
      </div>
    </div>
  );
}
