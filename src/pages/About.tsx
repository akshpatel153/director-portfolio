import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionWipe } from '../components/ui/SectionWipe';
import { ABOUT_PAGE_CONTENT } from '../data/portfolio';

const PRODUCTION_SLATE = [
  { label: 'Role', value: 'Director & Editor' },
  { label: 'Focus', value: 'High-Impact / Narrative' },
  { label: 'FPS Preset', value: '24.000 / 48.000' },
  { label: 'Format', value: 'PRORES RAW' },
];

export function About() {
  return (
    <PageTransition>
      <SectionWipe color="bg-primary-red">
        <div className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen text-white relative overflow-hidden">
          
          {/* Background grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '100px 100px',
            }}
          />

          {/* Animated Background Wireframes */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05]">
            <motion.div
              className="absolute left-1/4 top-0 w-[1px] h-full bg-white"
              animate={{ x: [-50, 50, -50] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute right-1/4 top-1/4 w-[50rem] h-[50rem] border border-white rounded-full"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 90] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

            {/* Title / Header section */}
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                  Profile // Slate 01
                </span>
                <div className="h-[2px] flex-grow bg-white/10" />
              </motion.div>

              <motion.h1
                className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "circOut" }}
              >
                About<span className="text-primary-red">.</span>
              </motion.h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

              {/* Left Column: Slate details, Bio & Gear */}
              <div className="lg:col-span-7 flex flex-col gap-16">

                {/* Director's Slate metadata */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/[0.02] border border-white/10"
                >
                  {PRODUCTION_SLATE.map((item) => (
                    <div key={item.label}>
                      <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">
                        {item.label}
                      </span>
                      <span className="block text-sm font-bold uppercase tracking-tight text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Biography Blocks */}
                <div className="flex flex-col gap-8">
                  {ABOUT_PAGE_CONTENT.bioParagraphs.map((para, idx) => {
                    // Match accents to design color scheme
                    const borderAccent = 
                      idx === 0 ? 'border-l-primary-red' : 
                      idx === 1 ? 'border-l-primary-yellow' : 
                      'border-l-primary-blue';

                    return (
                      <motion.div
                        key={idx}
                        className={`p-8 border border-white/10 border-l-8 ${borderAccent} bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300`}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      >
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-white/70">
                          {para}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Technical Arsenal Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter shrink-0">
                      Technical Arsenal
                    </h3>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ABOUT_PAGE_CONTENT.gear.map((category, idx) => (
                      <div key={idx} className="p-6 border border-white/10 bg-white/[0.02]">
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary-red mb-4 pb-2 border-b border-white/10">
                          {category.category}
                        </h4>
                        <div className="flex flex-col gap-2">
                          {category.items.map((item, itemIdx) => (
                            <span
                              key={itemIdx}
                              className="text-xs font-bold uppercase tracking-wider text-white/50"
                            >
                              // {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>

              {/* Right Column: Staggered Production Photo Grid */}
              <div className="lg:col-span-5 flex flex-col gap-12">
                {ABOUT_PAGE_CONTENT.photos.map((src, idx) => {
                  const shadowColor = 
                    idx === 0 ? 'shadow-[12px_12px_0px_0px_#D02020]' : 
                    idx === 1 ? 'shadow-[12px_12px_0px_0px_#1040C0]' : 
                    'shadow-[12px_12px_0px_0px_#F0C020]';

                  const label = 
                    idx === 0 ? 'SCENE 01 // PRODUCTION' : 
                    idx === 1 ? 'SCENE 02 // GRADING' : 
                    'SCENE 03 // FRAMING';

                  return (
                    <motion.div
                      key={idx}
                      className="flex flex-col gap-3"
                      initial={{ opacity: 0, scale: 0.95, rotate: idx % 2 === 0 ? -1 : 1 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 90 }}
                    >
                      <div className={`relative aspect-[4/5] border-2 border-white/20 overflow-hidden group bg-black ${shadowColor}`}>
                        <img
                          src={src}
                          alt={`About photo ${idx + 1}`}
                          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        />
                        
                        {/* Film overlay text */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                            Active Lens: Standard Prime
                          </span>
                        </div>
                      </div>

                      {/* Photo details */}
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/30 px-1 mt-1">
                        <span>{label}</span>
                        <span>ISO 800</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </SectionWipe>
    </PageTransition>
  );
}
