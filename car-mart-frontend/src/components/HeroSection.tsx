import { Car, Wrench, Settings, ArrowRight, Shield, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Buy Vehicles",
      description: "Premium cars, SUVs, motorcycles & more",
      icon: Car,
      href: "/search",
      color: "bg-blue-600/90",
      stats: "50K+ Vehicles"
    },
    {
      title: "Auto Parts", 
      description: "Genuine & aftermarket parts for all vehicles",
      icon: Settings,
      href: "/parts",
      color: "bg-emerald-600/90",
      stats: "100K+ Parts"
    },
    {
      title: "Services",
      description: "Professional automotive services & repairs",
      icon: Wrench,
      href: "/services", 
      color: "bg-purple-600/90",
      stats: "5K+ Providers"
    }
  ];

  const handleCategoryClick = (href: string) => {
    navigate(href);
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
              Your Complete{" "}
              <span className="text-accent block sm:inline">Automotive Marketplace</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-4xl mx-auto">
              Buy vehicles, find parts, book services - all in one professional platform
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-lg text-primary-foreground/80 mb-8 sm:mb-12">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Verified Sellers</span>
              </div>
              <span className="text-primary-foreground/50">•</span>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>AI Health Scores</span>
              </div>
              <span className="text-primary-foreground/50">•</span>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>Trusted Community</span>
              </div>
            </div>
          </div>

          {/* Category Selection Cards - Even Smaller Mobile */}
          <div className="animate-slide-up mb-8 sm:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.title}
                    className="group relative bg-white/15 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:bg-white/25 min-h-[140px] sm:min-h-[240px] flex flex-col justify-center text-center"
                    onClick={() => handleCategoryClick(category.href)}
                  >
                    {/* Category Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 group-hover:text-blue-300 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-base lg:text-lg text-white/90 mb-2 sm:mb-5 leading-relaxed font-light">
                        {category.description}
                      </p>
                      <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-5 sm:py-2 text-xs sm:text-sm text-white font-semibold mb-2 sm:mb-5 mx-auto">
                        {category.stats}
                      </div>
                      
                      {/* Bottom action area */}
                      <div className="flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                        <span className="text-xs sm:text-base font-medium mr-2 sm:mr-3">Explore Now</span>
                        <ArrowRight className="h-3 w-3 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Premium hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-3xl pointer-events-none"></div>
                    
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-3xl border border-blue-400/0 group-hover:border-blue-400/30 transition-colors duration-500 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 animate-fade-in">
            <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2">150K+</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Total Listings</div>
            </div>
            <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2">15K+</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Verified Sellers</div>
            </div>
            <div className="text-center bg-primary-foreground/10 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2">98%</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-foreground/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">AI</div>
              <div className="text-xs sm:text-sm text-primary-foreground/90 font-medium">Powered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;