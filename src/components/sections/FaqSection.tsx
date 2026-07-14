import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto" id="faq">
      
      {/* Title block */}
      <div className="text-center mb-12">
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-primary uppercase leading-tight">
          Questions Fréquentes<span className="text-accent">.</span>
        </h2>
        <p className="text-xs text-primary/50 font-mono tracking-widest uppercase mt-3 flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-accent" />
          Besoin d'aide ?
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4 text-left">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="bg-secondary/40 border border-primary/10 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 focus:outline-none cursor-pointer group"
              >
                <span className="font-display font-bold text-base md:text-lg text-primary uppercase group-hover:text-accent transition-colors leading-tight">
                  {faq.question}
                </span>
                
                {/* Circular Plus/Minus icon matching image style */}
                <div className={`p-2 rounded-full border border-primary/10 transition-all duration-300 ${
                  isOpen ? 'bg-accent text-white rotate-180' : 'bg-white text-primary'
                }`}>
                  {isOpen ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Collapsible Answer block with transition */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isOpen ? 'max-h-60 opacity-100 border-t border-primary/5' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 md:p-8 bg-white/50 text-sm md:text-base text-primary/80 font-sans leading-relaxed">
                  {faq.answer}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
