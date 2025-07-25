// src/data/mockData.js
// Updated Mock data for Car Mart backend with proper demo images

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
      "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494976300122-74e6b8b63f9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1570611178717-4c68f8ffe4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "7-Seater", "AWD", "Premium Interior", "Around View Monitor", "ProPILOT Assist", "Bose Audio"
    ],
    description: "Nearly new Infiniti QX60 with premium features and 7-seater capacity. Perfect family SUV with advanced safety technology and luxurious interior appointments.",
    seller: {
      id: "seller2",
      name: "Kandy Auto Palace",
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
    color: "Racing Red",
    engineCapacity: "5000cc",
    condition: "Excellent",
    healthScore: 89,
    make: "Ford",
    model: "Mustang GT",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580414155951-1dc4a73d3e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494976300122-74e6b8b63f9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Premium Package", "Performance Exhaust", "Recaro Seats", "Track Apps", "Magnetic Ride", "Premium Audio"
    ],
    description: "Stunning Ford Mustang GT with Premium Package. This American muscle car delivers incredible performance with its 5.0L V8 engine and track-tuned suspension.",
    seller: {
      id: "seller3",
      name: "Sports Car Specialists",
      rating: 4.8,
      reviewCount: 234,
      verified: true,
      memberSince: "2018",
      location: "Galle",
      responseTime: "Within 30 minutes"
    }
  },
  {
    id: "4",
    title: "Toyota Prius Hybrid",
    price: 7200000,
    year: 2021,
    mileage: 35000,
    location: "Negombo",
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Hatchback",
    color: "Silver Metallic",
    engineCapacity: "1800cc",
    condition: "Very Good",
    healthScore: 87,
    make: "Toyota",
    model: "Prius",
    images: [
      "https://images.unsplash.com/photo-1549399729-2efbaddc8a7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1572408796-77c3e6ee49b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Hybrid System", "Toyota Safety Sense", "Backup Camera", "Touch Screen", "Bluetooth", "Eco Mode"
    ],
    description: "Efficient Toyota Prius hybrid offering excellent fuel economy and reliability. Perfect for city driving with advanced safety features and spacious interior.",
    seller: {
      id: "seller4",
      name: "Green Auto Solutions",
      rating: 4.6,
      reviewCount: 145,
      verified: true,
      memberSince: "2020",
      location: "Negombo",
      responseTime: "Within 4 hours"
    }
  },
  {
    id: "5",
    title: "BMW X5 xDrive40i",
    price: 32500000,
    year: 2023,
    mileage: 5000,
    location: "Colombo",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Alpine White",
    engineCapacity: "3000cc",
    condition: "Excellent",
    healthScore: 96,
    make: "BMW",
    model: "X5",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617880251995-c239536a647c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564733511515-0b012a88bd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "xDrive AWD", "M Sport Package", "Panoramic Roof", "Harman Kardon", "Navigation", "Gesture Control"
    ],
    description: "Like-new BMW X5 with luxury features and powerful turbo engine. This premium SUV offers the perfect blend of performance, comfort, and advanced technology.",
    seller: {
      id: "seller5",
      name: "Luxury Motors Ceylon",
      rating: 4.9,
      reviewCount: 312,
      verified: true,
      memberSince: "2017",
      location: "Colombo",
      responseTime: "Within 30 minutes"
    }
  },
  {
    id: "6",
    title: "Honda Civic Type R",
    price: 19800000,
    year: 2022,
    mileage: 8500,
    location: "Matara",
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    color: "Championship White",
    engineCapacity: "2000cc",
    condition: "Excellent",
    healthScore: 92,
    make: "Honda",
    model: "Civic Type R",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580414155951-1dc4a73d3e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Turbo Engine", "Brembo Brakes", "Racing Seats", "Sport+ Mode", "Track Telemetry", "Carbon Fiber"
    ],
    description: "Incredible Honda Civic Type R in pristine condition. This track-focused hot hatch delivers thrilling performance with its turbocharged engine and precision handling.",
    seller: {
      id: "seller6",
      name: "Performance Auto Hub",
      rating: 4.7,
      reviewCount: 178,
      verified: true,
      memberSince: "2019",
      location: "Matara",
      responseTime: "Within 2 hours"
    }
  }
];

