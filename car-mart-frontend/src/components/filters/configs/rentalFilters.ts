// car-mart-frontend/src/components/filters/configs/rentalFilters.ts
// ✅ FIXED VERSION - Uses exact database values from check-rentals-values.js

import { Car, DollarSign, Settings, MapPin, Calendar } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const rentalFilterSections: FilterSection[] = [
  {
    id: 'price',
    title: 'Price Range',
    icon: DollarSign,
    collapsible: true,
    defaultOpen: true,
    priority: 2,
    filters: [
      {
        id: 'minPrice',
        label: 'Min Daily Rate',
        type: 'number',
        placeholder: 'Minimum daily rate (₹)'
      },
      {
        id: 'maxPrice',
        label: 'Max Daily Rate',
        type: 'number',
        placeholder: 'Maximum daily rate (₹)'
      }
    ]
  },
  {
    id: 'vehicle',
    title: 'Vehicle Details',
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
          // ✅ EXACT values from your database
          { value: 'BMW', label: 'BMW', count: 1 },
          { value: 'Honda', label: 'Honda', count: 1 },
          { value: 'Mercedes-Benz', label: 'Mercedes-Benz', count: 1 },
          { value: 'Nissan', label: 'Nissan', count: 1 },
          { value: 'Suzuki', label: 'Suzuki', count: 1 },
          { value: 'Toyota', label: 'Toyota', count: 1 }
        ]
      },
      {
        id: 'bodyType',
        label: 'Body Type',
        type: 'select',
        placeholder: 'Select body type',
        options: [
          // ✅ EXACT values from your database
          { value: 'Hatchback', label: 'Hatchback', count: 2 },
          { value: 'SUV', label: 'SUV', count: 1 },
          { value: 'Sedan', label: 'Sedan', count: 3 }
        ]
      }
    ]
  },
  {
    id: 'specs',
    title: 'Engine & Transmission',
    icon: Settings,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'fuelType',
        label: 'Fuel Type',
        type: 'select',
        placeholder: 'Select fuel type',
        options: [
          // ✅ EXACT values from your database
          { value: 'Electric', label: 'Electric', count: 1 },
          { value: 'Hybrid', label: 'Hybrid', count: 1 },
          { value: 'Petrol', label: 'Petrol', count: 4 }
        ]
      },
      {
        id: 'transmission',
        label: 'Transmission',
        type: 'select',
        placeholder: 'Select transmission',
        options: [
          // ✅ EXACT values from your database
          { value: 'Automatic', label: 'Automatic', count: 5 },
          { value: 'Manual', label: 'Manual', count: 1 }
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
    priority: 5,
    filters: [
      {
        id: 'location',
        label: 'Pickup Location',
        type: 'select',
        placeholder: 'Select location',
        options: [
          // ✅ EXACT values from your database
          { value: 'Colombo 03', label: 'Colombo 03', count: 1 },
          { value: 'Colombo 07', label: 'Colombo 07', count: 1 },
          { value: 'Galle', label: 'Galle', count: 1 },
          { value: 'Kandy', label: 'Kandy', count: 1 },
          { value: 'Negombo', label: 'Negombo', count: 1 }
        ]
      }
    ]
  },
  {
    id: 'services',
    title: 'Additional Services',
    icon: Calendar,
    collapsible: true,
    defaultOpen: false,
    priority: 6,
    filters: [
      {
        id: 'deliveryAvailable',
        label: 'Delivery Available',
        type: 'checkbox',
        placeholder: 'Delivery to your location'
      },
      {
        id: 'insuranceIncluded',
        label: 'Insurance Included',
        type: 'checkbox',
        placeholder: 'Insurance coverage included'
      }
    ]
  }
];