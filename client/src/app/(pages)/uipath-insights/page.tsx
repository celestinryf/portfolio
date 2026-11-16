"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIndicator, MetricsStrip, ArchitectureDiagram, TechStackSection, CTASection } from "@/app/components/shared/CaseStudySections";
import ProjectNav from "@/app/components/shared/ProjectNav";
import { useReveal, reveal } from "@/app/hooks/useReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ────────────────────────────────────────────────────────────────────

const METRICS = [
  { value: 41, suffix: "", label: "Commands Shipped", desc: "Across queues, machines, dashboards, alerts, and access control" },
  { value: 23, suffix: "", label: "Merged Public PRs", desc: "Across UiPath's open-source skills repository" },
  { value: 74, suffix: "%", label: "Agent Cost Cut", desc: "Average token cost reduced (up to 92%) via task routing" },
  { value: 240, suffix: "+", label: "Tests & Evals", desc: "Unit, live e2e, and golden eval tasks graded against a live tenant" },
];

const PROBLEMS = [
  { title: "7 of 94 reachable", body: "Only the seven existing Jobs commands were agent-reachable. Alerts, filters, and permissions — the things users actually ask an agent about — were invisible to it." },
  { title: "Writes with blast radius", body: "Insights has two alert engine types with different semantics. An update sent to the wrong kind silently replaces a scheduled-query alert. Commands must refuse what the backend happily allows." },
  { title: "PII in plain responses", body: "Alert payloads carry recipient details and raw query internals. What reaches an agent's context has to be a safe projection, never the raw body." },
  { title: "Permissions aren't optional", body: "An agent must be bounded by what the calling user can already see and do. RBAC read commands expose that boundary instead of letting the agent guess at it." },
];

const DESIGN = [
  { title: "Fail-Closed Validation", body: "Required business choices have no defaults, enum values are checked locally, and a request body whose tenant differs from the session is rejected before any network call is made." },
  { title: "Closed Route Registry", body: "The SDK transport exposes exactly the routes the commands need — nothing else is callable through it, and error messages never carry response bodies or tokens." },
  { title: "Safe Output Projections", body: "Read commands project fields allowlist-style. Recipient data, raw request bodies, and raw queries never enter agent context." },
  { title: "Design First, Then Code", body: "All 23 commands were specified up front — contracts, error taxonomy, use cases, and safety rules — and signed off by the team before the first implementation PR." },
];

const PRS = [
  {
    repo: "UiPath/skills",
    id: "#3550",
    status: "Merged",
    title: "Looker dashboards read commands",
    body: "Taught agents to discover, inspect, and extract metrics from Looker dashboards with full schema grounding and safe projection.",
    href: "https://github.com/UiPath/skills/pull/3550",
  },
  {
    repo: "UiPath/skills",
    id: "#3358",
    status: "Merged",
    title: "Dashboard update, delete & copy lifecycle",
    body: "Shipped safe dashboard mutation workflows with confirmation guards, preventing agents from corrupting shared analytics.",
    href: "https://github.com/UiPath/skills/pull/3358",
  },
  {
    repo: "UiPath/skills",
    id: "#2854",
    status: "Merged",
    title: "Queue & machine diagnosis",
    body: "Added multi-step queue and machine failure diagnosis, giving agents direct inspection into runner bottlenecks.",
    href: "https://github.com/UiPath/skills/pull/2854",
  },
  {
    repo: "UiPath/skills",
    id: "#2609",
    status: "Merged",
    title: "RBAC reads & smoke eval harness",
    body: "Role-based access control reads bounded by caller permissions, plus automated eval tasks graded against a live tenant.",
    href: "https://github.com/UiPath/skills/pull/2609",
  },
];

const VERIFICATION = [
  { title: "Reproduce Before Fixing", body: "Every skill bug was first reproduced in a local eval harness running the same agent that failed, so the fix targets the real failure and not a guess." },
  { title: "Perfect Grades Before Review", body: "Skill fixes rerun at 4/4 tasks (score 1.000) before the PR opens. End-to-end coverage tasks grade the CLI's real output envelopes at 12/12 and 9/9 criteria." },
  { title: "Live-Gateway Evidence", body: "Deployed API behavior was verified read-only against a live tenant — response shapes, error bodies, and entitlement behavior — before any contract was frozen." },
];

const ARCH_FLOW = ["agent", "MCP", "uip CLI", "typed contract", "insights-sdk", "Insights API"];

