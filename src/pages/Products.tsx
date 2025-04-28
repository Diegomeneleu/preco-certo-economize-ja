
import React, { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { products, searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useShoppingContext();
  
  const filteredProducts = searchQuery ? searchProducts(searchQuery) : products;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        title="PreçoCerto" 
        rightElement={
          <Button variant="outline" className="text-white border-white hover:bg-white/20" asChild>
            <Link to="/simulation">
              <ShoppingCart className="mr-2" size={18} />
              <span>Carrinho</span>
              {totalItems > 0 && (
                <Badge className="ml-2 bg-secondary">{totalItems}</Badge>
              )}
            </Link>
          </Button>
        }
      />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            className="pl-10"
            placeholder="Pesquisar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Produtos</h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Nenhum produto encontrado para "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
