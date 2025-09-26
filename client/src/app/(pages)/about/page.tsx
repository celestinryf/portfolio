"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

// Centralized parallax controller to prevent drift between elements
class ParallaxController {
  private elements: Map<HTMLElement, { speed: number; smoothness: number; currentY: number; targetY: number }> = new Map();
  private animationFrame: number | null = null;
  private currentScrollY: number = 0;

  register(element: HTMLElement, speed: number, smoothness: number) {
    this.elements.set(element, { speed, smoothness, currentY: 0, targetY: 0 });
  }

  unregister(element: HTMLElement) {
    this.elements.delete(element);
  }

  private updatePositions = () => {
    this.elements.forEach((data, element) => {
      const rate = this.currentScrollY * -data.speed;
      data.targetY = rate;
      
      // Smooth interpolation
      data.currentY += (data.targetY - data.currentY) * data.smoothness;
      
      // Apply transform
      element.style.transform = `translateY(${data.currentY}px)`;
    });
    
    this.animationFrame = requestAnimationFrame(this.updatePositions);
  };

  private handleScroll = () => {
    this.currentScrollY = window.scrollY;
    
    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(this.updatePositions);
    }
  };

  start() {
    this.updatePositions();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  stop() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

// Global controller instance
const parallaxController = new ParallaxController();

// Parallax hook that uses centralized controller
interface ParallaxOptions {
  speed: number;
  smoothness?: number;
}

function useParallaxScroll<T extends HTMLElement = HTMLElement>(
  options: ParallaxOptions
): React.RefObject<T | null> {
  const { speed, smoothness = 0.12 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    parallaxController.register(element, speed, smoothness);
    
    return () => {
      parallaxController.unregister(element);
    };
  }, [speed, smoothness]);

  return ref;
}

/* ---- gallery below the sections ---- */
const gallery = [
  { src: "/assets/mock1.png", alt: "SETlib Document Management", aspect: "aspect-[4/3]" },
  { src: "/assets/lms.png", alt: "Learning Management System", aspect: "aspect-[4/3]" },
  { src: "/assets/hack.png", alt: "Aura Farm Project", aspect: "aspect-[4/3]" },
  { src: "/assets/umarket (1).png", alt: "UMarket Platform", aspect: "aspect-[4/3]" },
  { src: "/assets/stock1.png", alt: "Development Setup", aspect: "aspect-[4/3]" },
  { src: "/assets/mock.png", alt: "UHackathon Team", aspect: "aspect-[4/3]" },
];

const ROTATE_MS = 5000;

const DAY_ROLES = ["Backend Engineer", "Full-Stack Developer", "Systems Architect"];
const NIGHT_ROLES = ["Organizer", "Founder", "Community Builder"];

const DAY_MEDIA = [
  { src: "/assets/mock1.png", alt: "Backend Development" },
  { src: "/assets/mock.png", alt: "Full-Stack Application" },
  { src: "/assets/umarket1.png", alt: "System Architecture" },
];
const NIGHT_MEDIA = [
  { src: "/assets/hackflyer.png", alt: "Open Source" },
  { src: "/assets/meeting2.png", alt: "Tech Community" },
  { src: "/assets/room.png", alt: "Problem Solving" },
];

/** Intro carousel slides */
const ABOUT_SLIDES = [
  { src: "/assets/aura farm.png", alt: "Celestin - Professional" },
  { src: "/assets/room.png", alt: "Celestin at UHackathon" },
  { src: "/assets/Meeting.png", alt: "Celestin coding" },
  { src: "/assets/DSC_0214.jpg", alt: "Celestin with team" },
];

/** Motion variants */
const textVariants = {
  enter: { y: 10, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
};
const imageVariants = {
  enter: { opacity: 0, scale: 0.98, filter: "blur(2px)" },
  center: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.02, filter: "blur(2px)" },
};

// Magnetic Gallery Item Component
interface GalleryItem {
  src: string;
  alt: string;
  aspect: string;
}

interface MagneticGalleryItemProps {
  item: GalleryItem;
}

