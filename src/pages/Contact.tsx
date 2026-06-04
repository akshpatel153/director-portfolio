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
            
            {/* Social rows as technical specs */}
            <div className="space-y-4 font-bold uppercase tracking-widest text-xs">
              <span className="block text-[9px] font-black tracking-[0.3em] text-white/20 mb-2">
                — Active Links
              </span>
              
              <div className="border-b border-white/10 pb-3 flex justify-between items-center group">
                <span className="text-white/40">Email</span>
                <a href="mailto:axpatel009009@gmail.com" className="text-primary-red hover:underline font-black">
                  axpatel009009@gmail.com
                </a>
              </div>

              <div className="border-b border-white/10 pb-3 flex justify-between items-center group">
                <span className="text-white/40">Instagram</span>
                <a href="https://www.instagram.com/aksh.ae_" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-primary-blue hover:underline font-black">
                  @aksh.ae_
                </a>
              </div>

              <div className="border-b border-white/10 pb-3 flex justify-between items-center group">
                <span className="text-white/40">YouTube</span>
                <a href="https://www.youtube.com/@HimymBeats/featured" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-primary-yellow hover:underline font-black">
                  @HimymBeats
                </a>
              </div>

              <div className="border-b border-white/10 pb-3 flex justify-between items-center group">
                <span className="text-white/40">LinkedIn</span>
                <a href="https://www.linkedin.com/in/aksh-patel-cs/" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-primary-blue hover:underline font-black">
                  Aksh Patel
                </a>
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
