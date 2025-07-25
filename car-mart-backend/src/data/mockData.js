// src/data/mockData.js
// NEW Mock data for Car Mart backend - Updated with fresh vehicles and content

const vehicles = [
  {
    id: "1",
    title: "Lexus ES 350 F Sport",
    price: 18500000,
    year: 2022,
    mileage: 15000,
    location: "Colombo",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Pearl White",
    engineCapacity: "3500cc",
    condition: "Excellent",
    healthScore: 94,
    make: "Lexus",
    model: "ES 350",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "F Sport Package", "Leather Seats", "Navigation System", "Premium Audio", "Wireless Charging", "Heated Seats"
    ],
    description: "This pristine Lexus ES 350 F Sport combines luxury with performance. Features include premium leather interior, advanced safety systems, and the signature F Sport styling package.",
    seller: {
      id: "seller1",
      name: "Premium Motors Colombo",
      rating: 4.9,
      reviewCount: 156,
      verified: true,
      memberSince: "2020",
      location: "Colombo",
      responseTime: "Within 1 hour"
    }
  },
  {
    id: "2",
    title: "Infiniti QX60 Premium",
    price: 21800000,
    year: 2023,
    mileage: 8000,
    location: "Kandy",
    fuelType: "Petrol",
    transmission: "CVT",
    bodyType: "SUV",
    color: "Midnight Black",
    engineCapacity: "3500cc",
    condition: "Excellent",
    healthScore: 91,
    make: "Infiniti",
    model: "QX60",
    images: [
      "https://images.unsplash.com/photo-1570611178717-4c68f8ffe4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "7-Seater", "AWD", "Premium Interior", "Around View Monitor", "ProPILOT Assist", "Bose Audio"
    ],
    description: "Nearly new Infiniti QX60 with premium features and 7-seater capacity. Perfect family SUV with advanced safety technology and luxurious interior appointments.",
    seller: {
      id: "seller2",
      name: "Central Auto Gallery",
      rating: 4.7,
      reviewCount: 89,
      verified: true,
      memberSince: "2019",
      location: "Kandy",
      responseTime: "Within 2 hours"
    }
  },
  {
    id: "3",
    title: "Ford Mustang GT Premium",
    price: 24500000,
    year: 2022,
    mileage: 12000,
    location: "Galle",
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Coupe",
    color: "Race Red",
    engineCapacity: "5000cc",
    condition: "Excellent",
    healthScore: 89,
    make: "Ford",
    model: "Mustang GT",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "5.0L V8 Engine", "Performance Package", "Manual Transmission", "Recaro Seats", "Track Apps", "Premium Audio"
    ],
    description: "Iconic American muscle car with 5.0L V8 engine and manual transmission. This Mustang GT features the Performance Package for enhanced track capability.",
    seller: {
      id: "seller3",
      name: "Sports Car Specialists",
      rating: 4.8,
      reviewCount: 67,
      verified: true,
      memberSince: "2021",
      location: "Galle",
      responseTime: "Within 3 hours"
    }
  },
  {
    id: "4",
    title: "Volkswagen ID.4 Pro",
    price: 19800000,
    year: 2023,
    mileage: 5000,
    location: "Negombo",
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Moonstone Grey",
    engineCapacity: "Electric",
    condition: "Excellent",
    healthScore: 96,
    make: "Volkswagen",
    model: "ID.4",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Electric Drive", "AWD", "ID.Light", "App Connect", "Travel Assist", "Fast Charging"
    ],
    description: "Latest electric SUV from Volkswagen with impressive range and modern technology. Features rapid charging capability and advanced driver assistance systems.",
    seller: {
      id: "seller4",
      name: "EV Motors Lanka",
      rating: 4.9,
      reviewCount: 43,
      verified: true,
      memberSince: "2022",
      location: "Negombo",
      responseTime: "Within 1 hour"
    }
  },
  {
    id: "5",
    title: "Subaru WRX STI",
    price: 16200000,
    year: 2021,
    mileage: 25000,
    location: "Colombo",
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Sedan",
    color: "World Rally Blue",
    engineCapacity: "2500cc",
    condition: "Good",
    healthScore: 87,
    make: "Subaru",
    model: "WRX STI",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Turbo Boxer Engine", "AWD", "STI Performance", "Brembo Brakes", "Sport Suspension", "Rally Heritage"
    ],
    description: "Legendary performance sedan with turbocharged boxer engine and symmetric AWD. Perfect for enthusiasts who appreciate rally-bred engineering.",
    seller: {
      id: "seller5",
      name: "Performance Auto Hub",
      rating: 4.6,
      reviewCount: 78,
      verified: true,
      memberSince: "2020",
      location: "Colombo",
      responseTime: "Within 4 hours"
    }
  },
  {
    id: "6",
    title: "Acura MDX Technology",
    price: 23200000,
    year: 2022,
    mileage: 18000,
    location: "Panadura",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Platinum White",
    engineCapacity: "3500cc",
    condition: "Excellent",
    healthScore: 92,
    make: "Acura",
    model: "MDX",
    images: [
      "https://images.unsplash.com/photo-1544808489-43d31e8a6ef6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "7-Seater", "SH-AWD", "Technology Package", "AcuraWatch", "Premium Audio", "Panoramic Roof"
    ],
    description: "Premium 7-seater SUV with advanced technology package and SH-AWD system. Combines luxury, performance, and practicality in one sophisticated package.",
    seller: {
      id: "seller6",
      name: "Luxury Car Center",
      rating: 4.8,
      reviewCount: 92,
      verified: true,
      memberSince: "2018",
      location: "Panadura",
      responseTime: "Within 2 hours"
    }
  }
];

