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
    let timeout: NodeJS.Timeout;

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
    <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end pointer-events-none">
      <Link 
        to="/contact" 
        className="pointer-events-auto group relative flex items-center bg-white border-[3px] border-black px-5 py-3 rounded-t-3xl rounded-bl-3xl rounded-br-sm shadow-[4px_4px_0px_0px_#D02020] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
      >
        <span className="font-bold tracking-widest text-black text-xs md:text-sm whitespace-nowrap min-w-[150px]">
          {displayedText}
          {/* Blinking cursor block */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-3 bg-primary-blue ml-1 align-middle"
          />
        </span>
      </Link>
    </div>
  );
}