function MagneticGalleryItem({ item}: MagneticGalleryItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;

    const handleMouseEnter = () => {
      setIsHovered(true);
      
      // Scale up animation
      gsap.to(image, {
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      // Scale back and reset position
      gsap.to(image, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Apply magnetic effect (reduced movement for subtlety)
      const magnetStrength = 0.15;
      const targetX = deltaX * magnetStrength;
      const targetY = deltaY * magnetStrength;
      
      // Smooth magnetic movement
      gsap.to(image, {
        x: targetX,
        y: targetY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${item.aspect} rounded-xl overflow-hidden bg-neutral-200 cursor-pointer transition-all duration-300`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={imageRef}
        className="w-full h-full transition-transform duration-300"
        style={{
          transformOrigin: "center center",
        }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [dayIdx, setDayIdx] = useState(0);
  const [nightIdx, setNightIdx] = useState(0);

  // intro carousel state
  const [aboutIdx, setAboutIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax refs with coordinated speeds between backgrounds and content
  const introBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0 });
  const introContentRef = useParallaxScroll<HTMLElement>({ speed: 0.2 });
  const introTextRef = useParallaxScroll<HTMLDivElement>({ speed: 0.2 });
  const introImageRef = useParallaxScroll<HTMLDivElement>({ speed: 0.2 });
  
  const dayBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const daySectionRef = useParallaxScroll<HTMLElement>({ speed: 0.4 });
  const dayContentRef = useParallaxScroll<HTMLDivElement>({ speed: 0 });
  
  const nightBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0.4 });
  const nightSectionRef = useParallaxScroll<HTMLElement>({ speed: 0.4 });
  const nightContentRef = useParallaxScroll<HTMLDivElement>({ speed: 0 });
  
  const galleryBackgroundRef = useParallaxScroll<HTMLDivElement>({ speed: 0.3 });
  const gallerySectionRef = useParallaxScroll<HTMLElement>({ speed: 0.2});
  const galleryHeaderRef = useParallaxScroll<HTMLDivElement>({ speed: 0 });

  useEffect(() => {
    // Start the centralized parallax controller
    parallaxController.start();
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    const id = setInterval(() => {
      setDayIdx((i) => (i + 1) % Math.max(DAY_ROLES.length, DAY_MEDIA.length));
      setNightIdx((i) => (i + 1) % Math.max(NIGHT_ROLES.length, NIGHT_MEDIA.length));
    }, ROTATE_MS);
    
    return () => {
      clearInterval(id);
      clearTimeout(timer);
      parallaxController.stop();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextAbout();
      if (e.key === "ArrowLeft") prevAbout();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const dayImg = DAY_MEDIA[dayIdx % DAY_MEDIA.length];

  const nightRole = NIGHT_ROLES[nightIdx % NIGHT_ROLES.length];
  const nightImg = NIGHT_MEDIA[nightIdx % NIGHT_MEDIA.length];

  const LONGEST_DAY_ROLE = DAY_ROLES.reduce((a, b) => (b.length > a.length ? b : a), DAY_ROLES[0]);
  const LONGEST_NIGHT_ROLE = NIGHT_ROLES.reduce((a, b) => (b.length > a.length ? b : a), NIGHT_ROLES[0]);

  const nextAbout = () => setAboutIdx((i) => (i + 1) % ABOUT_SLIDES.length);
  const prevAbout = () => setAboutIdx((i) => (i - 1 + ABOUT_SLIDES.length) % ABOUT_SLIDES.length);

  return (
    <div className="about-page">
      {/* Add animations via CSS classes instead of styled-jsx */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.2s; }
          .stagger-3 { animation-delay: 0.3s; }
          .stagger-4 { animation-delay: 0.4s; }
          .stagger-5 { animation-delay: 0.5s; }
          .stagger-6 { animation-delay: 0.6s; }
        `
      }} />

      {/* Intro with RIGHT-SIDE image carousel */}
      <div className="relative">
        {/* Intro background layer */}
        <div ref={introBackgroundRef} className="absolute inset-0 pointer-events-none" />
        
        <main
          ref={introContentRef}
          className="
            container mx-auto px-5 sm:px-6
            pt-24 sm:pt-28 md:pt-32 lg:pt-40
            pb-12 sm:pb-16 md:pb-24
            relative
          "
        >
          {/* smaller gaps on mobile, same layout on md+ */}
          <section className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-32 items-center">
            {/* Left: copy */}
            <div ref={introTextRef} className="col-span-12 md:col-span-7 space-y-4 sm:space-y-6">
              <h1 className="text-3xl md:text-4xl font-semibold">I&apos;m Célestin</h1>
              <p className="text-neutral-700 dark:text-neutral-400">
                A software engineer with a passion for building scalable systems and solving complex problems. 
                My experience spans from machine learning pipelines to full-stack applications, always with a focus 
                on clean architecture and user-centered solutions. I approach engineering challenges with both 
                technical rigor and creative problem-solving.
              </p>
              <p className="text-neutral-700 dark:text-neutral-400">
                With American and French citizenship, I bring a global perspective to my work. When I&apos;m not coding, 
                you&apos;ll find me organizing hackathons, contributing to open source projects, or exploring the latest 
                in distributed systems and cloud architecture. I&apos;m passionate about building tech communities and 
                mentoring the next generation of developers.
              </p>
            </div>

            {/* Right: image carousel */}
            <div ref={introImageRef} className="col-span-12 md:col-span-4">
              <div
                className="
                  relative w-full
                  aspect-[4/5] sm:aspect-[1/1]
                  max-w-[22rem] sm:max-w-none
                  mx-auto md:mx-0
                  rounded-xl overflow-hidden bg-neutral-200
                "
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ABOUT_SLIDES[aboutIdx].src}
                    className="absolute inset-0"
                    initial={{ opacity: 0.8, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.8, scale: 1.01 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Image
                      src={ABOUT_SLIDES[aboutIdx].src}
                      alt={ABOUT_SLIDES[aboutIdx].alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 90vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* arrows (smaller on mobile) */}
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between p-2 sm:p-3">
                  <button
                    type="button"
                    aria-label="Previous photo"
                    className="pointer-events-auto inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur shadow hover:bg-white transition"
                    onClick={prevAbout}
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-800" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    className="pointer-events-auto inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur shadow hover:bg-white transition"
                    onClick={nextAbout}
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-800" />
                  </button>
                </div>

                {/* index chip */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rounded-full bg-black/60 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:py-1">
                  {aboutIdx + 1} / {ABOUT_SLIDES.length}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Full-bleed: by day (light) */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        {/* Day background layer */}
        <div ref={dayBackgroundRef} className="absolute inset-0 bg-neutral-50" />
        
        <section ref={daySectionRef} className="relative bg-transparent py-8 sm:py-10 md:py-36">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start">
              <div ref={dayContentRef} className="col-span-12 md:col-span-7 space-y-3 sm:space-y-4">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <h2 className="relative text-xl sm:text-2xl md:text-3xl font-semibold whitespace-nowrap shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={DAY_ROLES[dayIdx % DAY_ROLES.length]}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute inset-0 whitespace-nowrap text-black"
                      >
                        {DAY_ROLES[dayIdx % DAY_ROLES.length]}
                      </motion.span>
                    </AnimatePresence>
                    <span aria-hidden className="invisible">{LONGEST_DAY_ROLE}</span>
                  </h2>
                  <span className="text-neutral-700 dark:text-neutral-400">by day</span>
                </div>

                <p className="text-neutral-700 max-w-prose">
                  I build enterprise-grade systems that scale. From designing ML-powered document processing 
                  pipelines to architecting microservices handling 10K+ concurrent users, I focus on writing 
                  clean, maintainable code that solves real business problems efficiently.
                </p>
              </div>

              <div className="col-span-12 md:col-span-5">
                <div
                  className="
                    relative w-full
                    aspect-[4/5]
                    max-w-[22rem] sm:max-w-none
                    mx-auto md:mx-0
                    rounded-xl bg-neutral-200 overflow-hidden
                  "
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={dayImg.src}
                      className="absolute inset-0"
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={dayImg.src}
                        alt={dayImg.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 90vw"
                        priority={dayIdx === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Full-bleed: by night (dark) */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        {/* Night background layer */}
        <div ref={nightBackgroundRef} className="absolute inset-0 bg-neutral-900" />
        
        <section ref={nightSectionRef} className="relative bg-transparent py-8 sm:py-10 md:py-36 text-neutral-50">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start">
              <div ref={nightContentRef} className="col-span-12 md:col-span-7 space-y-3 sm:space-y-4">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <h2 className="relative text-xl sm:text-2xl md:text-3xl font-semibold whitespace-nowrap shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={nightRole}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute inset-0 whitespace-nowrap"
                      >
                        {nightRole}
                      </motion.span>
                    </AnimatePresence>
                    <span aria-hidden className="invisible">{LONGEST_NIGHT_ROLE}</span>
                  </h2>
                  <span className="text-neutral-400">by night</span>
                </div>

                <p className="text-neutral-200 max-w-prose">
                  I believe in giving back to the tech community. Whether it&apos;s organizing the largest hackathon 
                  south of Seattle, contributing to open source projects, or mentoring fellow developers, 
                  I&apos;m passionate about building connections and solving problems that matter.
                </p>
              </div>

              <div className="col-span-12 md:col-span-5">
                <div
                  className="
                    relative w-full
                    aspect-[4/5]
                    max-w-[22rem] sm:max-w-none
                    mx-auto md:mx-0
                    rounded-xl bg-neutral-700 overflow-hidden
                  "
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={nightImg.src}
                      className="absolute inset-0"
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={nightImg.src}
                        alt={nightImg.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 90vw"
                        priority={nightIdx === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative">
        <div ref={galleryBackgroundRef} className="absolute inset-0 pointer-events-none" />
        
        <main ref={gallerySectionRef} className="container mx-auto px-5 sm:px-6 py-12 sm:py-0">
          <section className="space-y-6 sm:space-y-8">
            <div 
              ref={galleryHeaderRef} 
              className={`text-left ${
                isLoaded ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h2 className="text-2xl font-normal">Check out some of my work!</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gallery.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    isLoaded
                      ? `animate-fade-in-up stagger-${Math.min(index + 2, 6)}`
                      : "opacity-0"
                  }`}
                >
                  <MagneticGalleryItem 
                    item={item} 
                  />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}