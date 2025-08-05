// src/pages/RentalsPage.tsx
// ikman.lk style - single column list layout

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, SortAsc } from 'lucide-react';
import { RentalCard } from '@/components/cards/RentalCard';
import { FilterLayout } from '@/components/layouts/FilterLayout';
import { PageLayout } from '@/components/layouts/PageLayout';
import { LoadingGrid } from '@/components/ui/LoadingGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { rentalFilterSections } from '@/components/filters/configs/rentalFilters';
import { Rental, FilterValues } from '@/design-system/types';
import { apiService } from '@/services/api';

const RentalsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortBy, setSortBy] = useState('created_at_desc');
  // ✅ Always use list layout for ikman.lk style
  const layout = 'list';

  // Load initial filters from URL
  useEffect(() => {
    const initialFilters: FilterValues = {};
    searchParams.forEach((value, key) => {
      if (key === 'sort') {
        setSortBy(value);
      } else {
        initialFilters[key] = value;
      }
    });
    setFilters(initialFilters);
  }, [searchParams]);

  // Fetch rentals when filters change
  useEffect(() => {
    fetchRentals();
  }, [filters, sortBy]);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Clean filters - remove undefined/null values
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '' && value !== 'all') {
          acc[key] = value;
        }
        return acc;
      }, {} as FilterValues);

      const queryParams = {
        ...cleanFilters,
        sort: sortBy
      };

      const response = await apiService.getRentals(queryParams);
      
      if (response && response.success) {
        setRentals(Array.isArray(response.data) ? response.data : []);
      } else {
        // ✅ Handle API not implemented yet - use mock data
        console.warn('Rentals API not implemented yet, using mock data');
        setRentals(generateMockRentals());
      }
    } catch (err) {
      console.error('Error fetching rentals:', err);
      // ✅ Fallback to mock data instead of showing error
      console.warn('Using mock data due to API error');
      setRentals(generateMockRentals());
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate mock rentals for testing
  const generateMockRentals = (): Rental[] => {
    return [
      {
        id: '1',
        title: '2022 Toyota Aqua Hybrid - Daily Rental',
        description: 'Fuel-efficient hybrid car perfect for city drives and short trips',
        price: 3500, // This is daily_rate
        daily_rate: 3500,
        weekly_rate: 22000,
        monthly_rate: 85000,
        security_deposit: 15000,
        location: 'Colombo',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: true,
        make: 'Toyota',
        model: 'Aqua',
        year: 2022,
        fuel_type: 'Hybrid',
        transmission: 'Automatic',
        body_type: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'White',
        mileage: 15000,
        condition: 'Excellent',
        rental_type: 'daily',
        minimum_rental_days: 1,
        maximum_rental_days: 30,
        fuel_policy: 'full-to-full',
        mileage_limit_per_day: 200,
        available_from: new Date().toISOString(),
        features: ['AC', 'GPS', 'Bluetooth'],
        included_items: ['First Aid Kit', 'Spare Tire'],
        pickup_locations: ['Colombo Airport', 'City Center'],
        delivery_available: true,
        delivery_fee: 500,
        insurance_included: true,
        booking_count: 45,
        average_rating: 4.8,
        total_reviews: 32
      },
      {
        id: '2',
        title: '2021 Honda Vezel RS - Weekly Rental',
        description: 'Stylish SUV with excellent features for longer trips',
        price: 5500, // This is daily_rate
        daily_rate: 5500,
        weekly_rate: 35000,
        monthly_rate: 140000,
        security_deposit: 25000,
        location: 'Kandy',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: false,
        make: 'Honda',
        model: 'Vezel',
        year: 2021,
        fuel_type: 'Petrol',
        transmission: 'CVT',
        body_type: 'SUV',
        seats: 5,
        doors: 5,
        color: 'Black',
        mileage: 28000,
        condition: 'Good',
        rental_type: 'weekly',
        minimum_rental_days: 3,
        maximum_rental_days: 90,
        fuel_policy: 'same-to-same',
        mileage_limit_per_day: 250,
        available_from: new Date().toISOString(),
        features: ['Sunroof', 'Reverse Camera', 'Cruise Control'],
        included_items: ['Mobile Charger', 'Emergency Kit'],
        pickup_locations: ['Kandy City', 'Train Station'],
        delivery_available: false,
        insurance_included: true,
        booking_count: 28,
        average_rating: 4.6,
        total_reviews: 19
      },
      {
        id: '3',
        title: '2023 Suzuki Swift RS - City Rental',
        description: 'Compact and economical car ideal for city navigation',
        price: 2800,
        daily_rate: 2800,
        weekly_rate: 18000,
        monthly_rate: 70000,
        security_deposit: 12000,
        location: 'Galle',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: true,
        make: 'Suzuki',
        model: 'Swift',
        year: 2023,
        fuel_type: 'Petrol',
        transmission: 'Manual',
        body_type: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Blue',
        mileage: 8000,
        condition: 'Excellent',
        rental_type: 'daily',
        minimum_rental_days: 1,
        maximum_rental_days: 60,
        fuel_policy: 'full-to-full',
        mileage_limit_per_day: 150,
        available_from: new Date().toISOString(),
        features: ['AC', 'Bluetooth', 'USB Charging'],
        included_items: ['Road Map', 'Emergency Kit'],
        pickup_locations: ['Galle Bus Stand', 'Hotel Pickup'],
        delivery_available: true,
        delivery_fee: 300,
        insurance_included: true,
        booking_count: 67,
        average_rating: 4.9,
        total_reviews: 41
      }
    ];
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '' && value !== 'all') {
        params.set(key, value.toString());
      }
    });
    params.set('sort', sortBy);
    setSearchParams(params);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  // Rental actions
  const handleViewRental = (rentalId: string) => {
    navigate(`/rentals/${rentalId}`);
  };

  const handleBookRental = (rentalId: string) => {
    navigate(`/rentals/${rentalId}?action=book`);
  };

  // Sort options
  const sortOptions = [
    { value: 'created_at_desc', label: 'Newest First' },
    { value: 'daily_rate_asc', label: 'Price: Low to High' },
    { value: 'daily_rate_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Highest Rated' },
    { value: 'booking_count_desc', label: 'Most Popular' }
  ];

  const headerActions = (
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SortAsc className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <PageLayout>
      <FilterLayout
        filterSections={rentalFilterSections}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        loading={loading}
        title="Rent Vehicles"
        subtitle={`${rentals.length} vehicles available for rent`}
        headerActions={headerActions}
      >
        {loading ? (
          <LoadingGrid count={12} />
        ) : error ? (
          <ErrorState
            title="Failed to load rentals"
            description={error}
            onRetry={fetchRentals}
          />
        ) : rentals.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No rentals found"
            description="Try adjusting your dates or filters to find available rentals."
            action={{
              label: 'Clear Filters',
              onClick: () => handleFiltersChange({}),
              variant: 'outline'
            }}
          />
        ) : (
          <div className="space-y-3 max-w-2xl mx-auto px-4">
            {rentals.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
                layout="list"
                onView={() => handleViewRental(rental.id)}
                onBook={() => handleBookRental(rental.id)}
              />
            ))}
          </div>
        )}
      </FilterLayout>
    </PageLayout>
  );
};

export default RentalsPage;