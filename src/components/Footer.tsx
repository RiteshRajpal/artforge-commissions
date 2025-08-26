import { Button } from "@/components/ui/button";
import { Palette, Twitter, Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-creative rounded-md flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ArtForge</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Connecting creative minds with talented artists worldwide. Commission custom digital art that brings your vision to life.
            </p>
          </div>
          
          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Customers</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Browse Artists</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Commission Guidelines</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pricing & Packages</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Customer Support</a></li>
            </ul>
          </div>
          
          {/* For Artists */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Artists</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Join as Artist</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Artist Resources</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Commission Tips</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Artist Community</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm">
              Get the latest featured artists and commission opportunities.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-md text-primary bg-primary-foreground/10 border border-primary-foreground/20 focus:outline-none focus:border-accent"
              />
              <Button variant="creative" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 ArtForge Commissions. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;