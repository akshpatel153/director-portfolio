
import { Accordion } from '../ui/Accordion';

export function FAQ() {
  const faqItems = [
    {
      title: "Why so brutalist?",
      content: "Because the web has become a sea of soft gradients and indistinct borders. We believe in taking a strong, unapologetic stance. Sharp corners, hard shadows, and pure colors communicate confidence and clarity."
    },
    {
      title: "Can I use secondary colors?",
      content: "Absolutely not. The Bauhaus palette is restricted to pure Red, Blue, and Yellow, along with Black and White. By limiting your options, you are forced to make more deliberate design decisions."
    },
    {
      title: "Is this fully responsive?",
      content: "Yes. While the desktop experience feels like a massive poster, typography scales dynamically down to mobile devices, and layouts collapse into single, powerful columns."
    }
  ];

  return (
    <section className="w-full bg-primary-yellow py-24 px-6 md:px-12 border-b-4 border-black" id="faq">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center border-b-4 border-black pb-4 inline-block">
          Questions
        </h2>
        
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
