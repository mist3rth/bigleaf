import React, { useState } from 'react';
import { Heart, ZoomIn, Star, MapPin, Sun, Droplet, ShoppingCart } from 'lucide-react';
import { Succulent } from '../data';
import { Badge } from './Badge';

interface ProductCardProps {
  plant: Succulent;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
  onOpenModal: (plant: Succulent) => void;
  onQuickAdd: (plant: Succulent, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  plant,
  isFavorite = false,
  onToggleFavorite,
  onOpenModal,
  onQuickAdd,
}) => {
  const [isJustAdded, setIsJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsJustAdded(true);
    onQuickAdd(plant, e);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1500);
  };

  return (
    <div
      onClick={() => onOpenModal(plant)}
      className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-2xl border border-primary/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer text-left"
    >
      {/* Product Image Panel */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />

        {/* Badges / Overlay UI */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <Badge variant="default">{plant.care.difficulty}</Badge>
          {plant.rating === 5 && (
            <Badge variant="gold">Coup de cœur</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        {onToggleFavorite && (
          <button aria-label="Bouton d'action"
            onClick={(e) => onToggleFavorite(plant.id, e)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-primary hover:text-red-500 shadow-md transition-all cursor-pointer"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        )}

        {/* Zoom Hint */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-4 py-2 bg-white/95 text-primary rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
            <ZoomIn className="w-3.5 h-3.5" />
            Voir détails
          </span>
        </div>
      </div>

      {/* Content / Info Area */}
      <div className="p-5 flex-grow flex flex-col justify-between">
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
              <span className="font-medium text-primary/90 whitespace-nowrap">Origine :</span>
              <span className="text-primary/70 line-clamp-1">{plant.origin}</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary/80">
              <Sun className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span className="font-medium text-primary/90 whitespace-nowrap">Lumière :</span>
              <span className="text-primary/70 line-clamp-1">{plant.care.light}</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary/80">
              <Droplet className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span className="font-medium text-primary/90 whitespace-nowrap">Eau :</span>
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

          <button
            onClick={handleQuickAdd}
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
};
