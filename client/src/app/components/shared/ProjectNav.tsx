"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/app/data/projects";

interface ProjectNavProps {
  currentSlug: string;
}

export default function ProjectNav({ currentSlug }: ProjectNavProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const next = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prev) router.push(`/${prev.slug}`);
      if (e.key === "ArrowRight" && next) router.push(`/${next.slug}`);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, router]);

  return (
    <>
      {/* Left arrow */}
      {prev && (
        <button
          onClick={() => router.push(`/${prev.slug}`)}
          aria-label={`Previous project: ${prev.title}`}
          className={`fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 group transition-all duration-500 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3">
            <svg className="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 4l-6 6 6 6" />
            </svg>
            <span className="hidden lg:block text-sm text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-all duration-300 max-w-[140px] text-left opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
              {prev.title}
            </span>
          </div>
        </button>
      )}

      {/* Right arrow */}
      {next && (
        <button
          onClick={() => router.push(`/${next.slug}`)}
          aria-label={`Next project: ${next.title}`}
          className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 group transition-all duration-500 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="hidden lg:block text-sm text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-all duration-300 max-w-[140px] text-right opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
              {next.title}
            </span>
            <svg className="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 4l6 6-6 6" />
            </svg>
          </div>
        </button>
      )}
    </>
  );
}
