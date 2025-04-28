
import React from "react";
import MobileSidebar from "./MobileSidebar";
import { Link } from "react-router-dom";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Save } from "lucide-react";
import { Button } from "../ui/button";

const MobileHeader = () => {
  const { cartItems, saveShoppingList } = useShoppingContext();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleSaveList = () => {
    saveShoppingList();
  };
  
  return (
    <div className="p-4 flex justify-between items-center md:hidden bg-primary">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <h2 className="font-bold text-white text-xl">PreçoCerto</h2>
      </div>
      
      <div className="flex items-center gap-2">
        {cartItems.length > 0 && (
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleSaveList}
          >
            <Save size={20} />
          </Button>
        )}
        
        <Link to="/simulation" className="relative">
          <ShoppingCart size={24} className="text-white" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-secondary">{totalItems}</Badge>
          )}
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
