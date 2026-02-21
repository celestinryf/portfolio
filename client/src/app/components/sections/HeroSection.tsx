"use client";

export default function HeroSection() {
  return (
    <div
      className="relative z-10 min-h-screen bg-stone-300 bg-cover bg-center snap-section"
      style={{ backgroundImage: "url('/assets/auraFarmingCelestin.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
