import { motion } from 'framer-motion';
import { ABOUT_ME } from '../../data/portfolio';
import { Link } from 'react-router-dom';
import { playClickSound } from '../../lib/sounds';

export function AboutMe() {
  return (
    <section className="w-full bg-[#121212] text-white py-32 px-6 md:px-12 border-b-4 border-black relative overflow-hidden">
      {/* Background wireframe lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-white/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 border-t border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
            03 // The Profile
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column — Portrait + Film Frame Style */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative aspect-[3/4] border-4 border-white bg-black overflow-hidden group shadow-[16px_16px_0px_0px_#D02020]"
            >
              {/* Camera Viewfinder overlays */}
              <div className="absolute top-4 left-4 text-[9px] font-black tracking-widest text-white/50 select-none pointer-events-none z-20">
                REC ●
              </div>
              <div className="absolute bottom-4 right-4 text-[9px] font-black tracking-widest text-white/50 select-none pointer-events-none z-20">
                RAW 10-BIT
              </div>

              <img
                src={ABOUT_ME.photos[0].url}
                alt="Director profile portrait"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Right Column — Biography & Core Statement */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Category label */}
              <div className="flex gap-3">
                {['Directing', 'Editing', 'Visual Storytelling'].map((tag) => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                {ABOUT_ME.title}
              </h2>

              <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed mt-4 border-l-4 border-primary-red pl-6 md:pl-8">
                {ABOUT_ME.bio}
              </p>
            </motion.div>

            {/* Quick Milestones / Skill highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {[
                { title: 'Commercials', desc: 'High-energy visuals matching brand pace.' },
                { title: 'Narrative Film', desc: 'Developing character depth through precise framing.' },
                { title: 'Sound Integration', desc: 'Sound design-led editing that drives visual flow.' },
                { title: 'Post-Production', desc: 'Expert grade, pacing, and asset management.' }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="p-5 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                >
                  <h4 className="font-black uppercase tracking-widest text-sm text-primary-yellow mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/40 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Link to Full About Page */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Link
                to="/about"
                onClick={playClickSound}
                className="inline-flex items-center gap-3 border-2 border-white text-white font-black uppercase tracking-widest text-xs px-8 py-4 hover:bg-white hover:text-black transition-all duration-200"
              >
                Explore Full Biography
                <span>→</span>
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
