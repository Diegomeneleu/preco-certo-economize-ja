
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

// Product brands by category
const productBrands: Record<string, string[]> = {
  grãos: ["Camil", "Tio João", "Prato Fino", "Namorado", "Kicaldo", "Urbano"],
  laticínios: ["Nestlé", "Itambé", "Piracanjuba", "Parmalat", "Elegê", "Vigor", "Danone"],
  óleos: ["Liza", "Soya", "Sadia", "Concórdia", "Coamo", "Corcovado", "Salada"],
  massas: ["Barilla", "Adria", "Renata", "Vitarella", "Piraquê", "Petybon", "Santa Amália"],
  higiene: ["Dove", "Nivea", "Johnson's", "Palmolive", "Lux", "Protex", "Rexona", "Natura"],
  limpeza: ["Ypê", "Omo", "Veja", "Bombril", "Assolan", "Minuano", "Girando Sol"],
  bebidas: ["Coca-Cola", "Nescafé", "Pilão", "3 Corações", "Santa Clara", "Maratá", "Melitta"],
  padaria: ["Wickbold", "Pullman", "Panco", "Seven Boys", "Visconti", "Bauducco", "Nutrella"],
  básicos: ["Qualimax", "Sinhá", "União", "Doutor Otker", "Yoki", "Kitano", "Cepêra"],
  temperos: ["Kitano", "Ajinomoto", "Knorr", "Sazon", "Arisco", "Maggi", "Sabor Ami"],
  farináceos: ["Dona Benta", "Rosa Branca", "Sol", "Primor", "Boa Sorte", "Pantanal", "Amafil"],
  doces: ["Nestlé", "Garoto", "Lacta", "União", "Arcor", "Harald", "Toddy"],
  refrigerados: ["Sadia", "Perdigão", "Seara", "Aurora", "Rezende", "Frimesa"],
  frutas: ["Turma da Mônica", "Natural One", "Del Valle", "Maguary"],
  vegetais: ["Vapza", "Bonduelle", "Quero", "Jussara", "Fugini"],
  congelados: ["Seara", "Sadia", "Perdigão", "Aurora", "Swift"],
  pet: ["Pedigree", "Whiskas", "Royal Canin", "Premier", "Purina"],
};

// Extended product categories for better classification
const additionalCategories = [
  "refrigerados", "frutas", "vegetais", "congelados", "pet", "sobremesas",
  "café da manhã", "lanches", "utensílios", "eletrônicos", "infantil"
];

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

  return (
    <div className="bg-sidebar/50 rounded-lg shadow-md hover:shadow-lg transition-all p-3 mb-2 border border-accent/20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-white text-lg">{product.name}</h3>
          <div className="flex flex-wrap gap-1 my-1">
            {product.categories.map((category, index) => (
              <span
                key={index}
                className="text-xs bg-accent/30 px-2 py-1 rounded-full text-white/80"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <div className="ml-4">
          {uniqueBrands.length > 0 ? (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="border-secondary text-white hover:bg-secondary hover:text-white"
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
                        <span className="text-lg font-bold">-</span>
                      </Button>
                      <span className="w-10 text-center text-white">{quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={increaseQuantity}
                        className="text-white hover:bg-accent/40"
                      >
                        <span className="text-lg font-bold">+</span>
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
              className="border-secondary text-white hover:bg-secondary hover:text-white"
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
