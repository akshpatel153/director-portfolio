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
          {/* Background Marquees */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-8 py-12 pointer-events-none opacity-20 scale-110 -rotate-3 origin-center">
            <Marquee text="CAPTURE" speed={0.8} direction="left" textClassName="text-8xl md:text-[14rem] font-black uppercase tracking-tighter text-black leading-none" />
            <Marquee text="MOTION" speed={1.2} direction="right" textClassName="text-8xl md:text-[14rem] font-black uppercase tracking-tighter text-black outline-text-black text-transparent leading-none" />
            <Marquee text="CUT" speed={0.5} direction="left" textClassName="text-8xl md:text-[14rem] font-black uppercase tracking-tighter text-black leading-none" />
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-32 z-10 relative">
            {/* Massive Title */}
            <motion.div 
              className="mb-24 flex justify-center w-full"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none text-center flex flex-col items-center -space-y-4 md:-space-y-8">
                {PHILOSOPHY_CONTENT.title.split('\n').map((line, i) => {
                  // Map the 3 lines to solid brutalist background blocks
                  const bgColors = ['bg-primary-red', 'bg-primary-blue', 'bg-primary-yellow'];
                  const rotations = ['-rotate-3', 'rotate-2', '-rotate-2'];
                  const margins = ['ml-0', 'ml-12 md:ml-32', '-ml-8 md:-ml-16'];
                  const bgClass = bgColors[i % bgColors.length];
                  
                  return (
                    <div 
                      key={i} 
                      className={`relative z-${30 - i * 10} ${rotations[i]} ${margins[i]} group`}
                    >
                      <span 
                        className={`block text-black ${bgClass} border-[6px] border-black shadow-[12px_12px_0px_0px_#000] px-8 py-2 md:py-4 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-[20px_20px_0px_0px_#000] transition-all duration-300`}
                      >
                        {line}
                      </span>
                    </div>
                  );
                })}
              </h2>
            </motion.div>
            
            {/* Staggered Brutalist Paragraph Cards */}
            <div className="flex flex-col md:flex-row gap-8 items-end justify-center w-full">
              <motion.div 
                className="w-full md:w-5/12 text-xl md:text-2xl font-bold p-8 md:p-10 bg-black text-white border-4 border-black shadow-[12px_12px_0px_0px_theme(colors.primary-red)] hover:shadow-[16px_16px_0px_0px_theme(colors.primary-blue)] hover:-translate-y-2 transition-all duration-300 -rotate-2 hover:rotate-0"
                initial={{ opacity: 0, x: -100, rotate: -10 }}
                whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="leading-relaxed">
                  {PHILOSOPHY_CONTENT.paragraph1}
                </p>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-5/12 text-xl md:text-2xl font-bold p-8 md:p-10 bg-white text-black border-4 border-black shadow-[12px_12px_0px_0px_black] hover:bg-primary-red hover:text-white hover:shadow-[16px_16px_0px_0px_black] hover:-translate-y-2 transition-all duration-300 rotate-2 hover:rotate-0 md:mb-16"
                initial={{ opacity: 0, x: 100, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="leading-relaxed">
                  {PHILOSOPHY_CONTENT.paragraph2}
                </p>
              </motion.div>
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
