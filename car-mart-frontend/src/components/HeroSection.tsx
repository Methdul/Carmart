import { Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showFeaturedOffers, setShowFeaturedOffers] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight">
              Find Your Perfect Vehicle on{" "}
              <span className="text-accent block sm:inline">Car Mart</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/90 mb-2">
              Sri Lanka's Premium Vehicle Marketplace
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-lg text-primary-foreground/80">
              <span>AI Health Scores</span>
              <span className="text-primary-foreground/50">•</span>
              <span>Smart Comparison</span>
              <span className="text-primary-foreground/50">•</span>
              <span>Verified Sellers</span>
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl animate-slide-up mb-6 sm:mb-8">
            {/* Main Search Bar with More Filters Button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  placeholder="Make, model, or keyword"
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg font-medium border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap border-gray-300 hover:border-primary hover:text-primary"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showAdvancedFilters ? "Less Filters" : "More Filters"}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fade-in">
                <Select>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-2m">Under 2M</SelectItem>
                    <SelectItem value="2m-5m">2M - 5M</SelectItem>
                    <SelectItem value="5m-10m">5M - 10M</SelectItem>
                    <SelectItem value="over-10m">Over 10M</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Vehicle Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="bike">Motorcycle</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="colombo">Colombo</SelectItem>
                    <SelectItem value="kandy">Kandy</SelectItem>
                    <SelectItem value="galle">Galle</SelectItem>
                    <SelectItem value="jaffna">Jaffna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base sm:text-lg mb-3 sm:mb-4"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Search Premium Vehicles
            </Button>

            {/* View Featured Offers Button */}
            <Button
              variant="outline"
              onClick={() => setShowFeaturedOffers(!showFeaturedOffers)}
              className="w-full border-primary/30 text-primary hover:bg-primary/10 text-sm sm:text-base"
            >
              View Featured Offers
            </Button>
          </div>

          {/* Featured Offers Section */}
          {showFeaturedOffers && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Featured Offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Premium Insurance</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Get 20% off your first year</p>
                </div>
                <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Vehicle Financing</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Low interest rates available</p>
                </div>
                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200 sm:col-span-2 lg:col-span-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Free Inspection</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Professional vehicle check</p>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 animate-fade-in">
            <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2">50K+</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Premium Vehicles</div>
            </div>
            <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2">15K+</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Verified Sellers</div>
            </div>
            <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2">98%</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Customer Satisfaction</div>
            </div>
            <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">AI</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Health Scoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;