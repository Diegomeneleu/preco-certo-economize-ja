
import React from "react";
import MobileSidebar from "./MobileSidebar";
import CartSummary from "./CartSummary";

const MobileHeader = () => {
  return (
    <div className="p-4 flex justify-between items-center md:hidden bg-sidebar">
      <MobileSidebar />
      <h2 className="font-bold text-white text-xl">PreçoCerto</h2>
      <CartSummary />
    </div>
  );
};

export default MobileHeader;
