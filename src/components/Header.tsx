
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
};

const Header = ({ title, showBack = false, rightElement }: HeaderProps) => {
  const location = useLocation();
  
  return (
    <header className="bg-primary py-4 px-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-white hover:text-white hover:bg-primary/80"
              asChild
            >
              <Link to={location.pathname.includes('/results') ? '/comparison' : location.pathname.includes('/comparison') ? '/simulation' : '/'}>
                <ArrowLeft size={24} />
              </Link>
            </Button>
          )}
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
        {rightElement && <div>{rightElement}</div>}
      </div>
    </header>
  );
};

export default Header;
