import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { GalleryLightbox } from './GalleryLightbox';
import { playClickSound } from '../../lib/sounds';

export function HorizontalScrollGallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = GALLERY_PHOTOS.length;

  const paginate = (dir: number) => {
    playClickSound();
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section className="w-full bg-[#0a0a0a] border-b-4 border-black md:hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-primary-yellow" />
          <div>
            <p className="font-black uppercase tracking-[0.4em] text-primary-yellow text-[9px] mb-0.5">— Visual Archive</p>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">Gallery</h2>
          </div>
        </div>
        <span className="font-black text-white/20 text-sm tracking-widest tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Main image frame */}
      <div
        className="relative mx-6 border-2 border-white/10 overflow-hidden cursor-zoom-in bg-black"
        style={{ aspectRatio: '4/5' }}
        onClick={() => {
          playClickSound();
          setLightboxOpen(true);
        }}
      >
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
            transition={{ type: 'spring', stiffness: 400, damping: 38 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Number stamp */}
        <div className="absolute top-3 left-3 z-20 font-black text-white/20 text-5xl leading-none select-none pointer-events-none">
          {String(current + 1).padStart(2, '0')}
        </div>

        {/* Tap-to-view overlay hint */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="border border-white/30 text-white/40 text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 backdrop-blur-sm">
            Tap to expand
          </div>
        </div>

        {/* Bottom red accent */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-red z-20" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 px-6 mt-4 pb-8">
        <button
          onClick={() => paginate(-1)}
          className="flex-1 bg-white border-2 border-black py-3.5 font-black uppercase tracking-widest text-xs text-black shadow-[3px_3px_0px_0px_#D02020] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          ← Prev
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1 flex-wrap justify-center max-w-[100px]">
          {GALLERY_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                playClickSound();
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === current ? 'bg-primary-yellow w-4' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          className="flex-1 bg-white border-2 border-black py-3.5 font-black uppercase tracking-widest text-xs text-black shadow-[3px_3px_0px_0px_#1040C0] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          Next →
        </button>
      </div>

      {lightboxOpen && (
        <GalleryLightbox
          photos={GALLERY_PHOTOS}
          initialIndex={current}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
