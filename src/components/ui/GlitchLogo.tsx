import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function GlitchLogo() {
  const [shape, setShape] = useState(0); // 0: circle, 1: square, 2: triangle

  useEffect(() => {
    const interval = setInterval(() => {
      setShape((prev) => (prev + 1) % 3);
    }, 2000); // cycle every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const shapes = [
    // Circle
    <div key="circle" className="w-32 h-32 rounded-full bg-primary-red border-4 border-black shadow-[10px_10px_0px_0px_#000]" />,
    // Square
    <div key="square" className="w-32 h-32 bg-primary-blue border-4 border-black shadow-[10px_10px_0px_0px_#000]" />,
    // Triangle
    <div key="triangle" className="w-32 h-32 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[10px_10px_0px_black]">
        <polygon points="50,0 0,100 100,100" className="fill-primary-yellow stroke-black" strokeWidth="8" />
      </svg>
    </div>
  ];

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px] bg-black border-4 border-black relative overflow-hidden group">
      {/* Glitch lines in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }} 
          transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
          className="w-full h-1 bg-white"
        />
        <motion.div 
          animate={{ y: ["100%", "0%", "100%"] }} 
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear", delay: 0.1 }}
          className="w-full h-2 bg-primary-red"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={shape}
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: [0, -5, 5, -2, 0], // glitch horizontal jitter
            filter: ["none", "hue-rotate(90deg)", "none"]
          }}
          exit={{ opacity: 0, scale: 1.2, x: 10 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {shapes[shape]}
        </motion.div>
      </AnimatePresence>

      {/* Label */}
      <div className="absolute bottom-4 left-0 w-full text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Directore Symbol</span>
      </div>
    </div>
  );
}
