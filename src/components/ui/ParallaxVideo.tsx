import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

interface ParallaxVideoProps {
  src: string;
  height?: string;
  className?: string;
  overlayColor?: string;
}

export function ParallaxVideo({ 
  src, 
  height = "h-screen", 
  className = "",
  overlayColor = "bg-black/20"
}: ParallaxVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Apply spring physics to smooth out the choppiness of scroll scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && duration > 0) {
      // Use requestAnimationFrame to ensure the video only updates exactly when the browser paints
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = latest * duration;
        }
      });
    }
  });

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${height} overflow-hidden border-y-4 border-white ${className}`}
    >
      <motion.div 
        style={{ y }} 
        className="absolute inset-[-20%] w-[140%] h-[140%] origin-center"
      >
        <video 
          ref={videoRef}
          src={src} 
          muted 
          playsInline
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlayColor} pointer-events-none mix-blend-multiply`} />
    </div>
  );
}
