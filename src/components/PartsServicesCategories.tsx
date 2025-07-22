import { Link } from "react-router-dom";
import { 
  Wrench, 
  Car, 
  Armchair, 
  Zap, 
  Circle, 
  Sparkles,
  Settings,
  Hammer,
  Search,
  Palette,
  Shield,
  CreditCard
} from "lucide-react";

const PartsServicesCategories = () => {
  const partsCategories = [
    {
      title: "Engine Parts",
      count: 1250,
      icon: Settings,
      href: "/parts/engine",
      description: "Pistons, filters, belts"
    },
    {
      title: "Body Parts",
      count: 890,
      icon: Car,
      href: "/parts/body",
      description: "Bumpers, doors, panels"
    },
    {
      title: "Interior",
      count: 650,
      icon: Armchair,
      href: "/parts/interior",
      description: "Seats, dashboards, carpets"
    },
    {
      title: "Electronics",
      count: 420,
      icon: Zap,
      href: "/parts/electronics",
      description: "Lights, stereos, sensors"
    },
    {
      title: "Tires & Wheels",
      count: 780,
      icon: Circle,
      href: "/parts/tires",
      description: "Tires, rims, wheel caps"
    },
    {
      title: "Accessories",
      count: 950,
      icon: Sparkles,
      href: "/parts/accessories",
      description: "Floor mats, covers, tools"
    }
  ];

  const servicesCategories = [
    {
      title: "Maintenance",
      count: 156,
      icon: Wrench,
      href: "/services/maintenance",
      description: "Oil change, tune-ups"
    },
    {
      title: "Repair Services",
      count: 203,
      icon: Hammer,
      href: "/services/repair",
      description: "Engine, transmission, AC"
    },
    {
      title: "Inspection",
      count: 89,
      icon: Search,
      href: "/services/inspection",
      description: "Pre-purchase checks"
    },
    {
      title: "Customization",
      count: 67,
      icon: Palette,
      href: "/services/customization",
      description: "Paint, modifications"
    },
    {
      title: "Insurance",
      count: 45,
      icon: Shield,
      href: "/services/insurance",
      description: "Vehicle insurance"
    },
    {
      title: "Financing",
      count: 32,
      icon: CreditCard,
      href: "/services/financing",
      description: "Vehicle loans"
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
                  className="group bg-card hover:bg-accent/10 rounded-xl p-6 transition-all duration-300 border hover:border-accent/20 hover:shadow-lg"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2 text-sm lg:text-base">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 hidden lg:block">
                      {category.description}
                    </p>
                    <span className="text-xs font-medium text-accent">
                      {category.count.toLocaleString()} items
                    </span>
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
              Automotive Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional services from certified automotive experts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {servicesCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.title}
                  to={category.href}
                  className="group bg-card hover:bg-accent/10 rounded-xl p-6 transition-all duration-300 border hover:border-accent/20 hover:shadow-lg"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-highlight/10 rounded-full flex items-center justify-center group-hover:bg-highlight/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-highlight" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2 text-sm lg:text-base">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 hidden lg:block">
                      {category.description}
                    </p>
                    <span className="text-xs font-medium text-highlight">
                      {category.count.toLocaleString()} providers
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent/10 to-highlight/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Post a request and let our community of sellers and service providers reach out to you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/list-parts"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                List Parts
              </Link>
              <Link 
                to="/services"
                className="inline-flex items-center justify-center bg-highlight hover:bg-highlight/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Find Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartsServicesCategories;