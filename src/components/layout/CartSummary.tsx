
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useShoppingContext } from "@/contexts/ShoppingContext";

const CartSummary = () => {
  const { cartItems } = useShoppingContext();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Estimate total price (since real price data isn't available in the model)
  const estimatedTotal = cartItems.reduce((sum, item) => {
    // Base price varies by product type
    let basePrice = 0;
    if (item.product.categories.includes("grãos")) basePrice = 10;
    else if (item.product.categories.includes("laticínios")) basePrice = 8;
    else if (item.product.categories.includes("óleos")) basePrice = 12;
    else if (item.product.categories.includes("higiene")) basePrice = 7;
    else basePrice = 5;
    
    // Premium brands cost more
    if (item.brand && ["Nestlé", "Tio João", "Dove", "Omo"].includes(item.brand)) {
      basePrice *= 1.2;
    }
    
    return sum + (basePrice * item.quantity);
  }, 0);
  
  return (
    <Link to="/simulation" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-colors">
      <div className="relative">
        <ShoppingCart size={24} className="text-white" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </div>
      <div className="text-white">
        <div className="font-medium">{totalItems > 0 ? `${totalItems} ${totalItems === 1 ? "item" : "itens"}` : "Carrinho"}</div>
        {totalItems > 0 && <div className="text-xs">R$ {estimatedTotal.toFixed(2)}</div>}
      </div>
    </Link>
  );
};

export default CartSummary;
