import { useState } from 'react';
import { X, CheckCircle2, ChevronRight, HelpCircle, AlertCircle, ShoppingCart, Info } from 'lucide-react';
import { Succulent, SUCCULENTS } from '../../data';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function CareQuiz() {
  const { isQuizOpen: isOpen, setIsQuizOpen, setSelectedPlant, navigate } = useUI();
  const { addToCart } = useCart();

  const onClose = () => setIsQuizOpen(false);
  const onAddToCart = (plant: Succulent) => addToCart(plant);
  const onOpenProductModal = (plant: Succulent) => {
    setSelectedPlant(plant);
    navigate('product');
  };
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    location: '',
    pets: '',
    experience: '',
  });
  const [recommendation, setRecommendation] = useState<Succulent | null>(null);

  if (!isOpen) return null;

  const handleAnswer = (field: string, value: string) => {
    setAnswers({ ...answers, [field]: value });
    if (step < 3) {
      setStep(step + 1);
    } else {
      calculateRecommendation({ ...answers, [field]: value });
    }
  };

  const calculateRecommendation = (finalAnswers: typeof answers) => {
    let result: Succulent = SUCCULENTS[0]; // Fallback to Echeveria

    // Simple robust match logic
    if (finalAnswers.pets === 'yes') {
      // Return safe non-toxic options
      const safe = SUCCULENTS.find(p => p.id === 'haworthia-limifolia' || p.id === 'kalanchoe-tomentosa');
      if (safe) result = safe;
    } else if (finalAnswers.location === 'exterior') {
      const ext = SUCCULENTS.find(p => p.category === 'exterior');
      if (ext) result = ext;
    } else if (finalAnswers.experience === 'expert') {
      const expert = SUCCULENTS.find(p => p.care.difficulty === 'Expert' || p.category === 'rare');
      if (expert) result = expert;
    } else {
      const easy = SUCCULENTS.find(p => p.care.difficulty === 'Facile');
      if (easy) result = easy;
    }

    setRecommendation(result);
    setStep(4); // result screen
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ location: '', pets: '', experience: '' });
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative overflow-hidden border border-primary/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-secondary text-primary rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer z-10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header (Steps 1-3) */}
        {step < 4 && (
          <div className="text-left mb-6">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-accent flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Étape {step} sur 3
            </span>
            <div className="h-1 bg-secondary rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-accent h-1 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Location / Sunlight */}
        {step === 1 && (
          <div className="text-left animate-fade-in">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-primary uppercase mb-6">
              Où sera installée votre future plante ?
            </h2>
            <div className="space-y-3">
              <button aria-label="Bouton d'action"
                onClick={() => handleAnswer('location', 'window')}
                className="w-full text-left p-4 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-sm text-primary block">Près d'une fenêtre très ensoleillée</span>
                  <span className="text-xs text-primary/70">Plus de 4 heures de soleil direct par jour.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-accent transition-all" />
              </button>
              <button aria-label="Bouton d'action"
                onClick={() => handleAnswer('location', 'desk')}
                className="w-full text-left p-4 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-sm text-primary block">Dans une pièce modérément éclairée</span>
                  <span className="text-xs text-primary/70">Lumière moyenne, bureau ou salon tamisé.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-accent transition-all" />
              </button>
              <button aria-label="Bouton d'action"
                onClick={() => handleAnswer('location', 'exterior')}
                className="w-full text-left p-4 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-sm text-primary block">Sur un balcon ou une terrasse extérieure</span>
                  <span className="text-xs text-primary/70">En plein air, exposé aux variations climatiques.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-accent transition-all" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pets safety */}
        {step === 2 && (
          <div className="text-left animate-fade-in">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-primary uppercase mb-6">
              Avez-vous des animaux de compagnie ?
            </h2>
            <div className="space-y-3">
              <button aria-label="Bouton d'action"
                onClick={() => handleAnswer('pets', 'yes')}
                className="w-full text-left p-4 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-sm text-primary block">Oui, un chat ou chien curieux !</span>
                  <span className="text-xs text-primary/70">La plante doit être 100% non-toxique et saine en cas d'ingestion.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-accent transition-all" />
              </button>
              <button aria-label="Bouton d'action"
                onClick={() => handleAnswer('pets', 'no')}
                className="w-full text-left p-4 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-sm text-primary block">Non, pas de compagnons à quatre pattes.</span>
                  <span className="text-xs text-primary/70">Toutes les espèces de succulentes conviennent parfaitement !</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-accent transition-all" />
              </button>
            </div>
            <button aria-label="Bouton d'action" 
              onClick={() => setStep(1)}
              className="mt-6 text-xs font-bold uppercase text-primary/70 hover:text-primary transition-all cursor-pointer"
            >
              &larr; Étape précédente
            </button>
          </div>
        )}

        {/* Step 3: Experience level */}
        {step === 3 && (
          <div className="text-left animate-fade-in">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-primary uppercase mb-6">
              Comment décririez-vous votre main verte ?
            </h2>
            <div className="space-y-3">
              <button aria-label="Bouton d'action"
                onClick={() => handleAnswer('experience', 'beginner')}
                className="w-full text-left p-4 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-sm text-primary block">Débutant absolu (j'oublie souvent d'arroser)</span>
                  <span className="text-xs text-primary/70">Plante résistante aux petits oublis d'entretien.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-accent transition-all" />
              </button>
              <button aria-label="Bouton d'action"
                onClick={() => handleAnswer('experience', 'expert')}
                className="w-full text-left p-4 rounded-xl border border-primary/10 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-bold text-sm text-primary block">Passionné (j'aime observer leur croissance)</span>
                  <span className="text-xs text-primary/70">Je souhaite des conseils précis et des espèces singulières.</span>
                </div>
                <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-accent transition-all" />
              </button>
            </div>
            <button aria-label="Bouton d'action" 
              onClick={() => setStep(2)}
              className="mt-6 text-xs font-bold uppercase text-primary/70 hover:text-primary transition-all cursor-pointer"
            >
              &larr; Étape précédente
            </button>
          </div>
        )}

        {/* Step 4: Recommendation Results */}
        {step === 4 && recommendation && (
          <div className="text-left animate-scale-up">
            
            {/* Visual Header */}
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">Plante Idéale Trouvée !</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-primary uppercase mb-2 leading-none">
              {recommendation.name}
            </h2>
            <p className="text-xs text-primary/70 font-mono italic mb-4">
              {recommendation.scientificName}
            </p>

            {/* Layout Box */}
            <div className="flex flex-col sm:flex-row gap-5 bg-secondary/30 rounded-2xl p-4 border border-primary/5 mb-6">
              
              {/* Product Thumbnail */}
              <div className="w-full sm:w-1/3 aspect-square rounded-xl overflow-hidden bg-secondary relative flex-shrink-0">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dynamic explanations */}
              <div className="flex-grow text-xs flex flex-col justify-between">
                <div>
                  <p className="text-primary/70 font-sans leading-relaxed">
                    {recommendation.description}
                  </p>
                  
                  {/* Matching list badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full font-semibold">
                      Difficulté: {recommendation.care.difficulty}
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-semibold">
                      {recommendation.size}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-primary/5 flex items-center gap-2 text-primary/70 font-sans">
                  <Info className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Se plaît particulièrement sous : <strong>{recommendation.care.light}</strong></span>
                </div>
              </div>

            </div>

            {/* Actions Panel */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-primary/10">
              <button aria-label="Bouton d'action"
                onClick={handleReset}
                className="w-full sm:w-1/3 py-3.5 bg-secondary hover:bg-primary/5 text-primary rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-primary/15 cursor-pointer"
              >
                Recommencer
              </button>
              
              <button aria-label="Bouton d'action"
                onClick={() => {
                  onOpenProductModal(recommendation);
                  onClose();
                }}
                className="w-full sm:w-1/3 py-3.5 bg-white text-primary rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-primary hover:bg-secondary cursor-pointer"
              >
                Fiche détaillée
              </button>

              <button aria-label="Bouton d'action"
                onClick={() => {
                  onAddToCart(recommendation);
                  onClose();
                }}
                className="w-full sm:w-1/3 py-3.5 bg-primary hover:bg-accent text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-gold" />
                <span>Acheter</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
