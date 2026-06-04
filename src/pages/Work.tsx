import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionWipe } from '../components/ui/SectionWipe';
import { PROJECTS } from '../data/portfolio';
import { playClickSound } from '../lib/sounds';

export function Work() {
  return (
    <PageTransition>
      <SectionWipe color="bg-primary-blue">
        <div className="min-h-screen bg-[#121212] text-white pt-24 pb-32">
          
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <header className="mb-16 md:mb-24 border-l-8 border-primary-red pl-6 md:pl-8">
              <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-gray-500 mb-4">— Archive</p>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-white">
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
                  className="group relative cursor-pointer"
                  onClick={playClickSound}
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
                        <ShapeSelector 
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

                      <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed font-medium mb-10">
                        {project.description}
                      </p>

                      {/* Live Demo link */}
                      {'link' in project && project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                          className="inline-flex items-center gap-3 mb-10 border-2 border-primary-yellow text-primary-yellow font-black uppercase tracking-widest text-xs px-6 py-3 hover:bg-primary-yellow hover:text-black transition-all duration-200 group/link"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary-yellow animate-pulse" />
                          Live Demo
                          <span className="group-hover/link:translate-x-1 transition-transform">↗</span>
                        </a>
                      )}
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

                    {/* Hover Preview Image */}
                    {'preview' in project && project.preview && (
                      <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <img
                          src={project.preview}
                          alt={project.title}
                          className="w-full h-full object-cover blur-2xl scale-110 brightness-50"
                        />
                        {/* Fade to left so it doesn't cut off the text */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent" />
                      </div>
                    )}
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
