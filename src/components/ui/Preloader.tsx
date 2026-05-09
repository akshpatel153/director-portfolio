import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_WORDS = [
  'FRAMING',
  'COMPOSING',
  'GRADING',
  'CUTTING',
  'RENDERING',
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Cycle words
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % LOADING_WORDS.length);
    }, 400);

    // Increment progress with a smoother, frame-synced feel
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(interval);
        clearInterval(wordTimer);
        return;
      }
      
      // Dynamic easing for progress
      const diff = 100 - currentProgress;
      const step = Math.max(0.1, diff * 0.1);
      currentProgress += step;
      
      if (currentProgress > 99.9) {
        currentProgress = 100;
        clearInterval(interval);
        clearInterval(wordTimer);
      }
      
      setProgress(Math.round(currentProgress));
    }, 32); // ~30fps for smooth updates

    return () => {
      clearInterval(wordTimer);
      clearInterval(interval);
    };
  }, []);

  // Fire onComplete after progress hits 100
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(onComplete, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col justify-end overflow-hidden"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Background geometric shapes - simplified for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          className="absolute -right-32 top-1/4 w-96 h-96 border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute left-1/4 top-1/3 w-64 h-64 border border-white/10 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Giant background progress number - INCREASED OPACITY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.span 
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-black text-[25vw] md:text-[30vw] text-white/10 leading-none tracking-tighter tabular-nums"
        >
          {String(progress).padStart(3, '0')}
        </motion.span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        {/* Geometric logo */}
        <div className="flex items-end gap-2">
          <motion.div
            className="w-4 h-4 rounded-full bg-primary-red"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-4 h-4 bg-primary-blue"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
          />
          <div className="w-4 h-4 overflow-hidden">
            <motion.div 
              className="w-full h-full bg-primary-yellow origin-bottom"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Cycling word */}
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="font-black uppercase tracking-[0.5em] text-white text-[10px]"
          >
            {LOADING_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom bar section */}
      <div className="relative z-10 px-6 md:px-12 pb-12">
        <div className="flex items-end justify-between mb-8">
          <h1 className="font-black text-5xl md:text-8xl tracking-tighter text-white uppercase leading-none">
            Directore
          </h1>
          <span className="font-black text-4xl md:text-6xl text-white/10 tracking-tighter tabular-nums leading-none">
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary-red"
            style={{ width: `${progress}%` }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-black"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-6 text-white/10 font-black uppercase tracking-[0.4em] text-[10px]">
          <span>Visual Architect</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </motion.div>
  );
}
