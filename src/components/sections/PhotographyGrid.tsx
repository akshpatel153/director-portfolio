import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { Lightbox } from '../ui/Lightbox';
import { playClickSound } from '../../lib/sounds';

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

// Bento-style layout pattern that repeats every 5 photos
// span-2 = wide card, span-1 = normal card
const BENTO_PATTERN: Array<'wide' | 'normal' | 'tall'> = [
  'wide',   // 1: hero wide — spans 2 cols
  'normal', // 2
  'tall',   // 3: tall card — extra height
  'normal', // 4
  'normal', // 5
];

function PhotoCard({ photo, index, pattern, onClick }: {
  photo: { src: string; title: string };
  index: number;
  pattern: 'wide' | 'normal' | 'tall';
  onClick: () => void;
}) {
  const isWide = pattern === 'wide';
  const isTall = pattern === 'tall';

  return (
    <motion.div
      onClick={onClick}
      className={`
        relative overflow-hidden border-2 border-white/10 group cursor-zoom-in bg-black
        ${isWide ? 'col-span-2' : 'col-span-1'}
        ${isTall ? 'row-span-2' : 'row-span-1'}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Image — fills card completely, preserving aspect ratio via object-contain */}
      <img
        src={photo.src}
        alt={photo.title}
        className={`
          w-full grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-105
          ${isTall || isWide ? 'h-full object-cover' : 'h-full object-cover'}
        `}
        style={{ minHeight: isWide ? '340px' : isTall ? '520px' : '260px' }}
      />

      {/* Subtle dark vignette on hover only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Index stamp — bottom right corner, always visible */}
      <div className="absolute bottom-3 right-3 z-20 font-black text-white/20 text-4xl leading-none select-none pointer-events-none group-hover:text-white/40 transition-colors duration-300">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Red bar — slides in from left on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-primary-red z-30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        style={{ originX: 0, width: '100%' }}
        transition={{ duration: 0.6, delay: (index % 5) * 0.1 + 0.3 }}
      />
    </motion.div>
  );
}

export function PhotographyGrid({ featured = false }: { featured?: boolean }) {
  const [activeAlbum, setActiveAlbum] = useState<'all' | 'archive' | 'cobblers-path'>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredPhotos = featured
    ? GALLERY_PHOTOS.filter(photo => photo.album === 'archive').slice(0, 6)
    : activeAlbum === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter(photo => photo.album === activeAlbum);

  const displayPhotos = featured ? filteredPhotos : filteredPhotos.slice(0, visibleCount);
  const hasMore = !featured && visibleCount < filteredPhotos.length;

  const handleLoadMore = () => {
    playClickSound();
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredPhotos.length));
  };

  const handleTabChange = (id: 'all' | 'archive' | 'cobblers-path') => {
    playClickSound();
    setActiveAlbum(id);
    setVisibleCount(INITIAL_COUNT); // reset visible count on tab change
  };

  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string | null; title: string | null }>({
    isOpen: false,
    image: null,
    title: null
  });

  const openLightbox = (image: string, title: string) => {
    playClickSound();
    setLightbox({ isOpen: true, image, title });
  };

  return (
    <section
      className={`w-full ${featured ? 'bg-black' : 'bg-[#0e0e0e]'} text-white py-24 border-b-8 border-black`}
      id="photography"
    >
      {/* Section header */}
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
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
              className="inline-flex items-center gap-3 border-2 border-white text-white font-black uppercase tracking-widest text-xs px-5 py-3 hover:bg-white hover:text-black transition-all duration-200"
            >
              Full Gallery
              <span className="text-base">→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      {!featured && (
        <div className="px-6 md:px-12 mb-10 flex flex-wrap gap-3 relative z-20">
          {[
            { id: 'all' as const, label: '01 // SHOW ALL' },
            { id: 'archive' as const, label: '02 // VISUAL ARCHIVE' },
            { id: 'cobblers-path' as const, label: "03 // COBBLER'S PATH" },
          ].map((tab) => {
            const isActive = activeAlbum === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-3 border-2 font-black uppercase tracking-widest text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-primary-yellow bg-primary-yellow text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] translate-x-[2px] translate-y-[2px]'
                    : 'border-white/20 text-white/50 hover:border-white hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Photo count badge */}
          <div className="ml-auto self-center font-black text-white/20 text-xs uppercase tracking-widest">
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
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto gap-2 md:gap-3"
          >
            {displayPhotos.map((photo, i) => (
              <PhotoCard
                key={photo.src}
                photo={photo}
                index={i}
                pattern={BENTO_PATTERN[i % BENTO_PATTERN.length]}
                onClick={() => openLightbox(photo.src, photo.title)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Left rule line */}
            <div className="flex-1 h-[2px] bg-white/10 max-w-[120px]" />

            <button
              onClick={handleLoadMore}
              className="group px-8 py-4 border-2 border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-3"
            >
              <span>Load More</span>
              <span className="text-primary-red group-hover:text-black transition-colors duration-200">
                [{visibleCount}/{filteredPhotos.length}]
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">↓</span>
            </button>

            {/* Right rule line */}
            <div className="flex-1 h-[2px] bg-white/10 max-w-[120px]" />
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
