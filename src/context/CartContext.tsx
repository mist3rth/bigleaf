import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Succulent } from '../data';

export interface CartItem {
  plant: Succulent;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (plant: Succulent) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  removeItem: (plantId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('growth_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (err) {
        console.error('Failed to parse saved cart:', err);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('growth_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (plant: Succulent) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.plant.id === plant.id);
      if (existing) {
        return prevCart.map((item) =>
          item.plant.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { plant, quantity: 1 }];
    });
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(plantId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.plant.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (plantId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.plant.id !== plantId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
