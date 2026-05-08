import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GALLERY_PHOTOS } from '../../data/portfolio';

export function DesktopScrollGallery() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#121212] hidden md:block">
      <div className="sticky top-[76px] h-[calc(100vh-76px)] overflow-hidden flex items-center border-y-4 border-black">

        {/* Floating section title */}
        <div className="absolute top-12 left-12 z-10 pointer-events-none">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[4px_4px_0px_black] border-l-4 border-primary-yellow bg-black/50 backdrop-blur-sm px-6 py-2">
            Gallery
          </h2>
        </div>

        {/* The moving horizontal track */}
        <motion.div style={{ x }} className="flex h-[70vh] gap-12 px-12 w-[400vw]">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={index}
              className="relative h-full w-[40vw] shrink-0 border-4 border-white overflow-hidden group"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute bottom-0 right-0 bg-primary-red text-white font-bold uppercase tracking-widest py-3 px-8 border-t-4 border-l-4 border-white">
                {photo.title}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
