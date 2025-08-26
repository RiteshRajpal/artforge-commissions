import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Palette, User } from "lucide-react";

const CommissionShowcase = () => {
  const mockCommissions = [
    {
      id: 1,
      title: "Anime Portrait Commission",
      artist: "SakuraArt",
      rating: 4.9,
      price: "$45",
      timeframe: "3-5 days",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=faces",
      tags: ["Anime", "Portrait", "Digital Art"]
    },
    {
      id: 2,
      title: "Logo Design & Branding",
      artist: "PixelMaster",
      rating: 4.8,
      price: "$120",
      timeframe: "5-7 days",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
      tags: ["Logo", "Branding", "Vector"]
    },
    {
      id: 3,
      title: "Fantasy Character Art",
      artist: "DragonPainter",
      rating: 5.0,
      price: "$85",
      timeframe: "7-10 days",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      tags: ["Fantasy", "Character", "Concept Art"]
    }
  ];

  return (
    <section id="commissions" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-creative bg-clip-text text-transparent">
            Popular Commissions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most requested artwork styles and connect with talented artists ready to bring your vision to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mockCommissions.map((commission) => (
            <Card key={commission.id} className="overflow-hidden hover:shadow-creative transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={commission.image} 
                  alt={commission.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {commission.price}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-medium">{commission.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{commission.timeframe}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{commission.title}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">by {commission.artist}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {commission.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="default" className="w-full">
                  <Palette className="w-4 h-4" />
                  Commission Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="creative" size="lg">
            Browse All Artists
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommissionShowcase;