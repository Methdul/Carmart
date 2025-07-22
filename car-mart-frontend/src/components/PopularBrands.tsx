import React from 'react';

const PopularBrands = () => {
  // Brand data - You'll need to replace these with actual logo images
  const brands = [
    { name: 'Toyota', logo: '/logos/toyota.png' },
    { name: 'Honda', logo: '/logos/honda.png' },
    { name: 'BMW', logo: '/logos/bmw.png' },
    { name: 'Mercedes-Benz', logo: '/logos/mercedes.png' },
    { name: 'Audi', logo: '/logos/audi.png' },
    { name: 'Nissan', logo: '/logos/nissan.png' },
    { name: 'Hyundai', logo: '/logos/hyundai.png' },
    { name: 'Ford', logo: '/logos/ford.png' },
    { name: 'Volkswagen', logo: '/logos/volkswagen.png' },
    { name: 'Mazda', logo: '/logos/mazda.png' },
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Popular Brands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from the world's most trusted automotive brands
          </p>
        </div>

        {/* Animated Brand Logos */}
        <div className="relative">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling Container */}
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 mx-8 group cursor-pointer"
              >
                <div className="w-32 h-20 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  {/* Placeholder for actual logo - replace with <img> when you have logos */}
                  <div className="text-center">
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center mb-1">
                      <span className="text-xs font-semibold text-gray-400">LOGO</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{brand.name}</span>
                  </div>
                  
                  {/* When you have actual logos, replace the above div with: */}
                  {/* <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain p-2"
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't find your preferred brand? We have many more available
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;