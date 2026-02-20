"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIndicator, MetricsStrip, CTASection } from "@/app/components/shared/CaseStudySections";
import ProjectNav from "@/app/components/shared/ProjectNav";
import { useReveal, reveal } from "@/app/hooks/useReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ────────────────────────────────────────────────────────────────────

const METRICS = [
  { value: 100, suffix: "+", label: "Competitors", desc: "Largest hackathon south of Seattle — on just $3,500 in funding" },
  { value: 7, suffix: "", label: "Partner Clubs", desc: "Tech Startup Club, Game Dev Club, WiCS, UX@UWT, GitHired, GreyHat, and Huscii" },
  { value: 6, suffix: "hrs", label: "Build Time", desc: "Teams went from idea to working prototype in a single day" },
  { value: 9, suffix: "", label: "Industry Judges", desc: "Panel of professionals from industry and academia" },
];

const CHALLENGES = [
  { title: "No hackathon culture", body: "UWT's last hackathon was in 2019, and the school had never hosted two years in a row. There was no playbook, no infrastructure, and no precedent." },
  { title: "Regional dead zone", body: "The entire region south of Seattle — Tacoma, Olympia, Puyallup, and surrounding areas — had seen only 1 hackathon in years, and none had ever surpassed 70 competitors." },
  { title: "Cross-org coordination", body: "Pulling off a 100+ person event required aligning seven student clubs, university administration, three sponsors, nine judges, and volunteers — all with different timelines and priorities." },
  { title: "First-timer accessibility", body: "Many students had never been to a hackathon. The event needed to be welcoming to beginners while still challenging experienced hackers." },
];

const EXECUTION = [
  { title: "Multi-Club Coalition", body: "United seven clubs — Tech Startup Club, Game Dev Club, WiCS, UX@UWT, GitHired, GreyHat, and Huscii — combining each club's reach and expertise to build something none could do alone." },
  { title: "Sponsor & Judge Pipeline", body: "Secured sponsorship from UW Tacoma's School of Engineering & Technology (SET), Code Ninjas, and Insights Emerge. Recruited a panel of 9 industry and academic judges." },
  { title: "Day-Of Operations", body: "Ran a tight 9-hour schedule: team formation & kickoff, 6 hours of coding, catered lunch & networking, then project presentations and judging." },
  { title: "Sustainability Plan", body: "Built documentation, processes, and club partnerships to ensure UHackathon runs for at least two more years — breaking UWT's streak of one-off events." },
];

