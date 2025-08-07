// car-mart-frontend/src/components/filters/configs/rentalFilters.ts
// ✅ SIMPLE VERSION - Just case fixes, same structure as vehicle filters

import { Car, DollarSign, Settings, Calendar } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const rentalFilterSections: FilterSection[] = [
  {
    id: 'price',
    title: 'Daily Rate',
    icon: DollarSign,
    collapsible: true,
    defaultOpen: true,
    priority: 2,
    filters: [
      {
        id: 'minDailyRate',
        label: 'Min Daily Rate',
        type: 'number',
        placeholder: 'Minimum rate (₹)'
      },
      {
        id: 'maxDailyRate',
        label: 'Max Daily Rate',
        type: 'number',
        placeholder: 'Maximum rate (₹)'
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
          // ✅ FIXED VALUES - Match your database exactly
          { value: 'Honda', label: 'Honda', count: 15 },
          { value: 'Toyota', label: 'Toyota', count: 12 },
          { value: 'BMW', label: 'BMW', count: 8 },
          { value: 'Mercedes-Benz', label: 'Mercedes-Benz', count: 6 },
          { value: 'Audi', label: 'Audi', count: 5 },
          { value: 'Nissan', label: 'Nissan', count: 4 }
        ]
      },
      {
        id: 'bodyType',
        label: 'Vehicle Type',
        type: 'select',
        placeholder: 'Select vehicle type',
        options: [
          // ✅ FIXED VALUES - Match your database exactly
          { value: 'Sedan', label: 'Sedan', count: 25 },
          { value: 'SUV', label: 'SUV', count: 18 },
          { value: 'Hatchback', label: 'Hatchback', count: 12 }
        ]
      },
      {
        id: 'fuelType',
        label: 'Fuel Type',
        type: 'select',
        placeholder: 'Select fuel type',
        options: [
          // ✅ FIXED VALUES - Match your database exactly
          { value: 'Petrol', label: 'Petrol', count: 45 },
          { value: 'Diesel', label: 'Diesel', count: 15 },
          { value: 'Hybrid', label: 'Hybrid', count: 6 },
          { value: 'Electric', label: 'Electric', count: 4 }
        ]
      },
      {
        id: 'transmission',
        label: 'Transmission',
        type: 'select',
        placeholder: 'Select transmission',
        options: [
          // ✅ FIXED VALUES - Match your database exactly
          { value: 'Manual', label: 'Manual', count: 25 },
          { value: 'Automatic', label: 'Automatic', count: 38 },
          { value: 'CVT', label: 'CVT', count: 7 }
        ]
      }
    ]
  },
  {
    id: 'rental',
    title: 'Rental Terms',
    icon: Calendar,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'rentalType',
        label: 'Rental Duration',
        type: 'select',
        placeholder: 'Select rental type',
        options: [
          { value: 'Daily', label: 'Daily Rental', count: 45 },
          { value: 'Weekly', label: 'Weekly Rental', count: 25 },
          { value: 'Monthly', label: 'Monthly Rental', count: 18 },
          { value: 'Long Term', label: 'Long Term', count: 5 }
        ]
      },
      {
        id: 'seatingCapacity',
        label: 'Seating',
        type: 'select',
        placeholder: 'Select seating capacity',
        options: [
          { value: '2', label: '2 Seater', count: 5 },
          { value: '4', label: '4 Seater', count: 18 },
          { value: '5', label: '5 Seater', count: 35 },
          { value: '7', label: '7 Seater', count: 12 }
        ]
      }
    ]
  },
  {
    id: 'features',
    title: 'Features',
    icon: Settings,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'airConditioning',
        label: 'Air Conditioning',
        type: 'select',
        placeholder: 'AC availability',
        options: [
          { value: 'Yes', label: 'AC Available', count: 62 },
          { value: 'No', label: 'No AC', count: 8 }
        ]
      },
      {
        id: 'deliveryAvailable',
        label: 'Delivery',
        type: 'select',
        placeholder: 'Delivery service',
        options: [
          { value: 'Yes', label: 'Delivery Available', count: 45 },
          { value: 'No', label: 'Pickup Only', count: 25 }
        ]
      }
    ]
  }
];