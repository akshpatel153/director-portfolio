import { Link } from 'react-router-dom';
import { HeroScene } from '../3d/HeroScene';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from '../../data/portfolio';

export function Hero() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col lg:flex-row border-b-4 border-black" id="about">
      {/* Left side: Typography */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 py-20 lg:py-0 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-background relative overflow-hidden z-10">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="relative z-10 max-w-xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.95] mb-10">
            {HERO_CONTENT.titleLine1} <br />
            <span className="text-primary-red">{HERO_CONTENT.titleLine2}</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.4 }}
            className="text-lg md:text-xl font-medium mb-12 max-w-md border-l-4 border-black pl-6 leading-relaxed py-1"
          >
            {HERO_CONTENT.description}
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "backOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/work"
              className="group relative inline-flex items-center justify-center font-bold text-lg md:text-xl uppercase tracking-widest text-black bg-white px-8 py-4 border-4 border-black transition-all duration-300 hover:text-white w-full sm:w-auto"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-primary-blue scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              
              {/* Brutalist hard shadow */}
              <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-2 translate-y-2 -z-10 bg-black transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>

            <Link 
              to="/photography"
              className="group relative inline-flex items-center justify-center font-bold text-lg md:text-xl uppercase tracking-widest text-black bg-white px-8 py-4 border-4 border-black transition-all duration-300 hover:text-black w-full sm:w-auto mt-4 sm:mt-0"
            >
              <span className="relative z-10">See Photos</span>
              <div className="absolute inset-0 bg-primary-yellow scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              
              {/* Brutalist hard shadow */}
              <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-2 translate-y-2 -z-10 bg-black transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side: 3D Scene */}
      <div className="w-full lg:w-1/2 bg-background relative min-h-[50vh] lg:min-h-0 border-t-4 lg:border-t-0 border-black lg:border-none overflow-hidden">
        {/* Massive geometric background overlay */}
        <div className="absolute top-0 right-0 w-[150%] h-[150%] translate-x-1/4 -translate-y-1/4 rounded-full border-[20px] border-black/5 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-0"
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
