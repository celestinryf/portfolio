"use client";

import MagneticLink from "@/app/components/shared/MagneticLink";

function SkillTag({ label }: { label: string }) {
  return (
    <span className="px-4 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium shadow-sm">
      {label}
    </span>
  );
}

function Divider() {
  return <div className="border-t border-gray-300 dark:border-gray-700 py-8" />;
}

// ─── #01: UHackathon — editorial feature panel ────────────────────────────────
function ProjectUHackathon() {
  return (
    <div className="mb-24">
      {/* Break out of the parent's horizontal padding to run edge-to-edge */}
      <div className="-mx-[5vw] px-[5vw] pt-16 pb-12">

        {/* ── Top bar ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-8 border-b border-black/10 dark:border-white/10 mb-0">
          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-widest uppercase">
            Featured Achievement
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400 tracking-widest">
            Spring 2025
          </span>
        </div>

        {/* ── Display title ── */}
        <h3
          className="font-light leading-none tracking-tight text-black dark:text-white my-8 overflow-hidden"
          style={{ fontSize: "clamp(2.5rem, 10vw, 15rem)" }}
        >
          UHackathon
        </h3>

        {/* ── Main body: tall image left · stats + second image right ── */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 mb-0">

          {/* Left — primary image, tall */}
          <div className="h-[55vh] md:h-[70vh] overflow-hidden">
            <img
              src="/assets/room.png"
              alt="UHackathon venue"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — stats, description, skills, CTA */}
          <div className="flex flex-col gap-6">

            {/* Stats stacked */}
            <div className="flex flex-col gap-0 divide-y divide-black/10 dark:divide-white/10">
              {[
                { value: "100+", label: "Attendees" },
                { value: "#1",   label: "South of Seattle" },
                { value: "2yr",  label: "UWT Contract" },
                { value: "12",   label: "Internship Placements" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-baseline justify-between py-4">
                  <span
                    className="font-light leading-none text-black dark:text-white"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide uppercase text-right max-w-[120px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              Organized the largest hackathon south of Seattle with 100+ attendees,
              an annual format, and 12 internship placements coming
              out of a single event.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {["Event Production", "Community Building", "Sponsorship", "Logistics", "Figma"].map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>

            {/* CTA */}
            <div>
              <MagneticLink
                href="/uhackathon"
                strength={0.4}
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                View Case Study
              </MagneticLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── #02: Tech Startup Club ───────────────────────────────────────────────────
function ProjectTechStartupClub() {

  return (
    <div>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-left">
          <h4 className="text-4xl text-black dark:text-white font-normal">
            President &amp; Founder
          </h4>
          <p className="text-black dark:text-gray-300 mb-1">Tech Startup Club</p>
          <p className="text-sm text-gray-400 mb-8">Sept. 2024 – Present</p>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-lg mb-8 overflow-hidden">
            <img src="/assets/umarket1.png" alt="Tech Startup Club" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-left">
          <div className="mb-8">
            <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">
              Leadership Role
            </p>
            <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">
              Tech Startup Club
            </h5>
            <p className="text-black dark:text-gray-300 text-sm mb-4">
              Student Software Consultancy
            </p>
          </div>

          <div className="mb-8">
            <div className="border-t border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Founded the 2nd largest CS club at UWT, a software consultancy
                managing projects for clients. As President I lead project management, client relations,
                developer growth, and team coordination to deliver production software for local businesses.
              </p>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Launched a structured mentorship program pairing student engineers
                with industry professionals, directly facilitating 14 internship
                placements.
              </p>
            </div>
            <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Develops and owns features end-to-end from ideation to deployment, collaborating directly with clients to iterate based on feedback in a fast-moving consultancy environment.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {["Leadership", "Project Management", "TypeScript", "React", "Go", "Docker", "Jira", "Figma"].map(
                (skill) => <SkillTag key={skill} label={skill} />
              )}
            </div>
            <p className="text-black dark:text-gray-300 leading-relaxed">
              Built a student-led consultancy that ships real software for real clients,
              while developing the next generation of engineers through mentorship and
              hands-on project experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── #03: UW Tacoma SET ───────────────────────────────────────────────────────
function ProjectSETlib() {
  return (
    <div className="mb-16">
      <Divider />
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-left">
            <h4 className="text-4xl text-black dark:text-white font-normal">
              Software Engineer Intern
            </h4>
            <p className="text-black dark:text-gray-300 mb-1">
              University of Washington Tacoma
            </p>
            <p className="text-sm text-gray-400 mb-8">June 2025 – Sept. 2025</p>
          </div>
          <div>
            <div className="border-t border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Developed a Spring Boot worksheet management platform for UW faculty,
                designing RESTful routes for CRUD operations and engineering a support
                ticketing system that cut resolution time by 45%.
              </p>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Independently optimized AWS RDS performance by 25% by architecting read
                replicas to handle high-volume loads, and implemented an IAM security
                layer with AWS Cognito and JWT for role-based professor access.
              </p>
            </div>
            <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Maintained 100% JUnit test coverage across all REST endpoints, ensuring
                stability for every core platform feature.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[500px] flex items-center justify-center rounded-lg mb-8 overflow-hidden">
          <img src="/assets/SETlib.png" alt="SETlib" className="object-contain max-h-fill" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">
              Professional Project 01
            </p>
            <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">
              SETlib
            </h5>
            <p className="text-black dark:text-gray-300 text-sm mb-4">
              Worksheet Management Platform
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {["Java", "Spring Boot", "AWS RDS", "AWS Cognito", "JWT", "JUnit", "REST API", "IAM", "PostgreSQL"].map(
                (skill) => <SkillTag key={skill} label={skill} />
              )}
            </div>
            <p className="text-black dark:text-gray-300 leading-relaxed">
              Contracted by the UW Tacoma SET department to build an internal platform
              for faculty worksheet management and student support workflows.
            </p>
            <MagneticLink
              href="/SETlib"
              strength={0.4}
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4"
            >
              View Case Study
            </MagneticLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── #04: Insights Emerge ─────────────────────────────────────────────────────
function ProjectIlluminance() {
  return (
    <div className="mb-16">
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-left">
          <h4 className="text-4xl text-black dark:text-white font-normal">
            Software Engineer Intern
          </h4>
          <p className="text-black dark:text-gray-300 mb-1">Insights Emerge</p>
          <p className="text-sm text-gray-400 mb-8">April 2025 – June 2025</p>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-lg mb-8 overflow-hidden">
            <img src="/assets/lms.png" alt="Illuminance Esthetics LMS" className="object-contain max-h-fill" />
          </div>
        </div>

        <div className="text-left">
          <div className="mb-8">
            <p className="text-xs text-gray-400 font-light mb-2 tracking-widest">
              Professional Project 02
            </p>
            <h5 className="text-3xl md:text-4xl text-black dark:text-white font-light mb-2">
              Illuminance Esthetics
            </h5>
            <p className="text-black dark:text-gray-300 text-sm mb-4">
              Beauty School LMS
            </p>
          </div>

          <div className="mb-8">
            <div className="border-t border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Developed full-stack features end-to-end for a client-facing LMS using
                Next.js, Go, and PostgreSQL, including custom hooks and reusable
                components to accelerate user testing cycles.
              </p>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Designed Go RESTful routes and optimized PostgreSQL queries to eliminate
                UI latency, then presented weekly data-driven product reports directly
                to clients to guide roadmap decisions.
              </p>
            </div>
            <div className="border-t border-b border-gray-300 dark:border-gray-700 py-4">
              <p className="text-black dark:text-gray-300">
                Collaborated across design and engineering to bridge UI specs with
                backend capabilities in a fast-moving consultancy environment.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {["Next.js", "Go", "PostgreSQL", "TypeScript", "REST API", "Stakeholder Communication"].map(
                (skill) => <SkillTag key={skill} label={skill} />
              )}
            </div>
            <p className="text-black dark:text-gray-300 leading-relaxed">
              Shipped production features for a beauty school&apos;s internal learning
              management system, working directly with the client from spec through deployment.
            </p>
            <MagneticLink
              href="/work"
              strength={0.4}
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-4"
            >
              View Case Study
            </MagneticLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Experience Section ────────────────────────────────────────────────────────
export default function ExperienceSection() {
  return (
    <>
      <div className="mb-20">
        <h2 className="text-5xl md:text-7xl font-light text-black dark:text-white tracking-tight">
          My experience
        </h2>
      </div>

      <ProjectSETlib />
      <ProjectIlluminance />
      <ProjectUHackathon />
      <ProjectTechStartupClub />
    </>
  );
}
