import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HOME_CONTACT_CTA } from '../../data/portfolio';

export function HomeContactCTA() {
  return (
    <section className="w-full bg-primary-blue py-32 px-6 md:px-12 border-b-4 border-black text-white relative overflow-hidden">
      {/* Decorative background geometry */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full border-[10vw] border-white/10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-white/5 pointer-events-none transform rotate-45" />

      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
        <motion.h2 
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {HOME_CONTACT_CTA.title}
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-3xl font-medium mb-12 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
        >
          {HOME_CONTACT_CTA.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-col items-center gap-6"
        >
          <Link 
            to="/contact"
            className="group relative inline-flex items-center justify-center font-bold text-2xl md:text-4xl uppercase tracking-widest text-black bg-white px-12 py-6 border-4 border-black transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">{HOME_CONTACT_CTA.buttonText}</span>
            <div className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            
            {/* Brutalist hard shadow */}
            <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-3 translate-y-3 -z-10 bg-primary-red transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
          </Link>

          <a 
            href={HOME_CONTACT_CTA.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity hover:underline underline-offset-4"
          >
            {HOME_CONTACT_CTA.resumeText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
