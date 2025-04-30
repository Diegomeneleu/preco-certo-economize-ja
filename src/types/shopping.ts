
// Types for shopping functionality
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
    pricePerUnit?: number;
  }[];
};

export type ShoppingContextType = {
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
