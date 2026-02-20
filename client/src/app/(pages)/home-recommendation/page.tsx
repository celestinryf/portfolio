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
  { value: 1, suffix: "M+", label: "Records Processed", desc: "ETL pipelines across transactional and behavioral user data" },
  { value: 3, suffix: "", label: "Ranking Stages", desc: "Two-Tower retrieval → GBDT fine-ranking → Learn-to-Rank re-ranking" },
  { value: 4, suffix: "", label: "Real-World Datasets", desc: "RecSys 2021, Expedia Hotels, Airbnb New Users, and custom data" },
  { value: 100, suffix: "%", label: "Containerized", desc: "Docker + Kubernetes with GitOps CI/CD and full observability" },
];

const CHALLENGES = [
  { title: "Scale of the data", body: "1M+ transactional and behavioral records requiring heavy ETL — cleaning, transformation, and feature engineering before any model could be trained." },
  { title: "Multi-stage ranking", body: "A single model can't balance recall and precision at scale. The system needed candidate generation, fine-ranking, and re-ranking as distinct stages." },
  { title: "Real-time serving", body: "Recommendations had to update live as users interacted — not batch-processed overnight. This meant streaming infrastructure and low-latency serving." },
  { title: "Production-grade infra", body: "The system needed containerization, orchestration, CI/CD, monitoring, and automated rollbacks — not just a notebook that runs locally." },
];

const PIPELINE = [
  { title: "ETL & Feature Engineering", body: "Apache Spark and Airflow pipelines to clean, transform, and engineer features from 1M+ user records across multiple real-world datasets." },
  { title: "Two-Tower Candidate Generation", body: "Neural network model that encodes users and items into shared embedding space for high-recall candidate retrieval at scale." },
  { title: "GBDT Fine-Ranking", body: "Gradient Boosted Decision Trees to score candidates on user relevance while enforcing business rules — blocked users, previously shown items, inventory constraints." },
  { title: "Learn-to-Rank Re-Ranking", body: "Final ranking stage that optimizes personalized ordering based on historical interactions and real-time feedback signals." },
];

const INFRA = [
  { title: "Real-Time Serving", body: "FastAPI + Kafka streaming + PostgreSQL feature store for live user requests — recommendations update on-the-fly as users interact." },
  { title: "Docker + Kubernetes", body: "Every service containerized and orchestrated with Kubernetes for horizontal scaling, reliability, and zero-downtime deployments." },
  { title: "GitOps CI/CD", body: "Automated testing, deployment, and rollback workflows — infrastructure-as-code with GitOps principles across all services." },
  { title: "Prometheus + Grafana", body: "Full observability stack tracking latency, throughput, model drift, and system health in real-time dashboards." },
];

const TECH = [
  "TensorFlow", "Python", "Pandas", "NumPy", "Flask", "FastAPI",
  "Spring Boot", "React", "PostgreSQL", "Kafka",
  "Docker", "Kubernetes", "Airflow", "MLflow",
  "Apache Spark", "Prometheus", "Grafana", "GitOps",
];

const ARCH_FLOW = ["ETL / Spark", "Feature Store", "Two-Tower NN", "GBDT Ranker", "LTR Re-Ranker", "FastAPI Serving"];

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

