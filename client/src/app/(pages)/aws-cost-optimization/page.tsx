"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/app/components/shared/MagneticLink";
import ProjectNav from "@/app/components/shared/ProjectNav";

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

export default function AWSCostOptimizationCaseStudy() {
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
        onUpdate: () => {
          if (m.suffix === "/mo") {
            el.textContent = `$${obj.val}${m.suffix}`;
          } else if (m.suffix === "%") {
            el.textContent = `${obj.val}${m.suffix}`;
          } else {
            el.textContent = `${obj.val}`;
          }
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

  const headlineWords = "An automated S3 optimizer that scores risk before it touches your data.".split(" ");

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="aws-cost-optimization" />

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-32">
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
                  className="block text-5xl md:text-7xl font-bold text-emerald-400"
                >
                  {m.suffix === "/mo" ? "$0/mo" : `0${m.suffix}`}
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
            <div className="flex items-center mt-3 ml-0 md:ml-[calc(33%)]">
              <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600 ml-12" />
              <div className="bg-emerald-400/20 text-emerald-700 dark:text-emerald-400 rounded-lg px-4 py-2 border border-emerald-300 dark:border-emerald-700 text-xs font-mono mt-2 ml-[-12px]">
                Rollback Snapshots
              </div>
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
