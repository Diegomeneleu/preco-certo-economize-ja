
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { useShoppingContext } from "@/contexts/ShoppingContext";

const Results = () => {
  const { marketComparisons, clearCart } = useShoppingContext();
  
  if (!marketComparisons.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Resultado" showBack />
        <div className="container mx-auto px-4 py-6 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p>Sem dados de comparação disponíveis</p>
            <Button className="mt-4" asChild>
              <Link to="/products">Voltar para produtos</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Get cheapest and most expensive markets
  const cheapestMarket = marketComparisons[0];
  const mostExpensiveMarket = marketComparisons[marketComparisons.length - 1];
  
  // Calculate savings
  const savingsAmount = mostExpensiveMarket.totalPrice - cheapestMarket.totalPrice;
  const savingsPercentage = (savingsAmount / mostExpensiveMarket.totalPrice) * 100;

  const handleNewSimulation = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Resultado" showBack />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-secondary mb-3">
              <Check size={32} />
            </div>
            <h2 className="text-2xl font-bold">Recomendação</h2>
            <p className="text-gray-600">O mercado mais econômico é:</p>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-secondary">{cheapestMarket.marketName}</h3>
            <p className="text-xl font-semibold mt-2">R$ {cheapestMarket.totalPrice.toFixed(2)}</p>
          </div>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700">Economia total:</p>
                <p className="text-lg font-semibold">R$ {savingsAmount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-700">Em percentual:</p>
                <p className="text-lg font-semibold text-secondary">{savingsPercentage.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Comparação completa</h3>
          <div className="space-y-3">
            {marketComparisons.map((market, index) => (
              <div 
                key={market.marketId}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  index === 0 ? 'bg-green-50 border border-green-100' : 'bg-gray-50'
                }`}
              >
                <div>
                  <p className={`font-medium ${index === 0 ? 'text-secondary' : ''}`}>
                    {market.marketName} {index === 0 && '✓'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    R$ {market.totalPrice.toFixed(2)}
                  </p>
                  {index > 0 && (
                    <p className="text-sm text-gray-500">
                      +{((market.totalPrice / cheapestMarket.totalPrice - 1) * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            className="bg-secondary hover:bg-secondary/90" 
            onClick={handleNewSimulation}
            asChild
          >
            <Link to="/products">
              Nova simulação
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
