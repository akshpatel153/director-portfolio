import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number; // Used as a multiplier for scroll speed now
  className?: string;
  textClassName?: string;
}

export function Marquee({ 
  text, 
  direction = 'left', 
  speed = 1,
  className = '',
  textClassName = ''
}: MarqueeProps) {
  // Generate a massive string so we don't run out of text during deep scrolling
  const repeatedText = Array(40).fill(text).join(' \u00A0 \u2022 \u00A0 '); 

  const { scrollY } = useScroll();
  // Add physics so the text glides smoothly when scrolling stops
  const smoothScroll = useSpring(scrollY, { damping: 50, stiffness: 200 });

  // Map the scroll position to pixel offsets
  const x = useTransform(smoothScroll, (v) => {
    // If direction is left, scroll negatively based on scroll value. 
    // If right, start with a massive negative offset and scroll positively.
    return direction === 'left' 
      ? -v * speed 
      : (v * speed) - 4000;
  });

  return (
    <div className={`relative flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className={`flex whitespace-nowrap ${textClassName}`}
        style={{ x }}
      >
        <span>{repeatedText}</span>
      </motion.div>
    </div>
  );
}
