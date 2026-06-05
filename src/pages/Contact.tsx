import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { CTA } from '../components/sections/CTA';
import { playClickSound } from '../lib/sounds';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  
  // Interactive Slate States
  const [name, setName] = useState('');
  const [prodType, setProdType] = useState('COMMERCIAL');
  const [messageLength, setMessageLength] = useState(0);
  const [isClacking, setIsClacking] = useState(false);

  const triggerClack = () => {
    setIsClacking(true);
    playClickSound();
    setTimeout(() => setIsClacking(false), 300);
  };

  const takeNum = Math.min(99, Math.max(1, Math.ceil(messageLength / 10)));

  const downloadSlate = () => {
    playClickSound();
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, 800, 600);

    // Draw outer white border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 560);

    // Draw clapper board top stripes area
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(24, 24, 752, 60);

    ctx.fillStyle = '#000000';
    // Draw diagonal lines
    for (let x = 24; x < 780; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 24);
      ctx.lineTo(x + 40, 24);
      ctx.lineTo(x + 10, 84);
      ctx.lineTo(x - 30, 84);
      ctx.closePath();
      ctx.fill();
    }

    // Grid lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    
    // Horizontal divider below stripes
    ctx.beginPath();
    ctx.moveTo(20, 84);
    ctx.lineTo(780, 84);
    ctx.stroke();

    // Horizontal divider below Roll/Scene/Take
    ctx.beginPath();
    ctx.moveTo(20, 240);
    ctx.lineTo(780, 240);
    ctx.stroke();

    // Horizontal divider below Director/Camera
    ctx.beginPath();
    ctx.moveTo(20, 400);
    ctx.lineTo(780, 400);
    ctx.stroke();

    // Vertical divider 1 (Roll / Scene)
    ctx.beginPath();
    ctx.moveTo(260, 84);
    ctx.lineTo(260, 240);
    ctx.stroke();

    // Vertical divider 2 (Scene / Take)
    ctx.beginPath();
    ctx.moveTo(560, 84);
    ctx.lineTo(560, 240);
    ctx.stroke();

    // Vertical divider 3 (Date / FPS)
    ctx.beginPath();
    ctx.moveTo(500, 400);
    ctx.lineTo(500, 580);
    ctx.stroke();

    // Text Helper functions
    const drawLabel = (text: string, x: number, y: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '900 12px "Outfit", sans-serif';
      ctx.fillText(text.toUpperCase(), x, y);
    };

    const drawValue = (text: string, x: number, y: number, fontSize = 32, color = '#ffffff') => {
      ctx.fillStyle = color;
      ctx.font = `900 ${fontSize}px "Outfit", sans-serif`;
      ctx.fillText(text.toUpperCase(), x, y);
    };

    // Draw Labels & Values
    drawLabel('ROLL', 40, 120);
    drawValue('R24-A', 40, 185, 36, '#F0C020'); // Yellow ROLL

    drawLabel('SCENE', 280, 120);
    drawValue(prodType, 280, 185, 32, '#1040C0'); // Blue SCENE

    drawLabel('TAKE', 580, 120);
    drawValue(String(takeNum).padStart(2, '0'), 580, 185, 36, '#D02020'); // Red TAKE

    drawLabel('DIRECTOR', 40, 280);
    drawValue('AKSH PATEL', 40, 345, 28);

    drawLabel('CAMERA / CLIENT', 40, 440);
    drawValue(name.trim() || 'SENDER', 40, 505, 28, '#F0C020');

    drawLabel('DATE', 520, 440);
    drawValue(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 520, 505, 20);

    // Draw brand triangle logo in canvas
    ctx.fillStyle = '#F0C020';
    ctx.beginPath();
    ctx.moveTo(700, 310);
    ctx.lineTo(670, 360);
    ctx.lineTo(730, 360);
    ctx.closePath();
    ctx.fill();

    // Trigger image download
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `PRODUCTION_SLATE_${prodType}_${name.trim() || 'SENDER'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
          prodType: formData.get('prodType'),
          message: formData.get('message'),
          time: clientTime,
        }),
      });

      if (!res.ok) throw new Error('Server error');

      setStatus('sent');
      formRef.current.reset();
      setName('');
      setProdType('COMMERCIAL');
      setMessageLength(0);
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
          <div className="flex-1 flex flex-col justify-between gap-12">
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

              {/* Interactive Visual Clapperboard Slate */}
              <div 
                className="w-full bg-[#111] border-4 border-white text-white p-4 font-black uppercase tracking-wider relative cursor-pointer select-none group/slate shadow-[12px_12px_0px_0px_#F0C020]"
                onClick={triggerClack}
              >
                {/* Clapper Hinge Top Bar */}
                <div className="relative h-10 w-full bg-white mb-4 overflow-hidden border-b-4 border-white origin-left">
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    animate={{ rotate: isClacking ? [-15, 0] : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    style={{ originX: 0, originY: 1 }}
                  >
                    {/* Stripes */}
                    <div className="w-[120%] h-full flex transform -skew-x-[30deg] -translate-x-4">
                      {Array(10).fill(null).map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 h-full ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} 
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Slate Grid content */}
                <div className="grid grid-cols-3 border-2 border-white text-center text-xs divide-x-2 divide-y-2 divide-white">
                  {/* Row 1 Labels */}
                  <div className="p-2 text-white/40 text-[9px]">ROLL</div>
                  <div className="p-2 text-white/40 text-[9px]">SCENE</div>
                  <div className="p-2 text-white/40 text-[9px]">TAKE</div>
                  
                  {/* Row 1 Values */}
                  <div className="p-4 text-sm sm:text-lg text-primary-yellow font-black truncate">R24-A</div>
                  <div className="p-4 text-[10px] sm:text-base text-primary-blue font-black truncate">{prodType}</div>
                  <div className="p-4 text-sm sm:text-lg text-primary-red font-black truncate">{String(takeNum).padStart(2, '0')}</div>

                  {/* Row 2 Labels */}
                  <div className="col-span-2 p-2 text-left text-white/40 text-[9px]">DIRECTOR</div>
                  <div className="p-2 text-white/40 text-[9px]">FPS</div>

                  {/* Row 2 Values */}
                  <div className="col-span-2 p-4 text-left text-base truncate">AKSH PATEL</div>
                  <div className="p-4 text-base">23.976</div>

                  {/* Row 3 Labels */}
                  <div className="col-span-2 p-2 text-left text-white/40 text-[9px]">CAMERA / CLIENT</div>
                  <div className="p-2 text-white/40 text-[9px]">DATE</div>

                  {/* Row 3 Values */}
                  <div className="col-span-2 p-4 text-left text-base truncate text-primary-yellow">
                    {name.trim() || 'SENDER'}
                  </div>
                  <div className="p-4 text-[10px] truncate">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                {/* Bottom decorative stats ticker */}
                <div className="flex justify-between items-center text-[8px] text-white/20 mt-3 tracking-widest">
                  <span>SYSTEM // OPERATIONAL</span>
                  <span>TAP TO SYNC CLACK</span>
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 100 100" className="w-2.5 h-2.5">
                      <polygon points="50,0 0,100 100,100" fill="#F0C020" />
                    </svg>
                    <span>DIRECTORE</span>
                  </div>
                </div>
              </div>

              {/* Download brief brief button */}
              <button
                type="button"
                onClick={downloadSlate}
                className="mt-6 w-full inline-flex items-center justify-center gap-3 border-2 border-dashed border-white/20 hover:border-white py-4 font-black uppercase tracking-widest text-[10px] text-white/50 hover:text-white transition-all cursor-pointer bg-white/[0.01] hover:bg-white/[0.02]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Briefing Slate
              </button>

            </div>
            
            {/* Social icons row */}
            <div className="mt-4">
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
            className="flex-grow space-y-6 lg:max-w-md" 
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (Math.random() > 0.7) triggerClack();
                }}
                disabled={status === 'sending'}
                className="border-2 border-white/10 bg-white/[0.02] p-4 text-base font-bold text-white placeholder-white/20 focus:outline-none focus:border-primary-yellow focus:bg-white/[0.04] transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] focus:shadow-[4px_4px_0px_0px_#F0C020] disabled:opacity-50"
                placeholder="ENTER SENDER NAME"
              />
            </div>

            {/* Dropdown for Production Slate */}
            <div className="flex flex-col relative">
              <label htmlFor="prodType" className="font-black uppercase tracking-[0.2em] text-[10px] text-white/40 mb-2">
                02 // Production Type
              </label>
              <div className="relative">
                <select 
                  id="prodType" 
                  name="prodType"
                  required
                  value={prodType}
                  onChange={(e) => {
                    setProdType(e.target.value);
                    triggerClack();
                  }}
                  disabled={status === 'sending'}
                  className="w-full border-2 border-white/10 bg-[#0d0d0d] p-4 pr-10 text-base font-bold text-white focus:outline-none focus:border-primary-blue focus:bg-white/[0.04] transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] focus:shadow-[4px_4px_0px_0px_#1040C0] disabled:opacity-50 appearance-none cursor-pointer"
                >
                  <option value="COMMERCIAL">COMMERCIAL</option>
                  <option value="NARRATIVE">NARRATIVE FILM</option>
                  <option value="MUSIC VIDEO">MUSIC VIDEO</option>
                  <option value="POST-PRODUCTION">POST-PRODUCTION</option>
                  <option value="EXPERIMENTAL">EXPERIMENTAL</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="email" className="font-black uppercase tracking-[0.2em] text-[10px] text-white/40 mb-2">
                03 // Email Address
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
                04 // Message / Brief
              </label>
              <textarea 
                id="message" 
                name="message"
                rows={5}
                required
                onChange={(e) => setMessageLength(e.target.value.length)}
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
