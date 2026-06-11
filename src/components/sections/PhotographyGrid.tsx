import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { Lightbox } from '../ui/Lightbox';
import { playClickSound } from '../../lib/sounds';

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

// Bento layout pattern: repeats every 5 items
const BENTO_PATTERN: Array<'wide' | 'normal' | 'tall'> = [
  'wide',
  'normal',
  'tall',
  'normal',
  'normal',
];


function PhotoCardWrapper({ photo, index, pattern, onClick }: {
  photo: { src: string; title: string };
  index: number;
  pattern: 'wide' | 'normal' | 'tall';
  onClick: () => void;
}) {
  const isWide = pattern === 'wide';
  const isTall = pattern === 'tall';

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer group bg-black photo-item
        ${isWide ? 'col-span-2' : 'col-span-1'}
        ${isTall ? 'row-span-2' : 'row-span-1'}
      `}
      style={{ minHeight: isWide ? '340px' : isTall ? '520px' : '260px' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (index % 5) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Parallax image wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={photo.src}
          alt={photo.title}
          style={{ y }}
          className="w-full h-[116%] -top-[8%] absolute object-cover grayscale group-hover:grayscale-0 group-hover:[transform:scale(1.06)] [transition:transform_900ms_cubic-bezier(0.16,1,0.3,1),filter_700ms_ease] will-change-transform"
        />
      </div>

      {/* Thin bottom red accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-primary-red z-20 w-full origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: (index % 5) * 0.1 + 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Watermark index */}
      <div className="absolute top-3 left-4 z-10 font-black text-white/15 text-5xl leading-none select-none pointer-events-none group-hover:text-white/25 transition-colors duration-700">
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
}

export function PhotographyGrid({ featured = false }: { featured?: boolean }) {
  const [activeAlbum, setActiveAlbum] = useState<'all' | 'archive' | 'cobblers-path'>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredPhotos = featured
    ? GALLERY_PHOTOS.filter(p => p.album === 'archive').slice(0, 6)
    : activeAlbum === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter(p => p.album === activeAlbum);

  const displayPhotos = featured ? filteredPhotos : filteredPhotos.slice(0, visibleCount);
  const hasMore = !featured && visibleCount < filteredPhotos.length;

  const handleLoadMore = () => {
    playClickSound();
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredPhotos.length));
  };

  const handleTabChange = (id: 'all' | 'archive' | 'cobblers-path') => {
    playClickSound();
    setActiveAlbum(id);
    setVisibleCount(INITIAL_COUNT);
  };

  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string | null; title: string | null }>({
    isOpen: false, image: null, title: null,
  });

  const openLightbox = (image: string, title: string) => {
    playClickSound();
    setLightbox({ isOpen: true, image, title });
  };

  return (
    <section
      className={`w-full ${featured ? 'bg-black' : 'bg-[#0e0e0e]'} text-white py-24`}
      id="photography"
    >
      {/* Section header */}
      <div className="px-6 md:px-12 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-black uppercase tracking-[0.4em] text-primary-red text-xs mb-3">
            — {featured ? 'Visual Archive' : 'Full Collection'}
          </p>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
            {featured ? 'SHOTS' : 'ARCHIVE'}
          </h2>
        </div>

        {featured && (
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs max-w-xs text-left md:text-right leading-relaxed">
              High contrast. Sharp angles.<br />Uncompromising composition.
            </p>
            <Link
              to="/photography"
              onClick={playClickSound}
              className="inline-flex items-center gap-3 border border-white/40 text-white font-black uppercase tracking-widest text-xs px-5 py-3 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Full Gallery <span>→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      {!featured && (
        <div className="px-6 md:px-12 mb-10 flex flex-wrap items-center gap-3">
          {[
            { id: 'all' as const, label: '01 // SHOW ALL' },
            { id: 'archive' as const, label: '02 // VISUAL ARCHIVE' },
            { id: 'cobblers-path' as const, label: "03 // COBBLER'S PATH" },
          ].map(tab => {
            const isActive = activeAlbum === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-2.5 border font-black uppercase tracking-widest text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-primary-yellow bg-primary-yellow text-black'
                    : 'border-white/20 text-white/40 hover:border-white/60 hover:text-white/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <div className="ml-auto font-mono text-white/20 text-xs tracking-widest">
            {filteredPhotos.length} FRAMES
          </div>
        </div>
      )}

      {/* Bento Grid */}
      <div className="px-6 md:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlbum}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto gap-1.5"
          >
            {displayPhotos.map((photo, i) => (
              <PhotoCardWrapper
                key={photo.src}
                photo={photo}
                index={i}
                pattern={BENTO_PATTERN[i % BENTO_PATTERN.length]}
                onClick={() => openLightbox(photo.src, photo.title)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        {hasMore && (
          <motion.div
            className="mt-14 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-1 h-px bg-white/10 max-w-[100px]" />
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-4 text-white/50 hover:text-white font-black uppercase tracking-widest text-xs transition-all duration-300 border border-white/15 hover:border-white/50 px-7 py-3.5"
            >
              <span>Load More</span>
              <span className="text-white/25 group-hover:text-primary-red transition-colors duration-300 font-mono">
                {visibleCount}/{filteredPhotos.length}
              </span>
              <span className="group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
            </button>
            <div className="flex-1 h-px bg-white/10 max-w-[100px]" />
          </motion.div>
        )}
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
