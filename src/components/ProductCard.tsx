
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Minus, Check } from "lucide-react";
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

// Better, more colorful product illustrations
const productImages: Record<string, string> = {
  "Arroz Branco": "/lovable-uploads/18305abd-f4af-4b25-bbbf-8ce882bf5667.png",
  "Feijão Carioca": "https://cdn-icons-png.flaticon.com/512/7902/7902019.png",
  "Óleo de Soja": "https://cdn-icons-png.flaticon.com/512/2553/2553691.png",
  "Açúcar Refinado": "https://cdn-icons-png.flaticon.com/512/7902/7902259.png",
  "Café em Pó": "https://cdn-icons-png.flaticon.com/512/7902/7902334.png",
  "Leite Integral": "https://cdn-icons-png.flaticon.com/512/7902/7902132.png",
  "Pão de Forma": "https://cdn-icons-png.flaticon.com/512/7902/7902100.png",
  "Sal Refinado": "https://cdn-icons-png.flaticon.com/512/7902/7902385.png", 
  "Macarrão Espaguete": "https://cdn-icons-png.flaticon.com/512/7902/7902424.png",
  "Farinha de Trigo": "https://cdn-icons-png.flaticon.com/512/7902/7902220.png",
  "Sabonete": "https://cdn-icons-png.flaticon.com/512/7902/7902362.png",
  "Papel Higiênico": "https://cdn-icons-png.flaticon.com/512/7902/7902190.png",
};

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

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useShoppingContext();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  
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
    addToCart(product, selectedBrand || undefined, quantity);
    toast({
      title: "Produto adicionado",
      description: `${quantity} ${quantity > 1 ? 'unidades' : 'unidade'} de ${product.name} ${selectedBrand ? `(${selectedBrand})` : ''} adicionado ao carrinho`,
    });
    setIsOpen(false);
    setQuantity(1);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Use product-specific image if available, otherwise use placeholder
  const productImage = productImages[product.name] || product.image;

  return (
    <div className="card-gradient rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <AspectRatio ratio={1/1} className="w-full bg-sidebar/50">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-contain p-3"
          />
        </AspectRatio>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-white mb-1">{product.name}</h3>
        <div className="flex flex-wrap gap-1 mb-2">
          {product.categories.map((category, index) => (
            <span
              key={index}
              className="text-xs bg-accent/30 px-2 py-1 rounded-full text-white/80"
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
                  className="w-full border-secondary text-white hover:bg-secondary hover:text-white"
                >
                  <Plus size={16} className="mr-1" />
                  Adicionar
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-sidebar border-accent">
                <div className="p-4 max-w-md mx-auto text-white">
                  <h3 className="text-lg font-semibold mb-4">{product.name}</h3>
                  <Select onValueChange={setSelectedBrand} value={selectedBrand}>
                    <SelectTrigger className="mb-4 bg-accent/20 border-accent/50 text-white">
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent className="bg-sidebar border-accent">
                      {uniqueBrands.map((brand) => (
                        <SelectItem key={brand} value={brand} className="text-white hover:bg-accent/20">
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-white">Quantidade:</p>
                    <div className="flex items-center bg-accent/20 rounded-lg">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={decreaseQuantity}
                        className="text-white hover:bg-accent/40"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-10 text-center text-white">{quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={increaseQuantity}
                        className="text-white hover:bg-accent/40"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-purple-gradient"
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
                addToCart(product, undefined, 1);
                toast({
                  title: "Produto adicionado",
                  description: `${product.name} foi adicionado ao carrinho`,
                });
              }}
              variant="outline"
              className="w-full border-secondary text-white hover:bg-secondary hover:text-white"
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
