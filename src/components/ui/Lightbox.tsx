import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-white text-4xl font-black z-10 hover:rotate-90 transition-transform"
          >
            ×
          </button>

          {/* Image container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative max-w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={title || "Gallery"}
              className="max-w-full max-h-[80vh] object-contain border-4 border-white shadow-[20px_20px_0px_0px_rgba(208,32,32,1)]"
            />
            
            {title && (
              <div className="mt-8 bg-white text-black px-6 py-3 font-black uppercase tracking-widest text-xl border-4 border-black shadow-[8px_8px_0px_0px_#1040C0]">
                {title}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
