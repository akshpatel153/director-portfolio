import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionWipe } from '../components/ui/SectionWipe';
import { PROJECTS } from '../data/portfolio';
import { GeometricDecorations } from '../components/ui/GeometricDecorations';
import { playClickSound } from '../lib/sounds';

export function Work() {
  return (
    <PageTransition>
      <SectionWipe color="bg-primary-blue">
        <div className="min-h-screen bg-[#121212] text-white pt-24 pb-32">
          
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <header className="mb-24 border-l-8 border-primary-red pl-8">
              <p className="text-sm font-black uppercase tracking-[0.4em] text-gray-500 mb-4">— Archive</p>
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white">
                Selected <br /> Works
              </h1>
            </header>

            <div className="space-y-32">
              {PROJECTS.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="group relative"
                >
                  <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Project Index */}
                    <div className="hidden lg:block w-32 shrink-0">
                      <span className="text-7xl font-black text-white/5 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-6">
                        <GeometricDecorations 
                          shape={project.shape} 
                          color={project.decorationColor} 
                          className="w-8 h-8 opacity-50"
                        />
                        <span className="font-black uppercase tracking-[0.3em] text-primary-red text-xs">
                          {project.role}
                        </span>
                      </div>

                      <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 group-hover:translate-x-4 transition-transform duration-500">
                        {project.title}
                      </h2>

                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 border-2 border-white/20 text-[10px] font-black uppercase tracking-widest hover:border-white transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed font-medium mb-12">
                        {project.description}
                      </p>

                      <div className="h-2 w-full bg-white/5 relative overflow-hidden">
                        <motion.div 
                          className={`absolute inset-0 ${project.color}`}
                          initial={{ x: "-100%" }}
                          whileInView={{ x: "0%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Hover Decoration */}
                    <div className="absolute top-0 right-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl">
                      <GeometricDecorations 
                        shape={project.shape} 
                        color={project.decorationColor} 
                        className="w-[30vw] h-[30vw]"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </SectionWipe>
    </PageTransition>
  );
}
