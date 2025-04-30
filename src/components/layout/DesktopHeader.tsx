
import React from "react";
import { Link } from "react-router-dom";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const DesktopHeader = () => {
  const { cartItems, saveShoppingList } = useShoppingContext();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleSaveList = () => {
    saveShoppingList();
  };
  
  return (
    <div className="hidden md:flex justify-between items-center bg-primary p-3 mb-4">
      <h2 className="font-bold text-white text-2xl">PreçoCerto</h2>
      
      <div className="flex items-center gap-4">
        {cartItems.length > 0 && (
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white/20"
            onClick={handleSaveList}
          >
            <Save className="mr-2" size={18} />
            Salvar lista
          </Button>
        )}
        
        <Link 
          to="/simulation" 
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          <div className="relative">
            <span className="text-white font-medium">
              {totalItems > 0 ? `${totalItems} ${totalItems === 1 ? "item" : "itens"} no carrinho` : "Carrinho vazio"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DesktopHeader;
