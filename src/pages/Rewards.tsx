
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trophy, Star, ChartBar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const RewardsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get user stats from localStorage
  const getUserStats = () => {
    const savedStats = localStorage.getItem('recycleVisionStats');
    if (savedStats) {
      try {
        return JSON.parse(savedStats);
      } catch (e) {
        console.error('Failed to parse stored stats');
        return { points: 0 };
      }
    }
    return { points: 0 };
  };
  
  const userStats = getUserStats();
  const availablePoints = userStats.points || 0;
  
  const handleClaimReward = (reward: string, points: number) => {
    if (availablePoints >= points) {
      // Update points in localStorage
      const updatedStats = {
        ...userStats,
        points: availablePoints - points
      };
      localStorage.setItem('recycleVisionStats', JSON.stringify(updatedStats));
      
      toast({
        title: "Reward Claimed!",
        description: `You've successfully claimed: ${reward}`,
      });
      
      // Force refresh of the component
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast({
        title: "Not enough points",
        description: `You need ${points - availablePoints} more points to claim this reward.`,
        variant: "destructive",
      });
    }
  };
  
  const rewards = [
    {
      title: "10% Discount",
      description: "Get 10% off your next purchase at participating eco-friendly stores",
      points: 100,
      icon: <Trophy className="h-10 w-10 text-recycling-primary" />
    },
    {
      title: "Plant a Tree",
      description: "We'll plant a tree in your name through our reforestation partners",
      points: 250,
      icon: <Star className="h-10 w-10 text-recycling-primary" />
    },
    {
      title: "Reusable Kit",
      description: "Receive a free reusable shopping bag, water bottle, and utensil set",
      points: 500,
      icon: <ChartBar className="h-10 w-10 text-recycling-primary" />
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col leaf-pattern">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Rewards</h1>
            <p className="text-muted-foreground">
              You have <span className="font-medium text-recycling-primary">{availablePoints} points</span> available to redeem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rewards.map((reward, index) => (
              <Card key={index} className="border border-recycling-light">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{reward.title}</CardTitle>
                    <CardDescription className="mt-1">{reward.points} points</CardDescription>
                  </div>
                  <div>{reward.icon}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleClaimReward(reward.title, reward.points)}
                    className={`w-full ${availablePoints >= reward.points ? 'bg-recycling-primary hover:bg-recycling-accent' : 'bg-muted text-muted-foreground'}`}
                    disabled={availablePoints < reward.points}
                  >
                    {availablePoints >= reward.points ? 'Claim Reward' : 'Not Enough Points'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-recycling-primary text-recycling-primary hover:bg-recycling-light"
              onClick={() => navigate('/')}
            >
              Scan More Items to Earn Points
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="bg-recycling-primary py-4 text-white text-center text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} RecycleVision Rewards • Helping you recycle smarter</p>
        </div>
      </footer>
    </div>
  );
};

export default RewardsPage;
