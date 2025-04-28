
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus, Trash } from "lucide-react";
import { CartItem, useShoppingContext } from "../contexts/ShoppingContext";

type CartItemRowProps = {
  item: CartItem;
  showBrand?: boolean;
};

const CartItemRow = ({ item, showBrand = false }: CartItemRowProps) => {
  const { updateQuantity, removeFromCart, updateBrand } = useShoppingContext();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-3 border-b last:border-b-0">
      <div className="flex-shrink-0 mb-2 sm:mb-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      </div>
      <div className="flex-grow sm:mx-4">
        <h3 className="font-medium">{item.product.name}</h3>
        
        {showBrand && (
          <div className="mt-1">
            <Input 
              placeholder="Marca (opcional)"
              value={item.brand || ''}
              onChange={(e) => updateBrand(item.product.id, e.target.value)}
              className="max-w-[200px] h-8 text-sm"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center mt-2 sm:mt-0">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-r-none p-0"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus size={14} />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-l-none p-0"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus size={14} />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => removeFromCart(item.product.id)}
        >
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CartItemRow;
