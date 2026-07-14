import React, { useState, useMemo } from 'react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { 
  SlidersHorizontal, ArrowUpDown, Check, RotateCcw, 
  MapPin, Sun, Droplet, Star, Heart, ZoomIn, ShoppingCart, ArrowLeft
} from 'lucide-react';
import { Succulent, SUCCULENTS, CATEGORIES } from '../data';

interface ProductListPageProps {
  initialCategory?: string;
  initialCollection?: string | null;
  onAddToCart: (plant: Succulent) => void;
  onOpenProductModal: (plant: Succulent) => void;
  onBack: () => void;
}

export default function ProductListPage() {
  const { navigate, setSelectedPlant, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useUI();
  const { addToCart } = useCart();
  const onBack = () => navigate("home");
  const onAddToCart = (p) => addToCart(p);
  const onOpenProductModal = (p) => { setSelectedPlant(p); navigate("product"); };

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(100); // Max price in data is around 45
  const [selectedLight, setSelectedLight] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);
  // Quick add feedback
  const [addedId, setAddedId] = useState<string | null>(null);

  // Scroll to top of the list page when filters change to avoid viewport jumping or scrolling to the footer
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, selectedCollection, selectedDifficulty, selectedLight]);

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

  // Reset all filters
  const handleReset = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedCollection(null);
    setSelectedDifficulty('all');
    setPriceRange(100);
    setSelectedLight('all');
    setSortBy('relevance');
  };

  // Extract unique light values for the light filter
  const lightOptions = useMemo(() => {
    const lights = new Set<string>();
    SUCCULENTS.forEach(p => {
      if (p.care.light) {
        // Just extract main terms to keep options clean
        if (p.care.light.toLowerCase().includes('indirect')) lights.add('Lumière vive indirecte');
        else if (p.care.light.toLowerCase().includes('direct')) lights.add('Soleil direct');
        else lights.add(p.care.light);
      }
    });
    return Array.from(lights);
  }, []);

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let result = [...SUCCULENTS];

    // Collection Filter
    if (selectedCollection === 'cactus') {
      result = result.filter(p => p.category === 'exterior' || p.name.toLowerCase().includes('cactus') || p.scientificName.toLowerCase().includes('opuntia') || p.scientificName.toLowerCase().includes('euphorbia') || p.scientificName.toLowerCase().includes('ariocarpus'));
    } else if (selectedCollection === 'echeveria') {
      result = result.filter(p => p.name.toLowerCase().includes('echeveria') || p.scientificName.toLowerCase().includes('echeveria'));
    }

    // Category Filter
    if (selectedCategory === 'pets-friendly') {
      result = result.filter(p => p.petFriendly === true);
    } else if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Difficulty Filter
    if (selectedDifficulty !== 'all') {
      result = result.filter(p => p.care.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    // Light Filter
    if (selectedLight !== 'all') {
      result = result.filter(p => p.care.light.toLowerCase().includes(selectedLight.toLowerCase()));
    }

    // Price Filter
    result = result.filter(p => p.price <= priceRange);

    // Search Filter
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, selectedCollection, selectedDifficulty, selectedLight, priceRange, search, sortBy]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedCollection) count++;
    if (selectedDifficulty !== 'all') count++;
    if (selectedLight !== 'all') count++;
    if (priceRange < 100) count++;
    if (search !== '') count++;
    return count;
  }, [selectedCategory, selectedCollection, selectedDifficulty, selectedLight, priceRange, search]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 text-primary animate-fade-in" id="product-list-page">
      
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-primary/10">
        <div>
          <button aria-label="Retour" 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-primary/70 hover:text-accent transition-colors mb-3 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>
          <h1 className="font-display font-black text-2xl min-[380px]:text-[26px] md:text-4xl tracking-tight uppercase">
            Notre Collection<span className="text-accent">.</span>
          </h1>
          <p className="text-xs text-primary/70 font-mono tracking-widest uppercase mt-1">
            {processedProducts.length} {processedProducts.length > 1 ? 'plantes trouvées' : 'plante trouvée'}
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-mono text-primary/70 uppercase whitespace-nowrap flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" /> Trier par :
          </span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary/60 hover:bg-secondary/80 text-xs font-bold uppercase tracking-wider text-primary px-4 py-2.5 rounded-full border border-primary/5 cursor-pointer outline-none transition-colors"
          >
            <option value="relevance">Recommandé</option>
            <option value="price-asc">Prix : croissant</option>
            <option value="price-desc">Prix : décroissant</option>
            <option value="rating">Mieux notées</option>
            <option value="name">Nom alphabétique</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filters Panel (Width: 3/12 on Desktop) */}
        <aside className="lg:col-span-3 bg-secondary/20 rounded-2xl border border-primary/5 p-6 space-y-8 sticky top-28 text-left">
          
          {/* Header of Filter Box */}
          <div className="flex items-center justify-between pb-4 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span className="font-display font-bold uppercase text-sm tracking-wider">Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <button aria-label="Bouton d'action" 
                onClick={handleReset}
                className="text-[11px] font-bold text-accent hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Réinitialiser
              </button>
            )}
          </div>



          {/* Categories Option list */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono tracking-widest text-primary/70 uppercase block">Catégorie</label>
            <div className="flex flex-col gap-1.5">
              <button aria-label="Bouton d'action"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCollection(null);
                }}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedCategory === 'all' && !selectedCollection
                    ? 'bg-primary text-white' 
                    : 'bg-white hover:bg-secondary text-primary/80 border border-primary/5'
                }`}
              >
                <span>Toutes nos plantes</span>
                {selectedCategory === 'all' && !selectedCollection && <Check className="w-3.5 h-3.5" />}
              </button>
              {CATEGORIES.filter(cat => cat.id !== 'all').map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button aria-label="Bouton d'action"
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedCollection(null);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'bg-white hover:bg-secondary text-primary/80 border border-primary/5'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isActive && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Level Option */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono tracking-widest text-primary/70 uppercase block">Difficulté d'entretien</label>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'facile', 'modéré', 'expert'].map((diff) => {
                const isActive = selectedDifficulty === diff;
                return (
                  <button aria-label="Bouton d'action"
                    key={diff}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedDifficulty(diff);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                      isActive 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white border-primary/10 text-primary/70 hover:bg-white'
                    }`}
                  >
                    {diff === 'all' ? 'Tous' : diff}
                  </button>
                );
              })}
            </div>
          </div>




        </aside>

        {/* Right Product Grid (Width: 9/12 on Desktop) */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Active Badges Panel */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 py-2 text-left">
              <span className="text-[10px] font-mono tracking-wider text-primary/70 uppercase">Filtres actifs :</span>
              {selectedCategory !== 'all' && (
                <span className="bg-secondary text-primary border border-primary/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                  Catégorie : {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                  <button aria-label="Bouton d'action" onClick={() => setSelectedCategory('all')} className="hover:text-accent font-black">×</button>
                </span>
              )}
              {selectedCollection && (
                <span className="bg-accent/15 text-accent border border-accent/20 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                  Collection : {
                    selectedCollection === 'pets-friendly' ? 'Plantes saines & Pet-Friendly' :
                    selectedCollection === 'cactus' ? 'Cactus Graphiques Rares' : 'Echeveria & Rosettes'
                  }
                  <button aria-label="Bouton d'action" onClick={() => setSelectedCollection(null)} className="hover:text-accent font-black">×</button>
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="bg-secondary text-primary border border-primary/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                  Entretien : {selectedDifficulty}
                  <button aria-label="Bouton d'action" onClick={() => setSelectedDifficulty('all')} className="hover:text-accent font-black">×</button>
                </span>
              )}
              {selectedLight !== 'all' && (
                <span className="bg-secondary text-primary border border-primary/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                  Exposition : {selectedLight}
                  <button aria-label="Bouton d'action" onClick={() => setSelectedLight('all')} className="hover:text-accent font-black">×</button>
                </span>
              )}
              {priceRange < 100 && (
                <span className="bg-secondary text-primary border border-primary/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                  Max : {priceRange} €
                  <button aria-label="Bouton d'action" onClick={() => setPriceRange(100)} className="hover:text-accent font-black">×</button>
                </span>
              )}
              {search !== '' && (
                <span className="bg-secondary text-primary border border-primary/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                  Recherche : "{search}"
                  <button aria-label="Bouton d'action" onClick={() => setSearch('')} className="hover:text-accent font-black">×</button>
                </span>
              )}
            </div>
          )}

          {/* Grid of Product Cards */}
          {processedProducts.length === 0 ? (
            <div className="py-24 text-center bg-secondary/10 rounded-2xl border border-primary/5 shadow-inner">
              <RotateCcw className="w-12 h-12 text-primary/70 mx-auto mb-4 animate-spin-slow" />
              <p className="font-display text-xl font-bold text-primary/75 uppercase">Aucun résultat botanique</p>
              <p className="text-sm text-primary/70 mt-2 max-w-sm mx-auto">
                Vos critères de sélection sont très spécifiques. Nous vous suggérons d'élargir votre budget ou d'enlever un critère de filtre.
              </p>
              <button aria-label="Bouton d'action" 
                onClick={handleReset}
                className="mt-6 bg-primary hover:bg-accent text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {processedProducts.map((plant) => {
                const isFavorite = favorites.includes(plant.id);
                const isJustAdded = addedId === plant.id;

                return (
                  <div
                    key={plant.id}
                    onClick={() => onOpenProductModal(plant)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-2xl border border-primary/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer text-left"
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

                        <h2 className="font-sans font-bold text-lg text-primary mt-1 leading-tight group-hover:text-accent transition-colors">
                          {plant.name}
                        </h2>
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

      </div>

    </div>
  );
}
