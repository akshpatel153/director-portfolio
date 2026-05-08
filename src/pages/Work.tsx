import { motion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionWipe } from '../components/ui/SectionWipe';

export function Work() {
  return (
    <PageTransition>
      <SectionWipe color="bg-primary-blue">
        <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center px-6">
          
          <motion.div
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "circOut" }}
          >
            {/* Small label */}
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-gray-500 mb-8">
              Work
            </p>

            {/* Main message */}
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8 text-white">
              Directore is currently locked in the editing room.
            </h1>

            {/* Divider */}
            <div className="w-24 h-1 bg-primary-red mx-auto mb-8" />

            {/* Subtitle */}
            <p className="text-lg text-gray-400 font-medium">
              Check back soon for the final cut.
            </p>
          </motion.div>

        </div>
      </SectionWipe>
    </PageTransition>
  );
}
