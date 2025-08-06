// car-mart-frontend/src/components/filters/configs/vehicleFilters.ts
// ✅ COMPLETE SIMPLIFIED VERSION - Replace your existing file

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
          { value: 'maruti-suzuki', label: 'Maruti Suzuki', count: 45 },
          { value: 'hyundai', label: 'Hyundai', count: 38 },
          { value: 'tata', label: 'Tata', count: 32 },
          { value: 'mahindra', label: 'Mahindra', count: 28 },
          { value: 'honda', label: 'Honda', count: 25 },
          { value: 'toyota', label: 'Toyota', count: 22 },
          { value: 'kia', label: 'Kia', count: 18 },
          { value: 'ford', label: 'Ford', count: 15 },
          { value: 'volkswagen', label: 'Volkswagen', count: 12 },
          { value: 'skoda', label: 'Skoda', count: 10 }
        ]
      },
      {
        id: 'bodyType',
        label: 'Body Type',
        type: 'select',
        placeholder: 'Select body type',
        options: [
          { value: 'hatchback', label: 'Hatchback', count: 52 },
          { value: 'sedan', label: 'Sedan', count: 48 },
          { value: 'suv', label: 'SUV', count: 35 },
          { value: 'wagon', label: 'Wagon', count: 15 },
          { value: 'coupe', label: 'Coupe', count: 8 }
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
          { value: 'petrol', label: 'Petrol', count: 142 },
          { value: 'diesel', label: 'Diesel', count: 89 },
          { value: 'hybrid', label: 'Hybrid', count: 34 },
          { value: 'electric', label: 'Electric', count: 12 }
        ]
      },
      {
        id: 'transmission',
        label: 'Transmission',
        type: 'select',
        placeholder: 'Select transmission',
        options: [
          { value: 'manual', label: 'Manual', count: 98 },
          { value: 'automatic', label: 'Automatic', count: 85 },
          { value: 'cvt', label: 'CVT', count: 31 }
        ]
      }
    ]
  }
];