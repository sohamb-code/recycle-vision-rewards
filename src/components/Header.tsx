
import React from 'react';
import { Recycle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-recycling-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Recycle className="h-6 w-6" />
          <h1 className="text-xl font-bold">RecycleVision Rewards</h1>
        </div>
        <nav>
          <Button 
            variant="ghost" 
            className="text-white hover:text-recycling-light" 
            onClick={() => navigate('/rewards')}
          >
            <Trophy className="h-5 w-5 mr-1" />
            <span>Rewards</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
