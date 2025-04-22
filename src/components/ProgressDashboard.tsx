
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface ProgressDashboardProps {
  totalScans: number;
  totalRecycled: number;
  points: number;
  streak: number;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ 
  totalScans, 
  totalRecycled, 
  points,
  streak
}) => {
  const navigate = useNavigate();
  
  // Calculate percentages for progress bars
  const recycleRate = totalScans > 0 ? Math.round((totalRecycled / totalScans) * 100) : 0;
  
  // Calculate level and progress to next level (1 level per 50 points)
  const level = Math.floor(points / 50) + 1;
  const nextLevelPoints = level * 50;
  const levelProgress = Math.round((points % 50) / 50 * 100);

  return (
    <div className="mt-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Recycling Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Items Scanned</span>
              <span className="font-medium">{totalScans}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Items Recycled</span>
              <span className="font-medium">{totalRecycled}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Recycle Rate</span>
              <span className="font-medium">{recycleRate}%</span>
            </div>
            <Progress value={recycleRate} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Rewards Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-recycling-primary p-2 rounded-full mr-3">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Level {level}</p>
                <p className="text-sm text-muted-foreground">{points} points</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{nextLevelPoints - points} pts to next level</p>
              <p className="text-xs text-muted-foreground">
                Current streak: {streak} {streak === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Level Progress</span>
              <span className="text-sm">{levelProgress}%</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
          </div>
          <button 
            onClick={() => navigate('/rewards')}
            className="text-sm text-recycling-primary hover:text-recycling-accent font-medium mt-2"
          >
            View Available Rewards →
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
