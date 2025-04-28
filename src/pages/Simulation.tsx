
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CartItemRow from "@/components/CartItemRow";
import { useShoppingContext } from "@/contexts/ShoppingContext";

const Simulation = () => {
  const { cartItems, generateComparison } = useShoppingContext();
  
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
            <div className="card-gradient rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Produtos no carrinho</h2>
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
            
            <div className="flex justify-end">
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
