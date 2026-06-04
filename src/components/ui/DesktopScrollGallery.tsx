import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { GalleryLightbox } from './GalleryLightbox';
import { playClickSound } from '../../lib/sounds';

const ROW_ONE = GALLERY_PHOTOS.slice(0, Math.ceil(GALLERY_PHOTOS.length / 2));
const ROW_TWO = GALLERY_PHOTOS.slice(Math.ceil(GALLERY_PHOTOS.length / 2));

function MarqueeRow({
  photos,
  direction = 1,
  onOpen,
}: {
  photos: typeof GALLERY_PHOTOS;
  direction?: 1 | -1;
  onOpen: (index: number) => void;
}) {
  const [paused, setPaused] = useState(false);
  // Duplicate for seamless loop
  const doubled = [...photos, ...photos];

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {doubled.map((photo, i) => (
          <div
            key={i}
            onClick={() => {
              playClickSound();
              onOpen(i % photos.length);
            }}
            className="relative shrink-0 w-[28vw] h-[22vw] overflow-hidden border-2 border-white/10 group cursor-zoom-in"
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="border-2 border-white px-4 py-2 text-white font-black uppercase tracking-[0.2em] text-xs">
                View
              </div>
            </div>
            {/* Red corner accent */}
            <div className="absolute bottom-0 left-0 w-6 h-6 bg-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function DesktopScrollGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    // map row-two index back to full array
    setLightboxIndex(index);
  };

  const openRowTwo = (index: number) => {
    setLightboxIndex(index + ROW_ONE.length);
  };

  return (
    <section className="hidden md:block w-full bg-[#0a0a0a] py-20 overflow-hidden border-y-4 border-black relative">
      {/* Section label */}
      <div className="flex items-center justify-between px-12 mb-10">
        <div className="flex items-center gap-6">
          <div className="w-1 h-16 bg-primary-yellow" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">— Visual Archive</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
              Gallery
            </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            Hover to pause<br />Click to expand
          </p>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4">
        <MarqueeRow photos={ROW_ONE} direction={1} onOpen={openLightbox} />
      </div>

      {/* Row 2 — scrolls right */}
      <MarqueeRow photos={ROW_TWO.length ? ROW_TWO : ROW_ONE} direction={-1} onOpen={openRowTwo} />

      {/* Bottom label strip */}
      <div className="flex justify-between items-center px-12 mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
        <span>{GALLERY_PHOTOS.length} SHOTS</span>
        <span>4K · PRORES · ARCHIVE</span>
        <span>DIRECTORE // {new Date().getFullYear()}</span>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          photos={GALLERY_PHOTOS}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
