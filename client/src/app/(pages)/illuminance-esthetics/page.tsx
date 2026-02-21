"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIndicator, TechStackSection, CTASection, MetricsStrip, ArchitectureDiagram } from "@/app/components/shared/CaseStudySections";
import ProjectNav from "@/app/components/shared/ProjectNav";
import { useReveal, reveal } from "@/app/hooks/useReveal";

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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function IlluminanceCaseStudy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const hero = useReveal<HTMLElement>(0.1);
  const problem = useReveal<HTMLDivElement>();
  const solution = useReveal<HTMLDivElement>();
  const eng = useReveal<HTMLDivElement>();
  const outcome = useReveal<HTMLDivElement>();

  // Hero headline word-stagger
  useEffect(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll(".word");
    gsap.fromTo(words,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const headlineWords = "I owned the core feature, led client calls, and shipped 10 features in 10 weeks.".split(" ");

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="illuminance-esthetics" />

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-16 sm:py-24 md:py-32">
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

        <ScrollIndicator />
      </section>

      {/* ────────────────── 2. METRICS STRIP ────────────────── */}
      <MetricsStrip metrics={METRICS} accentColor="violet" />

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
          <ArchitectureDiagram flow={ARCH_FLOW} accentLabel="AWS S3 Buckets" accentColor="violet" />

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
      <TechStackSection tech={TECH} />

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
      <CTASection />
    </div>
  );
}
