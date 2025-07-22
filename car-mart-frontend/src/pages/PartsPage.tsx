import { useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, Grid3X3, List } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFilterPanel from "@/components/MobileFilterPanel";
import MobileListView from "@/components/MobileListView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PartsPage = () => {
  const { category } = useParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock parts data
  const mockParts = [
    {
      id: "1",
      title: "Front Brake Pads Set",
      price: 12500,
      condition: "New",
      location: "Colombo",
      image: "/api/placeholder/300/200",
      brand: "Bosch",
      partNumber: "BP1234",
      compatibility: ["Honda Civic 2015-2020", "Honda Accord 2013-2018"],
      warranty: "1 year",
      sellerName: "Auto Parts Lanka",
      sellerRating: 4.8,
      postedDate: "2 days ago"
    },
    {
      id: "2",
      title: "Toyota Corolla Headlight Assembly",
      price: 25000,
      condition: "Used - Excellent",
      location: "Kandy",
      image: "/api/placeholder/300/200",
      brand: "Toyota OEM",
      partNumber: "TY5678",
      compatibility: ["Toyota Corolla 2014-2019"],
      sellerName: "Toyota Parts Center",
      sellerRating: 4.9,
      postedDate: "1 day ago"
    },
    {
      id: "3",
      title: "BMW E90 Side Mirror",
      price: 18500,
      condition: "Refurbished",
      location: "Galle",
      image: "/api/placeholder/300/200",
      brand: "BMW",
      partNumber: "BMW789",
      compatibility: ["BMW 3 Series E90", "BMW 3 Series E91"],
      warranty: "6 months",
      sellerName: "German Auto Parts",
      sellerRating: 4.7,
      postedDate: "3 days ago"
    }
  ];

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
    // Filter logic would go here
  };

  const handleSave = (id: string) => {
    console.log("Saved part:", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact seller for part:", id);
  };

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) + " Parts"
    : "All Parts";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            Find genuine and aftermarket automotive parts
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder="Search parts by name, brand, or part number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {mockParts.length.toLocaleString()} parts found
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle - Desktop */}
            <div className="hidden md:flex border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h3 className="font-semibold text-primary mb-4">Filters</h3>
              {/* Desktop filter content would go here */}
              <p className="text-sm text-muted-foreground">
                Use the mobile filter for full functionality
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Mobile List View */}
            <MobileListView
              items={mockParts}
              type="parts"
              onSave={handleSave}
              onContact={handleContact}
            />

            {/* Desktop Grid/List View */}
            <div className="hidden md:block">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockParts.map((part) => (
                    <div key={part.id} className="bg-card border rounded-lg p-6">
                      <img 
                        src={part.image} 
                        alt={part.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-primary mb-2">{part.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {part.brand} • {part.condition}
                      </p>
                      <p className="text-lg font-bold text-primary mb-4">
                        Rs. {part.price.toLocaleString()}
                      </p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleSave(part.id)}
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleContact(part.id)}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {mockParts.map((part) => (
                    <div key={part.id} className="bg-card border rounded-lg p-6 flex space-x-4">
                      <img 
                        src={part.image} 
                        alt={part.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-2">{part.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {part.brand} • {part.condition} • {part.location}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          Rs. {part.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSave(part.id)}
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleContact(part.id)}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden fixed bottom-4 left-4 z-40">
        <Button
          onClick={() => setFiltersOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        >
          <Filter className="w-5 h-5" />
          <span className="text-sm font-medium">Filters</span>
        </Button>
      </div>

      {/* Mobile Filter Panel */}
      <MobileFilterPanel
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        resultCount={mockParts.length}
        category="parts"
      />

      <Footer />
    </div>
  );
};

export default PartsPage;