import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/portfolio';

export function Projects() {

  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 border-b-4 border-black" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 border-b-4 border-black inline-block pb-2"
        >
          Selected Work
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: "circOut" }}
            >
              <Card 
                decoration={project.shape} 
                decorationColor={project.decorationColor}
                className="flex flex-col h-full"
              >
                {/* Project Header Block */}
                <div className={`w-full h-32 ${project.color} border-b-4 border-black mb-6 flex items-center justify-center p-4`}>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white text-center drop-shadow-[4px_4px_0px_#121212] px-2 leading-none">
                    {project.title}
                  </h3>
                </div>
                
                <div className="p-6 pt-0 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-gray-200 border-2 border-black">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-bold text-xl mb-3 uppercase border-l-4 border-black pl-3">{project.role}</h4>
                  <p className="font-medium mb-10 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <Button variant="outline" className="w-full mt-auto py-4">
                    View Case Study
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
