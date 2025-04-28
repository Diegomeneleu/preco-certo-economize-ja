
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Product } from "../contexts/ShoppingContext";
import { useShoppingContext } from "../contexts/ShoppingContext";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useShoppingContext();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
        <div className="flex flex-wrap gap-1 mb-2">
          {product.categories.map((category, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <Button
            onClick={() => addToCart(product)}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Plus size={16} className="mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
