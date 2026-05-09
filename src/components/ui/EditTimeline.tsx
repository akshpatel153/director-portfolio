import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { GALLERY_PHOTOS } from '../../data/portfolio';

export function EditTimeline() {
  const [hoveredClip, setHoveredClip] = useState<{ i: number, j: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tracks = [
    { label: 'V1', color: 'bg-primary-red', clips: [30, 20, 40, 10], type: 'video' },
    { label: 'V2', color: 'bg-primary-blue', clips: [10, 50, 15, 25], type: 'video' },
    { label: 'A1', color: 'bg-primary-yellow', clips: [100], type: 'audio' },
    { label: 'A2', color: 'bg-white/20', clips: [40, 20, 40], type: 'audio' },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleClipEnter = (i: number, j: number) => {
    setHoveredClip({ i, j });
    // Pick a pseudo-random image based on indices to keep it consistent for that session
    const imgIndex = (i * 10 + j) % GALLERY_PHOTOS.length;
    setPreviewImage(GALLERY_PHOTOS[imgIndex].src);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col justify-center p-8 font-mono cursor-crosshair"
    >
      {/* Floating Preview Window */}
      <AnimatePresence>
        {hoveredClip && previewImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              x: mousePos.x + 20, 
              y: mousePos.y - 120 
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
            className="fixed pointer-events-none z-50 w-48 h-32 border-4 border-white bg-black overflow-hidden shadow-[10px_10px_0px_0px_rgba(208,32,32,1)]"
            style={{ position: 'absolute' }}
          >
            {/* Glitch Overlay Effect */}
            <motion.div 
              animate={{ 
                x: [-2, 2, -1, 0],
                filter: [
                  "hue-rotate(0deg) contrast(1)",
                  "hue-rotate(90deg) contrast(1.2)",
                  "hue-rotate(-45deg) contrast(1.1)",
                  "hue-rotate(0deg) contrast(1)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="absolute inset-0 z-10 mix-blend-overlay opacity-30 bg-primary-red pointer-events-none" 
            />
            
            <img 
              src={previewImage} 
              alt="Preview" 
              className="w-full h-full object-cover grayscale"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-[8px] text-white p-1 flex justify-between border-t border-white/20">
              <span>PRVW_MODE</span>
              <span>CLIP_{hoveredClip.i}_{hoveredClip.j}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timecode Header */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-end border-b border-white/10 pb-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Sequence Name</span>
          <span className="text-xl font-bold text-white tracking-widest">DIRECTORE_MASTER_V1</span>
        </div>
        <div className="text-2xl font-black text-primary-red tabular-nums">
          00:04:12:<motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.1 }}>15</motion.span>
        </div>
      </div>

      {/* Viewfinder Corners */}
      <div className="absolute inset-4 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
      </div>

      {/* Timeline Grid */}
      <div className="space-y-4 mt-12 relative">
        {tracks.map((track, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <span className="w-8 text-[10px] font-black text-white/20 group-hover:text-white transition-colors">{track.label}</span>
            <div className="flex-grow h-12 bg-white/5 border border-white/10 relative flex gap-1 items-center px-1 overflow-hidden">
              {track.clips.map((width, j) => (
                <motion.div
                  key={j}
                  onMouseEnter={() => handleClipEnter(i, j)}
                  onMouseLeave={() => setHoveredClip(null)}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.1 + j * 0.05, duration: 0.8, ease: "circOut" }}
                  style={{ width: `${width}%` }}
                  className={`h-8 ${track.color} border border-black/20 relative overflow-hidden group/clip cursor-none`}
                >
                  {/* Clip "Shimmer" or waveform */}
                  {track.type === 'audio' && (
                    <div className="absolute inset-0 flex items-center justify-around px-2 opacity-30">
                      {[...Array(10)].map((_, k) => (
                        <motion.div 
                          key={k}
                          animate={{ height: [ "20%", "80%", "20%"] }}
                          transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() }}
                          className="w-[1px] bg-black"
                        />
                      ))}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/clip:opacity-20 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Playhead */}
        <motion.div 
          animate={{ x: ['0%', '90%', '0%'] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute top-0 bottom-0 left-12 w-[2px] bg-primary-red z-20 shadow-[0_0_15px_rgba(208,32,32,0.8)]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-red rotate-45" />
        </motion.div>
      </div>

      {/* Technical Labels Overlay */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-[9px] text-white/20 uppercase tracking-[0.3em]">
        <span>4K PRORES 422 HQ</span>
        <span>23.976 FPS</span>
        <span>STEREO 48KHZ</span>
      </div>
    </div>
  );
}
