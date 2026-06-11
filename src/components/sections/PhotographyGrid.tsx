import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { Lightbox } from '../ui/Lightbox';
import { playClickSound } from '../../lib/sounds';

function MasonryPhoto({ photo, index, onClick }: {
  photo: { src: string; title: string };
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      className="break-inside-avoid border-4 border-black bg-black relative overflow-hidden group cursor-zoom-in mb-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.05, ease: 'easeOut' }}
    >
      <div className="w-full relative overflow-hidden bg-black">
        {/* Hover zoom & grayscale-to-color transition */}
        <motion.img
          src={photo.src}
          alt={photo.title}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-auto block grayscale group-hover:grayscale-0 transition-[filter] duration-750"
        />

        {/* Index Stamp on bottom left */}
        <div className="absolute bottom-2 left-2 z-20 font-black text-white/30 text-3xl leading-none select-none pointer-events-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Title overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10">
          <span className="font-black text-xs uppercase tracking-widest bg-white text-black px-3 py-1.5 border-2 border-black shadow-[4px_4px_0px_0px_#D02020]">
            {photo.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function PhotographyGrid({ featured = false }: { featured?: boolean }) {
  const [activeAlbum, setActiveAlbum] = useState<'all' | 'archive' | 'cobblers-path'>('all');

  const displayPhotos = featured 
    ? GALLERY_PHOTOS.filter(photo => photo.album === 'archive').slice(0, 6) 
    : activeAlbum === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter(photo => photo.album === activeAlbum);

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
    <section className={`w-full ${featured ? 'bg-black' : 'bg-[#121212]'} text-white py-24 border-b-8 border-black`} id="photography">

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
        <div className="px-6 md:px-12 mb-12 flex flex-wrap gap-4 relative z-20">
          {[
            { id: 'all', label: '01 // SHOW ALL' },
            { id: 'archive', label: '02 // VISUAL ARCHIVE' },
            { id: 'cobblers-path', label: "03 // COBBLER'S PATH" },
          ].map((tab) => {
            const isActive = activeAlbum === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveAlbum(tab.id as any);
                }}
                className={`px-6 py-3 border-2 font-black uppercase tracking-widest text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'border-primary-yellow bg-primary-yellow text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] translate-x-[2px] translate-y-[2px]'
                    : 'border-white/20 text-white/50 hover:border-white hover:text-white bg-white/[0.01]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Asymmetric brutalist grid replaced by native aspect-ratio masonry */}
      <div className="px-6 md:px-12 relative">
        {/* Background Watermark peeking through gaps */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-black uppercase tracking-tighter rotate-[-10deg]">
            DIRECTORE
          </span>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 relative z-10">
          {displayPhotos.map((photo, i) => (
            <MasonryPhoto 
              key={photo.src} // Use unique src as key instead of index to prevent motion glitch during filter transitions
              photo={photo} 
              index={i} 
              onClick={() => openLightbox(photo.src, photo.title)}
            />
          ))}
        </div>
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
