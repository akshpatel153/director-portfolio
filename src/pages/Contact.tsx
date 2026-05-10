import { PageTransition } from '../components/layout/PageTransition';
import { CTA } from '../components/sections/CTA';
import { Button } from '../components/ui/Button';
import { playClickSound } from '../lib/sounds';

export function Contact() {
  return (
    <PageTransition>
      <CTA />
      
      {/* Brutalist Contact Form */}
      <section className="w-full bg-background py-24 px-6 md:px-12 border-b-4 border-black">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
          
          <div className="flex-1">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 border-l-8 border-primary-blue pl-6">
              Drop <br /> A Line
            </h3>
            <p className="text-xl font-medium mb-12 leading-relaxed border-l-4 border-black pl-4">
              Whether it's a new project, a collaboration, or just to say hi. Let's make something constructivist.
            </p>
            
            <div className="space-y-4 font-bold uppercase tracking-widest text-sm">
              <p className="border-b-2 border-black pb-2">Email: <span className="text-primary-red">patelaksh1503@gmail.com</span></p>
              <p className="border-b-2 border-black pb-2">Instagram: <a href="https://www.instagram.com/aksh.ae_" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-primary-blue hover:underline">@aksh.ae_</a></p>
              <p className="border-b-2 border-black pb-2">YouTube: <a href="https://www.youtube.com/@HimymBeats/featured" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-primary-yellow hover:underline">@HimymBeats</a></p>
              <p className="border-b-2 border-black pb-2">LinkedIn: <a href="https://www.linkedin.com/in/aksh-patel-cs/" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-primary-blue hover:underline">Aksh Patel</a></p>
            </div>
          </div>

          <form 
            className="flex-1 space-y-6" 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message Received. Directore will be in touch shortly.");
            }}
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold uppercase tracking-widest text-sm mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="border-4 border-black p-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-primary-yellow focus:border-black transition-all shadow-[4px_4px_0px_0px_black] bg-white"
                placeholder="YOUR NAME"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold uppercase tracking-widest text-sm mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="border-4 border-black p-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-primary-blue focus:border-black transition-all shadow-[4px_4px_0px_0px_black] bg-white"
                placeholder="EMAIL@ADDRESS.COM"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="message" className="font-bold uppercase tracking-widest text-sm mb-2">Message</label>
              <textarea 
                id="message" 
                rows={5}
                required
                className="border-4 border-black p-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-primary-red focus:border-black transition-all shadow-[4px_4px_0px_0px_black] resize-none bg-white"
                placeholder="TELL ME ABOUT THE PROJECT..."
              ></textarea>
            </div>
            
            <Button variant="primary" className="w-full text-xl py-6 mt-4">
              Send Message
            </Button>
          </form>

        </div>
      </section>
    </PageTransition>
  );
}
