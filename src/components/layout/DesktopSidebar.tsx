
import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import SidebarMenuContent from "./SidebarMenuContent";

const DesktopSidebar = () => {
  return (
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
  );
};

export default DesktopSidebar;
