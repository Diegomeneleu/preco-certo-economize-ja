
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type Product = {
  id: string;
  name: string;
  categories: string[];
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  brand?: string;
};

export type MarketPrice = {
  marketId: string;
  marketName: string;
  totalPrice: number;
  items: {
    productId: string;
    price: number;
  }[];
};

type ShoppingContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateBrand: (productId: string, brand: string) => void;
  clearCart: () => void;
  marketComparisons: MarketPrice[];
  generateComparison: () => void;
};

const ShoppingContext = createContext<ShoppingContextType | null>(null);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [marketComparisons, setMarketComparisons] = useState<MarketPrice[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Item already in cart, increase quantity
        const newCartItems = [...prev];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + 1
        };
        return newCartItems;
      } else {
        // Item not in cart, add it
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const updateBrand = (productId: string, brand: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, brand } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Mock function to generate price comparisons
  const generateComparison = () => {
    if (cartItems.length === 0) return;

    // Mock data for supermarkets
    const supermarkets = [
      { id: 'm1', name: 'Carrefour' },
      { id: 'm2', name: 'Extra' },
      { id: 'm3', name: 'Pão de Açúcar' },
    ];

    // Generate random prices for each product in each supermarket
    const comparisons = supermarkets.map(market => {
      const items = cartItems.map(item => {
        // Base price varies by market and product
        const basePrice = 5 + Math.random() * 15;
        
        return {
          productId: item.product.id,
          price: parseFloat((basePrice * item.quantity).toFixed(2))
        };
      });

      const totalPrice = parseFloat(items.reduce((sum, item) => sum + item.price, 0).toFixed(2));
      
      return {
        marketId: market.id,
        marketName: market.name,
        totalPrice,
        items
      };
    });

    // Sort by total price
    const sortedComparisons = comparisons.sort((a, b) => a.totalPrice - b.totalPrice);
    setMarketComparisons(sortedComparisons);
  };

  const contextValue: ShoppingContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateBrand,
    clearCart,
    marketComparisons,
    generateComparison
  };

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};
