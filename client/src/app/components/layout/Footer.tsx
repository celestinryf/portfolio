"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic Link Component using GSAP
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

function MagneticLink({ href, children, strength = 0.3, className = "", onClick }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const innerTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const text = textRef.current;
    const innerText = innerTextRef.current;
    
    if (!link || !text || !innerText) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      // Move the link container with matrix3d for hardware acceleration
      gsap.to(link, {
        duration: 0.3,
        x: deltaX,
        y: deltaY,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
      
      // Move the text with less intensity
      gsap.to(text, {
        duration: 0.3,
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
    };

    const handleMouseLeave = () => {
      // Return to original position with elastic ease
      gsap.to(link, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
      
      gsap.to(text, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
    };

    link.addEventListener('mousemove', handleMouseMove);
    link.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      link.removeEventListener('mousemove', handleMouseMove);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={onClick}
      className={`relative cursor-pointer ${className}`}
      style={{ transform: 'rotate(0.001deg)' }}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <span 
        ref={textRef}
        className="transition-colors duration-200"
        style={{ transform: 'rotate(0.001deg)' }}
      >
        <span 
          ref={innerTextRef}
          style={{ transform: 'rotate(0.001deg)' }}
        >
          {children}
        </span>
      </span>
    </a>
  );
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
    // Only run animation on client side
    if (typeof window === "undefined") return;
    
    const footer = footerRef.current;
    const blackBox = blackBoxRef.current;
    
    if (!footer || !blackBox) return;

    // Set initial state - black box covers everything
    gsap.set(blackBox, {
      yPercent: 0
    });

    // Create the reveal animation
    gsap.to(blackBox, {
      yPercent: -100, // Move the black box up and out of view
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top bottom", // Start when footer enters viewport
        end: "top center",   // End when footer reaches center
        scrub: 3,           // Very smooth scrolling animation
        markers: false,     // Set to true if you want to debug trigger points
      }
    });

    // Cleanup
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
      style={{ height: '100vh' }}
    >
      {/* Black box that covers the footer and slides up */}
      <div
        ref={blackBoxRef}
        className="absolute inset-0 bg-white dark:bg-black z-50"
        style={{ transformOrigin: 'top' }}
      />

      {/* Footer content */}
      <div className="absolute inset-0 flex items-start pt-[22.5vh]">
        <div className="w-full px-[15vw]">
          {/* Main header section - LEFT ALIGNED */}
          <div className="mb-20">
            <div className="flex items-center gap-8">
              {/* Profile picture - larger size */}
              <div className="w-25 h-25 rounded-full bg-white/20 dark:bg-black/20 flex-shrink-0 overflow-hidden">
                {!imageError ? (
                  <img 
                    src="/pfp.jpg" 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10"></div>
                )}
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-light leading-none">
                <span>Let's work</span>
              </h1>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-light mt-4 leading-none">together.</h1>
          </div>

          {/* Center line with buttons */}
          <div className="relative w-full mb-16">
            <div className="border-t-1 border-white/40 dark:border-black/40"></div>
            
            {/* Get in touch circular button - overlayed on the line */}
            <MagneticLink 
              href="mailto:hello@yourname.com"
              strength={0.4}
              className="absolute left-225 -translate-y-1/2 w-50 h-50 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer z-10"
            >
              <span className="text-base font-medium">Get in touch</span>
            </MagneticLink>
          </div>

          {/* Email and Phone buttons - larger spacing from line */}
          <div className="flex gap-4 -mt-[200px]">
            <MagneticLink 
              href="mailto:hello@yourname.com"
              strength={0.3}
              className="px-12 py-6 border-2 border-white/40 dark:border-black/40 rounded-full hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all"
            >
              <span className="text-base">celestinryf@gmail.com</span>
            </MagneticLink>
            <MagneticLink 
              href="tel:+1234567890"
              strength={0.3}
              className="px-12 py-6 border-2 border-white/40 dark:border-black/40 rounded-full hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all"
            >
              <span className="text-base">+1 (253) 881-9185</span>
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* Bottom bar - absolute positioned at corners */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-8">
        {/* Local Time - Far left corner */}
        <div className="flex flex-col">
          <p className="text-white/60 dark:text-black/60 text-sm uppercase tracking-wide mb-2">
            Local Time
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-white dark:text-black text-base font-mono">
              {formatTime(currentTime)}
            </span>
            <span className="text-white/60 dark:text-black/60 text-sm">
              PST
            </span>
          </div>
        </div>

        {/* Socials - Far right corner */}
        <div className="flex flex-col items-end">
          <p className="text-white/60 dark:text-black/60 text-sm uppercase tracking-wide mb-2">
            Socials
          </p>
          <MagneticLink 
            href="https://linkedin.com/in/celestinryf" 
            strength={0.2}
            className="text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors text-base"
          >
            LinkedIn
          </MagneticLink>
        </div>
      </div>
      
      {/* Optional: Add a subtle pattern or gradient to the footer background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-t from-transparent to-white/10 dark:to-black/10"></div>
      </div>
    </footer>
  );
}