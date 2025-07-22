import { Shield, Award, Users, Clock, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "All sellers undergo ID verification and background checks",
      stat: "15K+ Verified",
      color: "text-success"
    },
    {
      icon: Award,
      title: "AI Health Scoring",
      description: "Every vehicle gets a comprehensive 0-100 health rating",
      stat: "100% Coverage",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Happy Customers",
      description: "Over 50K satisfied customers have found their perfect vehicle",
      stat: "50K+ Sales",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Average seller response time under 2 hours",
      stat: "<2 Hours",
      color: "text-secondary"
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Professional inspections available for premium listings",
      stat: "Pro Inspections",
      color: "text-health-excellent"
    },
    {
      icon: Star,
      title: "Top Rated Platform",
      description: "Highest customer satisfaction in Sri Lanka",
      stat: "4.8/5 Stars",
      color: "text-warning"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose Car Mart?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the difference with Sri Lanka's most trusted premium vehicle marketplace
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <Card 
                key={index}
                className="group border-0 shadow-card hover:shadow-premium transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`w-10 h-10 ${indicator.color}`} />
                    </div>
                    <div className={`text-2xl font-bold ${indicator.color} mb-2`}>
                      {indicator.stat}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {indicator.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {indicator.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              Ready to Experience the Car Mart Difference?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found their perfect vehicle on Car Mart. 
              Start your journey with Sri Lanka's premium vehicle marketplace today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Shopping
              </button>
              <button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/20 px-8 py-3 rounded-lg font-semibold transition-colors">
                List Your Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;