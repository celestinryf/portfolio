"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/app/components/shared/MagneticLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ────────────────────────────────────────────────────────────────────

const METRICS = [
  { value: 10, suffix: "", label: "Features in 10 Weeks", desc: "Every deadline hit early across the full sprint cycle" },
  { value: 7, suffix: "", label: "Person Engineering Team", desc: "1 PM, 1 senior engineer, 5 developers" },
  { value: 2, suffix: "", label: "Roles at Once", desc: "Full-stack developer + technical PM simultaneously" },
  { value: 100, suffix: "%", label: "On-Time Delivery", desc: "Ideation to full deployment with zero missed deadlines" },
];

const PROBLEMS = [
  { title: "No platform at all", body: "The beauty school had no digital system — students preparing for state esthetician exams had no structured way to access courses, track progress, or practice." },
  { title: "Complex content types", body: "Courses needed to support videos, images, text, multiple choice questions, and long-form questions — all tracked per student for scoring and completion." },
  { title: "Media storage at scale", body: "Handling rich media (video, images) for course content required a storage and delivery strategy that wouldn't tank performance or costs." },
  { title: "Greenfield uncertainty", body: "Starting from zero meant every architecture decision mattered — tech stack, data modeling, hosting, and deployment all had to be figured out together." },
];

const SOLUTIONS = [
  { title: "Owned the Course Feature", body: "Took full ownership of the course system — the core of the LMS. Designed the data model for courses with mixed content types (video, images, text, quizzes) and built it end-to-end." },
  { title: "S3 + PostgreSQL + Caching", body: "Architected media storage with AWS S3 for videos and images, PostgreSQL for structured course data and user progress, and caching layers for fast content delivery." },
  { title: "Student Progress Tracking", body: "Built the system for tracking user scores, quiz completion, and course progress — so students and admins could see exactly where each learner stood." },
  { title: "Technical PM Duties", body: "Led client presentations, managed roadmaps and sprint planning via Miro and Trello, ran team meetings, and established GitHub workflows alongside the PM." },
];

const ENGINEERING = [
  { title: "Data Modeling for Mixed Content", body: "Designed PostgreSQL schemas to handle courses containing videos, images, text blocks, multiple choice questions, and long-form responses — all linked to per-user progress." },
  { title: "Client Communication & Leadership", body: "Presented directly to the client weekly, ran roadmap sessions, and led team meetings. My PM manager recognized leadership qualities and actively mentored me into the role." },
  { title: "Tech Stack Decisions", body: "Involved in choosing the stack for my features — S3 for media, PostgreSQL for relational data, Docker for containerization, Vercel + AWS for hosting." },
  { title: "Ideation to Deployment", body: "Saw the project from first whiteboard session to production deployment. Contributed to architecture decisions, built features, and helped ship the final product." },
];

const TECH = ["Next.js", "TypeScript", "Go", "PostgreSQL", "AWS S3", "Docker", "Vercel", "REST API", "Trello", "Miro", "Git"];

const ARCH_FLOW = ["Next.js Frontend", "Go API Server", "Route Handlers", "PostgreSQL", "AWS S3"];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const reveal = (visible: boolean, delay = 0) =>
  `transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}` +
  (delay ? ` delay-[${delay}ms]` : "");

// ─── Page ────────────────────────────────────────────────────────────────────

