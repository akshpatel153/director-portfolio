import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Temporary placeholder audio until you add the real mp3
  const AUDIO_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end justify-start pointer-events-none">
      <audio ref={audioRef} src={AUDIO_SRC} loop />

      <button 
        onClick={togglePlay}
        className="pointer-events-auto group relative flex items-center bg-white border-[3px] border-black px-4 py-2 rounded-t-sm rounded-br-3xl rounded-bl-sm shadow-[4px_4px_0px_0px_#FFD700] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
      >
        <div className="flex flex-col items-start mr-3 text-left">
          <span className="font-bold text-[10px] tracking-widest text-gray-500 uppercase leading-none mb-1">
            Now Playing
          </span>
          <span className="font-bold tracking-wider text-black text-xs md:text-sm whitespace-nowrap leading-none">
            FEEL IT - D4VD
          </span>
        </div>
        
        <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full ml-2 shrink-0">
          {isPlaying ? (
            <div className="flex gap-1 h-4 items-end pb-[2px]">
              <motion.div animate={{ height: ["4px", "12px", "4px"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-primary-yellow" />
              <motion.div animate={{ height: ["12px", "4px", "12px"] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 bg-primary-yellow" />
              <motion.div animate={{ height: ["8px", "12px", "8px"] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 bg-primary-yellow" />
            </div>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
