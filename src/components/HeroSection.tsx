import { Search, MapPin, Calendar, DollarSign, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showAds, setShowAds] = useState(false);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBanner} 
          alt="Premium vehicles showroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Find Your Perfect Vehicle on{" "}
              <span className="text-accent">Car Mart</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2">
              Sri Lanka's Premium Vehicle Marketplace
            </p>
            <p className="text-lg text-primary-foreground/80">
              AI Health Scores • Smart Comparison • Verified Sellers
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-premium animate-slide-up">
            {/* Main Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Make, model, or keyword"
                className="pl-12 h-14 text-lg font-medium"
              />
            </div>

            {/* Toggle Advanced Filters */}
            <div className="flex justify-center mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showAdvancedFilters ? 'Hide Filters' : 'More Filters'}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 animate-fade-in">
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Vehicle Type (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Cars</SelectItem>
                    <SelectItem value="suv">SUVs</SelectItem>
                    <SelectItem value="truck">Trucks</SelectItem>
                    <SelectItem value="motorcycle">Motorcycles</SelectItem>
                    <SelectItem value="van">Vans</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location (Optional)"
                    className="pl-10 h-12"
                  />
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Max Price (Optional)"
                    className="pl-10 h-12"
                  />
                </div>

                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Transmission (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full h-12 bg-highlight hover:bg-highlight/90 text-highlight-foreground font-semibold"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Premium Vehicles
            </Button>
          </div>

          {/* Load Ads Button */}
          {!showAds && (
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAds(true)}
                className="text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                View Featured Offers
              </Button>
            </div>
          )}

          {/* Ads Section */}
          {showAds && (
            <div className="mt-8 p-4 bg-card/80 backdrop-blur-sm rounded-xl animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Featured Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-medium">Premium Insurance</h4>
                  <p className="text-sm text-muted-foreground">Get 20% off your first year</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-medium">Vehicle Financing</h4>
                  <p className="text-sm text-muted-foreground">Low interest rates available</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-medium">Free Inspection</h4>
                  <p className="text-sm text-muted-foreground">Professional vehicle check</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-fade-in">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">50K+</div>
              <div className="text-sm text-primary-foreground/80">Premium Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">15K+</div>
              <div className="text-sm text-primary-foreground/80">Verified Sellers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">98%</div>
              <div className="text-sm text-primary-foreground/80">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">AI</div>
              <div className="text-sm text-primary-foreground/80">Health Scoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;