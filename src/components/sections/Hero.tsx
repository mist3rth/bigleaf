import { ArrowDown, ChevronRight, Leaf, Gift } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import heroBg from '../../hero2.webp';
import tablierImg from '../../tablier.webp';
import { useState, useEffect } from 'react';

interface HeroProps {
  onDiscoverClick: () => void;
}

export default function Hero() {
  const { navigate } = useUI();
  const onDiscoverClick = () => navigate("shop");
  
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-3 sm:px-4 md:px-8 max-w-screen-2xl mx-auto text-white overflow-hidden rounded-3xl mt-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 30, 18, 0.4) 0%, rgba(10, 30, 18, 0.9) 100%), url("${heroBg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      id="hero-section"
    >
      {/* Decorative leaf floating background element */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col justify-center items-start text-left mt-12 md:mt-16 px-4 max-w-4xl -translate-y-[60px] md:-translate-y-[120px]">
        
        {/* Gigantic stylized title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white leading-[1.1] md:leading-[1.0] mb-6 select-none drop-shadow-lg lowercase">
          La nature cultivée pour <span className="font-serif italic font-normal text-gold normal-case">vous</span><span className="text-gold">.</span>
        </h1>

        {/* Editorial description paragraph */}
        <p className="max-w-xl text-sm sm:text-base md:text-lg text-white/90 font-sans leading-relaxed tracking-wide font-light">
          Sublimez votre espace avec notre collection exclusive de plantes grasses d'exception, cactus architecturaux et succulentes d'intérieur. Cultivés avec passion et expédiés avec le plus grand soin directement chez vous.
        </p>

        {/* 2 visible CTAs in the Hero */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md justify-start">
          <a
            href="#collection-grid"
            className="group px-8 py-4 bg-white text-primary rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-gold hover:text-primary shadow-lg flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
            id="hero-cta-shop"
          >
            <span className="whitespace-nowrap">Visiter le Shop</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#indoor-collection"
            className="group px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-white flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
            id="hero-cta-indoor"
          >
            <span className="whitespace-nowrap">Collection d'Intérieur</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Bottom Indicator & CTA Row */}
      <div 
        className="flex flex-col md:flex-row items-stretch justify-between gap-6 pt-12 border-t border-white/10 mt-12 w-full perspective-1000 transition-transform duration-[50ms] ease-linear"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        
        {/* Left Side: Monthly Contest Teaser Glass Capsule Panel */}
        <a 
          href="#monthly-contest"
          className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 rounded-2xl p-4 max-w-sm w-full md:w-1/2 hover:bg-white/10 transition-all group text-left"
        >
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
            <img 
              src={tablierImg} 
              alt="Tablier BigLeaf" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Gift className="w-5 h-5 text-white animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col text-left flex-grow">
            <span className="font-display font-extrabold text-xl leading-none text-white flex items-center gap-2 min-w-[44px] min-h-[44px] group-hover:text-gold transition-colors">
              Jeu Concours
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </span>
            <span className="text-xs text-white/70 mt-1.5 leading-normal font-sans font-light">
              Gagnez le Tablier BigLeaf. Tirage au sort automatique chaque mois pour toute commande passée.
            </span>
          </div>
        </a>

        {/* Right Side: "100+ Plants" Glass Capsule Panel */}
        <div 
          className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 max-w-sm w-full md:w-1/2 text-left transition-all"
        >
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=150&q=80" 
              alt="Plante grasse d'exception" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
          </div>
          <div className="flex flex-col text-left flex-grow">
            <span className="font-display font-extrabold text-xl leading-none text-white flex items-center gap-1.5">
              100+ Espèces
            </span>
            <span className="text-xs text-white/70 mt-1.5 leading-normal font-sans font-light">
              Des variétés de plantes grasses, cactus et succulentes sélectionnées pour leur robustesse et leur géométrie parfaite.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
