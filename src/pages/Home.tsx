import { Hero } from '../components/sections/Hero';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import { DesktopScrollGallery } from '../components/ui/DesktopScrollGallery';
import { HorizontalScrollGallery } from '../components/ui/HorizontalScrollGallery';
import { SectionWipe } from '../components/ui/SectionWipe';
import { InstagramStats } from '../components/sections/InstagramStats';
import { AboutMe } from '../components/sections/AboutMe';
import { HomeContactCTA } from '../components/sections/HomeContactCTA';
import { motion } from 'framer-motion';
import { PHILOSOPHY_CONTENT, PARALLAX_IMAGES } from '../data/portfolio';
import { Marquee } from '../components/ui/Marquee';

export function Home() {
  return (
    <>
      <Hero />
      
      {/* Philosophy Section */}
      <SectionWipe color="bg-black">
        <section className="w-full bg-background border-b-4 border-black relative overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[60vh] border-t-4 border-black">
              {[
                { word: "MOTION", color: "bg-primary-red", num: "01", desc: PHILOSOPHY_CONTENT.paragraph1 },
                { word: "CAPTURE", color: "bg-primary-blue", num: "02", desc: PHILOSOPHY_CONTENT.paragraph2 },
                { word: "CUT", color: "bg-primary-yellow", num: "03", desc: "The edit is where the story is found. Every frame serves the sequence. No soft transitions. Pure impact." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative group border-b-4 md:border-b-0 ${i < 2 ? 'md:border-r-4' : ''} border-black overflow-hidden bg-background hover:bg-black transition-colors duration-500`}
                >
                  {/* Hover Flood Color */}
                  <div className={`absolute inset-0 ${item.color} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]`} />
                  
                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between min-h-[400px]">
                    <div className="flex justify-between items-start">
                      <span className="text-4xl md:text-6xl font-black tracking-tighter opacity-10 group-hover:opacity-100 group-hover:text-black transition-all">
                        {item.num}
                      </span>
                      {/* Viewfinder crosshair */}
                      <div className="w-8 h-8 relative opacity-20 group-hover:opacity-100 group-hover:text-black transition-all">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-current" />
                        <div className="absolute top-0 left-0 w-[2px] h-full bg-current" />
                        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-current" />
                        <div className="absolute bottom-0 right-0 w-[2px] h-full bg-current" />
                      </div>
                    </div>

                    <div className="mt-20">
                      <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 group-hover:text-black transition-colors">
                        {item.word}
                      </h3>
                      <p className="text-sm md:text-base font-bold leading-relaxed uppercase tracking-wider opacity-0 group-hover:opacity-100 text-black transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 max-w-xs">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom technical strip */}
            <div className="w-full bg-black text-white py-4 px-6 md:px-12 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em]">
              <div className="flex gap-8">
                <span>REC ●</span>
                <span>24 FPS</span>
                <span>4K PRORES</span>
              </div>
              <div className="hidden md:block">
                HIGH-IMPACT VISUAL PRODUCTION // {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </section>
      </SectionWipe>

      {/* First Parallax Image - Cinematic height */}
      <SectionWipe color="bg-primary-red">
        <div className="relative border-y-4 border-black">
          <ParallaxImage 
            src={PARALLAX_IMAGES.firstImage} 
            alt="Cinematic separator"
            height="h-[40vh]"
            className="border-none"
          />
        </div>
      </SectionWipe>

      {/* Gallery — Desktop: horizontal scroll, Mobile: clickable carousel */}
      <DesktopScrollGallery />
      <HorizontalScrollGallery />

      {/* About Me Section */}
      <SectionWipe color="bg-primary-red">
        <AboutMe />
      </SectionWipe>

      {/* Instagram Stats Section */}
      <SectionWipe color="bg-primary-yellow">
        <InstagramStats />
      </SectionWipe>

      {/* Parallax Image with Blue tint - Huge height */}
      <SectionWipe color="bg-black">
        <div className="relative border-b-4 border-black">
          <ParallaxImage 
            src={PARALLAX_IMAGES.secondImage} 
            alt="Geometric Shapes"
            height="h-[120vh]"
            className="border-none"
          />
          <div className="absolute inset-0 bg-primary-blue mix-blend-multiply opacity-30 pointer-events-none" />
        </div>
      </SectionWipe>

      {/* Contact CTA Section */}
      <SectionWipe color="bg-primary-red">
        <HomeContactCTA />
      </SectionWipe>
    </>
  );
}
