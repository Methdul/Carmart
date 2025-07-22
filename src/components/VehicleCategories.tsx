import { Car, Truck, Bike, Bus, Zap, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VehicleCategories = () => {
  const categories = [
    {
      id: "cars",
      name: "Cars",
      icon: Car,
      count: "35K+",
      description: "Sedans, Hatchbacks, Coupes",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: "suvs",
      name: "SUVs",
      icon: Users,
      count: "12K+", 
      description: "Crossovers, Full-size SUVs",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      id: "trucks",
      name: "Trucks",
      icon: Truck,
      count: "8K+",
      description: "Pickups, Commercial vehicles",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: "motorcycles",
      name: "Motorcycles", 
      icon: Bike,
      count: "15K+",
      description: "Sport bikes, Cruisers, Scooters",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: "vans",
      name: "Vans",
      icon: Bus,
      count: "3K+",
      description: "Cargo vans, Passenger vans",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: "electric",
      name: "Electric",
      icon: Zap,
      count: "2K+",
      description: "EVs, Hybrids, Plug-ins",
      color: "text-health-excellent",
      bgColor: "bg-health-excellent/10"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect vehicle from our comprehensive collection
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0"
              >
                <CardContent className="p-6 text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110",
                    category.bgColor
                  )}>
                    <IconComponent className={cn("w-8 h-8", category.color)} />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-1">
                    {category.count}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Brands */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary mb-6">Popular Brands</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Toyota", "Honda", "BMW", "Mercedes-Benz", "Audi", 
              "Nissan", "Hyundai", "Ford", "Volkswagen", "Mazda"
            ].map((brand) => (
              <Button 
                key={brand}
                variant="outline" 
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;