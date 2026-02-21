"use client";

import { useRouter } from "next/navigation";
import MagneticButton from "@/app/components/shared/MagneticButton";

export default function AboutSection() {
  const router = useRouter();

  return (
    <div className="mb-16 md:mb-32 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Intro text */}
        <div className="max-w-4xl">
          <p
            className="text-black/80 dark:text-white/80 font-normal leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.8vw, 30px)" }}
          >
            Software Engineer and CS student at the University of Washington.
            Major interests in backend, systems architecture, cloud infrastructure, machine
            learning, and data science.
          </p>
          <p
            className="text-black/80 dark:text-white/80 font-normal leading-relaxed mt-6"
            style={{ fontSize: "clamp(16px, 1.8vw, 30px)" }}
          >
            My love for programming started with Hour of Code in elementary school
            and was cemented by a robotics class my freshman year of high school.
            Since then I&apos;ve interned at a startup and at UW building internal
            tools, founded the 2nd largest CS club at UWT, and organized the
            largest hackathon south of Seattle. My priorities are shipping fast, delivering for my clients,
            and creating opportunities for others to grow.
          </p>
        </div>

        {/* About me circular button */}
        <div className="flex justify-center md:justify-end">
          <MagneticButton
            onClick={() => router.push("/about")}
            strength={0.4}
            className="flex items-center justify-center rounded-full !bg-black dark:!bg-white text-white dark:text-black hover:scale-105 transition-all cursor-pointer"
            style={{
              width: "clamp(120px, 12vw, 225px)",
              height: "clamp(120px, 12vw, 225px)",
            }}
          >
            <span className="font-medium" style={{ fontSize: "clamp(14px, 1.1vw, 20px)" }}>
              About me
            </span>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}