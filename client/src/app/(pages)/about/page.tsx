"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────
const ROTATE_MS = 5000;

const DAY_ROLES = ["Backend Engineer", "Full-Stack Developer", "Systems Architect"];
const DAY_MEDIA = [
  { src: "/assets/mock1.png", alt: "Backend Development" },
  { src: "/assets/mock.png", alt: "Full-Stack Application" },
  { src: "/assets/umarket1.png", alt: "System Architecture" },
];

const NIGHT_ROLES = ["Organizer", "Founder", "Community Builder"];
const NIGHT_MEDIA = [
  { src: "/assets/hackflyer.png", alt: "UHackathon" },
  { src: "/assets/meeting2.png", alt: "Tech Community" },
  { src: "/assets/room.png", alt: "Event Venue" },
];

const ABOUT_SLIDES = [
  { src: "/assets/aura farm.png", alt: "Celestin - Professional" },
  { src: "/assets/room.png", alt: "Celestin at UHackathon" },
  { src: "/assets/Meeting.png", alt: "Celestin leading a meeting" },
  { src: "/assets/DSC_0214.png", alt: "Celestin with team" },
];

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

const longest = (arr: string[]) => arr.reduce((a, b) => (b.length > a.length ? b : a), arr[0]);

// ─── Rotating Image Panel ────────────────────────────────────────────────────
function RotatingImage({ media, idx }: { media: { src: string; alt: string }[]; idx: number }) {
  const img = media[idx % media.length];
  return (
    <div className="relative w-full aspect-[4/5] max-w-[22rem] sm:max-w-none mx-auto md:mx-0 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700">
      <AnimatePresence mode="wait">
        <motion.div key={img.src} className="absolute inset-0" variants={imageVariants}
          initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: "easeOut" }}>
          <Image src={img.src} alt={img.alt} fill className="object-cover"
            sizes="(min-width: 768px) 33vw, 90vw" priority={idx === 0} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Rotating Title ──────────────────────────────────────────────────────────
function RotatingTitle({ roles, idx, suffix, className }: {
  roles: string[]; idx: number; suffix: string; className?: string;
}) {
  return (
    <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
      <h2 className="relative text-xl sm:text-2xl md:text-3xl font-semibold whitespace-nowrap shrink-0">
        <AnimatePresence mode="wait">
          <motion.span key={roles[idx % roles.length]} variants={textVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`absolute inset-0 whitespace-nowrap ${className ?? ""}`}>
            {roles[idx % roles.length]}
          </motion.span>
        </AnimatePresence>
        <span aria-hidden className="invisible">{longest(roles)}</span>
      </h2>
      <span className="text-neutral-500">{suffix}</span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [dayIdx, setDayIdx] = useState(0);
  const [nightIdx, setNightIdx] = useState(0);
  const [aboutIdx, setAboutIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDayIdx((i) => (i + 1) % Math.max(DAY_ROLES.length, DAY_MEDIA.length));
      setNightIdx((i) => (i + 1) % Math.max(NIGHT_ROLES.length, NIGHT_MEDIA.length));
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setAboutIdx((i) => (i + 1) % ABOUT_SLIDES.length);
      if (e.key === "ArrowLeft") setAboutIdx((i) => (i - 1 + ABOUT_SLIDES.length) % ABOUT_SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nextAbout = () => setAboutIdx((i) => (i + 1) % ABOUT_SLIDES.length);
  const prevAbout = () => setAboutIdx((i) => (i - 1 + ABOUT_SLIDES.length) % ABOUT_SLIDES.length);

  return (
    <div>
      {/* ── Intro ── */}
      <main className="container mx-auto px-5 sm:px-6 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24">
        <section className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-32 items-center">
          <div className="col-span-12 md:col-span-7 space-y-4 sm:space-y-6">
            <h1 className="text-3xl md:text-4xl font-semibold">I&apos;m Celestin</h1>
            <p className="text-neutral-700 dark:text-neutral-400">
              Software engineer and CS student at the University of Washington with
              deep interests in backend architecture, cloud infrastructure, machine
              learning, and data science. I ship fast, care about clean architecture,
              and focus on building systems that solve real problems at scale.
            </p>
            <p className="text-neutral-700 dark:text-neutral-400">
              My love for programming started with Hour of Code in elementary school
              and was cemented by a robotics class my freshman year of high school.
              Since then I&apos;ve interned at a startup and at UW, founded the 2nd
              largest CS club at UWT, and organized the largest hackathon south of
              Seattle. When I&apos;m not coding you&apos;ll find me watching Manchester
              United or raving.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[22rem] sm:max-w-none mx-auto md:mx-0 rounded-xl overflow-hidden bg-neutral-200">
              <AnimatePresence mode="wait">
                <motion.div key={ABOUT_SLIDES[aboutIdx].src} className="absolute inset-0"
                  initial={{ opacity: 0.8, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.8, scale: 1.01 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  <Image src={ABOUT_SLIDES[aboutIdx].src} alt={ABOUT_SLIDES[aboutIdx].alt}
                    fill className="object-cover" sizes="(min-width: 768px) 33vw, 90vw" priority />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between p-2 sm:p-3">
                <button type="button" aria-label="Previous photo" onClick={prevAbout}
                  className="pointer-events-auto inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur shadow hover:bg-white transition">
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-800" />
                </button>
                <button type="button" aria-label="Next photo" onClick={nextAbout}
                  className="pointer-events-auto inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur shadow hover:bg-white transition">
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-800" />
                </button>
              </div>

              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rounded-full bg-black/60 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:py-1">
                {aboutIdx + 1} / {ABOUT_SLIDES.length}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── By Day (light) ── */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="absolute inset-0 bg-neutral-50" />
        <section className="relative py-8 sm:py-10 md:py-36">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start">
              <div className="col-span-12 md:col-span-7 space-y-3 sm:space-y-4">
                <RotatingTitle roles={DAY_ROLES} idx={dayIdx} suffix="by day" className="text-black" />
                <p className="text-neutral-700 max-w-prose">
                  I build production systems across the full stack — from ML pipelines
                  processing 31M rows to Spring Boot platforms serving university
                  faculty. I focus on clean, maintainable code that solves real business
                  problems efficiently.
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <RotatingImage media={DAY_MEDIA} idx={dayIdx} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── By Night (dark) ── */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="absolute inset-0 bg-neutral-900" />
        <section className="relative py-8 sm:py-10 md:py-36 text-neutral-50">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start">
              <div className="col-span-12 md:col-span-7 space-y-3 sm:space-y-4">
                <RotatingTitle roles={NIGHT_ROLES} idx={nightIdx} suffix="by night" />
                <p className="text-neutral-200 max-w-prose">
                  I founded a 25-member software consultancy, organized the largest
                  hackathon south of Seattle, and built a mentorship program that&apos;s
                  placed 14 students into internships. I care about creating
                  opportunities for others to grow.
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <RotatingImage media={NIGHT_MEDIA} idx={nightIdx} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
