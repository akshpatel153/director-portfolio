import { motion } from 'framer-motion';
import { ABOUT_ME } from '../../data/portfolio';

export function AboutMe() {
  return (
    <section className="w-full bg-background py-32 px-6 md:px-12 border-b-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Top: Bio Section */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <motion.h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter w-full md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {ABOUT_ME.title}
          </motion.h2>

          <motion.div
            className="w-full md:w-2/3 border-l-4 border-primary-red pl-6 md:pl-10 py-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-2xl md:text-3xl font-medium leading-relaxed">
              {ABOUT_ME.bio}
            </p>
          </motion.div>
        </div>

        {/* Bottom: 3 Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ABOUT_ME.photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative aspect-square border-4 border-black group overflow-hidden bg-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={`About me ${index + 1}`}
                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Text Bubble Overlay (appears on hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white text-black border-4 border-black px-6 py-3 shadow-[8px_8px_0px_0px_black] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-bold uppercase tracking-widest text-lg">
                  {photo.hoverText}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
