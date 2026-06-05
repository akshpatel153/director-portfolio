import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { CTA } from '../components/sections/CTA';
import { playClickSound } from '../lib/sounds';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    const formData = new FormData(formRef.current);
    const clientTime = new Date().toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          time: clientTime,
        }),
      });

      if (!res.ok) throw new Error('Server error');

      setStatus('sent');
      formRef.current.reset();
    } catch (error) {
      console.error('Send error:', error);
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <CTA />

      {/* Brutalist Contact Form */}
      <section className="w-full bg-[#0d0d0d] text-white py-24 px-6 md:px-12 border-b-4 border-black relative overflow-hidden">

        {/* Background grid line decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">

          {/* Left Column — Briefing & Social slate */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                  Form // Transmission
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Drop <br />
                <span className="text-primary-red">A Line.</span>
              </h3>

              <div className="p-6 border border-white/10 bg-white/[0.01] mb-12 shadow-[8px_8px_0px_0px_#1040C0]">
                <p className="text-lg font-medium leading-relaxed text-white/65">
                  Whether it's a commercial brief, editing workflow inquiry, or collaboration proposals — leave a message and let's configure something.
                </p>
              </div>
            </div>

            {/* Social icons row */}
            <div className="mt-8">
              <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">
                — Connect Transmission
              </span>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    label: 'Email',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    href: 'mailto:axpatel009009@gmail.com',
                    colorClass: 'border-primary-red text-primary-red hover:bg-primary-red hover:text-black shadow-[4px_4px_0px_0px_rgba(208,32,32,0.15)]'
                  },
                  {
                    label: 'Instagram',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    href: 'https://www.instagram.com/aksh.ae_',
                    colorClass: 'border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white shadow-[4px_4px_0px_0px_rgba(16,64,192,0.15)]'
                  },
                  {
                    label: 'YouTube',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" strokeLinecap="round" strokeLinejoin="round" />
                        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                      </svg>
                    ),
                    href: 'https://www.youtube.com/@HimymBeats/featured',
                    colorClass: 'border-primary-yellow text-primary-yellow hover:bg-primary-yellow hover:text-black shadow-[4px_4px_0px_0px_rgba(240,192,32,0.15)]'
                  },
                  {
                    label: 'LinkedIn',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="4" cy="4" r="2" fill="currentColor" />
                      </svg>
                    ),
                    href: 'https://www.linkedin.com/in/aksh-patel-cs/',
                    colorClass: 'border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white shadow-[4px_4px_0px_0px_rgba(16,64,192,0.15)]'
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === 'Email' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    title={link.label}
                    className={`w-14 h-14 flex items-center justify-center border-2 font-black transition-all duration-200 bg-white/[0.02] active:translate-x-[2px] active:translate-y-[2px] ${link.colorClass}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Form Inputs */}
          <form
            ref={formRef}
            className="flex-1 space-y-6"
            onSubmit={handleSubmit}
          >
            {status === 'sent' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-green-500 text-black p-5 font-black uppercase tracking-widest text-xs border-2 border-black shadow-[4px_4px_0px_0px_#fff]"
              >
                ✓ Transmission Received. I will review within 24 hrs.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-primary-red text-white p-5 font-black uppercase tracking-widest text-xs border-2 border-black shadow-[4px_4px_0px_0px_#fff]"
              >
                ⚠ Transmission Failed. Verify details & try again.
              </motion.div>
            )}

            {/* Form Fields */}
            <div className="flex flex-col">
              <label htmlFor="name" className="font-black uppercase tracking-[0.2em] text-[10px] text-white/40 mb-2">
                01 // Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === 'sending'}
                className="border-2 border-white/10 bg-white/[0.02] p-4 text-base font-bold text-white placeholder-white/20 focus:outline-none focus:border-primary-yellow focus:bg-white/[0.04] transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] focus:shadow-[4px_4px_0px_0px_#F0C020] disabled:opacity-50"
                placeholder="ENTER SENDER NAME"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-black uppercase tracking-[0.2em] text-[10px] text-white/40 mb-2">
                02 // Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={status === 'sending'}
                className="border-2 border-white/10 bg-white/[0.02] p-4 text-base font-bold text-white placeholder-white/20 focus:outline-none focus:border-primary-blue focus:bg-white/[0.04] transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] focus:shadow-[4px_4px_0px_0px_#1040C0] disabled:opacity-50"
                placeholder="SENDER@ADDRESS.COM"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="font-black uppercase tracking-[0.2em] text-[10px] text-white/40 mb-2">
                03 // Message / Brief
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                disabled={status === 'sending'}
                className="border-2 border-white/10 bg-white/[0.02] p-4 text-base font-bold text-white placeholder-white/20 focus:outline-none focus:border-primary-red focus:bg-white/[0.04] transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] focus:shadow-[4px_4px_0px_0px_#D02020] resize-none disabled:opacity-50"
                placeholder="SPECIFY PRODUCTION BRIEF OR MESSAGE DETAILS..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              onClick={playClickSound}
              className="w-full relative group inline-flex items-center justify-center font-black text-base uppercase tracking-widest text-black bg-white py-5 border-4 border-black transition-all duration-200 shadow-[6px_6px_0px_0px_#D02020] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Transmission →'}
            </button>
          </form>

        </div>
      </section>

    </PageTransition>
  );
}
