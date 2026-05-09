import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'zoom' | 'zoom-out'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const handleTouch = () => {
      setIsTouchDevice(true);
      window.removeEventListener('touchstart', handleTouch);
    };
    window.addEventListener('touchstart', handleTouch, { passive: true });

    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
    if (touch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine cursor type based on target
      if (target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
        setCursorType('pointer');
      } else if (target.closest('.cursor-zoom-in') || target.tagName === 'IMG') {
        setCursorType('zoom');
      } else if (target.closest('.cursor-zoom-out')) {
        setCursorType('zoom-out');
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

  // Cursor variants
  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "#D02020", // primary-red
      borderRadius: "0px",
      mixDifference: false
    },
    pointer: {
      width: 40,
      height: 40,
      backgroundColor: "#1040C0", // primary-blue
      borderRadius: "50%",
      mixDifference: true
    },
    zoom: {
      width: 60,
      height: 60,
      backgroundColor: "#F0C020", // primary-yellow
      borderRadius: "0px",
      mixDifference: true
    },
    'zoom-out': {
      width: 60,
      height: 60,
      backgroundColor: "#D02020", // primary-red
      borderRadius: "0px",
      mixDifference: true
    }
  };

  const currentVariant = variants[cursorType];

  if (isTouchDevice) return null;

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
          <motion.div
            animate={{
              width: currentVariant.width,
              height: currentVariant.height,
              backgroundColor: currentVariant.backgroundColor,
              borderRadius: currentVariant.borderRadius,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            style={{
              border: '2px solid black',
              boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
              mixBlendMode: currentVariant.mixDifference ? 'difference' : 'normal'
            }}
            className="relative flex items-center justify-center overflow-hidden"
          >
            {cursorType === 'zoom' && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-black text-black uppercase"
              >
                VIEW
              </motion.span>
            )}

            {cursorType === 'zoom-out' && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-black text-white uppercase"
              >
                CLOSE
              </motion.span>
            )}
            
            {cursorType === 'pointer' && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
