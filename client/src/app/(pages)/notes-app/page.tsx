"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTASection, MetricsStrip, ScrollIndicator, TechStackSection } from "@/app/components/shared/CaseStudySections";
import ProjectNav from "@/app/components/shared/ProjectNav";
import { reveal, useReveal } from "@/app/hooks/useReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const METRICS = [
  { value: 185, suffix: "+", label: "Merged PRs", desc: "Open-source work on celestinryf/notes-desktop under MIT" },
  { value: 50, suffix: "k", label: "Notes Scaled", desc: "13ms keystroke latency in 50,000-note benchmarks" },
  { value: 12, suffix: "ms", label: "Wasm Frame Warm-Up", desc: "Pre-warmed Rust document frames resume quickly" },
  { value: 1, suffix: "ms", label: "Outside Sync", desc: "56µs stat checks detect concurrent external edits" },
];

const PROBLEMS = [
  { title: "The Electron bloat trap", body: "Large libraries can turn desktop notes apps into slow web wrappers with lagging input and expensive startup." },
  { title: "Proprietary format lock-in", body: "Cloud notes products can bury knowledge in closed databases, making a clean exit difficult when terms or tools change." },
  { title: "Silent sync conflicts", body: "External changes from editors, Git, or other tools must not clobber active writing or force disruptive reloads." },
  { title: "Heavy office integration", body: "Opening Word and spreadsheet files should not break focus by sending people into separate desktop suites." },
];

const ARCHITECTURE = [
  { title: "Files-first Markdown storage", body: "Notes live as plain Markdown with front matter, tags, and wikilinks. The file system remains the source of truth." },
  { title: "Append-only journaled cache", body: "A cache and append-only journal make writes resilient, support recovery, and compact safely in the background." },
  { title: "Out-of-process SQLite FTS5", body: "A dedicated utility process performs trigram full-text indexing without taking time from the UI thread." },
  { title: "External-edit detection", body: "A watcher and 56µs stat-stamp comparison surface disk changes without overwriting active edits." },
];

const INTEGRATIONS = [
  { title: "Rust WebAssembly engines", body: "WordCraft for .docx and GridCraft for .xlsx run in isolated frames, bringing rich document tools into the app." },
  { title: "Background frame warming", body: "The next likely document frame is pre-warmed after launch, reducing a warm frame resumption to 12ms." },
  { title: "KaTeX and LaTeX", body: "Inline and block math render with KaTeX, while native MiKTeX and latexmk flows support SyncTeX source mapping." },
  { title: "Automated Git history", body: "Background snapshots preserve document history and enable safe, restorable diffs." },
];

const FLOW = ["Tray and hotkey", "Electron main", "Renderer", "Tiptap and CodeMirror", "SQLite FTS5 utility process", "Wasm frames"];

const TECH = ["Electron 44", "TypeScript", "Rust", "WebAssembly", "SQLite FTS5", "Tiptap", "CodeMirror 6", "KaTeX", "esbuild", "Tailwind CSS"];

const OUTCOMES = [
  {
    title: "Scale benchmarks",
    items: ["13ms keystroke latency at 50,000 notes", "56µs checks for outside file changes", "12ms WebAssembly warm-frame resumption"],
  },
  {
    title: "Editing experience",
    items: ["Tiptap visual and CodeMirror source modes", "KaTeX math with live editing", "LaTeX compilation with SyncTeX", "Split panes and multi-tab workflows"],
  },
  {
    title: "Engineering rigor",
    items: ["185+ merged public pull requests", "Typecheck, unit, UI, and end-to-end coverage", "Local files and automated Git snapshots"],
  },
];

