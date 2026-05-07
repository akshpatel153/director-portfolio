import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionWipe } from '../components/ui/SectionWipe';
import { ABOUT_PAGE_CONTENT } from '../data/portfolio';

export function About() {
  return (
    <PageTransition>
      <SectionWipe color="bg-primary-red">
        <div className="pt-32 pb-24 bg-[#121212] min-h-screen text-white relative overflow-hidden">

          {/* Animated Background Wireframes */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.1]">
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
            <motion.div
              className="absolute left-10 bottom-10 w-[30rem] h-[30rem] border border-white"
              animate={{ rotate: [0, -90] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

            {/* Huge Hero Title */}
            <motion.h1
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-20 text-white border-b-8 border-primary-red pb-6 inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "circOut" }}
            >
              {ABOUT_PAGE_CONTENT.header}
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

              {/* Left Column: Bio & Gear */}
              <div className="lg:col-span-7 flex flex-col gap-16">

                {/* Biography Blocks */}
                <div className="flex flex-col gap-8">
                  {ABOUT_PAGE_CONTENT.bioParagraphs.map((para, idx) => (
                    <motion.div
                      key={idx}
                      className={`p-6 md:p-8 border-4 border-white bg-black ${idx === 1 ? 'border-l-8 border-l-primary-yellow' : ''} ${idx === 2 ? 'border-l-8 border-l-primary-blue' : ''}`}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <p className="text-xl md:text-2xl font-medium leading-relaxed">
                        {para}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Gear & Skills Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-4xl font-black uppercase tracking-tight mb-8 border-b-4 border-white inline-block pb-2">
                    Arsenal
                  </h3>
                  <div className="flex flex-col gap-10">
                    {ABOUT_PAGE_CONTENT.gear.map((category, idx) => (
                      <div key={idx}>
                        <h4 className="text-xl font-bold uppercase text-primary-yellow mb-4">
                          // {category.category}
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {category.items.map((item, itemIdx) => (
                            <span
                              key={itemIdx}
                              className="px-4 py-2 border-2 border-white bg-black font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors duration-300"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>

              {/* Right Column: Photo Grid */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                {ABOUT_PAGE_CONTENT.photos.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className="relative aspect-[4/5] border-4 border-white overflow-hidden group bg-black shadow-[12px_12px_0px_0px_rgba(255,0,0,1)]"
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15, type: "spring", stiffness: 100 }}
                  >
                    <img
                      src={src}
                      alt={`About photo ${idx + 1}`}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </SectionWipe>
    </PageTransition>
  );
}
