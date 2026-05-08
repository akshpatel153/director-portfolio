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

  const AUDIO_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end justify-start pointer-events-none">
      <audio ref={audioRef} src={AUDIO_SRC} loop />

      <button
        onClick={togglePlay}
        className="pointer-events-auto flex items-center bg-white border-[3px] border-black px-5 py-3 rounded-t-3xl rounded-br-3xl rounded-bl-sm shadow-[-4px_4px_0px_0px_#FFD700] hover:-translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
      >
        {/* Equalizer / Play icon */}
        <div className="mr-3 shrink-0">
          {isPlaying ? (
            <div className="flex gap-[3px] h-4 items-end">
              <motion.div animate={{ height: ["4px", "14px", "4px"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[3px] bg-black" />
              <motion.div animate={{ height: ["14px", "4px", "14px"] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }} className="w-[3px] bg-black" />
              <motion.div animate={{ height: ["8px", "14px", "8px"] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }} className="w-[3px] bg-black" />
            </div>
          ) : (
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Track info */}
        <span className="font-bold tracking-widest text-black text-xs md:text-sm whitespace-nowrap">
          FEEL IT — D4VD
        </span>

        {/* Blinking cursor when playing */}
        {isPlaying && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-3 bg-primary-yellow ml-2 align-middle"
          />
        )}
      </button>
    </div>
  );
}
