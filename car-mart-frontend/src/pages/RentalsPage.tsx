// car-mart-frontend/src/pages/RentalsPage.tsx
// Complete rentals page following your exact layout pattern

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Calendar, Clock, Shield, 
  Heart, Eye, Star, Phone, Mail, Car, Fuel, 
  Users, Settings, SlidersHorizontal, ChevronDown,
  CheckCircle, Truck, CalendarDays, CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileFilterPanel from '@/components/MobileFilterPanel';

interface Rental {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  daily_rate: number;
  weekly_rate?: number;
  monthly_rate?: number;
  location: string;
  fuel_type: string;
  transmission: string;
  body_type: string;
  seats: number;
  doors: number;
  color: string;
  mileage: number;
  condition: string;
  rental_type: string;
  minimum_rental_days: number;
  maximum_rental_days: number;
  security_deposit: number;
  fuel_policy: string;
  mileage_limit_per_day: number;
  features: string[];
  included_items: string[];
  pickup_locations: string[];
  delivery_available: boolean;
  delivery_fee: number;
  insurance_included: boolean;
  images: string[];
  is_featured: boolean;
  is_verified: boolean;
  views_count: number;
  favorites_count: number;
  booking_count: number;
  average_rating: number;
  total_reviews: number;
  available_from: string;
  available_until?: string;
  created_at: string;
  users: {
    first_name: string;
    last_name: string;
    phone: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

interface Filters {
  search: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  make: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  seats: number;
  rentalType: string;
  minDays: number;
  maxDays: number;
  deliveryAvailable: boolean;
  insuranceIncluded: boolean;
}

const DesktopFilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h4 className="font-medium text-primary">{title}</h4>
    {children}
  </div>
);

const RentalsPage = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: '',
    location: '',
    minPrice: 0,
    maxPrice: 20000,
    make: 'all',
    bodyType: 'any',
    fuelType: 'any',
    transmission: 'any',
    seats: 0,
    rentalType: 'any',
    minDays: 1,
    maxDays: 30,
    deliveryAvailable: false,
    insuranceIncluded: false,
  });

  const [sortBy, setSortBy] = useState('created_at');

  // Load rentals from API
  useEffect(() => {
    const loadRentals = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/rentals');
        const result = await response.json();
        
        if (result.success) {
          setRentals(result.data || []);
        } else {
          setError('Failed to load rentals');
        }
      } catch (err) {
        console.error('Error loading rentals:', err);
        setError('Failed to load rentals');
      } finally {
        setLoading(false);
      }
    };

    loadRentals();
  }, []);

  // Filter and sort rentals
  useEffect(() => {
    let filtered = [...rentals];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(rental =>
        rental.title.toLowerCase().includes(searchTerm) ||
        rental.make.toLowerCase().includes(searchTerm) ||
        rental.model.toLowerCase().includes(searchTerm) ||
        rental.location.toLowerCase().includes(searchTerm)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(rental => 
        rental.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(rental => 
      rental.daily_rate >= filters.minPrice && rental.daily_rate <= filters.maxPrice
    );

    // Make filter
    if (filters.make && filters.make !== 'all') {
      filtered = filtered.filter(rental => 
        rental.make.toLowerCase() === filters.make.toLowerCase()
      );
    }

    // Body type filter
    if (filters.bodyType && filters.bodyType !== 'any') {
      filtered = filtered.filter(rental => 
        rental.body_type.toLowerCase() === filters.bodyType.toLowerCase()
      );
    }

    // Fuel type filter
    if (filters.fuelType && filters.fuelType !== 'any') {
      filtered = filtered.filter(rental => 
        rental.fuel_type.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    // Transmission filter
    if (filters.transmission && filters.transmission !== 'any') {
      filtered = filtered.filter(rental => 
        rental.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }

    // Seats filter
    if (filters.seats > 0) {
      filtered = filtered.filter(rental => rental.seats >= filters.seats);
    }

    // Rental type filter
    if (filters.rentalType && filters.rentalType !== 'any') {
      filtered = filtered.filter(rental => 
        rental.rental_type === filters.rentalType
      );
    }

    // Rental duration filter
    filtered = filtered.filter(rental => 
      rental.minimum_rental_days <= filters.maxDays && 
      rental.maximum_rental_days >= filters.minDays
    );

    // Delivery available filter
    if (filters.deliveryAvailable) {
      filtered = filtered.filter(rental => rental.delivery_available);
    }

    // Insurance included filter
    if (filters.insuranceIncluded) {
      filtered = filtered.filter(rental => rental.insurance_included);
    }

    // Sort rentals
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.daily_rate - b.daily_rate);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.daily_rate - a.daily_rate);
        break;
      case 'rating':
        filtered.sort((a, b) => b.average_rating - a.average_rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.booking_count - a.booking_count);
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFilteredRentals(filtered);
  }, [rentals, filters, sortBy]);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePriceRangeChange = (values: number[]) => {
    setFilters(prev => ({ ...prev, minPrice: values[0], maxPrice: values[1] }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      location: '',
      minPrice: 0,
      maxPrice: 20000,
      make: 'all',
      bodyType: 'any',
      fuelType: 'any',
      transmission: 'any',
      seats: 0,
      rentalType: 'any',
      minDays: 1,
      maxDays: 30,
      deliveryAvailable: false,
      insuranceIncluded: false,
    });
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setFiltersOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const uniqueMakes = [...new Set(rentals.map(r => r.make))].sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading rentals...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search rentals by make, model, or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Location Filter */}
            <div className="lg:w-64 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="lg:w-48 h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Newest First</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <Card>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  </div>

                  {/* Price Range */}
                  <DesktopFilterSection title="Daily Rate">
                    <div className="space-y-4">
                      <Slider
                        min={0}
                        max={20000}
                        step={500}
                        value={[filters.minPrice, filters.maxPrice]}
                        onValueChange={handlePriceRangeChange}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatPrice(filters.minPrice)}</span>
                        <span>{formatPrice(filters.maxPrice)}</span>
                      </div>
                    </div>
                  </DesktopFilterSection>

                  {/* Make */}
                  <DesktopFilterSection title="Make">
                    <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        {uniqueMakes.map(make => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </DesktopFilterSection>

                  {/* Body Type */}
                  <DesktopFilterSection title="Body Type">
                    <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange('bodyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Body Type</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                        <SelectItem value="Wagon">Wagon</SelectItem>
                        <SelectItem value="Coupe">Coupe</SelectItem>
                        <SelectItem value="Convertible">Convertible</SelectItem>
                        <SelectItem value="Truck">Truck</SelectItem>
                        <SelectItem value="Van">Van</SelectItem>
                      </SelectContent>
                    </Select>
                  </DesktopFilterSection>

                  {/* Fuel Type */}
                  <DesktopFilterSection title="Fuel Type">
                    <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Fuel Type</SelectItem>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </DesktopFilterSection>

                  {/* Transmission */}
                  <DesktopFilterSection title="Transmission">
                    <Select value={filters.transmission} onValueChange={(value) => handleFilterChange('transmission', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Transmission</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                      </SelectContent>
                    </Select>
                  </DesktopFilterSection>

                  {/* Rental Type */}
                  <DesktopFilterSection title="Rental Duration">
                    <Select value={filters.rentalType} onValueChange={(value) => handleFilterChange('rentalType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rental type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Duration</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </DesktopFilterSection>

                  {/* Seats */}
                  <DesktopFilterSection title="Minimum Seats">
                    <Select value={filters.seats.toString()} onValueChange={(value) => handleFilterChange('seats', parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select seats" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any</SelectItem>
                        <SelectItem value="2">2+ Seats</SelectItem>
                        <SelectItem value="4">4+ Seats</SelectItem>
                        <SelectItem value="5">5+ Seats</SelectItem>
                        <SelectItem value="7">7+ Seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </DesktopFilterSection>

                  {/* Features */}
                  <DesktopFilterSection title="Features">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="deliveryAvailable"
                          checked={filters.deliveryAvailable}
                          onCheckedChange={(checked) => handleFilterChange('deliveryAvailable', checked)}
                        />
                        <Label htmlFor="deliveryAvailable" className="text-sm">Delivery Available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="insuranceIncluded"
                          checked={filters.insuranceIncluded}
                          onCheckedChange={(checked) => handleFilterChange('insuranceIncluded', checked)}
                        />
                        <Label htmlFor="insuranceIncluded" className="text-sm">Insurance Included</Label>
                      </div>
                    </div>
                  </DesktopFilterSection>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">Car Rentals</h1>
                <p className="text-muted-foreground">
                  {loading ? 'Loading...' : `${filteredRentals.length} rental${filteredRentals.length !== 1 ? 's' : ''} available`}
                </p>
              </div>
            </div>

            {/* Results Grid */}
            {filteredRentals.length === 0 ? (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No rentals found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRentals.map((rental) => {
                  const mainImage = rental.images && rental.images.length > 0 
                    ? rental.images[0] 
                    : '/placeholder-car.jpg';

                  return (
                    <Card key={rental.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img
                          src={mainImage}
                          alt={rental.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-car.jpg';
                          }}
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {rental.is_featured && (
                            <Badge className="bg-yellow-500 text-white">Featured</Badge>
                          )}
                          {rental.is_verified && (
                            <Badge className="bg-green-500 text-white flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                          {rental.delivery_available && (
                            <Badge className="bg-blue-500 text-white flex items-center gap-1">
                              <Truck className="h-3 w-3" />
                              Delivery
                            </Badge>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>

                        {/* Stats */}
                        <div className="absolute bottom-3 left-3 flex items-center space-x-3 text-white text-xs">
                          <span className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded">
                            <Eye className="h-3 w-3" />
                            <span>{rental.views_count}</span>
                          </span>
                          {rental.average_rating > 0 && (
                            <span className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{rental.average_rating.toFixed(1)}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Title and Price */}
                          <div>
                            <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                              {rental.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {rental.year} {rental.make} {rental.model}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(rental.daily_rate)}
                            </span>
                            <span className="text-sm text-muted-foreground">/day</span>
                            {rental.weekly_rate && (
                              <span className="text-xs text-green-600">
                                {formatPrice(rental.weekly_rate)}/week
                              </span>
                            )}
                          </div>

                          {/* Key Features */}
                          <div className="flex flex-wrap gap-2 text-xs">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              {rental.body_type}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Fuel className="h-3 w-3" />
                              {rental.fuel_type}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {rental.seats} seats
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Settings className="h-3 w-3" />
                              {rental.transmission}
                            </Badge>
                          </div>

                          {/* Rental Details */}
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center justify-between">
                              <span>Min rental: {rental.minimum_rental_days} day{rental.minimum_rental_days !== 1 ? 's' : ''}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {rental.location}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Security: {formatPrice(rental.security_deposit)}</span>
                              {rental.insurance_included && (
                                <span className="flex items-center gap-1 text-green-600">
                                  <Shield className="h-3 w-3" />
                                  Insurance included
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Owner Info */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-primary">
                                  {rental.users.first_name[0]}{rental.users.last_name[0]}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {rental.users.first_name} {rental.users.last_name}
                                  {rental.users.is_verified && (
                                    <CheckCircle className="inline h-3 w-3 text-green-500 ml-1" />
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2 pt-2">
                            <Button className="flex-1" size="sm">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              Book Now
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 left-4 z-40">
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
        resultCount={filteredRentals.length}
        category="rentals"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RentalsPage;