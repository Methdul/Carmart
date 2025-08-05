// src/components/filters/configs/vehicleFilters.ts
import { Car, DollarSign, MapPin, Calendar, Settings, Fuel, Shield } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const vehicleFilterSections: FilterSection[] = [
  {
    id: 'search',
    title: 'Search',
    icon: Car,
    collapsible: false,
    priority: 1,
    filters: [
      {
        id: 'search',
        label: 'Search vehicles',
        type: 'search',
        placeholder: 'Make, model, or keyword...'
      }
    ]
  },
  {
    id: 'price',
    title: 'Price Range',
    icon: DollarSign,
    collapsible: true,
    defaultOpen: true,
    priority: 2,
    filters: [
      {
        id: 'priceRange',
        label: 'Price',
        type: 'range',
        min: 0,
        max: 10000000,
        step: 100000
      }
    ]
  },
  {
    id: 'basic',
    title: 'Basic Details',
    icon: Car,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'make',
        label: 'Make',
        type: 'select',
        placeholder: 'Select make',
        options: [
          { value: 'toyota', label: 'Toyota', count: 45 },
          { value: 'honda', label: 'Honda', count: 38 },
          { value: 'nissan', label: 'Nissan', count: 32 },
          { value: 'suzuki', label: 'Suzuki', count: 28 },
          { value: 'hyundai', label: 'Hyundai', count: 25 },
          { value: 'bmw', label: 'BMW', count: 15 },
          { value: 'mercedes', label: 'Mercedes-Benz', count: 12 },
          { value: 'audi', label: 'Audi', count: 10 },
          { value: 'volkswagen', label: 'Volkswagen', count: 8 },
          { value: 'mazda', label: 'Mazda', count: 7 }
        ]
      },
      {
        id: 'bodyType',
        label: 'Body Type',
        type: 'checkbox',
        options: [
          { value: 'sedan', label: 'Sedan', count: 85 },
          { value: 'suv', label: 'SUV', count: 67 },
          { value: 'hatchback', label: 'Hatchback', count: 52 },
          { value: 'wagon', label: 'Wagon', count: 23 },
          { value: 'coupe', label: 'Coupe', count: 18 },
          { value: 'convertible', label: 'Convertible', count: 8 },
          { value: 'pickup', label: 'Pickup Truck', count: 15 },
          { value: 'van', label: 'Van', count: 12 }
        ]
      },
      {
        id: 'year',
        label: 'Year Range',
        type: 'range',
        min: 1990,
        max: 2025,
        step: 1
      }
    ]
  },
  {
    id: 'specs',
    title: 'Specifications',
    icon: Settings,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'fuelType',
        label: 'Fuel Type',
        type: 'checkbox',
        options: [
          { value: 'petrol', label: 'Petrol', count: 142 },
          { value: 'diesel', label: 'Diesel', count: 89 },
          { value: 'hybrid', label: 'Hybrid', count: 34 },
          { value: 'electric', label: 'Electric', count: 12 },
          { value: 'cng', label: 'CNG', count: 8 }
        ]
      },
      {
        id: 'transmission',
        label: 'Transmission',
        type: 'checkbox',
        options: [
          { value: 'automatic', label: 'Automatic', count: 156 },
          { value: 'manual', label: 'Manual', count: 98 },
          { value: 'cvt', label: 'CVT', count: 31 }
        ]
      },
      {
        id: 'mileage',
        label: 'Mileage (km)',
        type: 'range',
        min: 0,
        max: 300000,
        step: 10000
      }
    ]
  },
  {
    id: 'condition',
    title: 'Condition & Features',
    icon: Shield,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'condition',
        label: 'Condition',
        type: 'checkbox',
        options: [
          { value: 'excellent', label: 'Excellent', count: 67 },
          { value: 'good', label: 'Good', count: 123 },
          { value: 'fair', label: 'Fair', count: 78 },
          { value: 'needs_work', label: 'Needs Work', count: 17 }
        ]
      },
      {
        id: 'accidentHistory',
        label: 'Accident History',
        type: 'radio',
        options: [
          { value: 'no_accidents', label: 'No Accidents', count: 234 },
          { value: 'minor_accidents', label: 'Minor Accidents', count: 45 },
          { value: 'major_accidents', label: 'Major Accidents', count: 6 }
        ]
      },
      {
        id: 'features',
        label: 'Features',
        type: 'checkbox',
        options: [
          { value: 'ac', label: 'Air Conditioning', count: 245 },
          { value: 'abs', label: 'ABS', count: 189 },
          { value: 'airbags', label: 'Airbags', count: 167 },
          { value: 'power_steering', label: 'Power Steering', count: 234 },
          { value: 'central_locking', label: 'Central Locking', count: 198 },
          { value: 'sunroof', label: 'Sunroof', count: 45 },
          { value: 'leather_seats', label: 'Leather Seats', count: 78 },
          { value: 'gps', label: 'GPS Navigation', count: 89 }
        ]
      }
    ]
  },
  {
    id: 'location',
    title: 'Location',
    icon: MapPin,
    collapsible: true,
    defaultOpen: false,
    priority: 6,
    filters: [
      {
        id: 'location',
        label: 'City',
        type: 'select',
        placeholder: 'Select city',
        options: [
          { value: 'colombo', label: 'Colombo', count: 89 },
          { value: 'kandy', label: 'Kandy', count: 45 },
          { value: 'galle', label: 'Galle', count: 34 },
          { value: 'jaffna', label: 'Jaffna', count: 23 },
          { value: 'negombo', label: 'Negombo', count: 32 },
          { value: 'anuradhapura', label: 'Anuradhapura', count: 18 },
          { value: 'batticaloa', label: 'Batticaloa', count: 15 },
          { value: 'kurunegala', label: 'Kurunegala', count: 29 }
        ]
      }
    ]
  }
];
