import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '../../lib/sounds';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string | null;
  title: string | null;
}

export function Lightbox({ isOpen, onClose, image, title }: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-sm flex items-center justify-center p-6 md:p-16 cursor-zoom-out"
        >
          {/* Close — minimal X top right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              onClose();
            }}
            className="absolute top-6 right-8 text-white/40 hover:text-white transition-colors duration-200 z-10 leading-none"
            aria-label="Close"
          >
            <span className="block w-6 h-px bg-current rotate-45 translate-y-px" />
            <span className="block w-6 h-px bg-current -rotate-45 -translate-y-px" />
          </button>

          {/* Index hint — top left */}
          {title && (
            <div className="absolute top-6 left-8 font-mono text-white/25 text-xs uppercase tracking-widest">
              {title}
            </div>
          )}

          {/* Image — simply floats, no border */}
          <motion.img
            src={image}
            alt={title || 'Gallery'}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-full max-h-[88vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
