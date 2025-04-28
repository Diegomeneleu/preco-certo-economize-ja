
import React, { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { products, searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const { savedLists, loadSavedList, deleteSavedList } = useShoppingContext();

  // Get all unique categories
  const allCategories = ["todos", ...new Set(products.flatMap(p => p.categories))].sort();
  
  // Filter products by search query and category
  const filteredProducts = searchQuery || categoryFilter !== "todos" 
    ? products.filter(product => {
        const matchesSearch = searchQuery 
          ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
          : true;
        
        const matchesCategory = categoryFilter !== "todos" 
          ? product.categories.includes(categoryFilter)
          : true;
        
        return matchesSearch && matchesCategory;
      })
    : products;
  
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
            <h2 className="text-xl font-semibold mb-4 text-white">Listas salvas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedLists.map((list) => (
                <div 
                  key={list.id} 
                  className="bg-accent/20 p-4 rounded-lg shadow-sm border border-accent/30"
                >
                  <h3 className="font-medium mb-1 text-white">{list.name}</h3>
                  <p className="text-sm text-white/80 mb-2">
                    {list.items.length} {list.items.length === 1 ? 'item' : 'itens'}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 text-white border-white/30 hover:bg-white/10" 
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
        
        {/* Category selector */}
        <div className="mb-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3 text-white">Categorias</h2>
          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  categoryFilter === category
                    ? "bg-secondary text-white font-medium"
                    : "bg-accent/20 text-white/80 hover:bg-accent/30"
                }`}
                onClick={() => setCategoryFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Produtos</h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-white/70">Nenhum produto encontrado para "{searchQuery}"</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
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
