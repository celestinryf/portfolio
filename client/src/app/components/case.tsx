"use client";

import Image from "next/image";
import Link from "next/link"; // ← added
import { useEffect, useMemo, useState, useCallback } from "react";

export type CaseBullet = { title: string; body: string };
export type CaseSection = {
  eyebrow?: string;
  title: string;
  tocLabel?: string;
  intro?: string;
  bullets?: CaseBullet[];
  imageSrc?: string;
  imageAlt?: string;
};

type CaseProps = {
  title: string;
  subtitle?: string;
  role?: string;
  client?: string;
  toolsUsed?: string;
  liveSiteLabel?: string;
  liveSiteHref?: string;
  heroSrc?: string;
  heroAlt?: string;
  sections: CaseSection[];
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Case({
  title,
  subtitle,
  role,
  client,
  toolsUsed,
  liveSiteLabel,
  liveSiteHref,
  heroSrc,
  heroAlt,
  sections,
}: CaseProps) {
  const ids = useMemo(
    () => sections.map((s, i) => (s.title ? slugify(s.title) : `section-${i}`)),
    [sections]
  );
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  // Lightbox state
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  const openLightbox = useCallback((src: string, alt?: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt || "");
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    setLightboxAlt("");
    document.documentElement.style.overflow = "";
  }, []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc, closeLightbox]);

  // Active section highlight
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return (
    <main className="mx-auto w-full max-w-[1636px] px-3 md:px-6 py-12 md:py-16">
      {/* HERO BLOCK */}
      <div className="grid grid-cols-12 gap-0 md:gap-12">
        <div className="col-span-12 md:col-span-6 bg-neutral-50 px-6 md:px-10 py-12 space-y-8">
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="border-l-4 border-lime-400 pl-4 text-neutral-700">
                {subtitle}
              </p>
            )}
          </header>

          <div className="space-y-6 text-sm">
            {role && (
              <div>
                <div className="text-neutral-500">Role</div>
                <div className="text-neutral-900 font-medium">{role}</div>
              </div>
            )}
            {client && (
              <div>
                <div className="text-neutral-500">Client</div>
                <div className="text-neutral-900 font-medium">{client}</div>
              </div>
            )}
            {toolsUsed && (
              <div>
                <div className="text-neutral-500">Tools Used</div>
                <div className="text-neutral-900 font-medium">{toolsUsed}</div>
              </div>
            )}
            {liveSiteLabel && (
              <div>
                <div className="text-neutral-500">Live Site</div>
                <div className="text-neutral-900 font-medium">
                  {liveSiteHref ? (
                    <a
                      href={liveSiteHref}
                      target="_blank"
                      className="underline decoration-lime-400 underline-offset-4 hover:text-lime-700"
                    >
                      {liveSiteLabel}
                    </a>
                  ) : (
                    liveSiteLabel
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 m-6 md:m-0">
            {heroSrc && (
              <Image
                src={heroSrc}
                alt={heroAlt || ""}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
      </div>

      <hr className="my-12 border-neutral-200/70" />

      {/* TOC + Sections */}
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-start px-1 md:px-0">
        <nav className="hidden md:block col-span-2 sticky top-24 self-start">
          <ul className="space-y-2 text-sm">
            {sections.map((s, i) => {
              const id = ids[i];
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={[
                      "block px-3 py-1.5 rounded-md transition",
                      isActive
                        ? "text-lime-700 bg-lime-50 border border-lime-100"
                        : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {s.tocLabel || s.title || `Section ${i + 1}`}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="col-span-12 md:col-span-7 space-y-16">
          {sections.map((s, i) => (
            <section id={ids[i]} key={ids[i]} className="space-y-5 scroll-mt-24">
              {s.eyebrow && (
                <div className="text-xs uppercase tracking-widest text-neutral-500">
                  {s.eyebrow}
                </div>
              )}
              <h2 className="text-2xl font-semibold leading-snug">{s.title}</h2>
              {s.intro && (
                <p className="border-l-4 border-lime-400 pl-4 text-neutral-700 max-w-prose">
                  {s.intro}
                </p>
              )}
              {s.bullets && (
                <ul className="space-y-6">
                  {s.bullets.map((b, j) => (
                    <li key={j}>
                      <div className="font-medium">{b.title}</div>
                      <p className="text-neutral-700">{b.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="col-span-12 md:col-span-3 space-y-8 md:sticky md:top-20">
          {sections.map(
            (s, i) =>
              s.imageSrc && (
                <button
                  key={`rail-${i}`}
                  type="button"
                  onClick={() => openLightbox(s.imageSrc!, s.imageAlt)}
                  className="group relative block w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  aria-label={`Open image: ${s.imageAlt || "case image"}`}
                >
                  <Image
                    src={s.imageSrc}
                    alt={s.imageAlt || ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02] cursor-zoom-in"
                  />
                </button>
              )
          )}
        </aside>
      </div>

      {/* Bottom CTA — View more projects */}
      <section className="mt-20 md:mt-28 max-w-[1400px] mx-auto text-center">
        <Link
          href="/work"
          className="inline-flex items-center rounded-full border border-neutral-400 px-28 py-4 text-base font-medium hover:bg-neutral-50 transition"
        >
          View more projects
        </Link>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 z-[110] w-12 h-12 rounded-full bg-white/95 hover:bg-white shadow focus:outline-none focus:ring-2 focus:ring-lime-400 flex items-center justify-center text-base font-medium"
            aria-label="Close image"
          >
            ✕
          </button>

          <div
            className="relative max-w-[95vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={lightboxSrc}
                alt={lightboxAlt}
                fill
                className="object-contain select-none"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}