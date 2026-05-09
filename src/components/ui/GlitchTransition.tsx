import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function GlitchTransition() {
  const location = useLocation();
  const [isGlitching, setIsGlitching] = useState(false);

  const isFirstMount = useRef(true);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Skip glitch on refresh/initial load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Only glitch if the pathname actually changed (not just search params)
    if (location.pathname !== prevPathname.current) {
      setIsGlitching(true);
      prevPathname.current = location.pathname;
      
      const endTimer = setTimeout(() => {
        setIsGlitching(false);
      }, 500);

      return () => clearTimeout(endTimer);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isGlitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
        >
          {/* Black base layer that only exists during glitch */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.4, times: [0, 0.1, 0.8, 1] }}
            className="absolute inset-0 bg-black"
          />

          {/* Glitch Slices */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-100%' }}
              animate={{ 
                x: ['-100%', '0%', '100%'],
              }}
              transition={{ 
                duration: 0.25, 
                delay: i * 0.03,
                ease: "linear"
              }}
              className={`absolute w-full h-[12.5%] left-0 z-10 ${
                i % 3 === 0 ? 'bg-primary-red' : 
                i % 3 === 1 ? 'bg-primary-blue' : 'bg-primary-yellow'
              }`}
              style={{ top: `${i * 12.5}%` }}
            />
          ))}

          {/* Static Noise overlay */}
          <motion.div 
            animate={{ 
              opacity: [0, 0.5, 0],
              x: [-10, 10, -10, 10, 0]
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/10 mix-blend-overlay z-20"
          />

          {/* Inversion flash */}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.15, times: [0, 0.5, 1] }}
            className="absolute inset-0 bg-white mix-blend-difference z-30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
