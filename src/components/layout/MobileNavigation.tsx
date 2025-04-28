
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, BarChart2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2 md:hidden z-10">
        <div className="flex justify-around items-center">
          <Link 
            to="/products" 
            className={cn(
              "flex flex-col items-center p-2 rounded-md transition-colors", 
              isActive("/products") ? "text-primary" : "text-gray-500 hover:text-primary"
            )}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Produtos</span>
          </Link>
          
          <Link 
            to="/simulation" 
            className={cn(
              "flex flex-col items-center p-2 rounded-md transition-colors", 
              isActive("/simulation") ? "text-primary" : "text-gray-500 hover:text-primary"
            )}
          >
            <ShoppingCart size={20} />
            <span className="text-xs mt-1">Carrinho</span>
          </Link>
          
          <Link 
            to="/comparison" 
            className={cn(
              "flex flex-col items-center p-2 rounded-md transition-colors", 
              isActive("/comparison") ? "text-primary" : "text-gray-500 hover:text-primary"
            )}
          >
            <BarChart2 size={20} />
            <span className="text-xs mt-1">Comparar</span>
          </Link>
          
          <Link 
            to="/results" 
            className={cn(
              "flex flex-col items-center p-2 rounded-md transition-colors", 
              isActive("/results") ? "text-primary" : "text-gray-500 hover:text-primary"
            )}
          >
            <BookOpen size={20} />
            <span className="text-xs mt-1">Resultados</span>
          </Link>
        </div>
      </nav>
      
      {/* Add padding to the bottom on mobile to account for navigation bar */}
      <div className="pb-16 md:pb-0"></div>
    </>
  );
};

export default MobileNavigation;
