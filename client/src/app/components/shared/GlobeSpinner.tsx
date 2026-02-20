export default function GlobeSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-8 h-8 ${className}`} style={{ perspective: "1000px" }}>
      <div
        className="relative w-full h-full animate-spin"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateZ(15deg)",
          animationDuration: "8s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {/* Longitude lines */}
        <div className="absolute inset-0 border border-white/60 rounded-full bg-transparent" style={{ transform: "rotateY(0deg)" }} />
        <div className="absolute inset-0 border border-white/60 rounded-full bg-transparent" style={{ transform: "rotateY(60deg)" }} />
        <div className="absolute inset-0 border border-white/60 rounded-full bg-transparent" style={{ transform: "rotateY(120deg)" }} />

        {/* Latitude lines */}
        <div className="absolute border border-white/50 rounded-full bg-transparent" style={{ height: "60%", width: "60%", top: "20%", left: "20%", transform: "rotateX(75deg) translateZ(8px)" }} />
        <div className="absolute border border-white/50 rounded-full bg-transparent" style={{ height: "60%", width: "60%", top: "20%", left: "20%", transform: "rotateX(75deg) translateZ(-8px)" }} />
        <div className="absolute border border-white/50 rounded-full bg-transparent" style={{ height: "85%", width: "85%", top: "7.5%", left: "7.5%", transform: "rotateX(75deg) translateZ(4px)" }} />

        {/* Equator */}
        <div className="absolute inset-0 rounded-full bg-transparent" style={{ transform: "rotateX(75deg)", border: "1.2px solid rgba(255, 255, 255, 0.7)" }} />
      </div>
    </div>
  );
}