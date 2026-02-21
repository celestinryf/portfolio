"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { AlignJustify } from "lucide-react";
import MagneticLink from "@/app/components/shared/MagneticLink";
import MagneticButton from "@/app/components/shared/MagneticButton";

const NAV_LINKS = [
  { href: "/work",    label: "Work"    },
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
] as const;

// ─── Underline bar rendered inside each desktop nav link ──────────────────────
function NavUnderline() {
  return (
    <span
      aria-hidden
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-[2px] w-full rounded-full bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] origin-center pointer-events-none"
    />
  );
}

// ─── Dropdown shared by mobile burger and scroll-burger ───────────────────────
function DropdownMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="animate-dropdown-in absolute right-0 top-full mt-2 min-w-[130px] rounded-xl bg-black dark:bg-white shadow-xl backdrop-blur-sm py-4 px-6">
      <div className="flex flex-col space-y-3">
        {NAV_LINKS.map(({ href, label }) => (
          <MagneticLink
            key={href}
            href={href}
            strength={0.2}
            className="group relative text-base font-medium text-white dark:text-black"
            onClick={onClose}
          >
            {label}
            <span
              aria-hidden
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] w-full rounded-full bg-white dark:bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] origin-center pointer-events-none"
            />
          </MagneticLink>
        ))}
      </div>
    </div>
  );
}

// ─── Top Navigation ───────────────────────────────────────────────────────────
export default function TopNavigation() {
  const [isLoaded,        setIsLoaded]        = useState(false);
  const [isMenuOpen,      setIsMenuOpen]      = useState(false);
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [showScrollBurger, setShowScrollBurger] = useState(false);

  const mobileMenuRef  = useRef<HTMLDivElement>(null);
  const scrollBurgerRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Hide desktop links + show scroll burger past 120 px
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside both menus
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        !mobileMenuRef.current?.contains(t) &&
        !scrollBurgerRef.current?.contains(t)
      ) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  // Animate scroll burger in / out
  useEffect(() => {
    const burger = scrollBurgerRef.current;
    if (isScrolled && isLoaded) {
      setShowScrollBurger(true);
      setTimeout(() => {
        if (burger) gsap.fromTo(burger,
          { opacity: 0, scale: 0.8, y: -20 },
          { opacity: 1, scale: 1,   y: 0, duration: 0.4, ease: "back.out(1.7)" }
        );
      }, 10);
    } else if (!isScrolled && showScrollBurger && burger) {
      gsap.to(burger, {
        opacity: 0, scale: 0.8, y: -20, duration: 0.3, ease: "power2.in",
        onComplete: () => { setShowScrollBurger(false); setIsMenuOpen(false); },
      });
    }
  }, [isScrolled, isLoaded, showScrollBurger]);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);
  const closeMenu  = useCallback(() => setIsMenuOpen(false),     []);

  return (
    <>
      {/* ── Main nav bar ───────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-20 py-6 px-4 sm:px-8 md:px-12 text-black dark:text-white ${isLoaded ? "nav-fade-in" : "opacity-0"}`}>
        <div className="flex items-center justify-between max-w-[1880px] mx-auto">

          {/* Logo */}
          <div className={`transition-opacity duration-300 ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <MagneticLink
              href="/"
              strength={0.4}
              className={`text-2xl font-semibold ${isLoaded ? "nav-slide-up-logo" : "opacity-0"}`}
            >
              Célestin Ryf
            </MagneticLink>
          </div>

          {/* Desktop links — fade out when scrolled */}
          <div className={`hidden md:flex items-center space-x-10 transition-opacity duration-300 ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {NAV_LINKS.map(({ href, label }, i) => (
              <MagneticLink
                key={href}
                href={href}
                strength={0.4}
                className={`group relative text-xl font-medium ${isLoaded ? `nav-slide-up-${i + 1}` : "opacity-0"}`}
              >
                {label}
                <NavUnderline />
              </MagneticLink>
            ))}
          </div>

          {/* Mobile burger */}
          <div
            ref={mobileMenuRef}
            className={`relative md:hidden ${isLoaded ? "nav-slide-up-menu" : "opacity-0"}`}
          >
            <MagneticButton
              onClick={toggleMenu}
              strength={0.3}
              isIcon
              className="rounded-full flex items-center justify-center !bg-black dark:!bg-white"
              style={{ width: "clamp(50px, 10vw, 60px)", height: "clamp(50px, 10vw, 60px)" }}
            >
              <AlignJustify size={20} className="text-white dark:text-black" />
            </MagneticButton>

            {isMenuOpen && <DropdownMenu onClose={closeMenu} />}
          </div>
        </div>
      </nav>

      {/* ── Scroll burger — desktop only, appears after scrolling ──────────── */}
      {showScrollBurger && (
        <div ref={scrollBurgerRef} className="fixed top-6 right-4 sm:right-8 md:right-12 z-30 hidden md:block">
          <MagneticButton
            onClick={toggleMenu}
            strength={0.3}
            isIcon
            className="rounded-full flex items-center justify-center !bg-black dark:!bg-white"
            style={{ width: "clamp(60px, 6vw, 90px)", height: "clamp(60px, 6vw, 90px)" }}
          >
            <AlignJustify size={24} className="text-white dark:text-black" />
          </MagneticButton>

          {isMenuOpen && <DropdownMenu onClose={closeMenu} />}
        </div>
      )}
    </>
  );
}