export default function NotesAppCaseStudy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const hero = useReveal<HTMLElement>(0.1);
  const problem = useReveal<HTMLDivElement>();
  const architecture = useReveal<HTMLDivElement>();
  const engineering = useReveal<HTMLDivElement>();
  const outcome = useReveal<HTMLDivElement>();
  const headlineWords = "A fast, local-first notes app engineered for zero friction.".split(" ");

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".word",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out", delay: 0.3 }
      );
    }, headline);
    return () => context.revert();
  }, []);

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="notes-app" />
      <section ref={hero.ref} className="relative flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:py-24 md:px-16 md:py-32">
          <div className="grid grid-cols-12 items-center gap-8 md:gap-16">
            <div className="col-span-12 space-y-8 md:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">Open-source desktop app / 2026</p>
              <h1 ref={headlineRef} className="text-4xl font-semibold leading-[1.08] tracking-tight text-black sm:text-5xl md:text-7xl dark:text-white">
                {headlineWords.map((word, index) => <span key={`${word}-${index}`} className="word mr-[0.28em] inline-block opacity-0">{word}</span>)}
              </h1>
              <p className="max-w-[560px] text-lg leading-relaxed text-neutral-600 md:text-xl dark:text-neutral-400">
                Notes App opens from the tray with Ctrl+Alt+N, keeps pure Markdown on disk, and protects every keystroke. Electron and TypeScript orchestrate SQLite FTS5 search alongside embedded Rust WebAssembly office engines.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800 dark:bg-amber-400/20 dark:text-amber-300">Systems and architecture</span>
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800 dark:bg-amber-400/20 dark:text-amber-300">Local-first</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="overflow-hidden rounded-2xl bg-neutral-900">
                <div className="flex items-center gap-2 bg-neutral-800 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-3 font-mono text-xs text-neutral-400">notes-desktop / 50k scale bench</span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-200"><code><span className="text-neutral-400">search across 50,000 files</span>{"\n"}<span className="text-amber-300">query: compiler architecture</span>{"\n"}<span className="text-emerald-300">result: 14 hits in 13ms</span>{"\n\n"}<span className="text-neutral-400">concurrent outside edit</span>{"\n"}<span className="text-sky-300">stat stamp check: 56us</span>{"\n"}<span className="text-emerald-300">result: external write merged</span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      <MetricsStrip metrics={METRICS} accentColor="amber" />
      <section className="py-24 md:py-32">
        <div ref={problem.ref} className="mx-auto max-w-[1400px] px-6 md:px-16">
          <p className={`mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300 ${reveal(problem.visible)}`}>01 / The problem</p>
          <h2 className={`mb-12 max-w-3xl text-3xl font-semibold leading-tight text-black md:text-5xl dark:text-white ${reveal(problem.visible, 100)}`}>Modern note-taking tools sacrifice speed, ownership, and durability</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <p className={`text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 ${reveal(problem.visible, 200)}`}>Notes App starts with a simple premise: knowledge should stay in durable files, be available without a browser round-trip, and remain responsive as a library grows. The architecture treats the disk as canonical while handling the practical friction of rich editing and external changes.</p>
            <div className="space-y-6">
              {PROBLEMS.map((problemItem, index) => <div key={problemItem.title} className={`border-l-2 border-amber-400 pl-6 ${reveal(problem.visible, 250 + index * 100)}`}><h3 className="mb-1 font-semibold text-black dark:text-white">{problemItem.title}</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">{problemItem.body}</p></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-neutral-100 py-24 md:py-32 dark:bg-neutral-900">
        <div ref={architecture.ref} className="mx-auto max-w-[1400px] px-6 md:px-16">
          <p className={`mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300 ${reveal(architecture.visible)}`}>02 / Architecture and data layer</p>
          <h2 className={`mb-6 max-w-3xl text-3xl font-semibold leading-tight text-black md:text-5xl dark:text-white ${reveal(architecture.visible, 100)}`}>Files first, backed by a journal and out-of-process FTS5</h2>
          <p className={`mb-16 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 ${reveal(architecture.visible, 200)}`}>The file system owns Markdown text. An append-only journal buffers mutations atomically, while a separate SQLite process keeps full-text search fast without blocking the interface.</p>
          <ol className={`mb-16 grid gap-3 md:grid-cols-3 ${reveal(architecture.visible, 300)}`}>{FLOW.map((step, index) => <li key={step} className="bg-white px-5 py-4 text-sm font-medium text-black dark:bg-black dark:text-white"><span className="mr-3 font-mono text-amber-700 dark:text-amber-300">0{index + 1}</span>{step}</li>)}</ol>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{ARCHITECTURE.map((item, index) => <article key={item.title} className={`bg-white p-6 dark:bg-black ${reveal(architecture.visible, 400 + index * 100)}`}><h3 className="mb-2 font-semibold text-black dark:text-white">{item.title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{item.body}</p></article>)}</div>
        </div>
      </section>
      <section className="py-24 md:py-32">
        <div ref={engineering.ref} className="mx-auto max-w-[1400px] px-6 md:px-16">
          <p className={`mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300 ${reveal(engineering.visible)}`}>03 / Engineering and integrations</p>
          <h2 className={`mb-6 max-w-3xl text-3xl font-semibold leading-tight text-black md:text-5xl dark:text-white ${reveal(engineering.visible, 100)}`}>WebAssembly office engines and a seamless toolchain</h2>
          <p className={`mb-12 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 ${reveal(engineering.visible, 200)}`}>Custom Rust WebAssembly builds of WordCraft and GridCraft run in isolated sandboxes, bringing rich document workflows into the notes environment without a separate app switch.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{INTEGRATIONS.map((item, index) => <article key={item.title} className={`rounded-2xl bg-neutral-100 p-8 dark:bg-neutral-900 ${reveal(engineering.visible, 250 + index * 100)}`}><h3 className="mb-2 text-2xl font-semibold text-black dark:text-white">{item.title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{item.body}</p></article>)}</div>
        </div>
      </section>
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-black py-24 md:py-32 dark:bg-white">
        <div ref={outcome.ref} className="mx-auto max-w-[1400px] px-6 md:px-16">
          <p className={`mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-400 dark:text-amber-700 ${reveal(outcome.visible)}`}>04 / Shipped and production scale</p>
          <h2 className={`mb-6 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl dark:text-black ${reveal(outcome.visible, 100)}`}>185+ PRs, 50k-note benchmarks, and a daily driver</h2>
          <p className={`mb-16 max-w-2xl text-lg leading-relaxed text-white/70 dark:text-black/70 ${reveal(outcome.visible, 200)}`}>Through 185+ public pull requests, Notes App became a day-to-day desktop tool backed by scale benchmarks and automated test suites.</p>
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">{OUTCOMES.map((column, index) => <article key={column.title} className={`rounded-xl bg-white/10 p-6 dark:bg-black/10 ${reveal(outcome.visible, 300 + index * 150)}`}><h3 className="mb-4 text-lg font-semibold text-amber-400 dark:text-amber-700">{column.title}</h3><ul className="space-y-2">{column.items.map((item) => <li key={item} className="text-sm text-white/70 dark:text-black/70">{item}</li>)}</ul></article>)}</div>
          <blockquote className={`mx-auto max-w-3xl text-center ${reveal(outcome.visible, 600)}`}><p className="text-2xl font-medium leading-snug text-white md:text-3xl dark:text-black">Your notes should be files on your drive, opening as fast as a thought.</p></blockquote>
        </div>
      </section>
      <TechStackSection tech={TECH} />
      <CTASection />
    </div>
  );
}