const TECH = ["TypeScript", "Bun", "Vitest", "Commander", "MCP", "REST APIs", "Agent Evals", "CI/CD"];

// ─── Terminal panel (matches the one on the landing page) ────────────────────

function AgentTerminal() {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-700 shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-400/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <span className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-3 text-xs text-neutral-400 font-mono">agent — uipath-insights via MCP</span>
      </div>
      <pre className="p-5 text-sm leading-7 font-mono text-neutral-200 overflow-x-auto">
        <code>
          <span className="text-neutral-200">❯ alert me when payroll jobs start faulting</span>
          {"\n\n"}
          <span className="text-neutral-400"># agent picks its own commands:</span>
          {"\n"}
          <span className="text-orange-300">⏺ uip insights alerts get-schema</span>
          {"\n"}
          <span className="text-orange-300">⏺ uip insights filter-folders list --limit 10</span>
          {"\n"}
          <span className="text-orange-300">⏺ uip insights alerts create …</span>
          {"\n\n"}
          <span className="text-emerald-300">✓ watching Payroll for faulted jobs</span>
        </code>
      </pre>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function UiPathInsightsCaseStudy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const hero = useReveal<HTMLElement>(0.1);
  const problem = useReveal<HTMLDivElement>();
  const design = useReveal<HTMLDivElement>();
  const shipping = useReveal<HTMLDivElement>();
  const verification = useReveal<HTMLDivElement>();
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

  const headlineWords = "I taught AI agents to run an analytics product.".split(" ");

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="uipath-insights" />

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-16 sm:py-24 md:py-32">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">

            <div className="col-span-12 md:col-span-7 space-y-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
                UiPath &nbsp;/&nbsp; July - September 2026
              </p>

              <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-black dark:text-white">
                {headlineWords.map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[560px]">
                Insights is UiPath&apos;s analytics product — dashboards, alerts, and usage data
                for enterprise automations. Coding agents couldn&apos;t operate it: only 7 of its
                94 API capabilities were reachable through the CLI. I owned the CLI and MCP server
                for the Insights team from R&amp;D through release, shipping 41 typed commands and
                the open-source agent skill that teaches agents to use them safely.
              </p>

              <span className="inline-block bg-orange-400/20 text-orange-700 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-medium">
                Software Engineer Intern
              </span>
            </div>

            <div className="col-span-12 md:col-span-5">
              <AgentTerminal />
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ────────────────── 2. METRICS STRIP ────────────────── */}
      <MetricsStrip metrics={METRICS} accentColor="orange" />

      {/* ────────────────── 3. THE PROBLEM ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={problem.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-medium mb-4 ${reveal(problem.visible)}`}>
            01 / The Problem
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-12 max-w-3xl ${reveal(problem.visible, 100)}`}>
            An enterprise product an agent couldn&apos;t touch — and shouldn&apos;t touch carelessly
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg ${reveal(problem.visible, 200)}`}>
              Pointing an agent at raw HTTP endpoints is how you leak recipient data or silently
              overwrite a production alert. Before designing anything, I enumerated all 94 backend
              capabilities, read the backend source for every route in scope, and verified the
              deployed behavior read-only against a live tenant. The commands are built on what the
              API actually does — not on what its docs say.
            </p>

            <div className="space-y-6">
              {PROBLEMS.map((c, i) => (
                <div key={c.title}
                  className={`border-l-2 border-orange-400 pl-6 ${reveal(problem.visible, 250 + i * 100)}`}>
                  <h3 className="font-semibold text-black dark:text-white mb-1">{c.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 4. THE DESIGN ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={design.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-medium mb-4 ${reveal(design.visible)}`}>
            02 / The Design
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(design.visible, 100)}`}>
            One typed contract, four consumers
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(design.visible, 200)}`}>
            Validation, the SDK, MCP, and the agent skill all consume the same typed contract, so
            a rule like &ldquo;no default for a required business choice&rdquo; is enforced once
            and holds everywhere an agent can reach.
          </p>

          <div className={reveal(design.visible, 300)}>
            <ArchitectureDiagram flow={ARCH_FLOW} accentLabel="uipath-insights skill" accentColor="orange" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DESIGN.map((d, i) => (
              <div key={d.title}
                className={`bg-white dark:bg-black rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 ${reveal(design.visible, 400 + i * 100)}`}>
                <h3 className="font-semibold text-black dark:text-white mb-2">{d.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 5. SHIPPING ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={shipping.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-medium mb-4 ${reveal(shipping.visible)}`}>
            03 / Shipping
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(shipping.visible, 100)}`}>
            Real PRs, public repos, production review bar
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-12 ${reveal(shipping.visible, 200)}`}>
            UiPath&apos;s agent skills are open source, reviewable by any engineer with 23 merged PRs
            to the public repository. Commands, eval tasks, and schema fixes are verified in public with production
            review bars.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRS.map((pr, i) => (
              <a key={pr.id + pr.repo} href={pr.href} target="_blank" rel="noopener noreferrer"
                className={`group rounded-2xl p-8 border transition-colors ${
                  pr.status === "Merged"
                    ? "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700"
                    : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600"
                } ${reveal(shipping.visible, 250 + i * 100)}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono text-neutral-600 dark:text-neutral-400">{pr.repo} {pr.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pr.status === "Merged"
                      ? "bg-orange-400/20 text-orange-700 dark:text-orange-400"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  }`}>
                    {pr.status}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-2 group-hover:underline underline-offset-4">{pr.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">{pr.body}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://github.com/UiPath/skills/pulls?q=is%3Apr+author%3Acelestinryf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <span>View all 23 merged PRs on GitHub &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────── 6. VERIFICATION ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={verification.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-medium mb-4 ${reveal(verification.visible)}`}>
            04 / Verification
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(verification.visible, 100)}`}>
            You can&apos;t trust a skill you haven&apos;t evaluated
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(verification.visible, 200)}`}>
            The interesting part of agent tooling isn&apos;t writing the commands — it&apos;s
            proving an agent actually succeeds with them. Every change here ships with eval
            evidence, not vibes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VERIFICATION.map((v, i) => (
              <div key={v.title}
                className={`bg-white dark:bg-black rounded-xl p-6 border border-orange-300 dark:border-orange-700 ${reveal(verification.visible, 300 + i * 100)}`}>
                <h3 className="font-semibold text-black dark:text-white mb-2">{v.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 7. SHIPPED & PRODUCTION IMPACT ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black dark:bg-white py-24 md:py-32">
        <div ref={outcome.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-400 dark:text-orange-600 font-medium mb-4 ${reveal(outcome.visible)}`}>
            05 / Shipped &amp; Production Impact
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-white dark:text-black leading-tight mb-6 max-w-3xl ${reveal(outcome.visible, 100)}`}>
            From R&amp;D through release
          </h2>
          <p className={`text-white/70 dark:text-black/70 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(outcome.visible, 200)}`}>
            The project moved from an uncataloged API surface to a fully shipped CLI and MCP toolchain,
            tested by nightly eval harnesses and cutting agent token costs across the board.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Shipped Surface",
                items: [
                  "41 CLI commands across 5 resource groups",
                  "MCP server with uip_read/uip_exec tiers",
                  "SDK transport + closed route registry",
                  "Fail-closed caller-scoped permissions",
                ],
              },
              {
                title: "Agent Efficiency",
                items: [
                  "74% average token cost cut (up to 92%)",
                  "Task routing loading only required context",
                  "2.5x PR throughput via subagents",
                  "Nightly eval harness on live tenants",
                ],
              },
              {
                title: "Open Source",
                items: [
                  "23 merged PRs in UiPath/skills",
                  "Zero-prompt read diagnosis journeys",
                  "Automated eval gates in GitHub Actions",
                  "Clean public review history",
                ],
              },
            ].map((col, i) => (
              <div key={col.title}
                className={`bg-white/5 dark:bg-black/5 rounded-xl p-6 border border-white/10 dark:border-black/10 ${reveal(outcome.visible, 300 + i * 150)}`}>
                <h3 className="text-lg font-semibold text-orange-400 dark:text-orange-600 mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-white/60 dark:text-black/60 text-sm flex items-start gap-2">
                      <span className="text-orange-400 dark:text-orange-600 mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <blockquote className={`text-center max-w-3xl mx-auto ${reveal(outcome.visible, 600)}`}>
            <span className="text-6xl text-orange-400 leading-none block mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-white dark:text-black leading-snug">
              An agent should never be able to do more than the person driving it.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ────────────────── 8. TECH + CTA ────────────────── */}
      <TechStackSection tech={TECH} />
      <CTASection />
    </div>
  );
}
