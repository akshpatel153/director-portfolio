import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className={cn(
      "border-4 border-black mb-4 transition-colors duration-300",
      isOpen ? "shadow-none" : "shadow-small"
    )}>
      <button
        onClick={onClick}
        className={cn(
          "w-full px-6 py-4 flex justify-between items-center text-left transition-colors duration-300",
          isOpen ? "bg-primary-red text-white" : "bg-white text-black hover:bg-gray-50"
        )}
      >
        <span className="font-bold uppercase tracking-wider text-lg">{title}</span>
        <ChevronDown 
          className={cn(
            "w-6 h-6 transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out bg-[#FFF9C4]", // Light yellow content area
          isOpen ? "max-h-96 border-t-4 border-black" : "max-h-0"
        )}
      >
        <div className="p-6 text-black font-medium text-lg leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { title: string; content: string }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
