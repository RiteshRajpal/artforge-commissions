import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, Users, Star, Zap } from "lucide-react";
import heroArtwork from "@/assets/hero-artwork.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0">
        <img 
          src={heroArtwork} 
          alt="Digital art workspace" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Palette className="w-12 h-12 text-accent opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
        <Star className="w-8 h-8 text-secondary opacity-60" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            ArtForge
            <span className="block text-4xl md:text-5xl text-accent font-light">
              Commissions
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with talented digital artists and bring your creative visions to life. 
            From portraits to logos, anime to wallpapers - commission custom art that's uniquely yours.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            <Users className="w-5 h-5" />
            Find Artists
          </Button>
          <Button variant="creative" size="lg" className="text-lg px-8 py-4">
            <Zap className="w-5 h-5" />
            Start Creating
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300 shadow-creative">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Custom Artwork</h3>
            <p className="text-white/80">
              Describe your vision and get personalized digital art created just for you
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300 shadow-creative">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Talented Artists</h3>
            <p className="text-white/80">
              Browse portfolios and connect with skilled artists who match your style
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300 shadow-creative">
            <div className="w-16 h-16 bg-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure Payments</h3>
            <p className="text-white/80">
              Safe transactions with artists getting paid upon delivery completion
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;