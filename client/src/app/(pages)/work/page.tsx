"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { PROJECTS, type Project } from "@/app/data/projects";

interface ProjectItemProps {
  project: Project;
  index: number;
  onHover: (isHovering: boolean) => void;
  isHovered: boolean;
}

function ProjectItem({
  project,
  index,
  onHover,
  isHovered,
}: ProjectItemProps) {
  const router = useRouter();
  const itemRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    // Skip hover animations on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseEnter = () => {
      onHover(true);

      if (numberRef.current) {
        gsap.to(numberRef.current, {
          x: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      onHover(false);

      if (numberRef.current) {
        gsap.to(numberRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const element = itemRef.current;
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onHover]);

  const handleClick = () => {
    router.push(`/${project.slug}`);
  };

  return (
    <div
      ref={itemRef}
      onClick={handleClick}
      className={`group cursor-pointer transition-all duration-300 ${
        isHovered ? "bg-gray-50 dark:bg-gray-900/50" : ""
      }`}
    >
      <div className="grid grid-cols-12 gap-4 sm:gap-8 py-8 sm:py-12 px-4 sm:px-8 md:px-16">
        <div className="col-span-12 md:col-span-5 flex items-start gap-6">
          <span
            ref={numberRef}
            className="text-sm text-gray-400 dark:text-gray-500 font-light mt-2"
            style={{ minWidth: "30px" }}
          >
            {project.id}
          </span>
          <div ref={titleRef} className="flex-1">
            <h3 className="text-3xl md:text-4xl font-light text-black dark:text-white mb-2 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
              {project.category} · {project.year}
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 pl-0 md:pl-12">
          <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 ${
                  isHovered
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .stagger-1 {
          animation-delay: 0.1s;
        }
        .stagger-2 {
          animation-delay: 0.2s;
        }
        .stagger-3 {
          animation-delay: 0.3s;
        }
        .stagger-4 {
          animation-delay: 0.4s;
        }
      `}</style>

      {/* Header */}
      <div className="pt-32 pb-20 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1
            className={`text-4xl sm:text-6xl md:text-9xl font-normal mt-16 text-black dark:text-white tracking-tight mb-6 ${
              isLoaded ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Featured Works
          </h1>
        </div>
      </div>


      {/* Projects List */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Table Headers */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-12 gap-4 sm:gap-8 py-6 px-4 sm:px-8 mb-4 md:px-16">
            <div className="col-span-12 md:col-span-5 flex items-center gap-6">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400" style={{ minWidth: "30px" }}>
                #
              </span>
              <h2 className="text-sm font-medium !text-gray-500 dark:text-gray-100 uppercase tracking-wider">
                Project
              </h2>
            </div>
            <div className="hidden md:block col-span-7 pl-12">
              <h2 className="text-sm font-medium !text-gray-500 dark:text-gray-100 uppercase tracking-wider">
                Description & Tech Stack
              </h2>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`${
                isLoaded
                  ? `animate-fade-in-up stagger-${Math.min(index + 2, 4)}`
                  : "opacity-0"
              }`}
            >
              <ProjectItem
                project={project}
                index={index}
                onHover={(isHovering) => {
                  setHoveredProject(isHovering ? project.id : null);
                }}
                isHovered={hoveredProject === project.id}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
