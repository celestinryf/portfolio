"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectNav from "@/app/components/shared/ProjectNav";
import { ScrollIndicator, TechStackSection, CTASection, MetricsStrip, ArchitectureDiagram } from "@/app/components/shared/CaseStudySections";
import { useReveal, reveal } from "@/app/hooks/useReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ────────────────────────────────────────────────────────────────────

const METRICS = [
  { value: 90, suffix: "%", label: "Time Saved Per Problem", desc: "From 20 minutes to 2 minutes per worksheet problem" },
  { value: 83, suffix: "%", label: "Weekly Hours Reclaimed", desc: "From 6 hours/week on worksheets down to just 1" },
  { value: 45, suffix: "%", label: "Faster Support Resolution", desc: "Intern project: ticketing system replaced email chains" },
  { value: 25, suffix: "%", label: "DB Performance Gain", desc: "Intern project: AWS RDS read replica architecture" },
];

const PROBLEMS = [
  { title: "Fragmented storage", body: "Worksheets lived in a cluttered shared Google Drive with no consistent naming, tagging, or version control." },
  { title: "Rework & duplication", body: "Facilitators rebuilt existing problems because they couldn't discover or verify prior work — wasting hours every week." },
  { title: "No structured workflows", body: "Creating, reviewing, and printing worksheets was entirely manual — copy-pasting into Word docs by hand." },
  { title: "6 hours a week, gone", body: "Facilitators spent ~6 hours weekly and ~20 minutes per problem just managing worksheets instead of teaching." },
];

const SOLUTIONS = [
  { title: "End-to-End Feature Development", body: "Worked across the full stack — designed database tables, wrote Spring Boot routes, and built Next.js views for worksheet CRUD operations." },
  { title: "Problem Lookup & Generation", body: "Built search and filtering so facilitators can find existing problems in seconds and generate print-ready worksheets instantly." },
  { title: "Database Design & Optimization", body: "Designed PostgreSQL tables and optimized queries to support fast lookups across the growing problem library." },
  { title: "Client Communication", body: "Met frequently with faculty users to gather feedback, demo features, and iterate on the product — earning consistent praise from the department." },
];

const ENGINEERING = [
  { title: "Support Ticketing System", body: "Intern project: designed and built an internal ticketing system that cut faculty support resolution time by 45%." },
  { title: "AWS RDS Optimization", body: "Intern project: independently architected read replicas to offload high-volume queries, improving database performance by 25%." },
  { title: "IAM Security Layer", body: "Implemented AWS Cognito + JWT authentication with role-based access for professors, TAs, and administrators." },
  { title: "100% Test Coverage", body: "Maintained complete JUnit coverage across all REST endpoints — every feature shipped with tests and passed CI." },
];

const TECH = ["Next.js", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "AWS RDS", "AWS Cognito", "JWT", "JUnit", "REST API"];

