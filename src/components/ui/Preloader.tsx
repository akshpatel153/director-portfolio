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
    }, 500);

    // Increment progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          clearInterval(wordTimer);
          return 100;
        }
        // Accelerating progress curve
        const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => {
      clearInterval(wordTimer);
      clearInterval(progressTimer);
    };
  }, []);

  // Fire onComplete after progress hits 100
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(onComplete, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col justify-end overflow-hidden"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* Background geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large rotating square */}
        <motion.div
          className="absolute -right-32 top-1/4 w-96 h-96 border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        {/* Pulsing circle */}
        <motion.div
          className="absolute left-1/4 top-1/3 w-64 h-64 border border-white/5 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Scanning line */}
        <motion.div
          className="absolute left-0 w-full h-[1px] bg-primary-red/30"
          animate={{ y: [0, window.innerHeight, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Giant background progress number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-black text-[20vw] md:text-[25vw] text-white/[0.03] leading-none tracking-tighter tabular-nums">
          {String(progress).padStart(3, '0')}
        </span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        {/* Geometric logo */}
        <div className="flex items-end gap-2">
          <motion.div
            className="w-5 h-5 rounded-full bg-primary-red"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-5 h-5 bg-primary-blue"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.svg viewBox="0 0 100 100" className="w-5 h-5">
            <motion.polygon
              points="50,0 0,100 100,100"
              fill="#F0C020"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </motion.svg>
        </div>

        {/* Cycling word */}
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="font-black uppercase tracking-[0.5em] text-white text-xs"
          >
            {LOADING_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom bar section */}
      <div className="relative z-10 px-6 md:px-12 pb-10">
        {/* Director title + progress */}
        <div className="flex items-end justify-between mb-6">
          <h1 className="font-black text-4xl md:text-6xl tracking-tighter text-white uppercase leading-none">
            The<br/>Director
          </h1>
          <span className="font-black text-5xl md:text-7xl text-white/20 tracking-tighter tabular-nums leading-none">
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary-red"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
          {/* Playhead dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(208,32,32,0.6)]"
            style={{ left: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        {/* Bottom info strip */}
        <div className="flex items-center justify-between mt-4 text-white/20 font-bold uppercase tracking-[0.3em] text-[9px]">
          <span>Portfolio v1.0</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>

    </motion.div>
  );
}
