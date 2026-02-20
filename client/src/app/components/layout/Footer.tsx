"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/app/components/shared/MagneticLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageError, setImageError] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const blackBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const footer = footerRef.current;
    const blackBox = blackBoxRef.current;

    if (!footer || !blackBox) return;

    gsap.set(blackBox, {
      yPercent: 0
    });

    gsap.to(blackBox, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "top center",
        scrub: 3,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'America/Los_Angeles',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black dark:bg-white text-white dark:text-black overflow-hidden"
      style={{
        minHeight: '80vh',
        paddingTop: 'var(--section-padding)',
        paddingBottom: 'clamp(3em, 8vh, 6em)'
      }}
    >
      {/* Black box that covers the footer and slides up */}
      <div
        ref={blackBoxRef}
        className="absolute inset-0 bg-white dark:bg-black z-50"
        style={{ transformOrigin: 'top' }}
      />

      {/* Footer content */}
      <div className="relative z-10" style={{
        paddingLeft: 'var(--container-padding)',
        paddingRight: 'var(--container-padding)'
      }}>
        <div className="w-full max-w-[80em] mx-auto">
          {/* Main header section */}
          <div style={{ marginBottom: 'var(--gap-padding)' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center" style={{ gap: 'clamp(1.5em, 3vw, 2em)' }}>
              {/* Profile picture */}
              <div className="footer-profile translate-y-1/10 rounded-full flex-shrink-0 overflow-hidden">
                {!imageError ? (
                  <img
                    src="/assets/pfp.jpg"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10"></div>
                )}
              </div>
              <h1 className="footer-heading ">
                <span>Let&apos;s work</span>
              </h1>
            </div>
            <h1 className="footer-heading" style={{ marginTop: '0.25em' }}>
              together
            </h1>
          </div>

          {/* Center line with button */}
          <div className="relative" style={{ marginBottom: 'clamp(8em, 15vh, 12em)', marginTop: 'calc(clamp(3em, 8vh, 12em) + 2em)' }}>
            <div className="border-t border-white/40 dark:border-black/40"></div>

            {/* Get in touch circular button */}
            <MagneticLink
              href="/contact"
              strength={0.4}
              className="absolute left-1/2 md:left-3/4 -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 footer-circle-button rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer z-10"
            >
              <span className="footer-text font-medium">Get in touch</span>
            </MagneticLink>
          </div>

          {/* Email and Phone buttons */}
          <div className="flex flex-col md:flex-row" style={{
            gap: 'clamp(1em, 2vw, 1.5em)',
            marginTop: 'clamp(-14em, -10vh, -16em)'
          }}>
            <MagneticLink
              href="mailto:celestinryf@gmail.com"
              strength={0.3}
              className="footer-button footer-text border-2 border-white/40 dark:border-black/40 rounded-full hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all text-center"
            >
              celestinryf@gmail.com
            </MagneticLink>
            <MagneticLink
              href="tel:+12538819185"
              strength={0.3}
              className="footer-button footer-text border-2 border-white/40 dark:border-black/40 rounded-full hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all text-center"
            >
              +1 (253) 881-9185
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute max-w-[110em] mx-auto bottom-0 left-0 right-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0"
        style={{ padding: 'var(--gap-padding)' }}
      >
        {/* Local Time */}
        <div className="flex flex-col">
          <p className="footer-label footer-text text-white/60 dark:text-black/60 uppercase tracking-wide mb-2">
            Local Time
          </p>
          <div className="flex items-center space-x-2">
            <span className="footer-time footer-text text-white dark:text-black font-mono">
              {formatTime(currentTime)}
            </span>
            <span className="footer-label footer-text text-white/60 dark:text-black/60">
              PST
            </span>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-start md:items-end">
          <p className="footer-label footer-text text-white/60 dark:text-black/60 uppercase tracking-wide mb-2">
            Socials
          </p>
          <div className="flex gap-4">
            <MagneticLink
              href="https://linkedin.com/in/celestinryf"
              strength={0.2}
              className="footer-text text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors"
            >
              LinkedIn
            </MagneticLink>
            <MagneticLink
              href="https://github.com/celestinryf"
              strength={0.2}
              className="footer-text text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors"
            >
              GitHub
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* Optional gradient overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-t from-transparent to-white/10 dark:to-black/10"></div>
      </div>
    </footer>
  );
}
