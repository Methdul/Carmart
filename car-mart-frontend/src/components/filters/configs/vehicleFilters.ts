// car-mart-frontend/src/components/filters/configs/vehicleFilters.ts
// ✅ FIXED VERSION - Matches your exact database values

import { Car, DollarSign, Settings } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const vehicleFilterSections: FilterSection[] = [
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
        label: 'Min Price',
        type: 'number',
        placeholder: 'Minimum price (₹)'
      },
      {
        id: 'maxPrice',
        label: 'Max Price',
        type: 'number',
        placeholder: 'Maximum price (₹)'
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
        label: 'Brand',
        type: 'select',
        placeholder: 'Select brand',
        options: [
          // ✅ EXACT values from your database
          { value: 'Audi', label: 'Audi', count: 1 },
          { value: 'BMW', label: 'BMW', count: 1 },
          { value: 'Honda', label: 'Honda', count: 3 },
          { value: 'Mercedes-Benz', label: 'Mercedes-Benz', count: 1 },
          { value: 'Nissan', label: 'Nissan', count: 1 },
          { value: 'Toyota', label: 'Toyota', count: 3 }
        ]
      },
      {
        id: 'bodyType',
        label: 'Body Type',
        type: 'select',
        placeholder: 'Select body type',
        options: [
          // ✅ EXACT values from your database
          { value: 'Sedan', label: 'Sedan', count: 8 },
          { value: 'SUV', label: 'SUV', count: 2 }
        ]
      },
      {
        id: 'yearFrom',
        label: 'Year From',
        type: 'number',
        placeholder: 'e.g. 2015'
      },
      {
        id: 'yearTo',
        label: 'Year To',
        type: 'number',
        placeholder: 'e.g. 2024'
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
          { value: 'Petrol', label: 'Petrol', count: 9 },
          { value: 'Hybrid', label: 'Hybrid', count: 1 }
        ]
      },
      {
        id: 'transmission',
        label: 'Transmission',
        type: 'select',
        placeholder: 'Select transmission',
        options: [
          // ✅ EXACT values from your database
          { value: 'Manual', label: 'Manual', count: 4 },
          { value: 'Automatic', label: 'Automatic', count: 5 },
          { value: 'CVT', label: 'CVT', count: 1 }
        ]
      }
    ]
  }
];