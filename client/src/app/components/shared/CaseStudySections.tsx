"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/app/components/shared/MagneticLink";
import { useReveal, reveal } from "@/app/hooks/useReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── ScrollIndicator ────────────────────────────────────────────────────────

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neutral-400">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  );
}

// ─── TechStackSection ───────────────────────────────────────────────────────

interface TechStackSectionProps {
  tech: string[];
}

export function TechStackSection({ tech }: TechStackSectionProps) {
  const techStack = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32">
      <div ref={techStack.ref} className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
        <p className={`text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 font-medium mb-10 ${reveal(techStack.visible)}`}>
          Built With
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {tech.map((t, i) => (
            <span key={t}
              className={`px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default ${reveal(techStack.visible, 100 + i * 60)}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTASection ─────────────────────────────────────────────────────────────

export function CTASection() {
  const cta = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 border-t border-neutral-200 dark:border-neutral-800">
      <div ref={cta.ref} className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
        <h2 className={`text-4xl md:text-6xl font-semibold text-black dark:text-white mb-10 ${reveal(cta.visible)}`}>
          Want to see more?
        </h2>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${reveal(cta.visible, 200)}`}>
          <MagneticLink
            href="/work"
            strength={0.4}
            className="rounded-full border-2 border-black dark:border-white px-6 sm:px-10 py-4 text-base font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            View all projects
          </MagneticLink>
          <MagneticLink
            href="/contact"
            strength={0.4}
            className="rounded-full bg-black dark:bg-white text-white dark:text-black px-6 sm:px-10 py-4 text-base font-medium hover:opacity-80 transition-all"
          >
            Get in touch
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

// ─── MetricsStrip ───────────────────────────────────────────────────────────

export interface Metric {
  value: number;
  suffix: string;
  label: string;
  desc: string;
}

interface MetricsStripProps {
  metrics: Metric[];
  accentColor: string; // e.g. "lime", "violet", "amber", "emerald", "orange"
  formatValue?: (value: number, suffix: string) => string;
}

export function MetricsStrip({ metrics, accentColor, formatValue }: MetricsStripProps) {
  const metricRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const metricsSection = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!metricsSection.current) return;
    const triggers: ScrollTrigger[] = [];

    metricRefs.current.forEach((el, i) => {
      if (!el) return;
      const m = metrics[i];
      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: m.value,
        duration: 1.8,
        ease: "power2.out",
        snap: { val: 1 },
        onUpdate: () => {
          el.textContent = formatValue
            ? formatValue(Math.round(obj.val), m.suffix)
            : `${Math.round(obj.val)}${m.suffix}`;
        },
        scrollTrigger: {
          trigger: metricsSection.current,
          start: "top 80%",
          once: true,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [metrics, formatValue]);

  return (
    <section ref={metricsSection} className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black dark:bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((m, i) => (
            <div key={m.label} className="text-center md:text-left">
              <span
                ref={(el) => { metricRefs.current[i] = el; }}
                className={`block text-3xl sm:text-5xl md:text-7xl font-bold text-${accentColor}-400`}
              >
                0{m.suffix}
              </span>
              <p className="text-sm md:text-base font-medium text-white/90 dark:text-black/90 mt-2">{m.label}</p>
              <p className="text-xs text-white/50 dark:text-black/50 mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ArchitectureDiagram ────────────────────────────────────────────────────

interface ArchitectureDiagramProps {
  flow: string[];
  accentLabel?: string;
  accentColor: string;
}

export function ArchitectureDiagram({ flow, accentLabel, accentColor }: ArchitectureDiagramProps) {
  const archRefs = useRef<(HTMLDivElement | null)[]>([]);
  const archSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!archSection.current) return;
    const boxes = archRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.fromTo(boxes,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: archSection.current, start: "top 75%", once: true },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div ref={archSection} className="mb-16 overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 min-w-0">
        {flow.map((label, i) => (
          <div key={label} className="flex items-center">
            <div
              ref={(el) => { archRefs.current[i] = el; }}
              className="bg-white dark:bg-black rounded-lg px-5 py-3 border border-neutral-200 dark:border-neutral-700 text-sm font-mono text-black dark:text-white whitespace-nowrap opacity-0"
            >
              {label}
            </div>
            {i < flow.length - 1 && (
              <div className="w-6 sm:w-8 md:w-12 flex items-center justify-center text-neutral-400 shrink-0 rotate-90 sm:rotate-0">
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 6h22M18 1l4 5-4 5" /></svg>
              </div>
            )}
          </div>
        ))}
      </div>
      {accentLabel && (
        <div className="flex items-center mt-3 ml-0 md:ml-[calc(80%)]">
          <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600 ml-12" />
          <div className={`bg-${accentColor}-400/20 text-${accentColor}-700 dark:text-${accentColor}-400 rounded-lg px-4 py-2 border border-${accentColor}-300 dark:border-${accentColor}-700 text-xs font-mono mt-2 ml-[-12px]`}>
            {accentLabel}
          </div>
        </div>
      )}
    </div>
  );
}
