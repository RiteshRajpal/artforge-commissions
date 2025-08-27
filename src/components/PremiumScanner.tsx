import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Scan, Sparkles, Lock, Check } from "lucide-react";

interface ScanResult {
  quality: string;
  style: string;
  recommendations: string[];
  marketValue: string;
}

const PremiumScanner = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [hasPremium, setHasPremium] = useState(false);

  const mockScanResults: ScanResult[] = [
    {
      quality: "Professional",
      style: "Anime/Digital Art",
      recommendations: [
        "Consider adding more depth with background elements",
        "The character design shows excellent proportions",
        "Color palette is vibrant and well-balanced"
      ],
      marketValue: "$150-300"
    },
    {
      quality: "Advanced",
      style: "Fantasy/Concept Art",
      recommendations: [
        "Lighting effects are masterfully executed",
        "Consider adding more environmental storytelling",
        "Texture work shows professional expertise"
      ],
      marketValue: "$200-500"
    }
  ];

  const handleScan = () => {
    if (!hasPremium) {
      handleUpgrade();
      return;
    }

    setScanning(true);
    // Simulate AI scanning
    setTimeout(() => {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
      setScanResult(randomResult);
      setScanning(false);
      toast({
        title: "Scan Complete!",
        description: "Your artwork has been analyzed successfully.",
      });
    }, 3000);
  };

  const handleUpgrade = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to upgrade to premium.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId: 'premium_scanner',
          amount: 999, // $9.99
          mode: 'payment'
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-accent" />
          AI Art Scanner
          {hasPremium && <Badge variant="secondary" className="bg-gradient-creative text-white">Premium</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasPremium && (
          <div className="bg-gradient-creative p-6 rounded-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Unlock Premium Features</h3>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                AI-powered artwork quality analysis
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Style detection and classification
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Market value estimation
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Professional improvement recommendations
              </li>
            </ul>
            <Button
              onClick={handleUpgrade}
              variant="secondary"
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              Upgrade to Premium - $9.99
            </Button>
          </div>
        )}

        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
          <Scan className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">
            Drop your artwork here or click to upload
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="artwork-upload"
          />
          <label htmlFor="artwork-upload">
            <Button variant="outline" className="cursor-pointer">
              Choose File
            </Button>
          </label>
        </div>

        <Button
          onClick={handleScan}
          disabled={scanning}
          className={`w-full ${hasPremium ? 'bg-gradient-creative text-white' : ''}`}
        >
          {scanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Analyzing Artwork...
            </>
          ) : hasPremium ? (
            <>
              <Scan className="w-4 h-4 mr-2" />
              Analyze Artwork
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Unlock Scanner
            </>
          )}
        </Button>

        {scanResult && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Scan Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Quality Assessment</h4>
                <Badge variant="secondary" className="bg-gradient-creative text-white">
                  {scanResult.quality}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Detected Style</h4>
                <p className="text-muted-foreground">{scanResult.style}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Market Value Estimate</h4>
                <p className="text-lg font-semibold text-primary">{scanResult.marketValue}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {scanResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default PremiumScanner;