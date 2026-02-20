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

const FEATURES = [
  { title: "Built-in Commands", body: "cd, exit, jobs, fg, bg, and other shell builtins implemented from scratch — no libraries, no shortcuts." },
  { title: "External Execution", body: "Forks child processes and uses exec() to run any system binary, with proper PATH resolution and error handling." },
  { title: "I/O Redirection", body: "Supports input (<), output (>), and append (>>) redirection by manipulating file descriptors before exec." },
  { title: "Multi-Stage Pipes", body: "Chains arbitrary numbers of commands with pipes (|), managing file descriptor plumbing across the entire pipeline." },
  { title: "Job Control", body: "Full foreground/background job management with fg, bg, and jobs — tracks PIDs, states, and process groups." },
  { title: "Signal Handling", body: "Catches SIGCHLD for background reaping, SIGTSTP for suspend, and SIGINT — the shell itself never dies." },
];

const SYSCALLS = [
  { call: "fork()", desc: "Creates child processes for command execution" },
  { call: "exec()", desc: "Replaces child process image with the target program" },
  { call: "waitpid()", desc: "Waits for specific children, handles stopped/terminated states" },
  { call: "pipe()", desc: "Creates file descriptor pairs for inter-process communication" },
  { call: "dup2()", desc: "Redirects stdin/stdout/stderr to files or pipe ends" },
  { call: "signal()", desc: "Installs handlers for SIGCHLD, SIGTSTP, SIGINT" },
  { call: "tcsetpgrp()", desc: "Transfers terminal control between shell and job process groups" },
  { call: "setpgid()", desc: "Assigns processes to groups for job control" },
];

const ENGINEERING = [
  { title: "Tokenizer & Parser", body: "Hand-written lexer splits input into tokens, then a recursive parser builds command structures with redirections, pipes, and arguments." },
  { title: "Pipeline Engine", body: "Dynamically allocates pipe file descriptors, forks each stage, wires stdin/stdout between stages, and closes unused ends — no leaks." },
  { title: "Job Table", body: "Maintains a linked list of jobs with PID, state (running/stopped/done), command string, and process group ID for full lifecycle tracking." },
  { title: "Memory Management", body: "Every malloc has a matching free. Command structures, token arrays, and job entries are cleaned up after execution — no leaks under Valgrind." },
];

const TECH = ["C", "Unix", "POSIX", "Makefile", "Valgrind", "GDB"];

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

