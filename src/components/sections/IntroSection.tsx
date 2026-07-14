import { ArrowUpRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data';
import geluleImg from '../../../assets/gelule.webp';

interface IntroSectionProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  onGoTeam?: () => void;
  onExploreAll: () => void;
}

export default function IntroSection() {
  const { navigate } = useUI();
  const selectedCategory = "all";
  const onSelectCategory = (c) => navigate("shop");
  const onExploreAll = () => navigate("shop");

  return (
    <section className="pt-16 pb-4 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto text-primary" id="boutique">
      
      {/* Editorial Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 md:mb-16">
        
        {/* Left Column: Title & Subtitle */}
        <div className="lg:col-span-4 text-left">
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-primary leading-tight uppercase">
            Le Vert pour <br className="hidden md:block" />
            Chacun<span className="text-accent">.</span>
          </h2>
          <p className="text-xs text-primary/60 font-mono tracking-widest uppercase mt-4">
            Notre philosophie botanique
          </p>
        </div>

        {/* Center Column: Capsule Horizontal Photo Pill */}
        <div className="lg:col-span-4 flex justify-center">
          <button 
            onClick={() => navigate('team')}
            className="relative w-full max-w-sm h-32 md:h-36 rounded-full overflow-hidden group shadow-premium border border-primary/5 cursor-pointer text-left focus:outline-none"
            title="Découvrir l'équipe"
          >
            <img 
              src={geluleImg} 
              alt="Rosette d'Echeveria en gros plan" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Dark Overlay & Action Icon */}
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-primary p-2.5 rounded-full shadow-lg group-hover:bg-gold group-hover:scale-105 transition-all">
               <ArrowUpRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Right Column: Horticultural description text */}
        <div className="lg:col-span-4 text-left">
          <p className="text-sm md:text-base text-primary/80 font-sans leading-relaxed">
            Chaque plante et succulente bénéficie de l'attention absolue et des soins experts de nos horticulteurs passionnés. Nous préparons un substrat drainant spécifique et acclimations chaque spécimen pour qu'il arrive chez vous aussi <strong className="text-accent font-semibold">robuste, sain et éclatant</strong> que possible.
          </p>
        </div>

      </div>



    </section>
  );
}
