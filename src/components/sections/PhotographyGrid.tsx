import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { PHOTOGRAPHY_GRID } from '../../data/portfolio';

export function PhotographyGrid() {

  return (
    <section className="w-full bg-[#121212] text-white py-24 px-6 md:px-12 border-b-4 border-black relative overflow-hidden" id="photography">
      
      {/* Animated Brutalist Wireframe Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
        {/* Horizontal tracking line */}
        <motion.div 
          className="absolute top-1/4 w-full h-[1px] bg-white"
          animate={{ y: [-50, 150, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Vertical tracking line */}
        <motion.div 
          className="absolute left-1/3 top-0 h-full w-[1px] bg-white"
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Large Hollow Circle */}
        <motion.div 
          className="absolute -right-32 top-1/4 w-[40rem] h-[40rem] border border-white rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Large Hollow Square */}
        <motion.div 
          className="absolute -left-16 bottom-1/4 w-96 h-96 border border-white"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        {/* Crosshair target mark */}
        <motion.div 
          className="absolute right-1/4 bottom-1/3 w-32 h-32"
          animate={{ rotate: [0, -90, -180, -360] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white" />
          <div className="absolute inset-4 border border-white rounded-full" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white border-b-4 border-white inline-block pb-2">
            Photography
          </h2>
          <p className="text-xl font-medium border-l-4 border-primary-yellow pl-6 max-w-2xl text-gray-300 mt-8 leading-relaxed py-2">
            Capturing the world through a brutalist lens. High contrast, sharp angles, and uncompromising composition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PHOTOGRAPHY_GRID.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "circOut" }}
            >
              <Card 
                decoration={photo.decoration} 
                decorationColor={photo.color}
                className="group p-0 overflow-hidden bg-transparent border-white"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  {/* 
                    Bauhaus Photography Rules:
                    Grayscale by default. Color on hover.
                  */}
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 bg-white text-black font-bold uppercase tracking-widest py-2 px-6 border-t-4 border-r-4 border-black">
                    {photo.title}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
