import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Star, Heart, ZoomIn, ShoppingBag, MapPin, Sun, Droplet } from 'lucide-react';
import { Succulent, SUCCULENTS, CATEGORIES } from '../../data';

interface NewPlantsProps {
  selectedCategory: string;
  searchQuery: string;
  onAddToCart: (plant: Succulent) => void;
  onOpenProductModal: (plant: Succulent) => void;
}

export default function NewPlants() {
  const { navigate, setSelectedPlant, setSelectedCategory } = useUI();
  const { addToCart } = useCart();
  const [localCategory, setLocalCategory] = useState('interior');
  const searchQuery = "";
  const onAddToCart = (p) => addToCart(p);
  const onOpenProductModal = (p) => { setSelectedPlant(p); navigate("product"); };

  // Simple favorites state
  const [favorites, setFavorites] = useState<string[]>([]);
  // Quick add toast feedback state
  const [addedId, setAddedId] = useState<string | null>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleQuickAdd = (plant: Succulent, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(plant);
    setAddedId(plant.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  // Filter products based on search and category
  const filteredProducts = SUCCULENTS.filter((plant) => {
    const matchesCategory = localCategory === 'all' || plant.category === localCategory;
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 px-4 md:px-8 max-w-screen-2xl mx-auto text-primary bg-secondary/30 rounded-3xl" id="collection-grid">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left">
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-primary leading-none uppercase">
            Nos pépites<span className="text-accent">.</span>
          </h2>
          <p className="text-xs text-primary/70 font-mono tracking-widest uppercase mt-3">
            Sélection fraîche de la semaine
          </p>
        </div>
        <div className="max-w-md text-left md:text-right">
          <p className="text-sm text-primary/70 font-sans leading-relaxed">
            Cultivées à l'état naturel, nos succulentes arborent des couleurs éclatantes et des structures régulières prêtes à magnifier votre intérieur. Profitez de notre garantie fraîcheur de 30 jours.
          </p>
        </div>
      </div>

      {/* Categories Filter Pills */}
      <div className="mb-10 pb-6 border-b border-primary/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* List of categories */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.filter(cat => cat.id !== 'all').map((cat) => {
              const isActive = localCategory === cat.id;
              return (
                <button aria-label="Bouton d'action"
                  key={cat.id}
                  onClick={() => setLocalCategory(isActive ? 'all' : cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white shadow-md scale-102' 
                      : 'bg-white/50 text-primary hover:bg-white border border-primary/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <button aria-label="Bouton d'action" 
            onClick={() => {
              setSelectedCategory(localCategory);
              navigate("shop");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold uppercase tracking-wider text-accent border-b border-accent hover:text-primary hover:border-primary transition-all cursor-pointer"
          >
            Tout explorer &rarr;
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-primary/5 shadow-inner">
          <ShoppingBag className="w-12 h-12 text-primary/70 mx-auto mb-4" />
          <p className="font-display text-lg font-bold text-primary/70">Aucune succulente ne correspond à votre recherche</p>
          <p className="text-sm text-primary/70 mt-1">Essayez un autre mot-clé ou changez de catégorie filtre.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.slice(0, 4).map((plant) => {
            const isFavorite = favorites.includes(plant.id);
            const isJustAdded = addedId === plant.id;

            return (
              <div
                key={plant.id}
                onClick={() => onOpenProductModal(plant)}
                className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-2xl border border-primary/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                {/* Product Image Panel */}
                <div className="relative aspect-square overflow-hidden bg-secondary/50">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges / Overlay UI */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider bg-primary text-white rounded-full">
                      {plant.care.difficulty}
                    </span>
                    {plant.rating === 5 && (
                      <span className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider bg-gold text-primary rounded-full">
                        Coup de cœur
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button aria-label="Bouton d'action"
                    onClick={(e) => toggleFavorite(plant.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-primary hover:text-red-500 shadow-md transition-all cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Zoom Hint */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/95 text-primary rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                      Voir détails
                    </span>
                  </div>
                </div>

                {/* Content / Info Area */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left">
                  <div>
                    {/* Rating & Reviews */}
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex text-gold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-[11px] font-bold text-primary">{plant.rating}</span>
                      <span className="text-[10px] text-primary/70">({plant.reviewsCount})</span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-primary mt-1 leading-tight group-hover:text-accent transition-colors">
                      {plant.name}
                    </h3>
                    <p className="text-xs text-primary/70 font-sans mt-2 line-clamp-2 leading-relaxed">
                      {plant.description}
                    </p>

                    {/* Care Details & Origin */}
                    <div className="mt-4 pt-3.5 border-t border-primary/5 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 text-primary/80">
                        <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span className="font-medium text-primary/90">Origine :</span>
                        <span className="text-primary/70 line-clamp-1">{plant.origin}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary/80">
                        <Sun className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span className="font-medium text-primary/90">Lumière :</span>
                        <span className="text-primary/70 line-clamp-1">{plant.care.light}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary/80">
                        <Droplet className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span className="font-medium text-primary/90">Eau :</span>
                        <span className="text-primary/70 line-clamp-1">{plant.care.water}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-primary/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-primary/70">Tarif unique</span>
                      <span className="font-sans font-extrabold text-lg text-primary">
                        {plant.price.toFixed(2)} €
                      </span>
                    </div>

                    {/* Dynamic add button to match the dark circular button with arrow/plus */}
                    <button aria-label="Bouton d'action"
                      onClick={(e) => handleQuickAdd(plant, e)}
                      className={`relative p-3.5 rounded-full transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer ${
                        isJustAdded
                          ? 'bg-gold text-primary rotate-360 scale-110'
                          : 'bg-primary text-white hover:bg-accent'
                      }`}
                      aria-label="Ajouter au panier"
                    >
                      {isJustAdded ? (
                        <span className="text-xs font-bold">✓</span>
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
