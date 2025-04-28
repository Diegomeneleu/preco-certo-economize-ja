
import React from "react";
import { Outlet } from "react-router-dom";
import { ShoppingProvider } from "../contexts/ShoppingContext";

const Layout = () => {
  return (
    <ShoppingProvider>
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    </ShoppingProvider>
  );
};

export default Layout;
