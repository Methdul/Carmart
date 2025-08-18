import { Car, Wrench, Settings, ArrowRight, Shield, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Buy Vehicles",
      description: "Premium cars, SUVs, motorcycles & more",
      icon: Car,
      href: "/search",
      color: "bg-blue-600/90",
      stats: "50K+ Vehicles",
      isActive: false,
      badge: "Coming Soon"
    },
    {
      title: "Auto Parts", 
      description: "Genuine & aftermarket parts for all vehicles",
      icon: Settings,
      href: "/parts",
      color: "bg-emerald-600/90",
      stats: "100K+ Parts",
      isActive: false,
      badge: "Coming Soon"
    },
    {
      title: "Services",
      description: "Professional automotive services & repairs",
      icon: Wrench,
      href: "/services", 
      color: "bg-purple-600/90",
      stats: "5K+ Providers",
      isActive: true,
      badge: null
    }
  ];

  const handleCategoryClick = (category: any) => {
    if (category.isActive) {
      navigate(category.href);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80" 
          alt="Premium automotive marketplace" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
              Your Complete
              <span className="block text-accent">Vehicle Services Hub</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Connect with verified garages, mechanics, and service providers across Sri Lanka. 
              Book professional vehicle services with ease and confidence.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              
              return (
                <div
                  key={category.title}
                  className={`relative group transition-all duration-300 transform hover:scale-105 ${
                    category.isActive 
                      ? 'cursor-pointer' 
                      : 'cursor-not-allowed opacity-70'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className={`${category.color} backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/20 relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                    </div>
                    
                    {/* Badge */}
                    {category.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="text-xs font-medium">
                          {category.badge}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-4 sm:mb-6">
                        <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white" />
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                        {category.title}
                      </h3>
                      
                      <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm font-medium">
                          {category.stats}
                        </span>
                        
                        {category.isActive ? (
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                        ) : (
                          <div className="w-5 h-5" /> // Placeholder for alignment
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/services')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Explore Services
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/list-services')}
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              <Users className="w-5 h-5 mr-2" />
              Join as Provider
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-center justify-center space-x-3 text-primary-foreground/80">
              <Shield className="w-6 h-6 text-accent" />
              <span className="text-sm sm:text-base font-medium">Verified Providers</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-primary-foreground/80">
              <Star className="w-6 h-6 text-accent" />
              <span className="text-sm sm:text-base font-medium">Quality Guaranteed</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-primary-foreground/80">
              <Users className="w-6 h-6 text-accent" />
              <span className="text-sm sm:text-base font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;