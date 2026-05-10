export const playClickSound = () => {
  const audio = new Audio('/Clicks/mixkit-sci-fi-click-900.wav');
  audio.volume = 0.3;
  audio.play().catch(err => console.log('Audio play failed:', err));
};
