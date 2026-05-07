
import { Button } from '../ui/Button';
import { Circle, Square } from '../ui/GeometricDecorations';

export function CTA() {
  return (
    <section className="w-full bg-primary-red py-32 px-6 md:px-12 border-b-4 border-black relative overflow-hidden flex items-center justify-center">
      {/* Decorative background elements */}
      <Circle className="absolute -top-32 -left-32 w-96 h-96 bg-primary-blue opacity-50 border-8 border-black pointer-events-none" />
      <Square className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-yellow opacity-50 rotate-45 border-8 border-black pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.9] drop-shadow-[8px_8px_0px_#121212]">
          Let's <br /> Build
        </h2>
        <p className="text-xl md:text-2xl font-bold text-white mb-12 max-w-2xl bg-black px-6 py-4">
          Looking for a creative developer with an eye for geometry and composition? My inbox is open.
        </p>
        <Button variant="yellow" shape="pill" className="text-2xl py-6 px-12 shadow-large border-4 group">
          Contact Me
          <span className="ml-4 inline-block group-hover:translate-x-2 transition-transform duration-300">→</span>
        </Button>
      </div>
    </section>
  );
}
