// car-mart-frontend/src/components/filters/configs/rentalFilters.ts
// ✅ COMPLETE SIMPLIFIED VERSION - Create this new file

import { Car, DollarSign, Calendar, Settings } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const rentalFilterSections: FilterSection[] = [
  {
    id: 'search',
    title: 'Search',
    icon: Car,
    collapsible: false,
    priority: 1,
    filters: [
      {
        id: 'search',
        label: 'Search rental vehicles',
        type: 'search',
        placeholder: 'Car name, model, or location...'
      }
    ]
  },
  {
    id: 'price',
    title: 'Daily Rate',
    icon: DollarSign,
    collapsible: true,
    defaultOpen: true,
    priority: 2,
    filters: [
      {
        id: 'minPrice',
        label: 'Min Daily Rate',
        type: 'number',
        placeholder: 'Min price per day (₹)'
      },
      {
        id: 'maxPrice',
        label: 'Max Daily Rate', 
        type: 'number',
        placeholder: 'Max price per day (₹)'
      }
    ]
  },
  {
    id: 'basic',
    title: 'Vehicle Details',
    icon: Car,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'make',
        label: 'Brand',
        type: 'select',
        placeholder: 'Select brand',
        options: [
          { value: 'maruti-suzuki', label: 'Maruti Suzuki', count: 25 },
          { value: 'hyundai', label: 'Hyundai', count: 22 },
          { value: 'tata', label: 'Tata', count: 18 },
          { value: 'mahindra', label: 'Mahindra', count: 15 },
          { value: 'honda', label: 'Honda', count: 12 },
          { value: 'toyota', label: 'Toyota', count: 10 }
        ]
      },
      {
        id: 'bodyType',
        label: 'Body Type',
        type: 'select',
        placeholder: 'Select body type',
        options: [
          { value: 'hatchback', label: 'Hatchback', count: 30 },
          { value: 'sedan', label: 'Sedan', count: 25 },
          { value: 'suv', label: 'SUV', count: 20 },
          { value: 'luxury', label: 'Luxury', count: 8 }
        ]
      },
      {
        id: 'fuelType',
        label: 'Fuel Type',
        type: 'select',
        placeholder: 'Select fuel type',
        options: [
          { value: 'petrol', label: 'Petrol', count: 45 },
          { value: 'diesel', label: 'Diesel', count: 35 },
          { value: 'hybrid', label: 'Hybrid', count: 12 },
          { value: 'electric', label: 'Electric', count: 8 }
        ]
      }
    ]
  },
  {
    id: 'features',
    title: 'Rental Features',
    icon: Settings,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'transmission',
        label: 'Transmission',
        type: 'select',
        placeholder: 'Select transmission',
        options: [
          { value: 'automatic', label: 'Automatic', count: 55 },
          { value: 'manual', label: 'Manual', count: 45 }
        ]
      },
      {
        id: 'deliveryAvailable',
        label: 'Delivery Options',
        type: 'select',
        placeholder: 'Select delivery option',
        options: [
          { value: 'home-delivery', label: 'Home Delivery', count: 35 },
          { value: 'pickup-only', label: 'Pickup Only', count: 65 }
        ]
      },
      {
        id: 'minDays',
        label: 'Min Rental Days',
        type: 'number',
        placeholder: 'e.g. 1'
      },
      {
        id: 'maxDays',
        label: 'Max Rental Days',
        type: 'number',
        placeholder: 'e.g. 30'
      }
    ]
  }
];