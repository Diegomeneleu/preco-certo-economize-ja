
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, BarChart2, BookOpen, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SheetTrigger, Sheet, SheetContent } from "@/components/ui/sheet";

const MobileSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <div className="flex flex-col gap-2">
            <Link 
              to="/products" 
              className={cn(
                "flex items-center p-2 rounded-md transition-colors",
                isActive("/products") ? "bg-primary text-white" : "hover:bg-primary/10"
              )}
            >
              <Home size={20} className="mr-2" />
              <span>Produtos</span>
            </Link>
            <Link 
              to="/simulation" 
              className={cn(
                "flex items-center p-2 rounded-md transition-colors",
                isActive("/simulation") ? "bg-primary text-white" : "hover:bg-primary/10"
              )}
            >
              <ShoppingCart size={20} className="mr-2" />
              <span>Carrinho</span>
            </Link>
            <Link 
              to="/comparison" 
              className={cn(
                "flex items-center p-2 rounded-md transition-colors",
                isActive("/comparison") ? "bg-primary text-white" : "hover:bg-primary/10"
              )}
            >
              <BarChart2 size={20} className="mr-2" />
              <span>Comparar</span>
            </Link>
            <Link 
              to="/results" 
              className={cn(
                "flex items-center p-2 rounded-md transition-colors",
                isActive("/results") ? "bg-primary text-white" : "hover:bg-primary/10"
              )}
            >
              <BookOpen size={20} className="mr-2" />
              <span>Resultados</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
