import React, { useEffect, Suspense, lazy } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { useUI } from './context/UIContext';
import { Reveal } from './ui/Reveal';
import { log } from './utils/logger';

// 1. Centraliser tous les gros composants en Lazy Loading
import HomeView from './pages/HomeView'; // Eager load the home view for better LCP
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Team = lazy(() => import('./pages/Team'));

// Modals isolées en lazy
const CartDrawer = lazy(() => import('./components/modals/CartDrawer'));
const CareQuiz = lazy(() => import('./components/modals/CareQuiz'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-primary/10 border-t-accent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  // On extrait STRICTEMENT ce dont App a besoin pour limiter les re-renders inutiles
  const { currentView, selectedPlant } = useUI();

  useEffect(() => {
    log.dev('App mounted, currentView:', currentView);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-primary flex flex-col justify-between antialiased selection:bg-accent selection:text-white" id="main-app">
      {/* Header et Footer sont préservés des chargements lourds */}
      <Header />

      <main className="flex-grow space-y-8 overflow-hidden">
        {/* Un seul Suspense global pour la clarté et le découpage propre des bundles */}
        <Suspense fallback={<LoadingFallback />}>
          {currentView === 'home' && (
            <HomeView />
          )}
          
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
      </main>

      <Footer />

      {/* Modals chargées uniquement à la demande */}
      <Suspense fallback={null}>
        <CartDrawer />
        <CareQuiz />
      </Suspense>
    </div>
  );
}
