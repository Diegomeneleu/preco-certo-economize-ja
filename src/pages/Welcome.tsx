
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sidebar to-primary/80">
      <div className="container flex flex-col items-center justify-center flex-grow px-4 py-10">
        <div className="bg-sidebar/80 p-8 rounded-xl shadow-lg border border-accent/20 backdrop-blur-sm w-full max-w-md animate-fade-in">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary/20 p-4 rounded-full">
                <ShoppingCart size={40} className="text-secondary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">PreçoCerto</h1>
            <p className="text-lg text-white/80">
              Compre inteligente, economize de verdade!
            </p>
          </div>
          
          <div className="space-y-6">
            <Button
              className="w-full py-6 text-lg bg-purple-gradient hover:opacity-90"
              asChild
            >
              <Link to="/products">
                Entrar como convidado
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="w-full py-6 text-lg border-accent text-white hover:bg-accent/20"
              disabled
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Entrar com Google
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-accent/30"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-sidebar/80 px-2 text-white/70">
                  Sobre o aplicativo
                </span>
              </div>
            </div>
            
            <div className="bg-accent/10 p-4 rounded-lg text-sm text-white/80 border border-accent/20">
              <p className="mb-2">
                <strong>PreçoCerto</strong> é o seu assistente de compras inteligente.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Monte sua lista de compras</li>
                <li>Compare preços em diferentes supermercados</li>
                <li>Economize tempo e dinheiro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-sidebar/90 py-4 px-6 text-center">
        <p className="text-sm text-white/60">
          © 2025 PreçoCerto - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Welcome;
