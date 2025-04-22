
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Recycle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock recycling items database
const recyclingDatabase = [
  { 
    name: "Plastic Bottle", 
    material: "PET Plastic", 
    recyclable: true, 
    instructions: "Remove cap and label if possible. Rinse and compress before recycling.",
    disposal: "Blue recycling bin"
  },
  { 
    name: "Cardboard Box", 
    material: "Cardboard", 
    recyclable: true, 
    instructions: "Flatten completely. Remove any tape or labels if possible.",
    disposal: "Paper recycling bin"
  },
  { 
    name: "Glass Jar", 
    material: "Glass", 
    recyclable: true, 
    instructions: "Remove lid and rinse thoroughly before recycling.",
    disposal: "Glass recycling container"
  },
  { 
    name: "Coffee Cup", 
    material: "Paper with Plastic Lining", 
    recyclable: false, 
    instructions: "Most coffee cups have a plastic lining that makes them non-recyclable.",
    disposal: "General waste"
  },
  { 
    name: "Aluminum Can", 
    material: "Aluminum", 
    recyclable: true, 
    instructions: "Rinse thoroughly. No need to remove labels.",
    disposal: "Metal recycling bin"
  },
];

interface ResultsDisplayProps {
  imageUrl: string | null;
  onRecycled: (item: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ imageUrl, onRecycled }) => {
  const [result, setResult] = useState<typeof recyclingDatabase[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [recycled, setRecycled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (imageUrl) {
      setLoading(true);
      setRecycled(false);
      
      // Simulate processing the image and identifying the item
      setTimeout(() => {
        // Get a random item from our mock database for demo purposes
        const randomItem = recyclingDatabase[Math.floor(Math.random() * recyclingDatabase.length)];
        setResult(randomItem);
        setLoading(false);
      }, 2000);
    }
  }, [imageUrl]);

  const handleRecycle = () => {
    if (result) {
      setRecycled(true);
      onRecycled(result.name);
      toast({
        title: "Great job!",
        description: "You've successfully recycled this item.",
      });
    }
  };

  if (!imageUrl) return null;

  return (
    <div className="mt-8 w-full max-w-md mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-recycling-light p-4">
          <CardTitle className="flex justify-between items-center">
            <span>Recycling Results</span>
            {result && (
              <Badge className={result.recyclable ? "bg-recycling-primary" : "bg-recycling-earth"}>
                {result.recyclable ? "Recyclable" : "Non-Recyclable"}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 border-4 border-recycling-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Analyzing your item...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square relative rounded-md overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Scanned item" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{result?.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Material: {result?.material}</p>
                  <p className="text-sm mb-4">{result?.instructions}</p>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm font-medium">Disposal Method:</p>
                    <p className="text-sm">{result?.disposal}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-recycling-primary hover:bg-recycling-accent gap-2"
                onClick={handleRecycle}
                disabled={recycled}
              >
                {recycled ? (
                  <>
                    <Check className="h-5 w-5" />
                    Item Recycled!
                  </>
                ) : (
                  <>
                    <Recycle className="h-5 w-5" />
                    Mark as Recycled
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
