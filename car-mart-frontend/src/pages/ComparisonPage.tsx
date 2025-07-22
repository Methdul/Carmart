import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Share2, Download, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HealthScoreBadge from "@/components/HealthScoreBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComparisonVehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  healthScore: number;
  year: number;
  make: string;
  model: string;
  mileage: number;
  location: string;
  transmission: string;
  fuelType: string;
  engine: string;
  sellerName: string;
  sellerRating: number;
}

const ComparisonPage = () => {
  const location = useLocation();
  
  // Mock data - in real app this would come from state/props
  const [vehicles] = useState<ComparisonVehicle[]>([
    {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      image: "/api/placeholder/400/300",
      healthScore: 92,
      year: 2019,
      make: "BMW",
      model: "3 Series 320i",
      mileage: 45000,
      location: "Colombo",
      transmission: "Automatic",
      fuelType: "Petrol",
      engine: "2.0L Turbo",
      sellerName: "BMW Authorized Dealer",
      sellerRating: 4.9
    },
    {
      id: "2", 
      title: "Toyota RAV4 Hybrid AWD",
      price: 15800000,
      image: "/api/placeholder/400/300",
      healthScore: 88,
      year: 2020,
      make: "Toyota",
      model: "RAV4 Hybrid",
      mileage: 32000,
      location: "Kandy",
      transmission: "CVT",
      fuelType: "Hybrid",
      engine: "2.5L Hybrid",
      sellerName: "Toyota Lanka",
      sellerRating: 4.8
    },
    {
      id: "3",
      title: "Honda Civic RS Turbo",
      price: 8900000,
      image: "/api/placeholder/400/300",
      healthScore: 85,
      year: 2018,
      make: "Honda",
      model: "Civic RS",
      mileage: 58000,
      location: "Galle",
      transmission: "CVT",
      fuelType: "Petrol",
      engine: "1.5L Turbo",
      sellerName: "Honda Center",
      sellerRating: 4.7
    }
  ]);

  const comparisonCategories = [
    {
      title: "Overview",
      rows: [
        { label: "Price", showWinner: true },
        { label: "AI Health Score", showWinner: true },
        { label: "Year", showWinner: true },
        { label: "Mileage", showWinner: true },
        { label: "Location", showWinner: false },
        { label: "Seller Rating", showWinner: true }
      ]
    },
    {
      title: "Specifications",
      rows: [
        { label: "Engine", showWinner: false },
        { label: "Transmission", showWinner: false },
        { label: "Fuel Type", showWinner: false },
        { label: "Make", showWinner: false }
      ]
    }
  ];

  const getWinner = (row: string) => {
    switch (row) {
      case "Price":
        return vehicles.reduce((min, vehicle) => 
          vehicle.price < min.price ? vehicle : min
        );
      case "AI Health Score":
        return vehicles.reduce((max, vehicle) => 
          vehicle.healthScore > max.healthScore ? vehicle : max
        );
      case "Year":
        return vehicles.reduce((max, vehicle) => 
          vehicle.year > max.year ? vehicle : max
        );
      case "Mileage":
        return vehicles.reduce((min, vehicle) => 
          vehicle.mileage < min.mileage ? vehicle : min
        );
      case "Seller Rating":
        return vehicles.reduce((max, vehicle) => 
          vehicle.sellerRating > max.sellerRating ? vehicle : max
        );
      default:
        return null;
    }
  };

  const getValue = (vehicle: ComparisonVehicle, label: string) => {
    switch (label) {
      case "Price":
        return `Rs. ${vehicle.price.toLocaleString()}`;
      case "AI Health Score":
        return vehicle.healthScore;
      case "Year":
        return vehicle.year;
      case "Mileage":
        return `${vehicle.mileage.toLocaleString()} km`;
      case "Location":
        return vehicle.location;
      case "Seller Rating":
        return `⭐ ${vehicle.sellerRating}`;
      case "Engine":
        return vehicle.engine;
      case "Transmission":
        return vehicle.transmission;
      case "Fuel Type":
        return vehicle.fuelType;
      case "Make":
        return vehicle.make;
      default:
        return "-";
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vehicle Comparison - Car Mart',
        text: 'Check out this vehicle comparison',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Comparison link copied to clipboard!');
    }
  };

  const handleExport = () => {
    alert('Export to PDF feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/search" className="flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Link>
            <h1 className="text-3xl font-bold text-primary">Vehicle Comparison</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="relative">
              <CardContent className="p-0">
                <img 
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary">{vehicle.title}</h3>
                    <HealthScoreBadge score={vehicle.healthScore} size="sm" />
                  </div>
                  <p className="text-2xl font-bold text-primary mb-2">
                    Rs. {vehicle.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.year} • {vehicle.mileage.toLocaleString()} km • {vehicle.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="space-y-8">
          {comparisonCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-muted-foreground w-48">
                          Specification
                        </th>
                        {vehicles.map((vehicle) => (
                          <th key={vehicle.id} className="text-center p-4 min-w-48">
                            <div className="font-medium text-primary">{vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {category.rows.map((row) => {
                        const winner = row.showWinner ? getWinner(row.label) : null;
                        
                        return (
                          <tr key={row.label} className="border-b">
                            <td className="p-4 font-medium text-muted-foreground">
                              {row.label}
                            </td>
                            {vehicles.map((vehicle) => {
                              const isWinner = winner?.id === vehicle.id;
                              const value = getValue(vehicle, row.label);
                              
                              return (
                                <td key={vehicle.id} className="p-4 text-center">
                                  <div className={`flex items-center justify-center space-x-2 ${
                                    isWinner ? 'text-success font-semibold' : ''
                                  }`}>
                                    {row.label === "AI Health Score" ? (
                                      <HealthScoreBadge score={vehicle.healthScore} size="sm" />
                                    ) : (
                                      <span>{value}</span>
                                    )}
                                    {isWinner && (
                                      <Badge variant="default" className="bg-success text-white text-xs">
                                        Winner
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Recommendation */}
        <Card className="mt-8 bg-gradient-to-r from-accent/10 to-highlight/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              🤖 AI Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-semibold text-primary mb-2">Best Overall Value</h4>
                <p className="text-muted-foreground">
                  Based on price, health score, and specifications, the <strong>Honda Civic RS Turbo</strong> offers 
                  the best value for money with excellent fuel efficiency and lower maintenance costs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <h5 className="font-medium text-primary mb-1">Best for Families</h5>
                  <p className="text-sm text-muted-foreground">Toyota RAV4 Hybrid</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <h5 className="font-medium text-primary mb-1">Best Performance</h5>
                  <p className="text-sm text-muted-foreground">BMW 3 Series 320i</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <h5 className="font-medium text-primary mb-1">Best Economy</h5>
                  <p className="text-sm text-muted-foreground">Honda Civic RS</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {vehicles.map((vehicle) => (
            <Button key={vehicle.id} variant="outline" className="flex-1 max-w-xs">
              Contact Seller - {vehicle.make}
            </Button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComparisonPage;