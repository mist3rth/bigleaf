import React, { useEffect, Suspense, lazy } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Hero from './components/sections/Hero';
import HeroBanner from './components/sections/HeroBanner';
import FeaturedCollections from './components/sections/FeaturedCollections';
import IntroSection from './components/sections/IntroSection';
import NewPlants from './components/sections/NewPlants';
import IndoorCollectionGrid from './components/sections/IndoorCollectionGrid';
import MonthlyContest from './components/sections/MonthlyContest';
import CuratedGoods from './components/sections/CuratedGoods';
import FaqSection from './components/sections/FaqSection';
import { useUI } from './context/UIContext';
import { useCart } from './context/CartContext';
import { Reveal } from './ui/Reveal';
import { log } from './utils/logger';

// Lazy loaded views
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Team = lazy(() => import('./pages/Team'));

// Lazy loaded modals
const CartDrawer = lazy(() => import('./components/modals/CartDrawer'));
const CareQuiz = lazy(() => import('./components/modals/CareQuiz'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-primary/10 border-t-accent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const { currentView, selectedPlant, navigate } = useUI();

  useEffect(() => {
    log.dev('App mounted, currentView:', currentView);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-primary flex flex-col justify-between antialiased selection:bg-accent selection:text-white" id="main-app">
      <Header />

      <main className="flex-grow space-y-8 overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          {currentView === 'team' && (
            <Reveal>
              <Team />
            </Reveal>
          )}
          {currentView === 'product' && selectedPlant && (
            <Reveal>
              <ProductDetail />
            </Reveal>
          )}
          {currentView === 'shop' && (
            <Reveal>
              <Shop />
            </Reveal>
          )}
        </Suspense>
        {currentView === 'home' && (
          <>
            <Reveal><Hero /></Reveal>
            <Reveal><HeroBanner /></Reveal>
            <Reveal><FeaturedCollections /></Reveal>
            <Reveal><IntroSection /></Reveal>
            <Reveal><NewPlants /></Reveal>
            <Reveal><MonthlyContest /></Reveal>
            <Reveal><IndoorCollectionGrid /></Reveal>
            <Reveal><CuratedGoods /></Reveal>
            <Reveal><FaqSection /></Reveal>
          </>
        )}
      </main>

      <Footer />

      {/* Overlays */}
      <Suspense fallback={null}>
        <CartDrawer />
        <CareQuiz />
      </Suspense>
    </div>
  );
}
