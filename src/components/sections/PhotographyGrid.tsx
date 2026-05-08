import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_PHOTOS } from '../../data/portfolio';

// Show first 6 on the home page
const FEATURED = GALLERY_PHOTOS.slice(0, 6);

// Asymmetric brutalist grid config: [col-span, row-span, aspect]
const GRID_CONFIG = [
  { cols: 'md:col-span-2', aspect: 'aspect-[16/7]' },  // wide hero
  { cols: 'md:col-span-1', aspect: 'aspect-square' },
  { cols: 'md:col-span-1', aspect: 'aspect-square' },
  { cols: 'md:col-span-1', aspect: 'aspect-[3/4]' },
  { cols: 'md:col-span-2', aspect: 'aspect-[16/7]' },  // wide hero
  { cols: 'md:col-span-1', aspect: 'aspect-[3/4]' },
];

function ParallaxPhoto({ photo, config, index }: {
  photo: { src: string; title: string };
  config: { cols: string; aspect: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.div
      ref={ref}
      className={`${config.cols} relative overflow-hidden border-4 border-black group`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'circOut' }}
    >
      <div className={`${config.aspect} w-full relative overflow-hidden`}>
        {/* Parallax image */}
        <motion.img
          style={{ y }}
          src={photo.src}
          alt={photo.title}
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
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

export function PhotographyGrid() {
  return (
    <section className="w-full bg-black text-white py-24 border-b-8 border-black" id="photography">

      {/* Section header */}
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-black uppercase tracking-[0.4em] text-primary-red text-xs mb-3">
            — Visual Archive
          </p>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
            SHOTS
          </h2>
        </div>

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
      </div>

      {/* Asymmetric brutalist grid */}
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-4 border-black">
          {FEATURED.map((photo, i) => (
            <ParallaxPhoto key={i} photo={photo} config={GRID_CONFIG[i]} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
}
