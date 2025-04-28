
import React from "react";
import { Outlet } from "react-router-dom";
import { ShoppingProvider } from "../contexts/ShoppingContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import DesktopSidebar from "./layout/DesktopSidebar";
import MobileHeader from "./layout/MobileHeader";
import DesktopHeader from "./layout/DesktopHeader";
import MobileNavigation from "./layout/MobileNavigation";

const Layout = () => {
  return (
    <ShoppingProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-background flex flex-col md:flex-row w-full">
          {/* Desktop Sidebar */}
          <DesktopSidebar />
          
          <div className="flex-1">
            {/* Mobile Header with Menu and Cart */}
            <MobileHeader />
            
            {/* Desktop Header */}
            <DesktopHeader />
            
            {/* Main Content */}
            <div className="p-4 md:p-8">
              <Outlet />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </SidebarProvider>
    </ShoppingProvider>
  );
};

export default Layout;
