"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import MagneticLink from "@/app/components/shared/MagneticLink";

const GETFORM_ENDPOINT = "https://getform.io/f/ayveojqb";

type FieldId = "name" | "email" | "company" | "service" | "message";
type FormData = Record<FieldId | "honeypot", string>;

const FIELDS: { id: FieldId; label: string; placeholder: string; required?: boolean; type?: string; multiline?: boolean }[] = [
  { id: "name", label: "What's your name?", placeholder: "John Doe *", required: true },
  { id: "email", label: "What's your email?", placeholder: "john@doe.com *", required: true, type: "email" },
  { id: "company", label: "What's the name of your organization?", placeholder: "Your Company Inc." },
  { id: "service", label: "What services are you looking for?", placeholder: "Web Development, System Architecture, ML Engineering..." },
  { id: "message", label: "Your message", placeholder: "Hello Célestin, can you help me with... *", required: true, multiline: true },
];
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const CONTACTS = [
  { href: "mailto:celestin@gmail.com", label: "celestin@gmail.com" },
  { href: "tel:+12538819185", label: "+1 (253) 881-9185" },
];
const SOCIALS = [
  { href: "https://linkedin.com/in/celestinryf", label: "LinkedIn" },
  { href: "https://github.com/celestinryf", label: "GitHub" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", company: "", service: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [currentTime, setCurrentTime] = useState("");

  const headerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitTextRef = useRef<HTMLDivElement>(null);

  // Intersection observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && e.target instanceof HTMLElement) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.1 }
    );
    [headerRef, formRef, contactRef].forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  // Clock
  useEffect(() => {
    const update = () =>
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Los_Angeles", timeZoneName: "short" }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Magnetic effect on submit button
  useEffect(() => {
    const btn = submitBtnRef.current;
    const txt = submitTextRef.current;
    if (!btn || !txt) return;
    const strength = 0.4;

    const onMove = (e: MouseEvent) => {
      if (btn.disabled) return;
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(btn, { duration: 0.3, x: dx, y: dy, rotationZ: 0.001, ease: "power2.out", force3D: true });
      gsap.to(txt, { duration: 0.3, x: dx * 0.5, y: dy * 0.5, rotationZ: 0.001, ease: "power2.out", force3D: true });
    };
    const onLeave = () => {
      gsap.to(btn, { duration: 0.5, x: 0, y: 0, rotationZ: 0.001, ease: "elastic.out(1, 0.3)", force3D: true });
      gsap.to(txt, { duration: 0.5, x: 0, y: 0, rotationZ: 0.001, ease: "elastic.out(1, 0.3)", force3D: true });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, [submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as FieldId]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async () => {
    if (formData.honeypot) return;

    const newErrors: Partial<Record<FieldId, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setSubmitStatus("submitting");
    try {
      const res = await fetch(GETFORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, company: formData.company, service: formData.service, message: formData.message }),
      });
      if (!res.ok) throw new Error("Form submission failed");
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", service: "", message: "", honeypot: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const isSubmitting = submitStatus === "submitting";

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-5 sm:px-6 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24 relative">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <section ref={headerRef} className="mb-20 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <h1 className="text-6xl md:text-7xl font-normal leading-tight mb-6">
              <span className="block mb-2">Let&apos;s build a</span>
              <span className="block">project together</span>
            </h1>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-2 opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200">
              <div className="space-y-16">
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange}
                  className="absolute -left-9999px opacity-0" tabIndex={-1} autoComplete="off" />

                {FIELDS.map((f, i) => (
                  <div key={f.id} className="group border-t border-neutral-700 py-8">
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-2">
                        <span className="text-lg font-light text-neutral-500">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="col-span-10">
                        <label htmlFor={f.id} className="block text-xl text-neutral-400 mb-4">{f.label}</label>
                        {f.multiline ? (
                          <textarea id={f.id} name={f.id} value={formData[f.id]} onChange={handleChange} rows={6}
                            placeholder={f.placeholder}
                            className="w-full bg-transparent pb-4 text-xl text-black dark:text-white placeholder-neutral-600 focus:outline-none resize-none" />
                        ) : (
                          <input type={f.type ?? "text"} id={f.id} name={f.id} value={formData[f.id]} onChange={handleChange}
                            placeholder={f.placeholder}
                            className="w-full bg-transparent pb-4 text-xl text-black dark:text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300" />
                        )}
                        {errors[f.id] && <p className="text-red-400 text-sm mt-2">{errors[f.id]}</p>}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Submit */}
                <div className="relative z-10 border-t border-neutral-700">
                  <button ref={submitBtnRef} type="button" disabled={isSubmitting} onClick={handleSubmit}
                    className="w-48 h-48 rounded-full font-medium text-lg !bg-black dark:!bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ transform: "translate(50%, -50%) rotate(0.001deg)" }}>
                    <div ref={submitTextRef} className="flex items-center justify-center h-full !text-white dark:!text-black"
                      style={{ transform: "rotate(0.001deg)" }}>
                      {isSubmitting ? <div className="animate-spin w-6 h-6 rounded-full" /> : "Send it!"}
                    </div>
                  </button>
                  {submitStatus === "success" && (
                    <p className="mt-4 text-green-400 text-sm animate-fade-in">Message sent successfully! I&apos;ll get back to you soon.</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="mt-4 text-red-400 text-sm animate-fade-in">Something went wrong. Please try again.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div ref={contactRef} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400 space-y-12">
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-6">Contact Details</h3>
                <div className="space-y-4">
                  {CONTACTS.map((c) => (
                    <div key={c.href}><MagneticLink href={c.href} strength={0.4} className="text-lg">{c.label}</MagneticLink></div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-6">Socials</h3>
                <div className="space-y-4">
                  {SOCIALS.map((s) => (
                    <div key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-lg text-black dark:text-white hover:opacity-70 transition-opacity">
                        {s.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-2">Local Time (Seattle)</h3>
                <p className="text-black dark:text-white">{currentTime || "--:-- -- ---"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
