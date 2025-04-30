
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Settings } from "lucide-react";
import CartItemRow from "@/components/CartItemRow";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const Simulation = () => {
  const { cartItems, generateComparison, saveShoppingList, searchRadius, setSearchRadius } = useShoppingContext();
  const [listName, setListName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [tempRadius, setTempRadius] = useState(searchRadius);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const { toast } = useToast();
  
  // Generate random prices
  useEffect(() => {
    generateComparison();
  }, [cartItems, generateComparison]);
  
  // Calculate estimated total
  const estimatedTotal = cartItems.reduce((sum, item) => {
    // Random price between R$ 5 and R$ 20 per unit
    const estimatedPrice = (5 + Math.random() * 15) * item.quantity;
    return sum + estimatedPrice;
  }, 0);

  const handleSaveList = () => {
    saveShoppingList(listName || undefined, isPrivate);
    setShowSaveDialog(false);
    setListName("");
    setIsPrivate(false);
  };

  const handleUpdateRadius = () => {
    setSearchRadius(tempRadius);
    setShowSettingsDialog(false);
    toast({
      title: "Configurações salvas",
      description: `Raio de busca definido para ${tempRadius}km.`
    });
    // Re-generate comparison with new radius
    generateComparison();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="Simulação de Compra" showBack />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-3 text-white">Seu carrinho está vazio</h2>
              <p className="text-white/80 mb-6">Adicione produtos para simular sua compra</p>
              <Button asChild>
                <Link to="/products">Explorar produtos</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Produtos no carrinho</h2>
              <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-sidebar border-accent">
                  <DialogHeader>
                    <DialogTitle className="text-white">Configurações</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Ajuste as configurações de busca
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="radius" className="text-white">
                          Raio de busca: {tempRadius}km
                        </Label>
                      </div>
                      <Slider
                        id="radius"
                        min={1}
                        max={30}
                        step={1}
                        value={[tempRadius]}
                        onValueChange={(value) => setTempRadius(value[0])}
                        className="mb-2"
                      />
                      <p className="text-xs text-white/70">
                        Distância máxima para buscar supermercados na sua região
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSettingsDialog(false)}
                      className="border-accent/40 text-white"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleUpdateRadius}>
                      Salvar configurações
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="card-gradient rounded-lg shadow p-4 mb-6">
              <div className="divide-y divide-white/10">
                {cartItems.map((item) => (
                  <CartItemRow key={item.product.id} item={item} showBrand />
                ))}
              </div>
            </div>
            
            <div className="card-gradient rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">Valor estimado</h2>
              <div className="flex justify-between items-center py-2">
                <span className="text-white/90">Total estimado:</span>
                <span className="text-xl font-bold text-secondary">
                  R$ {estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-white/20 text-white">
                    <Lock className="mr-2" size={16} />
                    Salvar esta lista
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-sidebar border-accent">
                  <DialogHeader>
                    <DialogTitle className="text-white">Salvar lista de compras</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Preencha os detalhes para salvar sua lista
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="mb-4">
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Nome da lista
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ex: Compras do mês"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        className="bg-accent/20 border-accent/30 text-white"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="private"
                        checked={isPrivate}
                        onCheckedChange={setIsPrivate}
                      />
                      <Label htmlFor="private" className="text-white">
                        Lista privada <span className="text-xs text-white/70">(somente você pode ver)</span>
                      </Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSaveDialog(false)}
                      className="border-accent/40 text-white"
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveList}>
                      Salvar lista
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            
              <Button className="bg-secondary hover:bg-secondary/90" asChild>
                <Link to="/comparison">
                  Comparar preços nos mercados
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Simulation;
