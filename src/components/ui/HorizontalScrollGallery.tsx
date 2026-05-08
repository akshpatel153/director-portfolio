import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { Lightbox } from './Lightbox';

export function HorizontalScrollGallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = GALLERY_PHOTOS.length;

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string | null; title: string | null }>({
    isOpen: false,
    image: null,
    title: null
  });

  const openLightbox = (image: string, title: string) => {
    setLightbox({ isOpen: true, image, title });
  };

  return (
    <section className="w-full bg-[#121212] py-16 px-6 border-b-4 border-black md:hidden">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-black uppercase tracking-[0.4em] text-primary-yellow text-[10px] mb-1">— Gallery</p>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">Shots</h2>
        </div>
        <span className="font-black text-white/20 text-sm tracking-widest tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Carousel frame */}
      <div className="relative aspect-[4/5] w-full border-4 border-white overflow-hidden bg-black cursor-zoom-in" onClick={() => openLightbox(GALLERY_PHOTOS[current].src, GALLERY_PHOTOS[current].title)}>
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.img
            key={current}
            src={GALLERY_PHOTOS[current].src}
            alt={GALLERY_PHOTOS[current].title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Index stamp */}
        <div className="absolute top-3 left-3 z-20 font-black text-white/30 text-5xl leading-none select-none pointer-events-none">
          {String(current + 1).padStart(2, '0')}
        </div>

        {/* Bottom red bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-red z-20" />
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
          className="flex-1 bg-white border-2 border-black py-3 font-black uppercase tracking-widest text-xs text-black shadow-[3px_3px_0px_0px_#D02020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          ← Prev
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); paginate(1); }}
          className="flex-1 bg-white border-2 border-black py-3 font-black uppercase tracking-widest text-xs text-black shadow-[3px_3px_0px_0px_#1040C0] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          Next →
        </button>
      </div>

      <Lightbox 
        isOpen={lightbox.isOpen} 
        onClose={() => setLightbox({ ...lightbox, isOpen: false })} 
        image={lightbox.image} 
        title={lightbox.title} 
      />
    </section>
  );
}
