
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Check } from "lucide-react";
import { Product } from "../contexts/ShoppingContext";
import { useShoppingContext } from "../contexts/ShoppingContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { AspectRatio } from "./ui/aspect-ratio";

// Mock brands for product categories
const productBrands: Record<string, string[]> = {
  grãos: ["Camil", "Tio João", "Prato Fino", "Namorado"],
  laticínios: ["Nestlé", "Itambé", "Piracanjuba", "Parmalat"],
  óleos: ["Liza", "Soya", "Sadia", "Concórdia"],
  massas: ["Barilla", "Adria", "Renata", "Vitarella"],
  higiene: ["Dove", "Nivea", "Johnson's", "Palmolive"],
  limpeza: ["Ypê", "Omo", "Veja", "Bombril"],
  bebidas: ["Coca-Cola", "Nescafé", "Pilão", "3 Corações"],
  padaria: ["Wickbold", "Pullman", "Panco", "Seven Boys"],
  básicos: ["Qualimax", "Sinhá", "União", "Doutor Otker"],
  temperos: ["Kitano", "Ajinomoto", "Knorr", "Sazon"],
  farináceos: ["Dona Benta", "Rosa Branca", "Sol", "Primor"],
  doces: ["Nestlé", "Garoto", "Lacta", "União"],
};

// Updated product illustrations with more clear illustrations
const productImages: Record<string, string> = {
  "Arroz Branco": "https://cdn-icons-png.flaticon.com/512/2553/2553691.png",
  "Feijão Carioca": "https://cdn-icons-png.flaticon.com/512/2553/2553738.png",
  "Óleo de Soja": "https://cdn-icons-png.flaticon.com/512/5769/5769170.png",
  "Açúcar Refinado": "https://cdn-icons-png.flaticon.com/512/3348/3348089.png",
  "Café em Pó": "https://cdn-icons-png.flaticon.com/512/751/751621.png",
  "Leite Integral": "https://cdn-icons-png.flaticon.com/512/3050/3050154.png",
  "Pão de Forma": "https://cdn-icons-png.flaticon.com/512/3014/3014438.png",
  "Sal Refinado": "https://cdn-icons-png.flaticon.com/512/2553/2553657.png", 
  "Macarrão Espaguete": "https://cdn-icons-png.flaticon.com/512/2553/2553691.png",
  "Farinha de Trigo": "https://cdn-icons-png.flaticon.com/512/3050/3050100.png",
  "Sabonete": "https://cdn-icons-png.flaticon.com/512/1687/1687353.png",
  "Papel Higiênico": "https://cdn-icons-png.flaticon.com/512/3516/3516235.png",
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useShoppingContext();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  
  // Find applicable brands for this product
  const brands = product.categories.reduce((acc: string[], category) => {
    if (productBrands[category]) {
      return [...acc, ...productBrands[category]];
    }
    return acc;
  }, []);
  
  // Remove duplicates
  const uniqueBrands = [...new Set(brands)];

  const handleAddToCart = () => {
    addToCart(product, selectedBrand || undefined);
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao carrinho`,
    });
    setIsOpen(false);
  };

  // Use product-specific image if available, otherwise use placeholder
  const productImage = productImages[product.name] || product.image;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <AspectRatio ratio={1/1} className="w-full bg-gray-50">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-contain p-3"
          />
        </AspectRatio>
      </div>
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
          {uniqueBrands.length > 0 ? (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Plus size={16} className="mr-1" />
                  Adicionar
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-4">Escolha uma marca</h3>
                  <Select onValueChange={setSelectedBrand} value={selectedBrand}>
                    <SelectTrigger className="mb-4">
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleAddToCart}
                    className="w-full"
                  >
                    <Check size={16} className="mr-1" />
                    Confirmar
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Button
              onClick={() => {
                addToCart(product);
                toast({
                  title: "Produto adicionado",
                  description: `${product.name} foi adicionado ao carrinho`,
                });
              }}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Plus size={16} className="mr-1" />
              Adicionar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
