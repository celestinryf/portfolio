"use client";

import { useEffect, useRef } from "react";
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
  { value: 50, suffix: "/mo", label: "Monthly Savings", desc: "Automated storage class transitions and lifecycle policies" },
  { value: 100, suffix: "", label: "Risk Score Range", desc: "0–100 scoring based on reversibility, age, and data loss potential" },
  { value: 0, suffix: "", label: "Unsafe Changes", desc: "Risk scoring prevents destructive operations from executing" },
  { value: 100, suffix: "%", label: "Rollback Coverage", desc: "Pre-state snapshots enable full reversion of every optimization" },
];

const PROBLEMS = [
  { title: "Unchecked S3 sprawl", body: "Buckets accumulate objects over time with no lifecycle policies — old data sits in expensive storage classes indefinitely." },
  { title: "Manual cost reviews", body: "Engineers audit S3 costs by hand, scrolling through the console to spot waste — tedious and error-prone." },
  { title: "Fear of data loss", body: "Teams avoid storage class changes because one wrong move could make critical data inaccessible or trigger unexpected costs." },
  { title: "No guardrails", body: "Existing tools either optimize too aggressively (risking data) or too conservatively (saving nothing)." },
];

const SOLUTIONS = [
  { title: "Automated Bucket Scanning", body: "Scans all S3 buckets, analyzes object age, access patterns, and storage class distribution to generate targeted recommendations." },
  { title: "Risk Scoring Engine", body: "Every recommendation gets a 0–100 risk score based on reversibility, object age, and data loss potential — only safe changes execute." },
  { title: "Rollback System", body: "Captures pre-state snapshots before every optimization, enabling one-click reversion of storage class and lifecycle policy changes." },
  { title: "Smart Transitions", body: "Enforces optimal storage class migrations (Standard → IA → Glacier) based on access frequency and object lifecycle." },
];

const ENGINEERING = [
  { title: "Serverless Architecture", body: "Deployed as a Lambda function triggered by EventBridge on a configurable schedule — zero infrastructure to manage." },
  { title: "Infrastructure as Code", body: "Entire stack defined in Terraform: Lambda, IAM roles, EventBridge rules, SNS topics, and S3 permissions." },
  { title: "Real-Time Notifications", body: "SNS + Slack integration delivers optimization reports and alerts so teams know exactly what changed and why." },
  { title: "Safe Execution Engine", body: "Recommendations above the risk threshold are flagged for manual review — the system never makes a change it can't undo." },
];

const TECH = ["Python", "boto3", "AWS Lambda", "EventBridge", "Terraform", "SNS", "S3", "IAM", "Slack API"];

