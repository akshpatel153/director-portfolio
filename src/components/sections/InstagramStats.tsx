import { motion } from 'framer-motion';
import { INSTAGRAM_STATS } from '../../data/portfolio';
import { playClickSound } from '../../lib/sounds';

export function InstagramStats() {
  return (
    <section className="w-full bg-[#121212] py-24 px-6 md:px-12 border-b-4 border-black text-white relative overflow-hidden">
      {/* Background brutalist typography watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03] flex items-center justify-center">
        <span className="text-[20vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap">
          SOCIAL
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <div className="w-16 h-4 bg-primary-blue mb-6 border-2 border-black" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
              Digital <br /> Presence
            </h2>
            <p className="text-xl text-gray-400 font-medium">
              Real-time influence & reach.
            </p>
          </div>
          
          <a 
            href={INSTAGRAM_STATS.link} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="group relative inline-flex items-center justify-center font-bold text-lg uppercase tracking-widest text-black bg-white px-8 py-4 border-4 border-white transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              {INSTAGRAM_STATS.handle}
            </span>
            <div className="absolute inset-0 bg-primary-blue scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_STATS.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "backOut" }}
              className={`relative p-8 border-4 border-white ${stat.color === 'bg-white' ? 'bg-white text-black border-black' : 'bg-transparent text-white'} group overflow-hidden`}
            >
              {/* Brutalist hover fill effect */}
              <div className={`absolute inset-0 ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${stat.color === 'bg-white' ? 'hidden' : ''}`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <span className="text-sm md:text-base font-bold uppercase tracking-widest opacity-80 border-b-2 border-current pb-2 inline-block">
                  {stat.label}
                </span>
                <span className="text-5xl md:text-6xl font-black tracking-tighter">
                  {stat.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
