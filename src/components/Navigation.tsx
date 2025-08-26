import { Button } from "@/components/ui/button";
import { Palette, Menu, User, Heart } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-creative rounded-md flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ArtForge</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#artists" className="text-white/90 hover:text-white transition-colors">
              Browse Artists
            </a>
            <a href="#commissions" className="text-white/90 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#gallery" className="text-white/90 hover:text-white transition-colors">
              Gallery
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Join as Artist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-accent transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <a href="#artists" className="text-white/90 hover:text-white transition-colors">
                Browse Artists
              </a>
              <a href="#commissions" className="text-white/90 hover:text-white transition-colors">
                How it Works
              </a>
              <a href="#gallery" className="text-white/90 hover:text-white transition-colors">
                Gallery
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 justify-start">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
                <Button variant="hero" size="sm" className="justify-start">
                  Join as Artist
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;