const parts = [
  {
    id: "1",
    title: "K&N Cold Air Intake System",
    price: 45000,
    condition: "New",
    location: "Colombo",
    brand: "K&N",
    partNumber: "57-3509",
    compatibility: ["Honda Civic 2016-2021", "Acura ILX 2016-2019"],
    warranty: "1 Million Mile Warranty",
    category: "performance",
    description: "High-flow air intake system designed to increase horsepower and acceleration while providing excellent filtration. Made from premium materials with washable filter element.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    seller: {
      id: "seller1",
      name: "Speed Parts LK",
      rating: 4.8,
      verified: true,
      responseTime: "Within 2 hours"
    }
  },
  {
    id: "2", 
    title: "Bilstein B12 Suspension Kit",
    price: 125000,
    condition: "New",
    location: "Kandy",
    brand: "Bilstein",
    partNumber: "46-000753",
    compatibility: ["BMW 3 Series E90", "BMW 3 Series F30"],
    warranty: "2 year warranty",
    category: "suspension",
    description: "Complete suspension upgrade kit featuring Bilstein dampers and Eibach springs. Improves handling while maintaining ride comfort. German engineering at its finest.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    seller: {
      id: "seller2",
      name: "Euro Parts Centre",
      rating: 4.9,
      verified: true,
      responseTime: "Within 1 hour"
    }
  },
  {
    id: "3",
    title: "Brembo GT Brake Kit",
    price: 285000,
    condition: "New", 
    location: "Galle",
    brand: "Brembo",
    partNumber: "1N1.9001A",
    compatibility: ["Ford Mustang GT 2015-2023"],
    warranty: "2 year warranty",
    category: "brakes",
    description: "High-performance brake system featuring 6-piston front calipers and 4-piston rear calipers with slotted rotors. Track-proven stopping power for serious enthusiasts.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    seller: {
      id: "seller3",
      name: "Performance Brake Systems",
      rating: 4.7,
      verified: true,
      responseTime: "Within 3 hours"
    }
  },
  {
    id: "4",
    title: "Michelin Pilot Sport 4S Set",
    price: 95000,
    condition: "New",
    location: "Negombo", 
    brand: "Michelin",
    partNumber: "PS4S-225/40R18",
    compatibility: ["Universal - 225/40R18"],
    warranty: "6 year warranty",
    category: "wheels-tires",
    description: "Ultra-high performance summer tires designed for sports cars and high-performance vehicles. Exceptional grip in dry and wet conditions with precise steering response.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    seller: {
      id: "seller4",
      name: "Tire World LK",
      rating: 4.6,
      verified: true,
      responseTime: "Within 4 hours"
    }
  },
  {
    id: "5",
    title: "Borla ATAK Exhaust System",
    price: 165000,
    condition: "New",
    location: "Colombo",
    brand: "Borla",
    partNumber: "140679",
    compatibility: ["Subaru WRX STI 2015-2021"],
    warranty: "1 Million Mile Warranty",
    category: "exhaust",
    description: "Aggressive sound exhaust system with ATAK technology. Delivers maximum performance gains with the signature Borla sound. Made from premium T-304 stainless steel.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    seller: {
      id: "seller5",
      name: "Exhaust Specialists",
      rating: 4.8,
      verified: true,
      responseTime: "Within 2 hours"
    }
  },
  {
    id: "6",
    title: "Recaro Sportster CS Seats",
    price: 89000,
    condition: "New",
    location: "Kandy",
    brand: "Recaro",
    partNumber: "410.00.2587",
    compatibility: ["Universal fitment with brackets"],
    warranty: "2 year warranty",
    category: "interior",
    description: "Premium sport seats with excellent lateral support and comfort. Features Dinamica suede and leather combination with adjustable side bolsters. Perfect for track and street use.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    seller: {
      id: "seller6",
      name: "Interior Upgrades Pro",
      rating: 4.9,
      verified: true,
      responseTime: "Within 1 hour"
    }
  }
];

