import { Link } from "react-router-dom";
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
  // Updated parts categories
  const partsCategories = [
    {
      title: "Exhaust Systems",
      count: 245,
      icon: Zap,
      href: "/parts/exhaust",
      description: "Performance exhaust, mufflers"
    },
    {
      title: "Suspension",
      count: 189,
      icon: Settings,
      href: "/parts/suspension", 
      description: "Shocks, struts, springs"
    },
    {
      title: "Lighting",
      count: 312,
      icon: Lightbulb,
      href: "/parts/lighting",
      description: "LED, HID, headlights"
    },
    {
      title: "Wheels & Tires",
      count: 428,
      icon: Circle,
      href: "/parts/wheels-tires",
      description: "Alloy wheels, tire sets"
    },
    {
      title: "Interior",
      count: 156,
      icon: Car,
      href: "/parts/interior",
      description: "Seats, dashboard, trim"
    },
    {
      title: "Electronics",
      count: 278,
      icon: Smartphone,
      href: "/parts/electronics",
      description: "Audio, navigation, cameras"
    },
    {
      title: "Performance",
      count: 167,
      icon: Gauge,
      href: "/parts/performance",
      description: "Turbo, intake, ECU"
    },
    {
      title: "Body Parts",
      count: 203,
      icon: Shield,
      href: "/parts/body",
      description: "Bumpers, panels, mirrors"
    },
    {
      title: "Cooling System",
      count: 134,
      icon: Snowflake,
      href: "/parts/cooling",
      description: "Radiators, fans, hoses"
    },
    {
      title: "Filters",
      count: 298,
      icon: Filter,
      href: "/parts/filters",
      description: "Air, oil, fuel filters"
    },
    {
      title: "Electrical",
      count: 187,
      icon: Zap,
      href: "/parts/electrical",
      description: "Alternators, batteries"
    },
    {
      title: "Tools",
      count: 92,
      icon: Wrench,
      href: "/parts/tools",
      description: "Diagnostic, repair tools"
    }
  ];

  // Updated services categories
  const servicesCategories = [
    {
      title: "Performance Tuning",
      count: 78,
      icon: Gauge,
      href: "/services/tuning",
      description: "ECU mapping, dyno tuning"
    },
    {
      title: "Detailing",
      count: 156,
      icon: Sparkles,
      href: "/services/detailing",
      description: "Ceramic coating, polishing"
    },
    {
      title: "Tire Services",
      count: 234,
      icon: Circle,
      href: "/services/tires",
      description: "Mounting, balancing, alignment"
    },
    {
      title: "Engine Rebuild",
      count: 45,
      icon: Cog,
      href: "/services/engine",
      description: "Complete engine overhaul"
    },
    {
      title: "Bodywork",
      count: 123,
      icon: Palette,
      href: "/services/bodywork",
      description: "Dent repair, painting"
    },
    {
      title: "Electrical Repair",
      count: 167,
      icon: Zap,
      href: "/services/electrical",
      description: "Wiring, diagnostics"
    },
    {
      title: "Racing Prep",
      count: 34,
      icon: Trophy,
      href: "/services/racing",
      description: "Track preparation, rollcages"
    },
    {
      title: "Restoration",
      count: 28,
      icon: Wrench,
      href: "/services/restoration",
      description: "Classic car restoration"
    },
    {
      title: "Pre-Purchase Check",
      count: 89,
      icon: Search,
      href: "/services/inspection",
      description: "Comprehensive inspections"
    },
    {
      title: "Fleet Services",
      count: 56,
      icon: Truck,
      href: "/services/fleet",
      description: "Commercial vehicle service"
    },
    {
      title: "Emergency Repair",
      count: 198,
      icon: AlertTriangle,
      href: "/services/emergency",
      description: "24/7 roadside assistance"
    },
    {
      title: "Modification",
      count: 87,
      icon: Settings,
      href: "/services/modification",
      description: "Custom modifications"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Parts Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Automotive Parts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find genuine and aftermarket parts for all vehicle makes and models
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partsCategories.map((category) => {
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
                        {category.count} items
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

        {/* Services Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Professional Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with certified mechanics and service providers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
      </div>
    </section>
  );
};

export default PartsServicesCategories;