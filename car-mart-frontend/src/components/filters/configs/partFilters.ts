// src/components/filters/configs/partFilters.ts
import { Package, DollarSign, MapPin, Shield, Wrench } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const partFilterSections: FilterSection[] = [
  {
    id: 'search',
    title: 'Search',
    icon: Package,
    collapsible: false,
    priority: 1,
    filters: [
      {
        id: 'search',
        label: 'Search parts',
        type: 'search',
        placeholder: 'Part name, brand, or part number...'
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
        min: 500,
        max: 500000,
        step: 1000
      }
    ]
  },
  {
    id: 'category',
    title: 'Category',
    icon: Wrench,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'category',
        label: 'Part Category',
        type: 'select',
        placeholder: 'Select category',
        options: [
          { value: 'engine', label: 'Engine Parts', count: 156 },
          { value: 'transmission', label: 'Transmission', count: 89 },
          { value: 'brake', label: 'Brake System', count: 134 },
          { value: 'suspension', label: 'Suspension', count: 78 },
          { value: 'electrical', label: 'Electrical', count: 167 },
          { value: 'body', label: 'Body Parts', count: 234 },
          { value: 'interior', label: 'Interior', count: 89 },
          { value: 'exhaust', label: 'Exhaust System', count: 45 },
          { value: 'cooling', label: 'Cooling System', count: 67 },
          { value: 'fuel', label: 'Fuel System', count: 34 }
        ]
      },
      {
        id: 'brand',
        label: 'Brand',
        type: 'select',
        placeholder: 'Select brand',
        options: [
          { value: 'genuine', label: 'Genuine/OEM', count: 234 },
          { value: 'bosch', label: 'Bosch', count: 89 },
          { value: 'denso', label: 'Denso', count: 67 },
          { value: 'ngk', label: 'NGK', count: 45 },
          { value: 'mann', label: 'Mann Filter', count: 34 },
          { value: 'brembo', label: 'Brembo', count: 23 },
          { value: 'sachs', label: 'Sachs', count: 19 },
          { value: 'febi', label: 'Febi', count: 28 }
        ]
      }
    ]
  },
  {
    id: 'condition',
    title: 'Condition & Type',
    icon: Shield,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'condition',
        label: 'Condition',
        type: 'checkbox',
        options: [
          { value: 'new', label: 'New', count: 345 },
          { value: 'used', label: 'Used - Good', count: 123 },
          { value: 'refurbished', label: 'Refurbished', count: 67 },
          { value: 'damaged', label: 'For Parts', count: 23 }
        ]
      },
      {
        id: 'partType',
        label: 'Part Type',
        type: 'checkbox',
        options: [
          { value: 'oem', label: 'OEM Parts', count: 234 },
          { value: 'aftermarket', label: 'Aftermarket', count: 189 },
          { value: 'performance', label: 'Performance', count: 45 },
          { value: 'racing', label: 'Racing', count: 12 }
        ]
      },
      {
        id: 'warranty',
        label: 'Warranty Period',
        type: 'select',
        placeholder: 'Select warranty',
        options: [
          { value: '3_months', label: '3 Months', count: 67 },
          { value: '6_months', label: '6 Months', count: 89 },
          { value: '1_year', label: '1 Year', count: 156 },
          { value: '2_years', label: '2 Years', count: 78 },
          { value: 'lifetime', label: 'Lifetime', count: 23 }
        ]
      }
    ]
  },
  {
    id: 'compatibility',
    title: 'Vehicle Compatibility',
    icon: Package,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'vehicleMake',
        label: 'Vehicle Make',
        type: 'select',
        placeholder: 'Select make',
        options: [
          { value: 'toyota', label: 'Toyota', count: 234 },
          { value: 'honda', label: 'Honda', count: 189 },
          { value: 'nissan', label: 'Nissan', count: 156 },
          { value: 'suzuki', label: 'Suzuki', count: 134 },
          { value: 'hyundai', label: 'Hyundai', count: 98 }
        ]
      },
      {
        id: 'vehicleModel',
        label: 'Vehicle Model',
        type: 'select',
        placeholder: 'Select model',
        options: [
          { value: 'camry', label: 'Camry', count: 45 },
          { value: 'corolla', label: 'Corolla', count: 67 },
          { value: 'civic', label: 'Civic', count: 34 },
          { value: 'accord', label: 'Accord', count: 28 }
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
        label: 'Location',
        type: 'select',
        placeholder: 'Select location',
        options: [
          { value: 'colombo', label: 'Colombo', count: 156 },
          { value: 'kandy', label: 'Kandy', count: 89 },
          { value: 'galle', label: 'Galle', count: 67 },
          { value: 'jaffna', label: 'Jaffna', count: 34 },
          { value: 'negombo', label: 'Negombo', count: 45 }
        ]
      }
    ]
  }
];