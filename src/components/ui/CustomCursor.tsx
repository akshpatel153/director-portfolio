import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'zoom'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
        setCursorType('pointer');
      } else if (target.classList.contains('cursor-zoom-in') || target.tagName === 'IMG') {
        setCursorType('zoom');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: cursorX,
            y: cursorY,
            pointerEvents: 'none',
            zIndex: 9999,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          {/* Default: Blue Square */}
          {cursorType === 'default' && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="w-5 h-5 bg-primary-blue border-2 border-black shadow-[3px_3px_0px_0px_black]"
            />
          )}

          {/* Pointer: Red Circle */}
          {cursorType === 'pointer' && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="w-8 h-8 bg-primary-red border-2 border-black rounded-full shadow-[4px_4px_0px_0px_black] flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
          )}

          {/* Zoom: Yellow Triangle */}
          {cursorType === 'zoom' && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              className="w-10 h-10 flex items-center justify-center relative"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <polygon 
                  points="50,5 95,95 5,95" 
                  className="fill-primary-yellow stroke-black" 
                  strokeWidth="8"
                />
              </svg>
              <span className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-black text-black">
                VIEW
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
