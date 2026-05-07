import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWipeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function SectionWipe({ children, color = "bg-primary-red", className = "" }: SectionWipeProps) {
  return (
    <div className={`relative ${className}`}>
      
      {/* The content itself */}
      {children}

      {/* The Brutalist Wipe Overlay */}
      <motion.div
        className={`absolute inset-0 z-50 ${color} pointer-events-none origin-top`}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