const ARCH_FLOW = ["EventBridge", "Lambda Function", "S3 Scanner", "Risk Scorer", "Optimizer", "SNS / Slack"];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AWSCostOptimizationCaseStudy() {
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

  const headlineWords = "An automated S3 optimizer that scores risk before it touches your data.".split(" ");

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="aws-cost-optimization" />

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-16 sm:py-24 md:py-32">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">

            <div className="col-span-12 md:col-span-8 space-y-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
                Personal Project &nbsp;/&nbsp; Sept – Dec 2025
              </p>

              <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-black dark:text-white">
                {headlineWords.map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[600px]">
                S3 costs creep up silently. I built a Python tool that scans buckets,
                scores every optimization by risk, and only executes changes it can fully
                roll back — deployed serverless with Lambda, Terraform, and Slack alerts.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-emerald-400/20 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  Cloud Engineering
                </span>
                <span className="inline-block bg-emerald-400/20 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  DevOps
                </span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              {/* Terminal-style hero visual */}
              <div className="bg-neutral-950 dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl border border-neutral-800 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2 text-neutral-300">
                  <p><span className="text-emerald-400">$</span> aws-optimizer scan</p>
                  <p className="text-neutral-500">Scanning 12 buckets...</p>
                  <p className="text-neutral-500">Generating recommendations...</p>
                  <p>&nbsp;</p>
                  <p className="text-emerald-400">3 optimizations found</p>
                  <p className="text-neutral-400">├─ lifecycle-policy <span className="text-yellow-400">risk: 12</span></p>
                  <p className="text-neutral-400">├─ storage-class    <span className="text-yellow-400">risk: 28</span></p>
                  <p className="text-neutral-400">└─ archive-old      <span className="text-emerald-400">risk: 5</span></p>
                  <p>&nbsp;</p>
                  <p><span className="text-emerald-400">$</span> aws-optimizer execute --safe</p>
                  <p className="text-emerald-400">✓ Snapshot saved</p>
                  <p className="text-emerald-400">✓ 3/3 applied</p>
                  <p className="text-emerald-400">✓ Slack notified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ────────────────── 2. METRICS STRIP ────────────────── */}
      <MetricsStrip metrics={METRICS} accentColor="emerald" formatValue={(val, suffix) => suffix === "/mo" ? `$${val}${suffix}` : suffix === "%" ? `${val}${suffix}` : `${val}`} />

      {/* ────────────────── 3. THE PROBLEM ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={problem.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-medium mb-4 ${reveal(problem.visible)}`}>
            01 / The Problem
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(problem.visible, 100)}`}>
            S3 costs grow silently — and nobody wants to touch what they don&apos;t understand
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg ${reveal(problem.visible, 200)}`}>
              AWS S3 is deceptively simple — you upload objects and pay per GB. But over months
              and years, buckets accumulate stale data in expensive storage classes. Teams know
              they&apos;re overpaying but avoid making changes because a wrong storage class transition
              can make data temporarily inaccessible, or a lifecycle policy can delete something
              critical. The result: everyone leaves it alone, and costs keep climbing.
            </p>

            <div className="space-y-6">
              {PROBLEMS.map((p, i) => (
                <div key={p.title}
                  className={`border-l-2 border-emerald-400 pl-6 ${reveal(problem.visible, 250 + i * 100)}`}>
                  <h4 className="font-semibold text-black dark:text-white mb-1">{p.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 4. THE SOLUTION ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={solution.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-medium mb-4 ${reveal(solution.visible)}`}>
            02 / The Solution
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(solution.visible, 100)}`}>
            Score every change by risk. Snapshot before you touch anything. Roll back if needed.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOLUTIONS.map((s, i) => (
              <div key={s.title}
                className={`bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-100 dark:border-neutral-800 ${reveal(solution.visible, 200 + i * 100)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <h4 className="font-semibold text-black dark:text-white text-sm">{s.title}</h4>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 5. ENGINEERING ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={eng.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-medium mb-4 ${reveal(eng.visible)}`}>
            03 / Engineering
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(eng.visible, 100)}`}>
            Serverless, automated, and fully reversible
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(eng.visible, 200)}`}>
            The optimizer runs as a scheduled Lambda function — no servers to manage.
            Terraform defines the entire stack, EventBridge triggers scans on a cron schedule,
            and SNS + Slack deliver reports so the team always knows what changed.
          </p>

          {/* Architecture Diagram */}
          <ArchitectureDiagram flow={ARCH_FLOW} accentLabel="Rollback Snapshots" accentColor="emerald" />

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
          <p className={`text-xs uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-medium mb-4 ${reveal(outcome.visible)}`}>
            04 / Outcome
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(outcome.visible, 100)}`}>
            $50/month saved — with zero unsafe changes
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(outcome.visible, 200)}`}>
            The optimizer runs on a schedule, scans buckets, scores every recommendation,
            and only executes changes below the risk threshold. Storage class transitions
            and lifecycle policy enforcement happen automatically — and every change can be
            rolled back with a single command.
          </p>

          {/* Outcome breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Scan", items: ["Bucket enumeration", "Object age analysis", "Access pattern detection", "Storage class audit"] },
              { title: "Score", items: ["Reversibility weight", "Object age factor", "Data loss potential", "Risk threshold gate"] },
              { title: "Execute", items: ["Pre-state snapshot", "Storage class transition", "Lifecycle policy enforcement", "Slack notification"] },
            ].map((col, i) => (
              <div key={col.title}
                className={`bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-100 dark:border-neutral-800 ${reveal(outcome.visible, 300 + i * 150)}`}>
                <h4 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-neutral-600 dark:text-neutral-400 text-sm flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <blockquote className={`text-center max-w-3xl mx-auto ${reveal(outcome.visible, 600)}`}>
            <span className="text-6xl text-emerald-400 leading-none block mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-black dark:text-white leading-snug">
              The best optimization is the one you don&apos;t have to think about — it runs, it&apos;s safe, and it pays for itself.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ────────────────── 8. CTA ────────────────── */}
      <CTASection />
    </div>
  );
}