export default function UnixShellCaseStudy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const hero = useReveal<HTMLElement>(0.1);
  const features = useReveal<HTMLDivElement>();
  const syscalls = useReveal<HTMLDivElement>();
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

  const headlineWords = "A fully functional Unix shell, written from scratch in C.".split(" ");

  return (
    <div className="bg-white dark:bg-black">
      <ProjectNav currentSlug="unix-shell" />

      {/* ────────────────── 1. HERO ────────────────── */}
      <section ref={hero.ref} className="relative min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full py-32">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">

            <div className="col-span-12 md:col-span-7 space-y-8">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
                Systems Programming &nbsp;/&nbsp; Oct – Nov 2025
              </p>

              <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-black dark:text-white">
                {headlineWords.map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[560px]">
                No libraries. No frameworks. Just C, POSIX system calls, and a blank file.
                I built a shell that handles pipes, redirection, job control, and signal
                handling — the same primitives that power bash and zsh.
              </p>

              <span className="inline-block bg-orange-400/20 text-orange-700 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-medium">
                Systems Programming
              </span>
            </div>

            <div className="col-span-12 md:col-span-5">
              {/* Terminal demo */}
              <div className="bg-neutral-950 dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl border border-neutral-800 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-1.5 text-neutral-300">
                  <p><span className="text-orange-400">mysh$</span> ls -la | grep .c | wc -l</p>
                  <p className="text-neutral-500">12</p>
                  <p><span className="text-orange-400">mysh$</span> cat main.c &gt; backup.c</p>
                  <p><span className="text-orange-400">mysh$</span> sleep 100 &amp;</p>
                  <p className="text-neutral-500">[1] 48291 running</p>
                  <p><span className="text-orange-400">mysh$</span> jobs</p>
                  <p className="text-neutral-500">[1] + running &nbsp; sleep 100</p>
                  <p><span className="text-orange-400">mysh$</span> fg %1</p>
                  <p className="text-neutral-500">^Z</p>
                  <p className="text-neutral-500">[1] + stopped &nbsp; sleep 100</p>
                  <p><span className="text-orange-400">mysh$</span> bg %1</p>
                  <p className="text-neutral-500">[1] + running &nbsp; sleep 100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neutral-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ────────────────── 2. FEATURES ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black dark:bg-white py-24 md:py-32">
        <div ref={features.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-400 font-medium mb-4 ${reveal(features.visible)}`}>
            01 / Capabilities
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-white dark:text-black leading-tight mb-12 max-w-3xl ${reveal(features.visible, 100)}`}>
            Everything a real shell does — built from nothing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className={`bg-white/5 dark:bg-black/5 rounded-xl p-6 border border-white/10 dark:border-black/10 ${reveal(features.visible, 200 + i * 80)}`}>
                <h4 className="font-semibold text-white dark:text-black mb-2 text-sm">{f.title}</h4>
                <p className="text-white/60 dark:text-black/60 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 3. SYSTEM CALLS ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={syscalls.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-medium mb-4 ${reveal(syscalls.visible)}`}>
            02 / Under the Hood
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(syscalls.visible, 100)}`}>
            Direct POSIX system calls — no abstractions
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-12 ${reveal(syscalls.visible, 200)}`}>
            Every feature maps directly to Unix system calls. No wrapper libraries,
            no runtime — just the kernel interface.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SYSCALLS.map((s, i) => (
              <div key={s.call}
                className={`border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 ${reveal(syscalls.visible, 250 + i * 60)}`}>
                <code className="text-orange-600 dark:text-orange-400 font-mono text-sm font-bold block mb-2">{s.call}</code>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 4. ENGINEERING ────────────────── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-neutral-50 dark:bg-neutral-900 py-24 md:py-32">
        <div ref={eng.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-medium mb-4 ${reveal(eng.visible)}`}>
            03 / Engineering
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(eng.visible, 100)}`}>
            Hand-written parsing, pipelines, and memory management
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(eng.visible, 200)}`}>
            The shell is structured as a pipeline: raw input goes through tokenization,
            parsing, and execution. Each stage is a clean C module with explicit memory
            ownership.
          </p>

          {/* Pipeline diagram */}
          <div className="mb-16 overflow-x-auto">
            <div className="flex items-center gap-0 min-w-[500px] md:min-w-0">
              {["Input", "Tokenizer", "Parser", "Executor", "Job Table"].map((label, i) => (
                <div key={label} className="flex items-center">
                  <div className="bg-white dark:bg-black rounded-lg px-5 py-3 border border-neutral-200 dark:border-neutral-700 text-sm font-mono text-black dark:text-white whitespace-nowrap">
                    {label}
                  </div>
                  {i < 4 && (
                    <div className="w-8 md:w-12 flex items-center justify-center text-neutral-400 shrink-0">
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 6h22M18 1l4 5-4 5" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* ────────────────── 5. TECH STACK ────────────────── */}
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

      {/* ────────────────── 6. OUTCOME ────────────────── */}
      <section className="py-24 md:py-32">
        <div ref={outcome.ref} className="max-w-[1400px] mx-auto px-6 md:px-16">
          <p className={`text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-medium mb-4 ${reveal(outcome.visible)}`}>
            04 / Takeaway
          </p>
          <h2 className={`text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight mb-6 max-w-3xl ${reveal(outcome.visible, 100)}`}>
            The project that made systems programming click
          </h2>
          <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg max-w-2xl mb-16 ${reveal(outcome.visible, 200)}`}>
            Building a shell from scratch forced me to understand how processes actually work —
            not the textbook version, but the real fork/exec/wait lifecycle, file descriptor
            plumbing, and signal delivery. Every feature required thinking at the kernel level.
          </p>

          {/* Concept breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Process Management", items: ["fork() + exec() lifecycle", "Process group assignment", "Foreground/background control", "Zombie reaping with SIGCHLD"] },
              { title: "I/O Plumbing", items: ["File descriptor manipulation", "dup2() for redirection", "Multi-stage pipe wiring", "Proper close() discipline"] },
              { title: "Signal Handling", items: ["SIGCHLD for child status", "SIGTSTP for job suspend", "SIGINT forwarding to fg job", "Shell signal immunity"] },
            ].map((col, i) => (
              <div key={col.title}
                className={`bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-100 dark:border-neutral-800 ${reveal(outcome.visible, 300 + i * 150)}`}>
                <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-neutral-600 dark:text-neutral-400 text-sm flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <blockquote className={`text-center max-w-3xl mx-auto ${reveal(outcome.visible, 600)}`}>
            <span className="text-6xl text-orange-400 leading-none block mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-black dark:text-white leading-snug">
              You don&apos;t really understand Unix until you&apos;ve built a shell.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ────────────────── 7. CTA ────────────────── */}
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
