import React, { useState, useEffect } from 'react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, ArrowLeft, Star, Sun, Droplets, Thermometer, ShieldCheck, CornerDownRight, Plus, Eye, PawPrint } from 'lucide-react';
import { Succulent, SUCCULENTS } from '../data';

interface ProductDetailPageProps {
  plant: Succulent;
  onClose: () => void;
  onAddToCart: (plant: Succulent) => void;
  onSelectPlant: (plant: Succulent) => void;
}

export default function ProductDetailPage() {
  const { selectedPlant: plant, navigate, setSelectedPlant } = useUI();
  const { addToCart } = useCart();
  const onClose = () => navigate("shop");
  const onAddToCart = (p) => { addToCart(p); };
  const onSelectPlant = (p) => setSelectedPlant(p);
  if (!plant) return null;

  const [favorites, setFavorites] = useState<string[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'care' | 'details' | 'story'>('care');

  // Scroll to top when plant changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [plant]);



  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleAdd = () => {
    onAddToCart(plant);
    setAddedId(plant.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const handleQuickAddCrossSell = (item: Succulent | { id: string; name: string; price: number; image: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if it's a accessory or succulent
    if ('scientificName' in item) {
      onAddToCart(item as Succulent);
    } else {
      // It's an accessory, create a partial succulent-like object to fit our cart state
      const mockPlant: Succulent = {
        id: item.id,
        name: item.name,
        scientificName: 'Accessoire de soin',
        price: item.price,
        rating: 5.0,
        reviewsCount: 12,
        category: 'easy',
        categoryLabel: 'Accessoires',
        image: item.image,
        description: 'Accessoire de culture de haute qualité pour vos plantes grasses d\'exception.',
        care: {
          light: 'N/A',
          water: 'N/A',
          temperature: 'N/A',
          difficulty: 'Facile'
        },
        size: 'N/A',
        origin: 'France',
        petFriendly: true
      };
      onAddToCart(mockPlant);
    }

    setAddedId(item.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  // Find 4 companion plants for cross-sell (different from current)
  const companionPlants = SUCCULENTS
    .filter((p) => p.id !== plant.id)
    .slice(0, 4);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 animate-fade-in text-primary" id="product-detail-page">
      
      {/* Back navigation & breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <button aria-label="Bouton d'action"
          onClick={onClose}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Retour au Catalogue
        </button>
        <div className="text-[11px] font-mono uppercase tracking-widest text-primary/70 hidden sm:block">
          BigLeaf &gt; {plant.categoryLabel} &gt; <span className="text-primary font-bold">{plant.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Zoomable Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            className="relative aspect-square rounded-3xl overflow-hidden bg-secondary border border-primary/5 shadow-premium"
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />


            {/* Float badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1.5 text-[10px] uppercase font-extrabold tracking-widest bg-primary text-white rounded-full shadow-md">
                Difficulté: {plant.care.difficulty}
              </span>
              {plant.rating === 5 && (
                <span className="px-3 py-1.5 text-[10px] uppercase font-extrabold tracking-widest bg-gold text-primary rounded-full shadow-md">
                  Sélection d'Exception
                </span>
              )}
            </div>

            {/* Favorite button */}
            <button aria-label="Bouton d'action"
              onClick={() => toggleFavorite(plant.id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white text-primary shadow-lg hover:text-red-500 transition-all cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(plant.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Quick Quality Promises under image */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary/40 rounded-2xl p-3.5 text-center border border-primary/5">
              <ShieldCheck className="w-5 h-5 mx-auto text-accent mb-1.5" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Garantie 30J</p>
              <p className="text-[9px] text-primary/70 mt-0.5">Remplacement gratuit</p>
            </div>
            <div className="bg-secondary/40 rounded-2xl p-3.5 text-center border border-primary/5">
              <Droplets className="w-5 h-5 mx-auto text-accent mb-1.5" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Substrat Pro</p>
              <p className="text-[9px] text-primary/70 mt-0.5">Rempoté par nos soins</p>
            </div>
            <div className="bg-secondary/40 rounded-2xl p-3.5 text-center border border-primary/5">
              <Thermometer className="w-5 h-5 mx-auto text-accent mb-1.5" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Isotherme</p>
              <p className="text-[9px] text-primary/70 mt-0.5">Envoi sécurisé hiver</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Information & Purchase & Tabs */}
        <div className="lg:col-span-6 text-left space-y-6">
          
          {/* Header information */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                {plant.scientificName}
              </span>
            </div>
            <h1 className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-primary leading-tight">
              {plant.name}
            </h1>
            
            {/* Rating and price row */}
            <div className="flex items-center justify-between mt-4 pb-5 border-b border-primary/5">
              <div className="flex items-center gap-2">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(plant.rating) ? 'fill-current text-gold' : 'text-primary/70'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold">{plant.rating} / 5</span>
                <span className="text-xs text-primary/70">({plant.reviewsCount} avis vérifiés)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-primary/70 block">Prix à l'unité</span>
                <span className="font-sans font-extrabold text-3xl text-primary">
                  {plant.price.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>

          {/* Editorial description */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary/70">Description horticole</h2>
            <p className="text-sm text-primary/80 leading-relaxed font-sans font-light">
              {plant.description}
            </p>
          </div>

          {/* Quick facts list */}
          <div className="grid grid-cols-3 gap-4 bg-secondary/30 rounded-2xl p-4.5 border border-primary/5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-primary/70 block font-mono">Taille</span>
              <span className="text-xs font-bold text-primary">{plant.size}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-primary/70 block font-mono">Origine</span>
              <span className="text-xs font-bold text-primary">{plant.origin}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-primary/70 block font-mono flex items-center gap-1">
                <PawPrint className="w-3 h-3 text-primary/70 inline" /> Animaux
              </span>
              <span className={`text-[11px] font-bold ${plant.petFriendly ? 'text-emerald-600' : 'text-rose-500'}`}>
                {plant.petFriendly ? 'Non-toxique' : 'Toxique'}
              </span>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="pt-2">
            <button aria-label="Bouton d'action"
              onClick={handleAdd}
              className={`w-full group px-8 py-5 rounded-full font-sans font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 cursor-pointer ${
                addedId === plant.id
                  ? 'bg-gold text-primary'
                  : 'bg-primary text-white hover:bg-accent'
              }`}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <span>
                {addedId === plant.id ? '✓ Succulente Ajoutée' : 'Ajouter à ma collection'}
              </span>
            </button>
            <p className="text-[10px] text-center text-primary/70 mt-3 font-sans">
              Livraison offerte en Point Relais dès 50 € d'achats • Emballage thermique breveté
            </p>
          </div>

          {/* Dynamic Accompanying Care & Botanical Tabs (Contenu d'accompagnement) */}
          <div className="border border-primary/10 rounded-2xl overflow-hidden mt-8 bg-white">
            <div className="flex border-b border-primary/10">
              <button aria-label="Bouton d'action"
                onClick={() => setActiveTab('care')}
                className={`flex-1 py-3.5 text-xs uppercase font-extrabold tracking-widest font-mono border-r border-primary/10 transition-colors cursor-pointer ${
                  activeTab === 'care' ? 'bg-secondary text-accent font-bold' : 'text-primary/70 hover:bg-secondary/40'
                }`}
              >
                Entretien
              </button>
              <button aria-label="Bouton d'action"
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-3.5 text-xs uppercase font-extrabold tracking-widest font-mono border-r border-primary/10 transition-colors cursor-pointer ${
                  activeTab === 'details' ? 'bg-secondary text-accent font-bold' : 'text-primary/70 hover:bg-secondary/40'
                }`}
              >
                Fiche Technique
              </button>
              <button aria-label="Bouton d'action"
                onClick={() => setActiveTab('story')}
                className={`flex-1 py-3.5 text-xs uppercase font-extrabold tracking-widest font-mono transition-colors cursor-pointer ${
                  activeTab === 'story' ? 'bg-secondary text-accent font-bold' : 'text-primary/70 hover:bg-secondary/40'
                }`}
              >
                Nos Conseils
              </button>
            </div>

            <div className="p-5 text-left">
              {activeTab === 'care' && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-full bg-accent/10 text-accent">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xs font-extrabold uppercase tracking-widest text-primary">Lumière & Exposition</h2>
                      <p className="text-xs text-primary/70 mt-1 leading-relaxed">{plant.care.light}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-full bg-accent/10 text-accent">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xs font-extrabold uppercase tracking-widest text-primary">Fréquence d'Arrosage</h2>
                      <p className="text-xs text-primary/70 mt-1 leading-relaxed">{plant.care.water}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-full bg-accent/10 text-accent">
                      <Thermometer className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xs font-extrabold uppercase tracking-widest text-primary">Climat & Températures</h2>
                      <p className="text-xs text-primary/70 mt-1 leading-relaxed">{plant.care.temperature}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-primary/70 uppercase font-mono tracking-wider">Classification</span>
                    <span className="font-bold text-primary">Plante succulente</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-primary/70 uppercase font-mono tracking-wider">Nom botanique</span>
                    <span className="font-bold text-primary italic">{plant.scientificName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-primary/70 uppercase font-mono tracking-wider">Substrat conseillé</span>
                    <span className="font-bold text-primary">30% terreau premium, 40% pouzzolane, 30% sable</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-primary/5">
                    <span className="text-primary/70 uppercase font-mono tracking-wider">Toxicité animaux</span>
                    <span className={`font-bold ${plant.petFriendly ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {plant.petFriendly ? 'Non-toxique (Sûr)' : 'Toxique (Dangereux)'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-primary/70 uppercase font-mono tracking-wider">Période de croissance</span>
                    <span className="font-bold text-primary">Printemps - Été (Floraison printanière possible)</span>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-3 font-sans text-xs text-primary/80 leading-relaxed">
                  <p className="font-bold text-accent">🌿 L'astuce du chef d'atelier BigLeaf :</p>
                  <p>
                    La majorité des succulentes meurent par <strong>excès d'eau</strong> et non par sécheresse. Toujours arroser généreusement (jusqu'à ce que l'eau s'écoule par le fond du pot), puis videz impérativement la coupelle.
                  </p>
                  <p className="font-bold text-accent mt-3">🌞 Astuce esthétique :</p>
                  <p>
                    Tournez régulièrement le pot d'un quart de tour chaque semaine pour conserver une rosette parfaitement symétrique et géométrique.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* CROSS SELL SECTION (Ventes additionnelles d'accompagnement) */}
      <div className="mt-16 pt-12 border-t border-primary/10">
        <h2 className="font-display font-bold text-3xl tracking-tight text-primary text-left uppercase mb-8">
          Compléter votre collection<span className="text-accent">.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Related Succulents */}
          {companionPlants.map((companion) => (
            <div
              key={companion.id}
              onClick={() => onSelectPlant(companion)}
              className="group bg-white rounded-2xl overflow-hidden shadow-premium border border-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary/50">
                <img
                  src={companion.image}
                  alt={companion.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 text-[8px] uppercase font-bold tracking-wider bg-primary text-white rounded-full">
                    Compagnon idéal
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white text-primary shadow-md">
                    <Eye className="w-4 h-4 text-accent" />
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-mono text-primary/70">
                    {companion.scientificName}
                  </span>
                  <h2 className="font-display font-bold text-base text-primary leading-tight mt-0.5 group-hover:text-accent transition-colors">
                    {companion.name}
                  </h2>
                  <p className="text-xs font-bold text-primary mt-1">
                    {companion.price.toFixed(2)} €
                  </p>
                </div>

                <button aria-label="Bouton d'action"
                  onClick={(e) => handleQuickAddCrossSell(companion, e)}
                  className="w-full mt-4 py-2.5 border border-primary/10 rounded-full hover:bg-primary hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
