import React, { useState } from 'react';
import { ArrowUpRight, Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="mt-16 bg-primary text-white rounded-3xl overflow-hidden w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-12 md:p-16 relative">
      
      {/* Decorative leaf shapes in background */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

      {/* Main "Join the community" row stacked vertically */}
      <div className="flex flex-col gap-6 border-b border-white/10 pb-12 mb-12">
        
        {/* Title goes ABOVE both the text and the input */}
        <div className="text-left flex items-center gap-6">
          <div className="p-5 rounded-full bg-white/10 border border-white/10 text-gold hidden sm:flex items-center justify-center animate-pulse">
            <ArrowUpRight className="w-10 h-10" />
          </div>
          <div className="min-w-0 w-full">
            <h3 className="font-display font-extrabold text-xl sm:text-4xl md:text-[40px] lg:text-6xl tracking-tight leading-none uppercase break-words hyphens-auto">
              Rejoindre la communauté<span className="text-gold">.</span>
            </h3>
            <p className="text-[10px] sm:text-xs text-white/70 font-mono tracking-widest uppercase mt-3 truncate sm:whitespace-normal">
              Newsletter & Conseils exclusifs
            </p>
          </div>
        </div>

        {/* Content & Newsletter Form row under the title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2 text-left">
          <div className="lg:col-span-7">
            <p className="text-sm text-white/80 font-sans leading-relaxed font-light">
              Inscrivez-vous pour recevoir nos alertes de ventes privées de succulentes rares, nos guides d'entretien saisonniers et bénéficiez de <strong>10% de réduction</strong> sur votre premier achat.
            </p>
          </div>
          
          <div className="lg:col-span-5 w-full">
            <form onSubmit={handleSubmit} className="relative flex items-center w-full">
              <input
                type="email"
                required
                placeholder="Votre adresse email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/10 focus:border-gold rounded-full py-4 pl-4 sm:pl-6 pr-14 sm:pr-16 text-sm text-white placeholder-white/40 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 p-3 bg-white text-primary rounded-full hover:bg-gold hover:text-primary transition-all cursor-pointer flex items-center justify-center"
                aria-label="S'abonner"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>

            {isSubscribed && (
              <p className="text-xs text-gold font-bold mt-3 animate-fade-in">
                ✓ Merci ! Votre code privilège de -10% vient de vous être envoyé.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Directory structure & copyright links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-left text-[10px] sm:text-xs mb-12">
        <div>
          <h4 className="font-display font-bold uppercase text-white/70 mb-4 tracking-wider">Acheter</h4>
          <ul className="space-y-2 text-white/80 font-sans">
            <li><a href="#boutique" className="hover:text-gold hover:underline">Toutes les succulentes</a></li>
            <li><a href="#boutique" className="hover:text-gold hover:underline">Cactus graphiques</a></li>
            <li><a href="#boutique" className="hover:text-gold hover:underline">Pots & Substrats</a></li>
            <li><a href="#boutique" className="hover:text-gold hover:underline">Cartes Cadeaux</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold uppercase text-white/70 mb-4 tracking-wider">L'Atelier</h4>
          <ul className="space-y-2 text-white/80 font-sans">
            <li><a href="#curated-section" className="hover:text-gold hover:underline">Nos serres de culture</a></li>
            <li><a href="#curated-section" className="hover:text-gold hover:underline">Notre charte éthique</a></li>
            <li><a href="#curated-section" className="hover:text-gold hover:underline">Le rempotage éco</a></li>
            <li><a href="#" className="hover:text-gold hover:underline">Recrutement</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold uppercase text-white/70 mb-4 tracking-wider">Services</h4>
          <ul className="space-y-2 text-white/80 font-sans">
            <li><a href="#faq" className="hover:text-gold hover:underline">Livraison Isotherme</a></li>
            <li><a href="#faq" className="hover:text-gold hover:underline">Click & Collect 2h</a></li>
            <li><a href="#faq" className="hover:text-gold hover:underline">Suivi de commande</a></li>
            <li><a href="#faq" className="hover:text-gold hover:underline">Garantie 30 Jours</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold uppercase text-white/70 mb-4 tracking-wider">Nous Contacter</h4>
          <p className="text-white/80 font-sans leading-normal mb-2">
            La Serre Parisienne <br />
            14 Rue de l'Échevéria, 75011 Paris
          </p>
          <p className="text-white/80 font-sans font-semibold">
            bonjour@bigleaf.fr
          </p>
        </div>
      </div>

      {/* Brand logo & copyright only */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-white/70 text-[11px] font-sans">
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 sm:mb-0 text-center sm:text-left min-w-0">
          <span className="font-display font-bold uppercase tracking-widest text-white/60">BigLeaf.</span>
          <span className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
            &copy; {new Date().getFullYear()} - Tous droits réservés.
            <span className="hidden sm:inline">|</span>
          </span>
          <span className="truncate w-full sm:w-auto">
            Made by <a href="https://mist3rth.github.io/presentMe/" target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:underline transition-colors font-medium">T.THIESSON</a>
          </span>
        </div>

        <button aria-label="Bouton d'action" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

    </footer>
  );
}
