import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Settings, 
  Lightbulb, 
  Circle, 
  Car, 
  Smartphone, 
  Gauge, 
  Shield, 
  Snowflake, 
  Filter, 
  Zap, 
  Sparkles, 
  Cog, 
  Palette, 
  Trophy, 
  Search, 
  Truck, 
  AlertTriangle, 
  CreditCard 
} from "lucide-react";

const PartsServicesCategories = () => {
  // Parts categories (disabled for MVP)
  const partsCategories = [
    {
      title: "Exhaust Systems",
      count: 245,
      icon: Zap,
      href: "/parts/exhaust",
      description: "Performance exhaust, mufflers",
      isActive: false
    },
    {
      title: "Suspension",
      count: 189,
      icon: Settings,
      href: "/parts/suspension", 
      description: "Shocks, struts, springs",
      isActive: false
    },
    {
      title: "Lighting",
      count: 312,
      icon: Lightbulb,
      href: "/parts/lighting",
      description: "LED, HID, headlights",
      isActive: false
    },
    {
      title: "Wheels & Tires",
      count: 428,
      icon: Circle,
      href: "/parts/wheels-tires",
      description: "Alloy wheels, tire sets",
      isActive: false
    },
    {
      title: "Interior",
      count: 156,
      icon: Car,
      href: "/parts/interior",
      description: "Seats, dashboard, trim",
      isActive: false
    },
    {
      title: "Electronics",
      count: 278,
      icon: Smartphone,
      href: "/parts/electronics",
      description: "Audio, navigation, cameras",
      isActive: false
    }
  ];

  // Services categories (active for MVP)
  const servicesCategories = [
    {
      title: "Performance Tuning",
      count: 78,
      icon: Gauge,
      href: "/services?category=tuning",
      description: "ECU mapping, dyno tuning",
      isActive: true
    },
    {
      title: "Detailing",
      count: 156,
      icon: Sparkles,
      href: "/services?category=detailing",
      description: "Ceramic coating, polishing",
      isActive: true
    },
    {
      title: "Tire Services",
      count: 234,
      icon: Circle,
      href: "/services?category=tires",
      description: "Mounting, balancing, alignment",
      isActive: true
    },
    {
      title: "Engine Repair",
      count: 145,
      icon: Cog,
      href: "/services?category=engine",
      description: "Complete engine services",
      isActive: true
    },
    {
      title: "Bodywork",
      count: 123,
      icon: Palette,
      href: "/services?category=bodywork",
      description: "Dent repair, painting",
      isActive: true
    },
    {
      title: "Electrical Repair",
      count: 167,
      icon: Zap,
      href: "/services?category=electrical",
      description: "Wiring, diagnostics",
      isActive: true
    },
    {
      title: "Emergency Repair",
      count: 198,
      icon: AlertTriangle,
      href: "/services?category=emergency",
      description: "24/7 roadside assistance",
      isActive: true
    },
    {
      title: "General Maintenance",
      count: 289,
      icon: Wrench,
      href: "/services?category=maintenance",
      description: "Regular service, oil changes",
      isActive: true
    },
    {
      title: "Pre-Purchase Check",
      count: 89,
      icon: Search,
      href: "/services?category=inspection",
      description: "Comprehensive inspections",
      isActive: true
    },
    {
      title: "Fleet Services",
      count: 56,
      icon: Truck,
      href: "/services?category=fleet",
      description: "Commercial vehicle service",
      isActive: true
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Parts Section - DISABLED FOR MVP */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-muted-foreground mb-4 relative">
              Auto Parts Marketplace
              <Badge variant="secondary" className="ml-3 align-middle">
                Coming Soon
              </Badge>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality auto parts from trusted suppliers - launching soon!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partsCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.title}
                  className="group bg-card/50 rounded-lg border p-4 transition-all duration-200 cursor-not-allowed opacity-60"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {category.count} products
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Section - ACTIVE FOR MVP */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Professional Services
              <Badge variant="default" className="ml-3 align-middle bg-green-600">
                Available Now
              </Badge>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with certified mechanics and service providers across Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {servicesCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.title}
                  to={category.href}
                  className="group bg-card hover:bg-accent/10 rounded-lg border p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.count} providers
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-primary mb-2">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">
              Find trusted vehicle service providers near you or join our network of professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Search className="w-4 h-4 mr-2" />
                Find Services
              </Link>
              <Link 
                to="/list-services"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartsServicesCategories;