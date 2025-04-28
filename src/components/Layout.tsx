
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ShoppingProvider } from "../contexts/ShoppingContext";
import { ShoppingCart, Home, BarChart2, BookOpen, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { SheetTrigger, Sheet, SheetContent } from "./ui/sheet";

// Renamed from SidebarMenu to SidebarMenuContent to avoid conflict with the import
const SidebarMenuContent = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={isActive("/products")}
            tooltip="Produtos"
            asChild
          >
            <Link to="/products">
              <Home size={20} />
              <span>Produtos</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={isActive("/simulation")}
            tooltip="Carrinho"
            asChild
          >
            <Link to="/simulation">
              <ShoppingCart size={20} />
              <span>Carrinho</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={isActive("/comparison")}
            tooltip="Comparar"
            asChild
          >
            <Link to="/comparison">
              <BarChart2 size={20} />
              <span>Comparar</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={isActive("/results")}
            tooltip="Resultados"
            asChild
          >
            <Link to="/results">
              <BookOpen size={20} />
              <span>Resultados</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  );
};

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

const Layout = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <ShoppingProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row w-full">
          <div className="hidden md:block">
            <Sidebar variant="floating" collapsible="icon">
              <SidebarHeader className="flex items-center justify-center p-4">
                <h2 className="font-bold text-primary">PreçoCerto</h2>
              </SidebarHeader>
              <SidebarMenuContent />
              <SidebarFooter className="p-4">
                <p className="text-xs text-gray-500">© 2025 PreçoCerto</p>
              </SidebarFooter>
            </Sidebar>
          </div>
          
          <div className="flex-1">
            <div className="p-4 flex justify-between items-center md:hidden">
              <MobileSidebar />
              <h2 className="font-bold text-primary text-xl">PreçoCerto</h2>
            </div>
            <div className="p-4 md:p-8">
              <Outlet />
            </div>
          </div>
          
          {/* Bottom Navigation Bar for Mobile */}
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
        </div>
      </SidebarProvider>
    </ShoppingProvider>
  );
};

export default Layout;
