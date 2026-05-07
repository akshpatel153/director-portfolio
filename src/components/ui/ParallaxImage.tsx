import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  // Increased translation range for a more pronounced parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <div 
      ref={ref} 
      className={`relative w-full overflow-hidden border-y-4 border-black ${height} ${className}`}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[40%] -bottom-[40%] w-full h-[180%]"
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover grayscale" 
        />
        {/* Constructivist Overlay: A semi-transparent primary color tint block */}
        <div className="absolute inset-0 bg-primary-red mix-blend-multiply opacity-40"></div>
      </motion.div>
    </div>
  );
}
