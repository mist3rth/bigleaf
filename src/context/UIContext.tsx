import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Succulent } from '../data';

export type ViewState = 'home' | 'shop' | 'team' | 'product';

interface UIContextType {
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (isOpen: boolean) => void;
  
  // Navigation State
  currentView: ViewState;
  navigate: (view: ViewState) => void;
  
  // Product Detail Selection
  selectedPlant: Succulent | null;
  setSelectedPlant: (plant: Succulent | null) => void;
  
  // Shop Filters (optional, can stay in Shop page, but useful if accessed from elsewhere)
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCollection: string | null;
  setSelectedCollection: (collection: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPlant, setSelectedPlant] = useState<Succulent | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'product') {
      setSelectedPlant(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetSelectedPlant = (plant: Succulent | null) => {
    setSelectedPlant(plant);
    if (plant) {
      navigate('product');
    } else {
      // If closing product detail, return to shop if we came from there, or home.
      // We default to home for simplicity unless we add history.
      navigate('home');
    }
  };

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        isQuizOpen,
        setIsQuizOpen,
        currentView,
        navigate,
        selectedPlant,
        setSelectedPlant: handleSetSelectedPlant,
        selectedCategory,
        setSelectedCategory,
        selectedCollection,
        setSelectedCollection,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
