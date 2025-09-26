"use client";

import React, { useState, useRef, useEffect } from 'react';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Basic spam protection
    if (formData.honeypot) return;
    
    if (!validateForm()) return;
    
    setSubmitStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
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
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <section 
            ref={headerRef}
            className="mb-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-light leading-tight mb-6">
                  <div className="flex items-center mb-2">
                    Let&apos;s start a
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
              <form onSubmit={handleSubmit} className="space-y-16">
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
                        What&apos;s your name?
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe *"
                        className="w-full bg-transparent pb-4 text-xl text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
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
                        What&apos;s your email?
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@doe.com *"
                        className="w-full bg-transparent pb-4 text-xl text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
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
                        What&apos;s the name of your organization?
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company Inc."
                        className="w-full bg-transparent pb-4 text-xl text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
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
                        className="w-full bg-transparent pb-4 text-xl text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300"
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
                        className="w-full bg-transparent pb-4 text-xl text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300 resize-none"
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
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-32 h-32 rounded-full bg-white text-black font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center justify-center h-full group-hover:text-white transition-colors duration-300">
                      {isSubmitting ? (
                        <div className="animate-spin w-6 h-6 border-2 border-current border-t-transparent rounded-full" />
                      ) : (
                        <>
                          Send it!
                        </>
                      )}
                    </div>
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className="mt-4 text-green-400 text-sm animate-fade-in">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mt-4 text-red-400 text-sm animate-fade-in">
                      Something went wrong. Please try again.
                    </div>
                  )}
                </div>
              </form>
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
                  <a 
                    href="mailto:celestin@example.com" 
                    className="block text-lg text-white hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    celestin@example.com
                  </a>
                  <a 
                    href="tel:+1234567890" 
                    className="block text-lg text-white hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>

              {/* Business Details */}
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-6">
                  Business Details
                </h3>
                <div className="space-y-2 text-neutral-300">
                  <p>Célestin Tech Solutions</p>
                  <p>Location: Auburn, Washington, US</p>
                  <p>Available for remote & on-site work</p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-6">
                  Socials
                </h3>
                <div className="space-y-4">
                  <a 
                    href="https://linkedin.com/in/celestin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-lg text-white hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/celestin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-lg text-white hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://twitter.com/celestin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-lg text-white hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Twitter
                  </a>
                </div>
              </div>

              {/* Local Time */}
              <div>
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-2">
                  Local Time
                </h3>
                <p className="text-neutral-300 transition-all duration-500">
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