export default function RecommendationCaseStudy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metricRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const metricsSection = useRef<HTMLElement>(null);
  const archRefs = useRef<(HTMLDivElement | null)[]>([]);
  const archSection = useRef<HTMLDivElement>(null);

  const hero = useReveal<HTMLElement>(0.1);
  const challenge = useReveal<HTMLDivElement>();
  const pipeline = useReveal<HTMLDivElement>();
  const infra = useReveal<HTMLDivElement>();
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

  const headlineWords = "A multi-stage ML pipeline that ranks at scale — from ETL to real-time serving.".split(" ");

  return (
    <div className="bg-white dark:bg-black">

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-32">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">

            <div className="col-span-12 md:col-span-7 space-y-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
                Personal Project &nbsp;/&nbsp; MLOps &amp; Recommendation Systems
              </p>

              <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-black dark:text-white">
                {headlineWords.map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[560px]">
                A full-stack recommendation platform for large-scale travel and accommodation.
                Three-stage ML ranking pipeline (Two-Tower retrieval, GBDT fine-ranking,
                Learn-to-Rank re-ranking), real-time serving via Kafka, and production
                infrastructure with Docker, Kubernetes, and full observability.
                Trained on 1M+ records across 4 real-world datasets.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-amber-400/20 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  ML Engineering
                </span>
                <span className="inline-block bg-amber-400/20 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  MLOps
                </span>
                <span className="inline-block bg-amber-400/20 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  Full-Stack
                </span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200 dark:bg-neutral-800">
                <Image src="/assets/mock1.png" alt="Recommendation System" fill className="object-cover" priority sizes="(min-width: 768px) 40vw, 90vw" />
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
                  className="block text-5xl md:text-7xl font-bold text-amber-400"
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

      {/* ────────────────── 3. THE CHALLENGE ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={challenge.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 font-medium mb-4 ${reveal(challenge.visible)}`}>
            01 / The Challenge
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(challenge.visible, 100)}`}>
            Building a recommendation system that actually works at scale
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg ${reveal(challenge.visible, 200)}`}>
              Most recommendation tutorials stop at a single model in a notebook. Real
              systems need multi-stage ranking pipelines, feature stores, streaming
              infrastructure, and production-grade deployment. I wanted to build the full
              thing — from raw data ingestion through real-time serving — using real-world
              datasets at a scale that actually tests the architecture.
            </p>

            <div className="space-y-6">
              {CHALLENGES.map((c, i) => (
                <div key={c.title}
                  className={`border-l-2 border-amber-400 pl-6 ${reveal(challenge.visible, 250 + i * 100)}`}>
                  <h4 className="font-semibold text-black dark:text-white mb-1">{c.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 ${reveal(challenge.visible, 600)}`}>
            <Image src="/assets/mock1.png" alt="System architecture overview" fill className="object-cover" sizes="(min-width: 768px) 80vw, 95vw" />
          </div>
        </div>
      </section>

      {/* ────────────────── 4. THE ML PIPELINE ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={pipeline.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 font-medium mb-4 ${reveal(pipeline.visible)}`}>
            02 / The ML Pipeline
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(pipeline.visible, 100)}`}>
            Three ranking stages — each solving a different problem
          </h2>

          {/* Architecture Diagram */}
          <div ref={archSection} className={`mb-16 overflow-x-auto ${reveal(pipeline.visible, 200)}`}>
            <div className="flex items-center gap-0 min-w-[700px] md:min-w-0">
              {ARCH_FLOW.map((label, i) => (
                <div key={label} className="flex items-center">
                  <div
                    ref={(el) => { archRefs.current[i] = el; }}
                    className="bg-neutral-50 dark:bg-neutral-900 rounded-lg px-4 py-3 border border-neutral-200 dark:border-neutral-700 text-sm font-mono text-black dark:text-white whitespace-nowrap opacity-0"
                  >
                    {label}
                  </div>
                  {i < ARCH_FLOW.length - 1 && (
                    <div className="w-6 md:w-10 flex items-center justify-center text-neutral-400 shrink-0">
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 6h22M18 1l4 5-4 5" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center mt-3 ml-4">
              <div className="bg-amber-400/20 text-amber-700 dark:text-amber-400 rounded-lg px-4 py-2 border border-amber-300 dark:border-amber-700 text-xs font-mono">
                Kafka Streaming ↔ Feature Store ↔ PostgreSQL
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PIPELINE.map((s, i) => (
              <div key={s.title}
                className={`bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-100 dark:border-neutral-800 ${reveal(pipeline.visible, 300 + i * 100)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-400 text-xs font-bold">
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

      {/* ────────────────── 5. INFRASTRUCTURE ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={infra.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 font-medium mb-4 ${reveal(infra.visible)}`}>
            03 / Infrastructure
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(infra.visible, 100)}`}>
            Not a notebook — a production system
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(infra.visible, 200)}`}>
            The ML pipeline is only half the system. The other half is everything that makes
            it actually run: containerized services, orchestrated deployment, streaming data
            pipelines, automated CI/CD, and real-time monitoring. Every service is observable,
            every deployment is automated, and every rollback is one command.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {INFRA.map((item, i) => (
              <div key={item.title}
                className={`bg-white dark:bg-black rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 ${reveal(infra.visible, 300 + i * 100)}`}>
                <h4 className="font-semibold text-black dark:text-white mb-2">{item.title}</h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{item.body}</p>
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
                className={`px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default ${reveal(techStack.visible, 100 + i * 40)}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 7. OUTCOME ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={outcome.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 font-medium mb-4 ${reveal(outcome.visible)}`}>
            04 / The System
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(outcome.visible, 100)}`}>
            End-to-end: raw data in, personalized recommendations out
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(outcome.visible, 200)}`}>
            The system handles the full lifecycle — ETL pipelines ingest and transform 1M+
            records, the three-stage ML pipeline generates ranked recommendations, Kafka
            streams real-time interactions, and the React frontend surfaces results with
            model performance dashboards. All containerized, all monitored, all automated.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {[
              { label: "Data Layer", items: ["Apache Spark ETL", "Airflow orchestration", "PostgreSQL feature store", "1M+ records processed"] },
              { label: "ML Layer", items: ["Two-Tower retrieval", "GBDT fine-ranking", "Learn-to-Rank re-ranking", "MLflow experiment tracking"] },
              { label: "Serving Layer", items: ["FastAPI endpoints", "Kafka streaming", "Docker + Kubernetes", "Prometheus + Grafana"] },
            ].map((col, i) => (
              <div key={col.label} className={`bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-100 dark:border-neutral-800 ${reveal(outcome.visible, 300 + i * 150)}`}>
                <h4 className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-4 uppercase tracking-wider">{col.label}</h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-neutral-600 dark:text-neutral-400 text-sm flex items-start gap-2">
                      <span className="text-amber-400 mt-1 shrink-0">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <blockquote className={`text-center max-w-3xl mx-auto ${reveal(outcome.visible, 600)}`}>
            <span className="text-6xl text-amber-400 leading-none block mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-black dark:text-white leading-snug">
              This isn&apos;t a model in a notebook. It&apos;s a production recommendation
              system — ETL, ML pipeline, real-time serving, containerized deployment,
              and full observability.
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
