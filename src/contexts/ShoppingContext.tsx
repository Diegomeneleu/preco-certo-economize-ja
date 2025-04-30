import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

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

export type SavedList = {
  id: string;
  name: string;
  items: CartItem[];
  createdAt: string;
  isPrivate: boolean;
};

export type MarketPrice = {
  marketId: string;
  marketName: string;
  totalPrice: number;
  items: {
    productId: string;
    price: number;
    productName: string;
    brand?: string;
  }[];
};

type ShoppingContextType = {
  cartItems: CartItem[];
  savedLists: SavedList[];
  addToCart: (product: Product, brand?: string, initialQuantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateBrand: (productId: string, brand: string) => void;
  clearCart: () => void;
  marketComparisons: MarketPrice[];
  generateComparison: () => void;
  isGeneratingComparison: boolean;
  userLocation: string | null;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  saveShoppingList: (name?: string, isPrivate?: boolean) => void;
  loadSavedList: (id: string) => void;
  deleteSavedList: (id: string) => void;
  updateListPrivacy: (id: string, isPrivate: boolean) => void;
};

const ShoppingContext = createContext<ShoppingContextType | null>(null);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

// Helper to load saved lists from localStorage
const getSavedListsFromStorage = (): SavedList[] => {
  const savedListsJson = localStorage.getItem('savedLists');
  if (savedListsJson) {
    try {
      // Convert old format to new format if needed (adding isPrivate field)
      const parsedLists = JSON.parse(savedListsJson);
      return parsedLists.map((list: any) => ({
        ...list,
        isPrivate: list.isPrivate !== undefined ? list.isPrivate : false,
      }));
    } catch (error) {
      console.error('Failed to parse saved lists:', error);
      return [];
    }
  }
  return [];
};

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedLists, setSavedLists] = useState<SavedList[]>(getSavedListsFromStorage);
  const [marketComparisons, setMarketComparisons] = useState<MarketPrice[]>([]);
  const [isGeneratingComparison, setIsGeneratingComparison] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(5); // Default 5km radius

  // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedLists', JSON.stringify(savedLists));
  }, [savedLists]);

  // Try to get the user's location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
                );
                const data = await response.json();
                
                // Get city and state from the address
                const city = data.address?.city || data.address?.town || data.address?.village;
                const state = data.address?.state;
                
                if (city && state) {
                  setUserLocation(`${city}, ${state}`);
                } else if (city) {
                  setUserLocation(city);
                } else if (state) {
                  setUserLocation(state);
                }
              } catch (error) {
                console.error("Error fetching location details:", error);
              }
            },
            (error) => {
              console.log("Geolocation error:", error.message);
            }
          );
        }
      } catch (error) {
        console.error("Error accessing geolocation:", error);
      }
    };

    fetchLocation();
  }, []);

  const addToCart = (product: Product, brand?: string, initialQuantity: number = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Item already in cart, increase quantity
        const newCartItems = [...prev];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + initialQuantity,
          brand: brand || newCartItems[existingItemIndex].brand
        };
        return newCartItems;
      } else {
        // Item not in cart, add it
        return [...prev, { product, quantity: initialQuantity, brand }];
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
    setMarketComparisons([]);
  };

  // Function to save the current shopping list
  const saveShoppingList = (customName?: string, isPrivate: boolean = false) => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho para salvar uma lista.",
        variant: "destructive"
      });
      return;
    }

    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('pt-BR');
    const timeString = currentDate.toLocaleTimeString('pt-BR');
    
    // Create a default name if none is provided
    const name = customName || `Lista de compras (${dateString} ${timeString})`;
    
    const newSavedList: SavedList = {
      id: Date.now().toString(),
      name,
      items: [...cartItems],
      createdAt: currentDate.toISOString(),
      isPrivate
    };
    
    setSavedLists(prev => [newSavedList, ...prev]);
    
    toast({
      title: "Lista salva",
      description: `A lista "${name}" foi salva com sucesso ${isPrivate ? '(privada)' : ''}.`
    });
  };
  
  // Function to load a saved list into the cart
  const loadSavedList = (id: string) => {
    const listToLoad = savedLists.find(list => list.id === id);
    
    if (listToLoad) {
      setCartItems(listToLoad.items);
      
      toast({
        title: "Lista carregada",
        description: `A lista "${listToLoad.name}" foi carregada no carrinho.`
      });
    }
  };
  
  // Function to delete a saved list
  const deleteSavedList = (id: string) => {
    const listToDelete = savedLists.find(list => list.id === id);
    
    if (listToDelete) {
      setSavedLists(prev => prev.filter(list => list.id !== id));
      
      toast({
        title: "Lista removida",
        description: `A lista "${listToDelete.name}" foi removida.`
      });
    }
  };

  // Function to update privacy setting of a list
  const updateListPrivacy = (id: string, isPrivate: boolean) => {
    setSavedLists(prev => 
      prev.map(list => 
        list.id === id 
          ? { ...list, isPrivate } 
          : list
      )
    );
    
    const listToUpdate = savedLists.find(list => list.id === id);
    
    if (listToUpdate) {
      toast({
        title: "Lista atualizada",
        description: `A lista "${listToUpdate.name}" agora é ${isPrivate ? 'privada' : 'pública'}.`
      });
    }
  };

  // Function to generate price comparisons
  const generateComparison = async () => {
    if (cartItems.length === 0) return;

    setIsGeneratingComparison(true);
    
    try {
      // Call OpenAI Edge Function with updated radius parameter
      const response = await fetch('/api/generate-market-comparison', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cartItems,
          location: userLocation || 'Brasil',
          radius: searchRadius
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate comparison');
      }
      
      const data = await response.json();
      setMarketComparisons(data.marketComparisons);
    } catch (error) {
      console.error('Error generating comparison:', error);
      
      // Fallback to mock data if API fails
      generateMockComparison();
    } finally {
      setIsGeneratingComparison(false);
    }
  };
  
  // Mock function as fallback
  const generateMockComparison = () => {
    // Generate supermarkets based on location if available
    const regionSupermarkets: Record<string, string[]> = {
      'São Paulo': ['Extra', 'Pão de Açúcar', 'Carrefour', 'Dia'],
      'Rio de Janeiro': ['Guanabara', 'Mundial', 'Prezunic', 'Zona Sul'],
      'Minas Gerais': ['Supernosso', 'BH Supermercados', 'EPA', 'Mineirão'],
      'Bahia': ['GBarbosa', 'Bompreço', 'Atakarejo', 'Perini'],
      'Paraná': ['Condor', 'Muffato', 'Festval', 'Super Muffato'],
      'Santa Catarina': ['Angeloni', 'Bistek', 'Imperatriz', 'Giassi'],
    };

    // Default supermarkets if location not recognized or available
    let supermarkets = [
      { id: 'm1', name: 'Carrefour' },
      { id: 'm2', name: 'Extra' },
      { id: 'm3', name: 'Pão de Açúcar' },
    ];

    if (userLocation) {
      // Try to find markets based on user's location
      for (const [region, markets] of Object.entries(regionSupermarkets)) {
        if (userLocation.includes(region)) {
          supermarkets = markets.map((name, index) => ({
            id: `m${index + 1}`,
            name
          }));
          break;
        }
      }
    }

    // Generate random prices for each product in each supermarket
    const comparisons = supermarkets.map(market => {
      const items = cartItems.map(item => {
        // Base price varies by market, product and brand
        let basePrice = 5 + Math.random() * 15;
        
        // Premium brands cost more
        if (item.brand && ['Nestlé', 'Tio João', 'Dove', 'Omo'].includes(item.brand)) {
          basePrice *= 1.2;
        }
        
        // Price per item
        const pricePerUnit = parseFloat(basePrice.toFixed(2));
        
        return {
          productId: item.product.id,
          productName: item.product.name,
          price: parseFloat((pricePerUnit * item.quantity).toFixed(2)),
          pricePerUnit: pricePerUnit,
          brand: item.brand
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
    savedLists,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateBrand,
    clearCart,
    marketComparisons,
    generateComparison,
    isGeneratingComparison,
    userLocation,
    searchRadius,
    setSearchRadius,
    saveShoppingList,
    loadSavedList,
    deleteSavedList,
    updateListPrivacy
  };

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};
