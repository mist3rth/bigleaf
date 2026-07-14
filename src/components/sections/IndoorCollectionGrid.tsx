import { ChevronRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { SUCCULENTS, Succulent } from '../../data';

interface IndoorCollectionGridProps {
  onSelectPlant: (plant: Succulent) => void;
}

export default function IndoorCollectionGrid() {
  const { navigate, setSelectedPlant } = useUI();
  const onSelectPlant = (p) => { setSelectedPlant(p); navigate("product"); };

  const collections = [
    {
      productId: 'echeveria-elegans',
      title: 'Echeveria Elegans',
      description: 'Rosette bleu-argenté sculptée comme un lotus',
    },
    {
      productId: 'senecio-rowleyanus',
      title: 'Collier de Perles',
      description: 'Spectaculaire cascade de perles vertes charnues',
    },
    {
      productId: 'kalanchoe-tomentosa',
      title: 'Kalanchoé Panda',
      description: 'Doux duvet velouté argenté aux pointes chocolat',
    },
    {
      productId: 'crassula-ovata',
      title: 'Arbre de Jade',
      description: 'Arbre miniature symbole de prospérité',
    },
  ];

  const resolvedCollections = collections.map((item) => {
    const plant = SUCCULENTS.find(p => p.id === item.productId);
    return {
      ...item,
      image: plant?.image || '',
    };
  });

  return (
    <section className="py-16 px-4 md:px-8 max-w-screen-2xl mx-auto" id="indoor-collection">
      
      {/* Title block with reverse layout to match the image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-12">
        <div className="lg:col-span-5 text-left order-2 lg:order-1">
          <p className="text-sm text-primary/70 font-sans leading-relaxed">
            Consultez nos tutoriels de décoration et d'entretien intégrés pour apprendre à magnifier vos plantes grasses de collection en intérieur, de l'exposition idéale au rempotage.
          </p>
        </div>
        <div className="lg:col-span-7 text-left lg:text-right order-1 lg:order-2">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-primary uppercase leading-tight">
            Collection <br className="hidden md:block" />
            d'Intérieur<span className="text-accent">.</span>
          </h2>
        </div>
      </div>

      {/* Grid of four dark foliage overlay panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resolvedCollections.map((item) => (
          <div
            key={item.title}
            onClick={() => {
              const plant = SUCCULENTS.find(p => p.id === item.productId);
              if (plant) {
                onSelectPlant(plant);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-premium border border-primary/5"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Dark green leaves overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-primary/20 opacity-80 group-hover:opacity-90 transition-all duration-300" />

            {/* Expansion Arrow Button Top-Right to match image layout */}
            <div className="absolute top-5 right-5 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-lg transform translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
              <ChevronRight className="w-5 h-5 text-accent" />
            </div>

            {/* Bottom Text Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white z-10">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase leading-none break-words hyphens-auto group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-white/70 font-sans mt-2 font-light tracking-wide uppercase">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
