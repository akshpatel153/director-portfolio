import { motion } from 'framer-motion';
import { playClickSound } from '../../lib/sounds';

const SOCIALS = [
  { label: 'Email', value: 'patelaksh1503@gmail.com', href: 'mailto:patelaksh1503@gmail.com', color: 'hover:text-primary-red' },
  { label: 'Instagram', value: '@aksh.ae_', href: 'https://www.instagram.com/aksh.ae_', color: 'hover:text-primary-yellow' },
  { label: 'YouTube', value: '@HimymBeats', href: 'https://www.youtube.com/@HimymBeats/featured', color: 'hover:text-primary-red' },
  { label: 'LinkedIn', value: 'Aksh Patel', href: 'https://www.linkedin.com/in/aksh-patel-cs/', color: 'hover:text-primary-blue' },
];

const BRIEF = [
  { label: 'Availability', value: 'Open for Projects', highlight: true },
  { label: 'Response Time', value: 'Within 24 hrs' },
  { label: 'Speciality', value: 'Directing · Editing · Dev' },
  { label: 'Format', value: 'Remote & On-Set' },
];

export function CTA() {
  return (
    <section className="w-full min-h-[90vh] bg-[#0a0a0a] text-white border-b-4 border-black relative overflow-hidden flex flex-col">

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Top status bar */}
      <div className="border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
        <span>Directore // Contact</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400">Available Now</span>
        </div>
        <span>{new Date().getFullYear()}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — Hero headline */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-8">
            — Incoming Transmission
          </p>

          <h1 className="font-black uppercase leading-[0.82] tracking-tighter mb-10">
            <span className="block text-7xl sm:text-8xl md:text-[7rem] xl:text-[9rem] text-white">
              Hire
            </span>
            <span className="block text-7xl sm:text-8xl md:text-[7rem] xl:text-[9rem] text-primary-red">
              Me.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 font-medium max-w-md leading-relaxed border-l-2 border-white/10 pl-5">
            Whether it's a commercial shoot, a cinematic edit, a web build, or something in between — let's talk.
          </p>

          {/* Social links */}
          <div className="mt-12 space-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={playClickSound}
                className={`flex items-center gap-4 group transition-colors duration-200 ${s.color}`}
              >
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 w-20 shrink-0 group-hover:text-white/60 transition-colors">
                  {s.label}
                </span>
                <span className="w-8 h-px bg-white/10 group-hover:w-12 group-hover:bg-current transition-all duration-300" />
                <span className="text-sm font-bold text-white/50 group-hover:text-current transition-colors">
                  {s.value}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Director's Brief card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'circOut', delay: 0.15 }}
        >
          {/* Card */}
          <div className="border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            {/* Card header */}
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                Director's Brief
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary-yellow" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>

            {/* Brief rows */}
            <div className="divide-y divide-white/5">
              {BRIEF.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center justify-between px-6 py-4 group hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
                    {item.label}
                  </span>
                  <span className={`text-sm font-bold ${item.highlight ? 'text-green-400' : 'text-white/70'}`}>
                    {item.highlight && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 animate-pulse" />}
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Card footer */}
            <div className="border-t border-white/10 px-6 py-4 bg-primary-red/5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                Fill the form below → I'll respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Decorative index number */}
          <div className="mt-8 flex items-center gap-4">
            <div className="text-[9rem] font-black leading-none text-white/[0.04] select-none">
              01
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Scroll down</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="text-white/20 text-lg"
              >
                ↓
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 md:px-12 py-4 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
        <span>Directore Portfolio</span>
        <span>High-Impact Visual Production</span>
        <span>4K · PRORES · ON-SET</span>
      </div>
    </section>
  );
}
