import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Wrench } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wrench className="h-10 w-10 text-primary-foreground" />
              <div className="flex flex-col">
                <span className="text-xl font-bold">Vehicle Services Hub</span>
                <span className="text-xs text-primary-foreground/80">Premium Services</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Sri Lanka's premier vehicle service marketplace connecting vehicle owners with verified service providers. 
              Experience professional automotive services with trusted mechanics and garages.
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
              {/* Active Service Link */}
              <li>
                <Link to="/services" className="hover:text-accent transition-colors flex items-center">
                  <Wrench className="w-4 h-4 mr-2" />
                  Find Services
                </Link>
              </li>
              
              {/* Disabled Features */}
              <li className="flex items-center justify-between opacity-60">
                <span className="cursor-not-allowed">Buy Vehicles</span>
                <Badge variant="secondary" className="text-xs">Soon</Badge>
              </li>
              <li className="flex items-center justify-between opacity-60">
                <span className="cursor-not-allowed">Sell Your Vehicle</span>
                <Badge variant="secondary" className="text-xs">Soon</Badge>
              </li>
              <li className="flex items-center justify-between opacity-60">
                <span className="cursor-not-allowed">Auto Parts</span>
                <Badge variant="secondary" className="text-xs">Soon</Badge>
              </li>
              <li className="flex items-center justify-between opacity-60">
                <span className="cursor-not-allowed">Vehicle Rentals</span>
                <Badge variant="secondary" className="text-xs">Phase 2</Badge>
              </li>
              <li className="flex items-center justify-between opacity-60">
                <span className="cursor-not-allowed">Vehicle Comparison</span>
                <Badge variant="secondary" className="text-xs">Soon</Badge>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Categories</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/services?category=maintenance" className="hover:text-accent transition-colors">General Maintenance</Link></li>
              <li><Link to="/services?category=repair" className="hover:text-accent transition-colors">Repair Services</Link></li>
              <li><Link to="/services?category=detailing" className="hover:text-accent transition-colors">Car Wash & Detailing</Link></li>
              <li><Link to="/services?category=emergency" className="hover:text-accent transition-colors">Emergency Services</Link></li>
              <li><Link to="/services?category=inspection" className="hover:text-accent transition-colors">Vehicle Inspection</Link></li>
              <li><Link to="/services?category=tuning" className="hover:text-accent transition-colors">Performance Tuning</Link></li>
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
                <span>info@vehicleserviceshub.lk</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span>123 Business District, Colombo 03, Sri Lanka</span>
              </div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Customer Support</h4>
              <p className="text-sm text-primary-foreground/80">
                Available 24/7 to help you find the best vehicle services
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-foreground/80 text-sm">
            © 2024 Vehicle Services Hub. All rights reserved. Premium Vehicle Service Marketplace.
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