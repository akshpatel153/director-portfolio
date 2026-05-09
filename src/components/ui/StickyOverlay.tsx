import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { STICKY_MESSAGES } from '../../data/portfolio';
import { Link } from 'react-router-dom';

export function StickyOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentMessage = STICKY_MESSAGES[messageIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayedText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, 100); // typing speed
      } else {
        // finished typing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 4000); // pause before erasing
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // erase speed
      } else {
        // finished erasing, next message randomly
        const nextIndex = Math.floor(Math.random() * STICKY_MESSAGES.length);
        setMessageIndex(nextIndex);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, messageIndex]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end pointer-events-none pb-safe">
      <Link 
        to="/contact" 
        className="pointer-events-auto group relative flex items-center bg-white border-[2px] border-black px-3 py-2 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-[3px_3px_0px_0px_#D02020] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
      >
        <span className="font-bold tracking-widest text-black text-[10px] whitespace-nowrap min-w-[110px]">
          {displayedText}
          {/* Blinking cursor block */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1.5 h-2.5 bg-primary-blue ml-1 align-middle"
          />
        </span>
      </Link>
    </div>
  );
}
