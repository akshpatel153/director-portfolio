import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function GlitchTransition() {
  const location = useLocation();
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsGlitching(true);
      
      // Delay the actual route switch to the middle of the glitch
      const timer = setTimeout(() => {
        setDisplayLocation(location);
      }, 150);

      const endTimer = setTimeout(() => {
        setIsGlitching(false);
      }, 400);

      return () => {
        clearTimeout(timer);
        clearTimeout(endTimer);
      };
    }
  }, [location, displayLocation]);

  return (
    <AnimatePresence mode="wait">
      {isGlitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden bg-black"
        >
          {/* Glitch Slices */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-100%' }}
              animate={{ 
                x: ['-100%', '0%', '100%'],
                backgroundColor: ['#D02020', '#1040C0', '#F0C020', '#000000']
              }}
              transition={{ 
                duration: 0.3, 
                delay: i * 0.05,
                ease: "easeInOut"
              }}
              className="absolute w-full h-[20%] left-0"
              style={{ top: `${i * 20}%` }}
            />
          ))}

          {/* Static/Noise overlay */}
          <motion.div 
            animate={{ 
              opacity: [0, 0.4, 0.2, 0.5, 0],
              x: [0, -20, 20, -10, 10, 0]
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWU7AT9vliTo4p/giphy.gif')] bg-cover opacity-20 mix-blend-screen"
          />

          {/* Inversion flash */}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2, times: [0, 0.5, 1] }}
            className="absolute inset-0 bg-white mix-blend-difference"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
