import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HOME_CONTACT_CTA } from '../../data/portfolio';
import { playClickSound } from '../../lib/sounds';

const TICKER_TEXT = "AVAILABLE FOR PROJECTS · LET'S CREATE · OPEN FOR WORK · READY TO SHOOT · ";

function Ticker() {
  const repeated = TICKER_TEXT.repeat(6);
  return (
    <div className="w-full overflow-hidden bg-primary-red border-y-4 border-black py-3 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        <span className="font-black uppercase tracking-[0.2em] text-black text-sm pr-0">
          {repeated}
        </span>
        <span className="font-black uppercase tracking-[0.2em] text-black text-sm pr-0">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

export function HomeContactCTA() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white border-b-4 border-black relative overflow-hidden">

      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top ticker */}
      <Ticker />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Big headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'circOut' }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[3px] bg-primary-red" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                  Next Project
                </span>
              </div>

              {/* Headline broken into stacked words */}
              <h2 className="font-black uppercase leading-[0.85] tracking-tighter">
                <span className="block text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-white">
                  Let's
                </span>
                <span className="block text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-primary-red">
                  Build
                </span>
                <span className="block text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-white/10 outline-text-black"
                  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}
                >
                  It.
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Right — Description + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'circOut', delay: 0.15 }}
            className="flex flex-col gap-10"
          >
            {/* Divider accent */}
            <div className="w-full h-px bg-white/10" />

            <p className="text-xl md:text-2xl font-medium text-white/50 leading-relaxed">
              {HOME_CONTACT_CTA.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
              {[
                { value: '5+', label: 'Years Active' },
                { value: '20+', label: 'Projects' },
                { value: '4K', label: 'Always' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                onClick={playClickSound}
                className="group relative flex-1 inline-flex items-center justify-center gap-3 font-black text-base uppercase tracking-widest text-black bg-white px-8 py-5 border-2 border-black transition-all duration-200 shadow-[4px_4px_0px_0px_#D02020] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Start a Project
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </Link>

              <a
                href={HOME_CONTACT_CTA.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="flex-1 inline-flex items-center justify-center font-black text-base uppercase tracking-widest text-white border-2 border-white/20 px-8 py-5 hover:border-white transition-all duration-200"
              >
                {HOME_CONTACT_CTA.resumeText}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom ticker (reversed) */}
      <div className="w-full overflow-hidden bg-white border-y-4 border-black py-3 select-none">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        >
          <span className="font-black uppercase tracking-[0.2em] text-black text-sm pr-0">
            {TICKER_TEXT.repeat(6)}
          </span>
          <span className="font-black uppercase tracking-[0.2em] text-black text-sm pr-0">
            {TICKER_TEXT.repeat(6)}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
