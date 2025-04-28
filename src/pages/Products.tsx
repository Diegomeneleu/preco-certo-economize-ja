
import React, { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { products, searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useShoppingContext } from "@/contexts/ShoppingContext";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { savedLists, loadSavedList, deleteSavedList } = useShoppingContext();
  
  const filteredProducts = searchQuery ? searchProducts(searchQuery) : products;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        title="Produtos" 
        showBack={false}
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
        
        {savedLists.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Listas salvas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedLists.map((list) => (
                <div 
                  key={list.id} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="font-medium mb-1">{list.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {list.items.length} {list.items.length === 1 ? 'item' : 'itens'}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1" 
                      onClick={() => loadSavedList(list.id)}
                    >
                      Carregar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 text-destructive border-destructive hover:bg-destructive/10" 
                      onClick={() => deleteSavedList(list.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Produtos</h2>
          
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
