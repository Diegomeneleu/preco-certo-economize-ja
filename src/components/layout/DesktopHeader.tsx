
import React from "react";
import CartSummary from "./CartSummary";

const DesktopHeader = () => {
  return (
    <div className="hidden md:flex justify-between items-center bg-primary p-3 mb-4">
      <h2 className="font-bold text-white text-xl">PreçoCerto</h2>
      <CartSummary />
    </div>
  );
};

export default DesktopHeader;
