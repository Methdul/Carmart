import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/car-mart-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Car Mart" 
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold">Car Mart</span>
                <span className="text-xs text-primary-foreground/80">Premium Vehicles</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Sri Lanka's premier vehicle marketplace connecting buyers with verified sellers. 
              Experience the future of vehicle trading with AI health scores and smart comparison tools.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Buy Vehicles</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sell Your Vehicle</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Vehicle Comparison</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">AI Health Scores</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Verified Sellers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Premium Features</a></li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Cars</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">SUVs</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Trucks</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Motorcycles</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Vans</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Electric Vehicles</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>+94 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@carmart.lk</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span>123 Business District, Colombo 03, Sri Lanka</span>
              </div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Customer Support</h4>
              <p className="text-sm text-primary-foreground/80">
                Available 24/7 to help you find your perfect vehicle
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-foreground/80 text-sm">
            © 2024 Car Mart. All rights reserved. Premium Vehicle Marketplace.
          </div>
          <div className="flex space-x-6 text-sm text-primary-foreground/80 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;