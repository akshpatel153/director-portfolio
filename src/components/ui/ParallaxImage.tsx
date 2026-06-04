import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  height?: string;
  className?: string;
}

export function ParallaxImage({ src, alt, height = "h-[100vh]", className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate pixel translation instead of percentage for hardware acceleration and subpixel rendering
  const yRaw = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  
  // Smooth the raw scroll inputs using a spring dampener (mass/stiffness/damping physics)
  const y = useSpring(yRaw, { 
    stiffness: 90, 
    damping: 25, 
    restDelta: 0.001 
  });

  return (
    <div 
      ref={ref} 
      className={`relative w-full overflow-hidden border-y-4 border-black ${height} ${className}`}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[150px] w-full h-[calc(100%+300px)]"
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover grayscale" 
        />
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </motion.div>
    </div>
  );
}
