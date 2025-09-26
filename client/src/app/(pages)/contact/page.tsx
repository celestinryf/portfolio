"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Magnetic Link Component - Same as TopNavigation
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  strength?: number;
  className?: string;
  isExternal?: boolean;
}

function MagneticLink({ 
  href, 
  children, 
  strength = 0.3, 
  className = "",
  isExternal = false 
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const innerTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const text = textRef.current;
    const innerText = innerTextRef.current;
    
    if (!link || !text || !innerText) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      // Move the link container with matrix3d for hardware acceleration
      gsap.to(link, {
        duration: 0.3,
        x: deltaX,
        y: deltaY,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
      
      // Move the text with less intensity
      gsap.to(text, {
        duration: 0.3,
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
    };

    const handleMouseLeave = () => {
      // Return to original position with elastic ease
      gsap.to(link, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
      
      gsap.to(text, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
    };

    link.addEventListener('mousemove', handleMouseMove);
    link.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      link.removeEventListener('mousemove', handleMouseMove);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const externalProps = isExternal ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <a
      ref={linkRef}
      href={href}
      className={`inline-block relative cursor-pointer ${className}`}
      style={{ transform: 'rotate(0.001deg)' }}
      {...externalProps}
    >
      <span 
        ref={textRef}
        className="magnetic-link-text inline-block transition-colors duration-200 relative"
        style={{ transform: 'rotate(0.001deg)' }}
      >
        <span 
          ref={innerTextRef}
          className="inline-block"
        >
          {children}
        </span>
      </span>
    </a>
  );
}

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    honeypot: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Animation refs
  const headerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Magnetic button refs
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submitTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [headerRef, formRef, contactRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateTime = (): void => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Los_Angeles',
        timeZoneName: 'short'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Magnetic effect for submit button - exactly like footer's "Get in touch" button
  useEffect(() => {
    const button = submitButtonRef.current;
    const text = submitTextRef.current;
    
    if (!button || !text) return;

    const strength = 0.4; // Same strength as "Get in touch" button

    const handleMouseMove = (e: MouseEvent) => {
      if (button.disabled) return; // Don't apply magnetic effect when disabled
      
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      // Move the entire button container (the circle) - this is the main magnetic effect
      gsap.to(button, {
        duration: 0.3,
        x: deltaX,
        y: deltaY,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
      
      // Move the text with half the intensity (just like MagneticLink does)
      gsap.to(text, {
        duration: 0.3,
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        rotationZ: 0.001,
        ease: "power2.out",
        force3D: true
      });
    };

    const handleMouseLeave = () => {
      // Return the entire button to original position with elastic ease
      gsap.to(button, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
      
      // Return the text to original position
      gsap.to(text, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationZ: 0.001,
        ease: "elastic.out(1, 0.3)",
        force3D: true
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [submitStatus]); // Re-run when submitStatus changes

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    // Basic spam protection
    if (formData.honeypot) return;
    
    if (!validateForm()) return;
    
    setSubmitStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
        honeypot: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const isSubmitting = submitStatus === 'submitting';

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <style jsx global>{`
        /* Magnetic link underline animation */
        .magnetic-link-text::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .magnetic-link:hover .magnetic-link-text::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Submit button styles - matching footer's "Get in touch" button */
        .submit-button {
          overflow: hidden;
          background-color: black !important;
          transition: transform 0.2s ease;
          cursor: pointer;
        }

        .dark .submit-button {
          background-color: white !important;
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-button:disabled:hover {
          transform: scale(1);
        }

        .submit-button-text {
          position: relative;
          z-index: 10;
          color: white !important;
        }

        .dark .submit-button-text {
          color: black !important;
        }

        /* Links stay the same color on hover */
        .contact-link {
          color: black;
          transition: transform 0.3s ease;
        }

        .dark .contact-link {
          color: white !important;
        }

        /* Animation utilities */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
      
      {/* Main Content */}
      <main className="container mx-auto px-5 sm:px-6 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <section 
            ref={headerRef}
            className="mb-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-6xl md:text-7xl font-normal leading-tight mb-6">
                  <div className="flex items-center mb-2">
                    Let's build a
                  </div>
                  <span className="block">project together</span>
                </h1>
              </div>
              <div className="flex justify-end">
              </div>
            </div>
          </section>

          {/* Form and Contact Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Contact Form */}
            <div 
              ref={formRef}
              className="lg:col-span-2 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200"
            >
              <div className="space-y-16">
                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  className="absolute -left-9999px opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                {/* Name Field */}
                <div className="group border-t border-neutral-700 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-2">
                      <span className="text-lg font-light text-neutral-500">01</span>
                    </div>
                    <div className="col-span-10">
                      <label htmlFor="name" className="block text-xl text-neutral-400 mb-4">
                        What's your name?
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe *"
                        className="w-full bg-transparent pb-4 text-xl text-black dark:text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group border-t border-neutral-700 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-2">
                      <span className="text-lg font-light text-neutral-500">02</span>
                    </div>
                    <div className="col-span-10">
                      <label htmlFor="email" className="block text-xl text-neutral-400 mb-4">
                        What's your email?
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@doe.com *"
                        className="w-full bg-transparent pb-4 text-xl text-black dark:text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Company Field */}
                <div className="group border-t border-neutral-700 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-2">
                      <span className="text-lg font-light text-neutral-500">03</span>
                    </div>
                    <div className="col-span-10">
                      <label htmlFor="company" className="block text-xl text-neutral-400 mb-4">
                        What's the name of your organization?
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company Inc."
                        className="w-full bg-transparent pb-4 text-xl text-black dark:text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Services Field */}
                <div className="group border-t border-neutral-700 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-2">
                      <span className="text-lg font-light text-neutral-500">04</span>
                    </div>
                    <div className="col-span-10">
                      <label htmlFor="service" className="block text-xl text-neutral-400 mb-4">
                        What services are you looking for?
                      </label>
                      <input
                        type="text"
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        placeholder="Web Development, System Architecture, ML Engineering..."
                        className="w-full bg-transparent pb-4 text-xl text-black dark:text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="group border-t border-neutral-700 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-2">
                      <span className="text-lg font-light text-neutral-500">05</span>
                    </div>
                    <div className="col-span-10">
                      <label htmlFor="message" className="block text-xl text-neutral-400 mb-4">
                        Your message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Hello Célestin, can you help me with... *"
                        className="w-full bg-transparent pb-4 text-xl text-black dark:text-white placeholder-neutral-600 focus:outline-none duration-300 resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-2">{errors.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="relative z-10 border-t border-neutral-700">
                  <button
                    ref={submitButtonRef}
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="submit-button w-48 h-48 rounded-full !-translate-y-1/2 !translate-x-1/2 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ transform: 'rotate(0.001deg)' }}
                  >
                    <div 
                      ref={submitTextRef}
                      className="submit-button-text flex items-center justify-center h-full"
                      style={{ transform: 'rotate(0.001deg)' }}
                    >
                      {isSubmitting ? (
                        <div className="animate-spin w-6 h-6 rounded-full" />
                      ) : (
                        <>Send it!</>
                      )}
                    </div>
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className="mt-4 text-green-400 text-sm animate-fade-in">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mt-4 text-red-400 text-sm animate-fade-in">
                      Something went wrong. Please try again.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div 
              ref={contactRef}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-400 space-y-12"
            >
              {/* Contact Information */}
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-6">
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <MagneticLink 
                      href="mailto:celestin@gmail.com" 
                      strength={0.4}
                      className="contact-link text-lg"
                    >
                      celestin@gmail.com
                    </MagneticLink>
                  </div>
                  <div>
                    <MagneticLink 
                      href="tel:+12538819185" 
                      strength={0.4}
                      className="contact-link text-lg"
                    >
                      +1 (253) 881-9185
                    </MagneticLink>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-6">
                  Socials
                </h3>
                <div className="space-y-4">
                  <div>
                    <MagneticLink 
                      href="https://linkedin.com/in/celestinryf" 
                      strength={0.4}
                      isExternal={true}
                      className="contact-link text-lg"
                    >
                      LinkedIn
                    </MagneticLink>
                  </div>
                  <div>
                    <MagneticLink 
                      href="https://github.com/celestinryf" 
                      strength={0.4}
                      isExternal={true}
                      className="contact-link text-lg"
                    >
                      GitHub
                    </MagneticLink>
                  </div>
                </div>
              </div>

              {/* Local Time */}
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-2">
                  Local Time (Seattle)
                </h3>
                <p className="text-black dark:text-white transition-all duration-500">
                  {currentTime || '--:-- -- ---'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;