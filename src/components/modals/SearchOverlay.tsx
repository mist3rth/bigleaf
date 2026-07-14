import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Sparkles, HelpCircle, ArrowRight, Heart, Star, BookOpen } from 'lucide-react';
import { Succulent, SUCCULENTS } from '../../data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  onOpenQuiz: () => void;
  onSelectPlant: (plant: Succulent) => void;
}

export default function SearchOverlay({ isOpen, onClose, onSearch, onOpenQuiz, onSelectPlant }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  
  // Clean up input on close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    } else {
      // Prevent body scroll when search is full screen
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter products based on live query (min 2 chars)
  const filteredResults = query.trim().length < 2 
    ? [] 
    : SUCCULENTS.filter(plant => 
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(query.toLowerCase()) ||
        plant.description.toLowerCase().includes(query.toLowerCase())
      );

  // Hard-coded push products (Coup de coeur)
  const pushProducts = SUCCULENTS.filter(p => p.id === 'echeveria-elegans' || p.id === 'euphorbia-lactea');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onClose();
    }
  };

  const handlePopularTagClick = (tag: string) => {
    setQuery(tag);
    onSearch(tag);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-primary/98 backdrop-blur-xl z-50 overflow-y-auto text-white animate-fade-in" id="search-fullscreen-overlay">
      <div className="min-h-full w-full flex flex-col justify-between">
        
        {/* Top action row */}
      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 md:px-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="font-display font-bold uppercase tracking-normal sm:tracking-widest text-[10px] sm:text-xs truncate">Moteur botanique BigLeaf</span>
        </div>
        <button
          onClick={onClose}
          className="p-3.5 rounded-full bg-white/10 text-white hover:bg-gold hover:text-primary transition-all cursor-pointer flex items-center justify-center border border-white/10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main middle scrollable panel */}
      <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col justify-start">
        
        {/* Giant search box */}
        <form onSubmit={handleSearchSubmit} className="relative w-full mb-8">
          <input
            type="text"
            placeholder="Rechercher une succulente, un cactus, un conseil..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border-b-2 border-white/20 focus:border-gold py-4 sm:py-5 pl-10 sm:pl-12 pr-10 sm:pr-12 text-xl sm:text-2xl md:text-4xl text-white placeholder-white/20 font-display font-light focus:outline-none transition-all"
            autoFocus
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 text-white/30" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              Effacer
            </button>
          )}
        </form>

        {/* Popular Tags Quick Navigation */}
        <div className="flex flex-wrap gap-2 mb-12 items-center">
          <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 mr-2">Recherches fréquentes :</span>
          {['Echeveria', 'Cactus d\'Extérieur', 'Rare', 'Débutant', 'Collier de perles'].map(tag => (
            <button
              key={tag}
              onClick={() => handlePopularTagClick(tag)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-gold hover:text-primary border border-white/5 text-xs font-medium transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Live filtered results if user has typed >= 2 chars */}
        {query.trim().length >= 2 ? (
          <div className="space-y-6 text-left animate-fade-in">
            <h2 className="text-xs uppercase font-mono tracking-widest text-gold border-b border-white/10 pb-2">
              Résultats de recherche ({filteredResults.length})
            </h2>
            
            {filteredResults.length === 0 ? (
              <p className="text-sm text-white/50 italic py-4">
                Aucun résultat correspondant pour "{query}". Essayez un autre mot-clé ou consultez nos suggestions ci-dessous.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
                {filteredResults.map(plant => (
                  <div
                    key={plant.id}
                    onClick={() => {
                      onSelectPlant(plant);
                      onClose();
                    }}
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl cursor-pointer border border-white/5 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border border-white/10">
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-white group-hover:text-gold transition-colors">{plant.name}</h3>
                      <span className="text-xs font-sans font-bold text-gold">{plant.price.toFixed(2)} €</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Pushes & Tips columns when query is empty */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
            
            {/* 1. PUSH PRODUITS (Products Push) */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-gold border-b border-white/10 pb-2 flex items-center gap-2">
                Sélections Vedettes
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pushProducts.map(plant => (
                  <div
                    key={plant.id}
                    onClick={() => {
                      onSelectPlant(plant);
                      onClose();
                    }}
                    className="group bg-white/5 hover:bg-white/10 rounded-2xl p-4 cursor-pointer border border-white/5 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white/10 mb-3">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[8px] bg-gold text-primary font-bold uppercase rounded-full">
                        Best-seller
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-sans font-bold text-sm text-white group-hover:text-gold transition-colors">
                        {plant.name}
                      </h3>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                        <span className="text-xs font-sans font-bold text-white">{plant.price.toFixed(2)} €</span>
                        <span className="text-[9px] uppercase tracking-wider font-mono text-gold group-hover:underline flex items-center gap-1">
                          Acheter <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. CONSEILS (Botanical Tips) */}
            <div className="md:col-span-5 space-y-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-gold border-b border-white/10 pb-2 flex items-center gap-2">
                Conseils d'Atelier
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                    💧 La Règle d'Arrosage d'or
                  </h3>
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                    Toujours laisser le terreau sécher à 100% sur toute la hauteur du pot avant d'arroser à nouveau. L'excès d'eau est le premier ennemi de vos succulentes.
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                    ☀️ Orientation Idéale
                  </h3>
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                    Placez vos succulentes à moins d'un mètre d'une fenêtre exposée à l'Est ou au Sud pour qu'elles gardent leurs magnifiques couleurs compactes.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Bottom CTA block */}
      <div className="max-w-screen-2xl mx-auto w-full px-6 py-8 md:px-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div>
          <h2 className="font-display font-bold text-sm text-white">Besoin d'un diagnostic personnalisé ?</h2>
          <p className="text-xs text-white/50">Trouvez la succulente idéale adaptée à votre exposition et votre rythme de vie.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Direct CTA 1: Open Quiz */}
          <button
            onClick={() => {
              onClose();
              onOpenQuiz();
            }}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-gold text-primary font-sans font-bold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            Lancer le Diagnostic
          </button>

          {/* Direct CTA 2: Scroll to interior collection */}
          <button
            onClick={() => {
              onClose();
              const el = document.getElementById('indoor-collection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Collection d'Intérieur
          </button>
        </div>
      </div>

      </div>
    </div>,
    document.body
  );
}
