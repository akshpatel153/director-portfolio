import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';

const TRACKS = [
  { src: "/Music/Feel It (From “Invincible”)_spotdown.org.mp3", label: "FEEL IT — D4VD" },
  { src: "/Music/505_spotdown.org.mp3",                             label: "505 — ARCTIC MONKEYS" },
  { src: "/Music/Disco_spotdown.org.mp3",                           label: "DISCO — SURF CURSE" },
  { src: "/Music/Rude_spotdown.org.mp3",                            label: "RUDE — MAGIC!" },
  { src: "/Music/Yellow_spotdown.org.mp3",                          label: "YELLOW — COLDPLAY" },
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const advanceTrack = () => {
    const next = (trackIndex + 1) % TRACKS.length;
    setTrackIndex(next);
    setIsPlaying(true);
  };

  const nextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    advanceTrack();
  };

  const handleCanPlay = () => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end justify-start pointer-events-none">
      <audio ref={audioRef} src={TRACKS[trackIndex].src} onEnded={advanceTrack} onCanPlay={handleCanPlay} crossOrigin="anonymous" />

      {/* Bubble Control */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="pointer-events-auto flex items-center overflow-hidden bg-white border-[2px] border-black px-3 py-2 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-[-3px_3px_0px_0px_#FFD700]"
      >
        <motion.button layout onClick={togglePlay} className="shrink-0">
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.div
                key="eq"
                className="flex gap-[2px] h-3 items-end"
              >
                <motion.div animate={{ height: [ "3px", "10px", "3px"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[2px] bg-black" />
                <motion.div animate={{ height: [ "10px", "3px", "10px"] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }} className="w-[2px] bg-black" />
                <motion.div animate={{ height: [ "6px", "10px", "6px"] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }} className="w-[2px] bg-black" />
              </motion.div>
            ) : (
              <motion.svg key="play" className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence initial={false}>
          {isPlaying && (
            <motion.div key="info" className="flex items-center overflow-hidden">
              <span className="ml-2 font-bold tracking-widest text-black text-[10px] whitespace-nowrap">{TRACKS[trackIndex].label}</span>
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-2.5 bg-primary-yellow ml-1.5 align-middle shrink-0" />
              <button onClick={nextTrack} className="ml-2 shrink-0 opacity-40 hover:opacity-100 transition-opacity"><svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm8.5-6l-8.5 6V6l8.5 6zM16 6v12h2V6h-2z" /></svg></button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
