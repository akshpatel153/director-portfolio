import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '../../lib/sounds';

interface GalleryLightboxProps {
  photos: { src: string; title: string }[];
  initialIndex: number;
  onClose: () => void;
}

export function GalleryLightbox({ photos, initialIndex, onClose }: GalleryLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const total = photos.length;

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const go = useCallback((dir: number) => {
    playClickSound();
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'Escape') { playClickSound(); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go, onClose]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/96 flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-primary-yellow" />
          <span className="font-black uppercase tracking-widest text-white text-sm">
            {photos[current].title}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-black text-white/30 text-sm tabular-nums tracking-widest">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="w-10 h-10 border-2 border-white/20 text-white font-black text-xl flex items-center justify-center hover:border-primary-red hover:text-primary-red transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden px-4 md:px-20 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.img
            key={current}
            src={photos[current].src}
            alt={photos[current].title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="max-w-full max-h-full object-contain select-none shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          />
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div
        className="flex items-center justify-between px-6 md:px-12 py-5 border-t border-white/10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => go(-1)}
          className="group flex items-center gap-3 font-black uppercase tracking-widest text-xs text-white/40 hover:text-white transition-colors"
        >
          <span className="w-10 h-10 border-2 border-white/20 group-hover:border-white flex items-center justify-center transition-colors text-lg">←</span>
          Prev
        </button>

        {/* Dot strip */}
        <div className="hidden md:flex gap-1.5 items-center">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => { playClickSound(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-1 rounded-full transition-all duration-200 ${
                i === current ? 'w-6 bg-primary-yellow' : 'w-1.5 bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="group flex items-center gap-3 font-black uppercase tracking-widest text-xs text-white/40 hover:text-white transition-colors"
        >
          Next
          <span className="w-10 h-10 border-2 border-white/20 group-hover:border-white flex items-center justify-center transition-colors text-lg">→</span>
        </button>
      </div>
    </motion.div>
  );
}
