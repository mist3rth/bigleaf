import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, HelpCircle, Menu, X, Home } from 'lucide-react';
import SearchOverlay from '../components/modals/SearchOverlay';
import { Succulent } from '../data';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';

export default function Header() {
  const { cartCount } = useCart();
  const { 
    navigate, 
    setIsCartOpen, 
    setIsQuizOpen, 
    setSearchQuery,
    setSelectedPlant,
    currentView
  } = useUI();

  const onOpenCart = () => setIsCartOpen(true);
  const onOpenQuiz = () => setIsQuizOpen(true);
  const onSearch = (query: string) => {
    setSearchQuery(query);
    navigate('shop');
  };
  const onGoHome = () => navigate('home');
  const onGoShop = () => navigate('shop');
  const onGoTeam = () => navigate('team');
  const onGoFaq = () => {
    navigate('home');
    setTimeout(() => {
      const el = document.getElementById('faq');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  const onSelectPlant = (plant: Succulent) => setSelectedPlant(plant);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-[#FDFDFD]/95 backdrop-blur-md border-b border-primary/5 py-3 sm:py-4 px-3 sm:px-4 md:px-8 max-w-screen-2xl mx-auto right-0 relative">
      {/* Animated Green Bottom Border */}
      <div 
        className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-700 ease-out ${isScrolled ? 'w-full' : 'w-0'}`} 
      />
      <div className="flex items-center justify-between mx-auto">
        
        {/* LOGO on the left */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none group" 
          onClick={onGoHome}
        >
          <span className="font-display font-extrabold text-xl text-primary tracking-tight">
            BigLeaf<span className="text-gold">.</span>
          </span>
        </div>

        {/* Center: NAVIGATION LINKS */}
        <div className="hidden md:flex items-center space-x-1">
          {/* House icon for Accueil */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm ${currentView === 'home' ? 'bg-primary text-white' : 'bg-secondary text-primary hover:bg-primary hover:text-white'}`}
            id="nav-home"
            title="Accueil"
          >
            <Home className="w-4.5 h-4.5" />
          </a>
          
          <a
            href="#boutique"
            onClick={(e) => {
              e.preventDefault();
              onGoShop();
            }}
            className={`px-4.5 py-2.5 rounded-full font-sans text-[11px] uppercase tracking-wider transition-all ${currentView === 'shop' ? 'bg-accent/10 text-accent font-extrabold' : 'text-primary/80 font-bold hover:bg-secondary'}`}
            id="nav-shop"
          >
            Boutique
          </a>
          
          <button
            onClick={onOpenQuiz}
            className="px-4.5 py-2.5 rounded-full text-primary/80 font-sans font-bold text-[11px] uppercase tracking-wider hover:bg-secondary transition-all flex items-center gap-1.5 cursor-pointer"
            id="nav-quiz"
          >
            <HelpCircle className="w-4 h-4 text-accent" />
            Trouver ma plante
          </button>

          <button
            onClick={onGoTeam}
            className={`px-4.5 py-2.5 rounded-full font-sans text-[11px] uppercase tracking-wider transition-all cursor-pointer ${currentView === 'team' ? 'bg-accent/10 text-accent font-extrabold' : 'text-primary/80 font-bold hover:bg-secondary'}`}
            id="nav-team"
          >
            La team
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onGoFaq();
            }}
            className="px-4.5 py-2.5 rounded-full text-primary/80 font-sans font-bold text-[11px] uppercase tracking-wider hover:bg-secondary transition-all cursor-pointer text-left"
            id="nav-contact"
          >
            FAQ
          </button>
        </div>

        {/* Right side: Search & Cart & Mobile Menu */}
        <div className="flex items-center space-x-2.5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOverlayOpen(true)}
            className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all cursor-pointer flex items-center justify-center border border-primary/5 shadow-sm"
            aria-label="Rechercher"
            id="header-search-trigger"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Cart Drawer Indicator */}
          <button
            onClick={onOpenCart}
            className="px-3 sm:px-4 py-2 rounded-full bg-primary hover:bg-accent text-white font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 sm:space-x-2 cursor-pointer relative shadow-md"
            id="header-cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
            <span className="hidden sm:inline">Panier</span>
            <span className={`absolute -top-1.5 -right-1.5 bg-gold text-primary font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FDFDFD] shadow-md transition-all duration-300 ${cartCount > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              {cartCount || 0}
            </span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all cursor-pointer border border-primary/5"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 sm:top-20 left-2 right-2 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-primary/10 p-4 sm:p-6 flex flex-col space-y-3 md:hidden shadow-2xl z-40">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onGoHome();
            }}
            className={`px-4 py-3 rounded-xl text-center font-bold text-sm transition-all flex items-center justify-center gap-2 ${currentView === 'home' ? 'bg-primary text-white' : 'bg-secondary hover:bg-primary hover:text-white text-primary'}`}
          >
            <Home className="w-4.5 h-4.5" />
            Accueil
          </a>
          <a
            href="#boutique"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onGoShop();
            }}
            className={`px-4 py-3 rounded-xl border text-center font-bold text-sm transition-all ${currentView === 'shop' ? 'bg-primary text-white border-primary' : 'border-primary/5 hover:bg-secondary text-primary'}`}
          >
            Boutique
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuiz();
            }}
            className="px-4 py-3 rounded-xl border border-primary/5 hover:bg-secondary text-primary text-center font-bold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-accent" />
            Trouver ma plante
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onGoTeam();
            }}
            className={`px-4 py-3 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${currentView === 'team' ? 'bg-primary text-white border-primary' : 'border-primary/5 hover:bg-secondary text-primary'}`}
          >
            La team
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onGoFaq();
            }}
            className="px-4 py-3 rounded-xl border border-primary/5 hover:bg-secondary text-primary text-center font-bold text-sm transition-all cursor-pointer w-full text-center"
          >
            FAQ
          </button>
        </div>
      )}

      {/* Full screen Search Overlay with Pushes and Advice */}
      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
        onSearch={onSearch}
        onOpenQuiz={onOpenQuiz}
        onSelectPlant={onSelectPlant}
      />

    </header>
  );
}
