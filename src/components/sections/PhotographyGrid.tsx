import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { Lightbox } from '../ui/Lightbox';

// Asymmetric brutalist grid config: [col-span, row-span, aspect]
const GRID_CONFIG = [
  { cols: 'md:col-span-2', aspect: 'aspect-[16/7]' },  // wide hero
  { cols: 'md:col-span-1', aspect: 'aspect-square' },
  { cols: 'md:col-span-1', aspect: 'aspect-square' },
  { cols: 'md:col-span-1', aspect: 'aspect-[3/4]' },
  { cols: 'md:col-span-2', aspect: 'aspect-[16/7]' },  // wide hero
  { cols: 'md:col-span-1', aspect: 'aspect-[3/4]' },
];

function ParallaxPhoto({ photo, config, index, onClick }: {
  photo: { src: string; title: string };
  config: { cols: string; aspect: string };
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ['start end', 'end start'] 
  });
  
  // pronounced parallax movement
  const y = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={`${config.cols} relative overflow-hidden border-4 border-black group cursor-zoom-in`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: 'circOut' }}
    >
      <div className={`${config.aspect} w-full relative overflow-hidden bg-black`}>
        {/* Parallax image with depth */}
        <motion.img
          style={{ y }}
          src={photo.src}
          alt={photo.title}
          className="absolute inset-0 w-full h-[150%] -top-[25%] object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 z-10" />

        {/* Index stamp */}
        <div className="absolute top-3 left-3 z-20 font-black text-white/40 text-6xl leading-none select-none pointer-events-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Red accent bar on hover */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-primary-red z-20 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function FillerWithParallax({ text }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ['start end', 'end start'] 
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-60px', '60px']);

  return (
    <div ref={ref} className="md:col-span-1 border-4 border-black bg-black overflow-hidden relative min-h-[300px] flex items-center justify-center group">
      {/* Background Text */}
      {text && (
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['20px', '-20px']) }}
          className="absolute inset-0 flex items-center justify-center opacity-[0.1] pointer-events-none"
        >
          <span className="text-8xl font-black uppercase tracking-tighter whitespace-nowrap">
            {text}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export function PhotographyGrid({ featured = false }: { featured?: boolean }) {
  const displayPhotos = featured ? GALLERY_PHOTOS.slice(0, 6) : GALLERY_PHOTOS;
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string | null; title: string | null }>({
    isOpen: false,
    image: null,
    title: null
  });

  const openLightbox = (image: string, title: string) => {
    setLightbox({ isOpen: true, image, title });
  };

  // Calculate filler slots for the archive page
  const fillerCount = featured ? 0 : (3 - (displayPhotos.length % 3)) % 3;
  const fillers = Array.from({ length: fillerCount });

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
              className="inline-flex items-center gap-3 border-2 border-white text-white font-black uppercase tracking-widest text-xs px-5 py-3 hover:bg-white hover:text-black transition-all duration-200"
            >
              Full Gallery
              <span className="text-base">→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Asymmetric brutalist grid */}
      <div className="px-6 md:px-12 relative">
        {/* Background Watermark peeking through gaps */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-black uppercase tracking-tighter rotate-[-10deg]">
            DIRECTORE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-4 border-black bg-black relative z-10">
          {displayPhotos.map((photo, i) => (
            <ParallaxPhoto 
              key={i} 
              photo={photo} 
              config={GRID_CONFIG[i % GRID_CONFIG.length]} 
              index={i} 
              onClick={() => openLightbox(photo.src, photo.title)}
            />
          ))}
          
          {/* Animated Fillers with subtle depth and text */}
          {!featured && fillers.map((_, i) => {
            const fillerTexts = ["GRIT", "RAW", "SHARP", "CUT"];
            return (
              <FillerWithParallax 
                key={`filler-${i}`} 
                text={fillerTexts[i % fillerTexts.length]}
              />
            );
          })}
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