const services = [
  {
    id: "1",
    title: "Complete ECU Tuning & Dyno Session",
    description: "Professional ECU tuning with dyno testing to maximize your vehicle's performance safely. Includes before/after dyno sheets and custom tune optimization.",
    price: 65000,
    location: "Colombo",
    serviceType: "performance",
    provider: {
      name: "Precision Auto Tuning",
      rating: 4.9,
      reviewCount: 156,
      verified: true,
      experience: "8 years",
      specialties: ["ECU Tuning", "Dyno Testing", "Performance Upgrades"]
    },
    features: [
      "Dyno testing before and after",
      "Custom tune development", 
      "Performance optimization",
      "Data logging included",
      "6-month tune warranty"
    ],
    duration: "3-4 hours",
    warranty: "6 months",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "2",
    title: "Premium Ceramic Coating Package",
    description: "9H ceramic coating application with paint correction and protection. Includes interior protection and maintenance kit for long-lasting results.",
    price: 35000,
    location: "Kandy",
    serviceType: "detailing",
    provider: {
      name: "Elite Car Detailing",
      rating: 4.8,
      reviewCount: 298,
      verified: true,
      experience: "6 years",
      specialties: ["Ceramic Coating", "Paint Protection", "Interior Detailing"]
    },
    features: [
      "Paint correction included",
      "9H ceramic coating",
      "Interior protection",
      "5-year coating warranty",
      "Maintenance kit provided"
    ],
    duration: "Full day",
    warranty: "5 years",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "3",
    title: "Complete Racing Preparation",
    description: "Full race prep service including rollcage installation, safety equipment, and performance modifications. FIA approved components and professional installation.",
    price: 125000,
    location: "Galle",
    serviceType: "racing",
    provider: {
      name: "Motorsport Engineering",
      rating: 4.7,
      reviewCount: 87,
      verified: true,
      experience: "12 years",
      specialties: ["Racing Preparation", "Rollcage Installation", "Safety Equipment"]
    },
    features: [
      "FIA approved rollcage",
      "Racing seat installation",
      "Fire suppression system",
      "Safety harness setup",
      "Technical inspection"
    ],
    duration: "2-3 days",
    warranty: "1 year",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "4",
    title: "Classic Car Restoration",
    description: "Complete classic car restoration service including bodywork, engine rebuild, and interior restoration. Specializing in bringing vintage vehicles back to showroom condition.",
    price: 450000,
    location: "Negombo",
    serviceType: "restoration",
    provider: {
      name: "Heritage Auto Restoration",
      rating: 4.9,
      reviewCount: 45,
      verified: true,
      experience: "15 years",
      specialties: ["Frame Restoration", "Engine Rebuilds", "Concours Preparation"]
    },
    features: [
      "Complete body restoration",
      "Engine rebuild included",
      "Interior refurbishment",
      "Chrome work",
      "Concours level finish"
    ],
    duration: "3-6 months",
    warranty: "2 years",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "5",
    title: "Performance Wheel Alignment & Setup",
    description: "Precision wheel alignment with performance settings. Includes corner balancing, tire pressure optimization, and suspension geometry adjustment.",
    price: 18000,
    location: "Colombo",
    serviceType: "maintenance",
    provider: {
      name: "Precision Alignment Center",
      rating: 4.8,
      reviewCount: 234,
      verified: true,
      experience: "10 years",
      specialties: ["Wheel Alignment", "Suspension Setup", "Performance Tuning"]
    },
    features: [
      "4-wheel laser alignment",
      "Corner weight adjustment",
      "Toe, camber, caster setup",
      "Performance optimization",
      "Road test included"
    ],
    duration: "2-3 hours",
    warranty: "6 months",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "6",
    title: "Comprehensive Pre-Purchase Inspection",
    description: "Detailed 120-point inspection with digital report and recommendations. Includes mechanical, electrical, and cosmetic assessment with photos.",
    price: 12000,
    location: "Panadura",
    serviceType: "inspection",
    provider: {
      name: "Auto Inspection Experts",
      rating: 4.9,
      reviewCount: 167,
      verified: true,
      experience: "7 years",
      specialties: ["Pre-Purchase Inspection", "Diagnostic Services", "Insurance Inspections"]
    },
    features: [
      "120-point inspection",
      "Digital photo report",
      "Mechanical assessment",
      "Electronic diagnostics",
      "Value estimation"
    ],
    duration: "2-3 hours",
    warranty: "Report accuracy guarantee",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

module.exports = { vehicles, parts, services };