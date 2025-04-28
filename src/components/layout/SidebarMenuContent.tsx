
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, BarChart2, BookOpen } from "lucide-react";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

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

export default SidebarMenuContent;
