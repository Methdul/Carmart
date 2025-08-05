// src/components/filters/configs/rentalFilters.ts
import { Calendar, DollarSign, MapPin, Car, Clock, Shield } from 'lucide-react';
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
        label: 'Search rentals',
        type: 'search',
        placeholder: 'Make, model, or keyword...'
      }
    ]
  },
  {
    id: 'dates',
    title: 'Rental Dates',
    icon: Calendar,
    collapsible: false,
    priority: 2,
    filters: [
      {
        id: 'pickupDate',
        label: 'Pickup Date',
        type: 'date',
        required: true
      },
      {
        id: 'returnDate',
        label: 'Return Date',
        type: 'date',
        required: true
      }
    ]
  },
  {
    id: 'price',
    title: 'Daily Rate',
    icon: DollarSign,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'dailyRateRange',
        label: 'Daily Rate',
        type: 'range',
        min: 1000,
        max: 25000,
        step: 500
      }
    ]
  },
  {
    id: 'vehicle',
    title: 'Vehicle Details',
    icon: Car,
    collapsible: true,
    defaultOpen: true,
    priority: 4,
    filters: [
      {
        id: 'make',
        label: 'Make',
        type: 'select',
        placeholder: 'Select make',
        options: [
          { value: 'toyota', label: 'Toyota', count: 28 },
          { value: 'honda', label: 'Honda', count: 22 },
          { value: 'nissan', label: 'Nissan', count: 18 },
          { value: 'suzuki', label: 'Suzuki', count: 15 },
          { value: 'hyundai', label: 'Hyundai', count: 12 }
        ]
      },
      {
        id: 'bodyType',
        label: 'Body Type',
        type: 'checkbox',
        options: [
          { value: 'sedan', label: 'Sedan', count: 45 },
          { value: 'suv', label: 'SUV', count: 34 },
          { value: 'hatchback', label: 'Hatchback', count: 28 },
          { value: 'wagon', label: 'Wagon', count: 12 },
          { value: 'van', label: 'Van', count: 8 }
        ]
      },
      {
        id: 'transmission',
        label: 'Transmission',
        type: 'checkbox',
        options: [
          { value: 'automatic', label: 'Automatic', count: 89 },
          { value: 'manual', label: 'Manual', count: 38 }
        ]
      },
      {
        id: 'seats',
        label: 'Seats',
        type: 'select',
        placeholder: 'Select seats',
        options: [
          { value: '2', label: '2 Seater', count: 8 },
          { value: '4', label: '4 Seater', count: 45 },
          { value: '5', label: '5 Seater', count: 67 },
          { value: '7', label: '7 Seater', count: 23 },
          { value: '8+', label: '8+ Seater', count: 12 }
        ]
      }
    ]
  },
  {
    id: 'features',
    title: 'Features & Services',
    icon: Shield,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'deliveryAvailable',
        label: 'Delivery Available',
        type: 'checkbox',
        options: [
          { value: 'true', label: 'Delivery Available', count: 78 }
        ]
      },
      {
        id: 'insuranceIncluded',
        label: 'Insurance Included',
        type: 'checkbox',
        options: [
          { value: 'true', label: 'Insurance Included', count: 95 }
        ]
      },
      {
        id: 'rentalType',
        label: 'Rental Type',
        type: 'checkbox',
        options: [
          { value: 'daily', label: 'Daily Rental', count: 127 },
          { value: 'weekly', label: 'Weekly Rental', count: 89 },
          { value: 'monthly', label: 'Monthly Rental', count: 34 }
        ]
      },
      {
        id: 'fuelPolicy',
        label: 'Fuel Policy',
        type: 'select',
        placeholder: 'Select fuel policy',
        options: [
          { value: 'full-to-full', label: 'Full to Full', count: 89 },
          { value: 'same-to-same', label: 'Same to Same', count: 34 },
          { value: 'pre-purchase', label: 'Pre-purchase', count: 23 }
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
        label: 'Pickup Location',
        type: 'select',
        placeholder: 'Select location',
        options: [
          { value: 'colombo', label: 'Colombo', count: 67 },
          { value: 'airport', label: 'Airport', count: 45 },
          { value: 'kandy', label: 'Kandy', count: 23 },
          { value: 'galle', label: 'Galle', count: 18 },
          { value: 'negombo', label: 'Negombo', count: 15 }
        ]
      }
    ]
  }
];