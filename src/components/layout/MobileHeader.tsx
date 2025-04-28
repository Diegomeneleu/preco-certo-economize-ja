
import React from "react";
import MobileSidebar from "./MobileSidebar";
import CartSummary from "./CartSummary";

const MobileHeader = () => {
  return (
    <div className="p-4 flex justify-between items-center md:hidden">
      <MobileSidebar />
      <h2 className="font-bold text-primary text-xl">PreçoCerto</h2>
      <CartSummary />
    </div>
  );
};

export default MobileHeader;