const parts = [
  {
    id: "1",
    title: "Brembo Brake Pads - Front Set for BMW E46",
    brand: "Brembo",
    partNumber: "P06020",
    category: "Brake System",
    condition: "New",
    price: 25000,
    location: "Colombo",
    compatibility: ["BMW E46 320i", "BMW E46 325i", "BMW E46 330i"],
    warranty: "12 months",
    images: [
      "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558067164-58beb515d4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Genuine Brembo brake pads for BMW E46 series. High-performance braking with excellent heat dissipation and long-lasting durability.",
    seller: {
      id: "parts1",
      name: "Euro Parts Lanka",
      rating: 4.8,
      reviewCount: 145,
      verified: true,
      location: "Colombo"
    }
  },
  {
    id: "2",
    title: "K&N Cold Air Intake System - Honda Civic Type R",
    brand: "K&N",
    partNumber: "57-3510",
    category: "Engine Parts",
    condition: "New",
    price: 45000,
    location: "Kandy",
    compatibility: ["Honda Civic Type R FK8"],
    warranty: "Lifetime",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "High-flow K&N cold air intake system for Honda Civic Type R. Increases horsepower and improves engine sound with washable filter.",
    seller: {
      id: "parts2",
      name: "Performance Parts Pro",
      rating: 4.9,
      reviewCount: 203,
      verified: true,
      location: "Kandy"
    }
  },
  {
    id: "3",
    title: "OEM Toyota Prius Hybrid Battery Module",
    brand: "Toyota",
    partNumber: "G9280-47030",
    category: "Electrical",
    condition: "Refurbished",
    price: 180000,
    location: "Galle",
    compatibility: ["Toyota Prius Gen 3", "Toyota Prius 2010-2015"],
    warranty: "18 months",
    images: [
      "https://images.unsplash.com/photo-1558067164-58beb515d4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Genuine Toyota hybrid battery module, professionally refurbished and tested. Perfect replacement for aging Prius hybrid systems.",
    seller: {
      id: "parts3",
      name: "Hybrid Solutions SL",
      rating: 4.7,
      reviewCount: 89,
      verified: true,
      location: "Galle"
    }
  },
  {
    id: "4",
    title: "Bilstein B8 Shock Absorbers - BMW X5",
    brand: "Bilstein",
    partNumber: "24-220589",
    category: "Suspension",
    condition: "New",
    price: 95000,
    location: "Negombo",
    compatibility: ["BMW X5 E70", "BMW X5 F15"],
    warranty: "24 months",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Premium Bilstein shock absorbers for BMW X5. Gas-pressure technology provides superior damping performance and comfort.",
    seller: {
      id: "parts4",
      name: "Suspension Specialists",
      rating: 4.8,
      reviewCount: 167,
      verified: true,
      location: "Negombo"
    }
  },
  {
    id: "5",
    title: "Michelin Pilot Sport 4S Tires - 225/40R18",
    brand: "Michelin",
    partNumber: "PS4S-225-40-18",
    category: "Tires",
    condition: "New",
    price: 68000,
    location: "Matara",
    compatibility: ["Universal - 225/40R18"],
    warranty: "5 years",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Premium Michelin Pilot Sport 4S tires in size 225/40R18. Excellent grip in both wet and dry conditions with sporty handling characteristics.",
    seller: {
      id: "parts5",
      name: "Tire World Lanka",
      rating: 4.9,
      reviewCount: 298,
      verified: true,
      location: "Matara"
    }
  },
  {
    id: "6",
    title: "HKS Exhaust System - Subaru WRX STI",
    brand: "HKS",
    partNumber: "31021-AF013",
    category: "Exhaust System",
    condition: "Like New",
    price: 155000,
    location: "Colombo",
    compatibility: ["Subaru WRX STI 2015-2021"],
    warranty: "6 months",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558067164-58beb515d4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "HKS performance exhaust system for Subaru WRX STI. Titanium construction with aggressive sound and improved flow characteristics.",
    seller: {
      id: "parts6",
      name: "JDM Performance Parts",
      rating: 4.8,
      reviewCount: 134,
      verified: true,
      location: "Colombo"
    }
  }
];

const services = [
  {
    id: "1",
    title: "Complete Vehicle Service & Oil Change",
    description: "Professional vehicle servicing with comprehensive inspection, oil change, filter replacement, and diagnostic check. Our certified technicians use genuine parts and latest equipment.",
    price: 8500,
    location: "Colombo",
    serviceType: "maintenance",
    provider: {
      name: "Pro Auto Care",
      rating: 4.9,
      reviewCount: 247,
      verified: true,
      experience: "15 years",
      specialties: ["General Maintenance", "Oil Changes", "Brake Service"]
    },
    features: [
      "Engine oil change",
      "Oil filter replacement",
      "Multi-point inspection",
      "Brake system check",
      "Battery test",
      "Fluid top-up"
    ],
    duration: "2-3 hours",
    warranty: "6 months",
    images: [
      "https://images.unsplash.com/photo-1632823471565-1ecdf5e37788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "2",
    title: "Premium Ceramic Coating & Paint Protection",
    description: "Professional 9H ceramic coating application with paint correction and protection. Includes interior protection and maintenance kit for long-lasting results.",
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
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1594736797933-d0c62e6b8bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1632823471565-1ecdf5e37788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
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
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

module.exports = { vehicles, parts, services };