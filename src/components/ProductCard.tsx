
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

// Product illustrations
const productImages: Record<string, string> = {
  "Arroz Branco": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
  "Feijão Carioca": "https://images.unsplash.com/photo-1663610685601-3cc24331f77c?w=200&h=200&fit=crop",
  "Óleo de Soja": "https://images.unsplash.com/photo-1620705444122-af64b3e56f79?w=200&h=200&fit=crop",
  "Açúcar Refinado": "https://images.unsplash.com/photo-1621685692205-1c648035acb2?w=200&h=200&fit=crop",
  "Café em Pó": "https://images.unsplash.com/photo-1611854778863-0702d0ef6b3b?w=200&h=200&fit=crop",
  "Leite Integral": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop",
  "Pão de Forma": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=200&h=200&fit=crop",
  "Sal Refinado": "https://images.unsplash.com/photo-1589275776107-7e406c147766?w=200&h=200&fit=crop", 
  "Macarrão Espaguete": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop",
  "Farinha de Trigo": "https://images.unsplash.com/photo-1562244950-8462ca9d8289?w=200&h=200&fit=crop",
  "Sabonete": "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=200&h=200&fit=crop",
  "Papel Higiênico": "https://images.unsplash.com/photo-1583251633146-d0c6c036187d?w=200&h=200&fit=crop",
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
      <img
        src={productImage}
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
