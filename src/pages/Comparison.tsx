
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Comparison = () => {
  const { cartItems, marketComparisons, generateComparison } = useShoppingContext();
  
  // Calculate the savings percentage compared to the most expensive option
  const calculateSavings = () => {
    if (marketComparisons.length < 2) return 0;
    
    const cheapest = marketComparisons[0].totalPrice;
    const mostExpensive = marketComparisons[marketComparisons.length - 1].totalPrice;
    
    return ((mostExpensive - cheapest) / mostExpensive) * 100;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header title="Comparação de Preços" showBack />
        
        <div className="container mx-auto px-4 py-6 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-3">Sem produtos para comparar</h2>
            <p className="text-white mb-6">Adicione produtos ao carrinho primeiro</p>
            <Button asChild>
              <Link to="/products">Explorar produtos</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (marketComparisons.length === 0) {
    generateComparison();
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header title="Comparação de Preços" showBack />
        
        <div className="container mx-auto px-4 py-6 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white">Gerando comparação...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="Comparação de Preços" showBack />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <h2 className="text-xl font-semibold mb-6 text-white">
          Comparativo de preços para {cartItems.length} {cartItems.length === 1 ? 'produto' : 'produtos'}
        </h2>
        
        <div className="space-y-5">
          {marketComparisons.map((market, index) => (
            <div 
              key={market.marketId} 
              className={`market-card ${index === 0 ? 'market-card-cheapest' : 'market-card-other'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-medium text-white">{market.marketName}</h3>
                  {index === 0 && (
                    <Badge className="bg-secondary text-white border-none">Mais Barato</Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="price-display">
                    R$ {market.totalPrice.toFixed(2)}
                  </p>
                  {index > 0 && (
                    <p className="text-sm text-white/80">
                      +R$ {(market.totalPrice - marketComparisons[0].totalPrice).toFixed(2)} em relação ao mais barato
                    </p>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-white mt-3">
                <p>Clique em "Ver resultado" para mais detalhes</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-primary/20 p-4 rounded-lg border border-primary/30">
          <p className="text-lg text-white">
            Economia potencial: <span className="font-bold text-secondary">até {calculateSavings().toFixed(1)}%</span>
          </p>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button className="bg-secondary hover:bg-secondary/90 text-white" asChild>
            <Link to="/results">
              Ver resultado
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
