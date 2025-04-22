
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ScanSection from '@/components/ScanSection';
import ResultsDisplay from '@/components/ResultsDisplay';
import ProgressDashboard from '@/components/ProgressDashboard';

const Index = () => {
  // State for user progress
  const [userStats, setUserStats] = useState({
    totalScans: 0,
    totalRecycled: 0,
    points: 0,
    streak: 1
  });
  
  // State for the current scan
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  
  // Load user stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem('recycleVisionStats');
    if (savedStats) {
      try {
        setUserStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse stored stats');
      }
    }
  }, []);
  
  // Save user stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recycleVisionStats', JSON.stringify(userStats));
  }, [userStats]);
  
  // Handle when scan is complete
  const handleScanComplete = (imageUrl: string) => {
    setScannedImage(imageUrl);
    setUserStats(prev => ({
      ...prev,
      totalScans: prev.totalScans + 1
    }));
  };
  
  // Handle when an item is marked as recycled
  const handleItemRecycled = (item: string) => {
    setUserStats(prev => ({
      ...prev,
      totalRecycled: prev.totalRecycled + 1,
      points: prev.points + 10
    }));
    
    // Log for demonstration purposes
    console.log(`Item recycled: ${item}`);
  };

  return (
    <div className="min-h-screen flex flex-col leaf-pattern">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!scannedImage && (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Recycle with Vision</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Scan any item to get recycling information and earn rewards for your environmental efforts.
              </p>
            </div>
          )}
          
          {!scannedImage ? (
            <ScanSection onScanComplete={handleScanComplete} />
          ) : (
            <ResultsDisplay 
              imageUrl={scannedImage} 
              onRecycled={handleItemRecycled}
            />
          )}
          
          <ProgressDashboard 
            totalScans={userStats.totalScans}
            totalRecycled={userStats.totalRecycled}
            points={userStats.points}
            streak={userStats.streak}
          />
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

export default Index;
