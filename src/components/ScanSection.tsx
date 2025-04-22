
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScanSection = ({ onScanComplete }: { onScanComplete: (imageUrl: string) => void }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScanning(true);
      // Simulate processing time
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        onScanComplete(imageUrl);
        setScanning(false);
        toast({
          title: "Item Scanned!",
          description: "Processing your item for recycling information...",
        });
      }, 1500);
    }
  };

  const activateCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current && cameraActive) {
      setScanning(true);
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          // Simulate processing time
          setTimeout(() => {
            onScanComplete(imageUrl);
            setScanning(false);
            toast({
              title: "Item Captured!",
              description: "Processing your item for recycling information...",
            });
          }, 1500);
        }
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "camera") {
      activateCamera();
    } else if (cameraActive) {
      stopCamera();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Scan Your Item</h2>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upload">Upload Photo</TabsTrigger>
            <TabsTrigger value="camera">Use Camera</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="flex flex-col items-center">
            <div className="border-2 border-dashed border-recycling-primary rounded-lg p-8 w-full text-center mb-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <p className="mb-4 text-muted-foreground">Upload a photo of the item you want to recycle</p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-recycling-primary hover:bg-recycling-accent"
                disabled={scanning}
              >
                {scanning ? "Processing..." : "Select Image"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="camera">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full h-64 bg-black rounded-lg overflow-hidden relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    Camera inactive
                  </div>
                )}
              </div>
              <Button
                onClick={cameraActive ? captureImage : activateCamera}
                className="bg-recycling-primary hover:bg-recycling-accent"
                disabled={scanning}
              >
                {scanning ? "Processing..." : cameraActive ? "Take Photo" : "Start Camera"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScanSection;