const ARCH_FLOW = ["Next.js Frontend", "Spring Boot API", "Services", "Repositories", "PostgreSQL + RDS"];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SETlibCaseStudy() {
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

  const headlineWords = "I shipped production features like a junior engineer, then delivered my own projects on top.".split(" ");

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="SETlib" />

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-16 sm:py-24 md:py-32">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">

            <div className="col-span-12 md:col-span-7 space-y-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
                University of Washington Tacoma &nbsp;/&nbsp; June – Sept 2025
              </p>

              <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-black dark:text-white">
                {headlineWords.map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[560px]">
                UW Tacoma&apos;s SET department needed a document management system to replace
                their messy Google Drive. I joined the team and contributed end-to-end on a
                Next.js + Spring Boot CRUD platform — designing tables, writing routes, optimizing
                queries, and talking directly to users. Then I delivered my own intern projects
                that moved the needle even further.
              </p>

              <span className="inline-block bg-lime-400/20 text-lime-700 dark:text-lime-400 px-4 py-1.5 rounded-full text-sm font-medium">
                Software Engineer Intern
              </span>
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200 dark:bg-neutral-800">
                <Image src="/assets/SETlib.png" alt="SETLib platform" fill className="object-cover" priority sizes="(min-width: 768px) 40vw, 90vw" />
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ────────────────── 2. METRICS STRIP ────────────────── */}
      <MetricsStrip metrics={METRICS} accentColor="lime" />

      {/* ────────────────── 3. THE PROBLEM ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={problem.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-lime-600 dark:text-lime-400 font-medium mb-4 ${reveal(problem.visible)}`}>
            01 / The Problem
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(problem.visible, 100)}`}>
            Worksheets were scattered, duplicated, and often lost
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg ${reveal(problem.visible, 200)}`}>
              The SET department&apos;s facilitators create technical worksheets for students
              across multiple subjects and difficulty levels. But without any structured system,
              everything lived in a messy shared Google Drive. Facilitators spent ~20 minutes
              per problem and ~6 hours every week just managing worksheets — finding old ones,
              rebuilding lost ones, and manually formatting them for print. The department needed
              a real document management system.
            </p>

            <div className="space-y-6">
              {PROBLEMS.map((p, i) => (
                <div key={p.title}
                  className={`border-l-2 border-lime-400 pl-6 ${reveal(problem.visible, 250 + i * 100)}`}>
                  <h4 className="font-semibold text-black dark:text-white mb-1">{p.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 ${reveal(problem.visible, 600)}`}>
            <Image src="/assets/mock1.png" alt="Legacy file sprawl" fill className="object-cover" sizes="(min-width: 768px) 80vw, 95vw" />
          </div>
        </div>
      </section>

      {/* ────────────────── 4. THE SOLUTION ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={solution.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-lime-600 dark:text-lime-400 font-medium mb-4 ${reveal(solution.visible)}`}>
            02 / The Solution
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(solution.visible, 100)}`}>
            A full-stack CRUD platform that cut worksheet time from hours to minutes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${reveal(solution.visible, 200)}`}>
              <Image src="/assets/mock.png" alt="SETLib platform" fill className="object-cover" sizes="(min-width: 768px) 45vw, 90vw" />
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

      {/* ────────────────── 5. ENGINEERING ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={eng.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-lime-600 dark:text-lime-400 font-medium mb-4 ${reveal(eng.visible)}`}>
            03 / Engineering
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(eng.visible, 100)}`}>
            Beyond the base work — my intern projects
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(eng.visible, 200)}`}>
            On top of shipping features as part of the team, I was given my own intern projects
            that had direct impact on the platform — a support ticketing system, AWS infrastructure
            optimization, and a security layer. I saw the platform through to deployment.
          </p>

          {/* Architecture Diagram */}
          <ArchitectureDiagram flow={ARCH_FLOW} accentLabel="AWS Cognito + JWT" accentColor="lime" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {ENGINEERING.map((e, i) => (
              <div key={e.title}
                className={`bg-white dark:bg-black rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 ${reveal(eng.visible, 400 + i * 100)}`}>
                <h4 className="font-semibold text-black dark:text-white mb-2">{e.title}</h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>

          <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-700 ${reveal(eng.visible, 700)}`}>
            <Image src="/assets/SETlib.png" alt="SETLib architecture" fill className="object-cover" sizes="90vw" />
          </div>
        </div>
      </section>

      {/* ────────────────── 6. TECH STACK ────────────────── */}
      <TechStackSection tech={TECH} />

      {/* ────────────────── 7. OUTCOME ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={outcome.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-lime-600 dark:text-lime-400 font-medium mb-4 ${reveal(outcome.visible)}`}>
            04 / Outcome
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(outcome.visible, 100)}`}>
            20 minutes became 2. Six hours became one.
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(outcome.visible, 200)}`}>
            The platform replaced a broken Google Drive workflow with structured problem lookup,
            creation, and worksheet generation. Facilitators got their time back, the department
            got a searchable knowledge base, and I helped ship it to production.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {["/assets/mock1.png", "/assets/mock.png", "/assets/SETlib.png"].map((src, i) => (
              <div key={src} className={`group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${reveal(outcome.visible, 300 + i * 150)}`}>
                <Image src={src} alt={`SETLib screenshot ${i + 1}`} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 640px) 33vw, 90vw" />
              </div>
            ))}
          </div>

          <blockquote className={`text-center max-w-3xl mx-auto ${reveal(outcome.visible, 600)}`}>
            <span className="text-6xl text-lime-400 leading-none block mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-black dark:text-white leading-snug">
              I worked as part of the team like a junior engineer, shipped end-to-end features,
              delivered my own intern projects, and helped take the platform to production.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ────────────────── 8. CTA ────────────────── */}
      <CTASection />
    </div>
  );
}