export default function IlluminanceCaseStudy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metricRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const metricsSection = useRef<HTMLElement>(null);
  const archRefs = useRef<(HTMLDivElement | null)[]>([]);
  const archSection = useRef<HTMLDivElement>(null);

  const hero = useReveal<HTMLElement>(0.1);
  const problem = useReveal<HTMLDivElement>();
  const solution = useReveal<HTMLDivElement>();
  const eng = useReveal<HTMLDivElement>();
  const techStack = useReveal<HTMLDivElement>();
  const outcome = useReveal<HTMLDivElement>();
  const cta = useReveal<HTMLDivElement>();

  // Hero headline word-stagger
  useEffect(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll(".word");
    gsap.fromTo(words,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  // Metric counter animation
  useEffect(() => {
    if (!metricsSection.current) return;
    const triggers: ScrollTrigger[] = [];

    metricRefs.current.forEach((el, i) => {
      if (!el) return;
      const m = METRICS[i];
      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: m.value,
        duration: 1.8,
        ease: "power2.out",
        snap: { val: 1 },
        onUpdate: () => { el.textContent = `${obj.val}${m.suffix}`; },
        scrollTrigger: {
          trigger: metricsSection.current,
          start: "top 80%",
          once: true,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Architecture diagram sequential reveal
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

  const headlineWords = "I owned the core feature, led client calls, and shipped 10 features in 10 weeks.".split(" ");

  return (
    <div className="bg-white dark:bg-black">

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-32">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">

            <div className="col-span-12 md:col-span-7 space-y-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
                Insights Emerge &nbsp;/&nbsp; April – June 2025
              </p>

              <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-black dark:text-white">
                {headlineWords.map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[560px]">
                A 7-person team at Insights Emerge built a learning management system for
                Illuminance Esthetics — a beauty school helping students pass state
                esthetician exams. I owned the course feature end-to-end while simultaneously
                serving as a technical PM: leading client presentations, managing roadmaps,
                and running team meetings. We took it from ideation to full deployment.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-violet-400/20 text-violet-700 dark:text-violet-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  Full-Stack Developer
                </span>
                <span className="inline-block bg-violet-400/20 text-violet-700 dark:text-violet-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  Technical PM
                </span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200 dark:bg-neutral-800">
                <Image src="/assets/lms.png" alt="Illuminance Esthetics LMS" fill className="object-cover" priority sizes="(min-width: 768px) 40vw, 90vw" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neutral-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ────────────────── 2. METRICS STRIP ────────────────── */}
      <section ref={metricsSection} className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black dark:bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {METRICS.map((m, i) => (
              <div key={m.label} className="text-center md:text-left">
                <span
                  ref={(el) => { metricRefs.current[i] = el; }}
                  className="block text-5xl md:text-7xl font-bold text-violet-400"
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

      {/* ────────────────── 3. THE PROBLEM ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={problem.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400 font-medium mb-4 ${reveal(problem.visible)}`}>
            01 / The Problem
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(problem.visible, 100)}`}>
            A beauty school with no digital platform and a state exam to prepare for
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg ${reveal(problem.visible, 200)}`}>
              Illuminance Esthetics is a beauty school that prepares students to pass state
              esthetician exams. They had no digital platform — no way to deliver courses,
              track student progress, or manage instructor content at scale. The courses
              themselves were complex: videos, images, text content, multiple choice questions,
              long-form responses, all needing per-student scoring and completion tracking.
              Starting from zero, every architecture decision mattered.
            </p>

            <div className="space-y-6">
              {PROBLEMS.map((p, i) => (
                <div key={p.title}
                  className={`border-l-2 border-violet-400 pl-6 ${reveal(problem.visible, 250 + i * 100)}`}>
                  <h4 className="font-semibold text-black dark:text-white mb-1">{p.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 ${reveal(problem.visible, 600)}`}>
            <Image src="/assets/lms.png" alt="Illuminance Esthetics LMS" fill className="object-cover" sizes="(min-width: 768px) 80vw, 95vw" />
          </div>
        </div>
      </section>

      {/* ────────────────── 4. THE SOLUTION ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={solution.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400 font-medium mb-4 ${reveal(solution.visible)}`}>
            02 / What I Built
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(solution.visible, 100)}`}>
            I owned the course system and led from both sides of the table
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${reveal(solution.visible, 200)}`}>
              <Image src="/assets/lms.png" alt="LMS features" fill className="object-cover" sizes="(min-width: 768px) 45vw, 90vw" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOLUTIONS.map((s, i) => (
                <div key={s.title}
                  className={`bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-100 dark:border-neutral-800 ${reveal(solution.visible, 300 + i * 100)}`}>
                  <h4 className="font-semibold text-black dark:text-white mb-2 text-sm">{s.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 5. HOW I WORKED ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={eng.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400 font-medium mb-4 ${reveal(eng.visible)}`}>
            03 / How I Worked
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(eng.visible, 100)}`}>
            Developer and PM at the same time — from first whiteboard to production
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(eng.visible, 200)}`}>
            My PM saw leadership qualities early and brought me into product management
            alongside my engineering work. I ran client presentations, managed roadmaps
            with Miro and Trello, established GitHub workflows, and led team meetings —
            all while shipping my own features. We took the project from ideation to
            full deployment on Vercel and AWS.
          </p>

          {/* Architecture Diagram */}
          <div ref={archSection} className="mb-16 overflow-x-auto">
            <div className="flex items-center gap-0 min-w-[600px] md:min-w-0">
              {ARCH_FLOW.map((label, i) => (
                <div key={label} className="flex items-center">
                  <div
                    ref={(el) => { archRefs.current[i] = el; }}
                    className="bg-white dark:bg-black rounded-lg px-5 py-3 border border-neutral-200 dark:border-neutral-700 text-sm font-mono text-black dark:text-white whitespace-nowrap opacity-0"
                  >
                    {label}
                  </div>
                  {i < ARCH_FLOW.length - 1 && (
                    <div className="w-8 md:w-12 flex items-center justify-center text-neutral-400 shrink-0">
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 6h22M18 1l4 5-4 5" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {ENGINEERING.map((e, i) => (
              <div key={e.title}
                className={`bg-white dark:bg-black rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 ${reveal(eng.visible, 400 + i * 100)}`}>
                <h4 className="font-semibold text-black dark:text-white mb-2">{e.title}</h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 6. TECH STACK ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={techStack.ref} className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
          <p className={`text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 font-medium mb-10 ${reveal(techStack.visible)}`}>
            Built With
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {TECH.map((t, i) => (
              <span key={t}
                className={`px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default ${reveal(techStack.visible, 100 + i * 60)}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 7. OUTCOME ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={outcome.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400 font-medium mb-4 ${reveal(outcome.visible)}`}>
            04 / Outcome
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(outcome.visible, 100)}`}>
            10 features. 10 weeks. Every deadline hit early.
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(outcome.visible, 200)}`}>
            The team shipped 10 features in 10 weeks, hitting every deadline ahead of schedule.
            The platform went from a whiteboard idea to a fully deployed LMS on Vercel and AWS,
            with Docker containerization and a production-ready course system that handles
            rich media, student progress tracking, and quiz scoring. Both the PM and the client
            gave strong endorsements of my work.
          </p>

          <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 mb-16 ${reveal(outcome.visible, 300)}`}>
            <Image src="/assets/lms.png" alt="Final LMS platform" fill className="object-cover" sizes="90vw" />
          </div>

          <blockquote className={`text-center max-w-3xl mx-auto ${reveal(outcome.visible, 500)}`}>
            <span className="text-6xl text-violet-400 leading-none block mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-black dark:text-white leading-snug">
              I wore two hats — building the core course system as an engineer while
              leading client calls and sprint planning as a PM. We shipped a full product
              from zero to deployment, and I earned strong endorsements from both
              my manager and the client.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ────────────────── 8. CTA ────────────────── */}
      <section className="py-24 md:py-32 border-t border-neutral-200 dark:border-neutral-800">
        <div ref={cta.ref} className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
          <h2 className={`text-4xl md:text-6xl font-semibold text-black dark:text-white mb-10 ${reveal(cta.visible)}`}>
            Want to see more?
          </h2>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${reveal(cta.visible, 200)}`}>
            <MagneticLink
              href="/work"
              strength={0.4}
              className="rounded-full border-2 border-black dark:border-white px-10 py-4 text-base font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              View all projects
            </MagneticLink>
            <MagneticLink
              href="/contact"
              strength={0.4}
              className="rounded-full bg-black dark:bg-white text-white dark:text-black px-10 py-4 text-base font-medium hover:opacity-80 transition-all"
            >
              Get in touch
            </MagneticLink>
          </div>
        </div>
      </section>
    </div>
  );
}
