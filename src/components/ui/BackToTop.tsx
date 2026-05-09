import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 md:right-12 z-[100] w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group"
          title="Back to Top"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:-translate-y-1 transition-transform"
          >
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
