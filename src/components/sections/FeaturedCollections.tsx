import { ArrowUpRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import cactusMinimalistImg from '../../../assets/cactus_minimalist.webp';
import echeveriaRosettesImg from '../../../assets/echeveria_rosettes.webp';

interface FeaturedCollectionsProps {
  onSelectCollection: (collectionId: string) => void;
}

export default function FeaturedCollections() {
  const { navigate, setSelectedCategory } = useUI();
  const onSelectCollection = (c) => {
    setSelectedCategory(c);
    navigate("shop");
  };

  const cards = [
    {
      id: 'pets-friendly',
      title: 'Plantes saines & Pet-Friendly',
      subtitle: 'Sans aucun danger pour vos animaux de compagnie, faciles à vivre.',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
      badge: 'Non-toxique'
    },
    {
      id: 'exterior',
      title: 'Cactus Graphiques Rares',
      subtitle: 'Silhouettes sculpturales et espèces insolites recherchées.',
      image: cactusMinimalistImg,
      badge: 'Collectionneurs'
    },
    {
      id: 'interior',
      title: 'Echeveria & Rosettes',
      subtitle: 'Des symétries naturelles hypnotisantes aux teintes pastel douces.',
      image: echeveriaRosettesImg,
      badge: 'Best-Seller'
    }
  ];

  return (
    <section className="py-8 px-4 md:px-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              onSelectCollection(card.id);
            }}
            className="relative h-[28rem] rounded-2xl overflow-hidden group cursor-pointer shadow-premium border border-primary/5 transition-transform duration-500 hover:-translate-y-2"
          >
            {/* Background Image with Zoom Zoom */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Dark green gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
              
              {/* Top Action */}
              <div className="flex items-start justify-end">
                <div className="bg-white/15 backdrop-blur-md text-white p-2 rounded-full border border-white/15 group-hover:bg-gold group-hover:text-primary transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Text Area */}
              <div className="text-left">
                <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight tracking-tight uppercase group-hover:text-gold transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-xs text-white/70 font-sans mt-3 font-light leading-relaxed max-w-xs">
                  {card.subtitle}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:text-white group-hover:underline">
                  Découvrir la sélection &rarr;
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
