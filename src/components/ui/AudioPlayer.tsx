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
  
  const [audioVolume, setAudioVolume] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  // Set up Web Audio API for real-time analysis
  useEffect(() => {
    if (!audioRef.current) return;

    const setupAudio = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioRef.current!);
        const analyser = audioContext.createAnalyser();
        
        analyser.fftSize = 256;
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        const updateVolume = () => {
          if (!isPlaying) {
            setAudioVolume(0);
            return;
          }
          
          analyser.getByteFrequencyData(dataArray);
          // Get average volume
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioVolume(average);
          animationRef.current = requestAnimationFrame(updateVolume);
        };

        updateVolume();
      } catch (err) {
        console.error("Audio analysis failed:", err);
      }
    };

    if (isPlaying && !analyserRef.current) {
      setupAudio();
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

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
                <motion.div animate={{ height: [ `${2+audioVolume/10}px`, `${5+audioVolume/5}px`, `${2+audioVolume/10}px`] }} transition={{ repeat: Infinity, duration: 0.2 }} className="w-[2px] bg-black" />
                <motion.div animate={{ height: [ `${5+audioVolume/5}px`, `${2+audioVolume/10}px`, `${5+audioVolume/5}px`] }} transition={{ repeat: Infinity, duration: 0.2 }} className="w-[2px] bg-black" />
                <motion.div animate={{ height: [ `${3+audioVolume/8}px`, `${6+audioVolume/4}px`, `${3+audioVolume/8}px`] }} transition={{ repeat: Infinity, duration: 0.2 }} className="w-[2px] bg-black" />
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

      {/* Reactive String Visualizer - Bottom Center */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-12 left-0 w-full h-12 z-40 pointer-events-none flex items-center justify-center"
          >
            <svg width="400" height="80" viewBox="0 0 400 80" className="overflow-visible">
              <motion.path
                d={`M 0 40 Q 100 ${40 - audioVolume} 200 40 Q 300 ${40 + audioVolume} 400 40`}
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                animate={{
                  d: `M 0 40 Q 100 ${40 - audioVolume} 200 40 Q 300 ${40 + audioVolume} 400 40`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
              />
              <motion.path
                d={`M 0 40 Q 100 ${40 + audioVolume/2} 200 40 Q 300 ${40 - audioVolume/2} 400 40`}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
                fill="none"
                animate={{
                  d: `M 0 40 Q 100 ${40 + audioVolume/2} 200 40 Q 300 ${40 - audioVolume/2} 400 40`
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.05 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