const WINNERS = [
  {
    place: "1st Place",
    team: "Murad Tair, Gregory Y, Anthony Crow-Jones",
    project: "AI-pplicant",
    desc: "An AI-powered mock interview tool that simulates behavioral and technical interviews with a hiring manager, providing real-time feedback and follow-up questions.",
  },
  {
    place: "2nd Place",
    team: "Nicholas Jordan, Jacob Klymenko, Anthony Naydyuk, Primitivo Bambao IV",
    project: "UHealth",
    desc: "A deep learning diagnostic tool using a Convolutional Neural Network (CNN) to predict pneumonia from chest x-rays at 90% accuracy, with an AI chatbot for diagnosis follow-up.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function UHackathonCaseStudy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const hero = useReveal<HTMLElement>(0.1);
  const challenge = useReveal<HTMLDivElement>();
  const execution = useReveal<HTMLDivElement>();
  const winners = useReveal<HTMLDivElement>();
  const spotlight = useReveal<HTMLDivElement>();
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

  const headlineWords = "I built the largest hackathon south of Seattle.".split(" ");

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="uhackathon" />

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-32">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">

            <div className="col-span-12 md:col-span-7 space-y-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
                UW Tacoma &nbsp;/&nbsp; May 2025
              </p>

              <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-black dark:text-white">
                {headlineWords.map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[560px]">
                UWT hadn&apos;t hosted a hackathon since 2019 and had never run two years in a row.
                I changed that — organizing a 100+ competitor event on just $3,500 in funding that
                became the largest hackathon south of Seattle. Another hackathon ran with $35,000 in
                funding — we were still twice their size.
              </p>

              <span className="inline-block bg-sky-400/20 text-sky-700 dark:text-sky-400 px-4 py-1.5 rounded-full text-sm font-medium">
                Event Organizer & Founder
              </span>
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200 dark:bg-neutral-800">
                <Image src="/assets/hackflyer.png" alt="UHackathon 2025 flyer" fill className="object-cover" priority sizes="(min-width: 768px) 40vw, 90vw" />
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ────────────────── 2. METRICS STRIP ────────────────── */}
      <MetricsStrip metrics={METRICS} accentColor="sky" />

      {/* ────────────────── 3. THE CHALLENGE ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={challenge.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 font-medium mb-4 ${reveal(challenge.visible)}`}>
            01 / The Challenge
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(challenge.visible, 100)}`}>
            No hackathon culture, no precedent, no playbook
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg ${reveal(challenge.visible, 200)}`}>
              The region south of Seattle — spanning Tacoma, Olympia, Puyallup, and surrounding
              areas — had only hosted a single hackathon in years, and no event in the region had
              ever surpassed 70 competitors. UW Tacoma&apos;s last hackathon was in 2019, and the
              university had never managed to host two in consecutive years. I wanted to change
              that — not just with a one-off event, but by building something sustainable.
            </p>

            <div className="space-y-6">
              {CHALLENGES.map((c, i) => (
                <div key={c.title}
                  className={`border-l-2 border-sky-400 pl-6 ${reveal(challenge.visible, 250 + i * 100)}`}>
                  <h4 className="font-semibold text-black dark:text-white mb-1">{c.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 4. EXECUTION ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={execution.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 font-medium mb-4 ${reveal(execution.visible)}`}>
            02 / Execution
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(execution.visible, 100)}`}>
            Seven clubs, nine judges, one hundred competitors
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(execution.visible, 200)}`}>
            I partnered with Kylie Hammett, Alex Douk, and Eva Howard to bring together seven
            student organizations, secure sponsorship from SET, Code Ninjas, and Insights Emerge,
            and build an event that welcomed both first-timers and experienced hackers.
          </p>

          {/* Event timeline */}
          <div className={`mb-16 overflow-x-auto ${reveal(execution.visible, 300)}`}>
            <div className="flex items-center gap-0 min-w-[600px] md:min-w-0">
              {[
                { time: "9–10 AM", label: "Kickoff" },
                { time: "10 AM–4 PM", label: "Build" },
                { time: "12 PM", label: "Lunch" },
                { time: "4–6 PM", label: "Judging" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="bg-white dark:bg-black rounded-lg px-5 py-3 border border-neutral-200 dark:border-neutral-700 text-center whitespace-nowrap">
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-1">{step.time}</p>
                    <p className="text-sm font-mono text-black dark:text-white">{step.label}</p>
                  </div>
                  {i < 3 && (
                    <div className="w-8 md:w-12 flex items-center justify-center text-neutral-400 shrink-0">
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 6h22M18 1l4 5-4 5" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXECUTION.map((e, i) => (
              <div key={e.title}
                className={`bg-white dark:bg-black rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 ${reveal(execution.visible, 400 + i * 100)}`}>
                <h4 className="font-semibold text-black dark:text-white mb-2">{e.title}</h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 5. WINNERS ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={winners.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 font-medium mb-4 ${reveal(winners.visible)}`}>
            03 / Winners
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(winners.visible, 100)}`}>
            From idea to prototype in six hours
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WINNERS.map((w, i) => (
              <div key={w.place}
                className={`relative rounded-2xl p-8 border ${
                  i === 0
                    ? "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800"
                    : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                } ${reveal(winners.visible, 200 + i * 150)}`}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                  i === 0
                    ? "bg-sky-400/20 text-sky-700 dark:text-sky-400"
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}>
                  {w.place}
                </span>
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">{w.project}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{w.team}</p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 6. INNOVATION SPOTLIGHT ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={spotlight.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 font-medium mb-4 ${reveal(spotlight.visible)}`}>
            04 / Innovation Spotlight
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(spotlight.visible, 100)}`}>
            UHealth — deep learning meets diagnostics
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(spotlight.visible, 200)}`}>
            Built by Nicholas Jordan, Jacob Klymenko, Anthony Naydyuk, and Primitivo Bambao IV —
            current and former officers of my club — UHealth showed what&apos;s possible when you
            give talented people six hours and a real problem to solve.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            {/* What they built */}
            <div className={`space-y-6 ${reveal(spotlight.visible, 300)}`}>
              <h3 className="text-xl font-semibold text-black dark:text-white">What They Built</h3>
              <div className="space-y-4">
                {[
                  { title: "CNN Diagnostic Model", body: "A Convolutional Neural Network trained to predict pneumonia from chest x-rays at 90% accuracy — built and trained within a 6-hour window." },
                  { title: "Live Image Upload", body: "Users upload chest x-ray images directly to the app for real-time predictions from the trained model." },
                  { title: "Medical Chatbot", body: "An AI-powered chatbot helps users understand their diagnosis, ask follow-up questions, and learn about next steps." },
                ].map((item) => (
                  <div key={item.title} className="bg-white dark:bg-black rounded-xl p-5 border border-neutral-200 dark:border-neutral-800">
                    <h4 className="font-semibold text-black dark:text-white mb-1 text-sm">{item.title}</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The pivot + future */}
            <div className="space-y-8">
              <div className={`${reveal(spotlight.visible, 400)}`}>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">The Hackathon Pivot</h3>
                <div className="bg-sky-50 dark:bg-sky-950/30 rounded-xl p-6 border border-sky-200 dark:border-sky-800">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
                    The team originally planned a model with 14 classification labels, but hardware
                    limitations and the 6-hour constraint forced a pivot to binary classification.
                    Rather than shipping something broken, they scoped down and delivered a polished,
                    working product — the kind of tradeoff real engineers make every day.
                  </p>
                </div>
              </div>

              <div className={`${reveal(spotlight.visible, 500)}`}>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Where It Could Go</h3>
                <ul className="space-y-3">
                  {[
                    "Highlight exact x-ray features that indicate pneumonia",
                    "Expand beyond binary to multi-condition classification",
                    "Build a full diagnostic support platform for doctors",
                    "Push accuracy above 95% with data augmentation techniques",
                  ].map((item) => (
                    <li key={item} className="text-neutral-600 dark:text-neutral-400 text-sm flex items-start gap-3">
                      <span className="text-sky-500 mt-0.5 shrink-0">&#8594;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 7. OUTCOME ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black dark:bg-white py-24 md:py-32">
        <div ref={outcome.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-sky-400 dark:text-sky-600 font-medium mb-4 ${reveal(outcome.visible)}`}>
            05 / Impact
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-white dark:text-black leading-tight mb-6 max-w-3xl ${reveal(outcome.visible, 100)}`}>
            The start of a new era in Tacoma
          </h2>
          <p className={`text-white/70 dark:text-black/70 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(outcome.visible, 200)}`}>
            UHackathon didn&apos;t just break the regional record — it proved that Tacoma&apos;s
            tech community is ready for more. With documentation, partnerships, and momentum
            in place, the event is set to run annually for years to come.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Record-Breaking", items: ["100+ competitors", "Largest south of Seattle", "2x bigger on 10x less funding", "Surpassed 70-person regional cap"] },
              { title: "Community Built", items: ["7 clubs united", "9 industry judges", "SET, Code Ninjas & Insights Emerge", "Volunteers & planning team"] },
              { title: "Built to Last", items: ["Set up for 2+ more years", "Breaking one-off event cycle", "Documentation & processes", "Club partnership framework"] },
            ].map((col, i) => (
              <div key={col.title}
                className={`bg-white/5 dark:bg-black/5 rounded-xl p-6 border border-white/10 dark:border-black/10 ${reveal(outcome.visible, 300 + i * 150)}`}>
                <h4 className="text-lg font-semibold text-sky-400 dark:text-sky-600 mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-white/60 dark:text-black/60 text-sm flex items-start gap-2">
                      <span className="text-sky-400 dark:text-sky-600 mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <blockquote className={`text-center max-w-3xl mx-auto ${reveal(outcome.visible, 600)}`}>
            <span className="text-6xl text-sky-400 leading-none block mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-white dark:text-black leading-snug">
              We will be repaid in the joy and opportunity we&apos;ve created for others.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ────────────────── 8. CTA ────────────────── */}
      <CTASection />
    </div>
  );
}
