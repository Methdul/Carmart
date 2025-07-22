// src/data/mockData.js
const vehicles = [
  {
    id: "1",
    title: "BMW 3 Series 320i Sport Line",
    price: 12500000,
    year: 2020,
    mileage: 35000,
    location: "Colombo",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Alpine White",
    engineCapacity: "1998cc",
    condition: "Excellent",
    healthScore: 92,
    make: "BMW",
    model: "3 Series",
    images: [
      "https://example.com/vehicle1.jpg"
    ],
    features: [
      "Leather Seats", "Sunroof", "Navigation System", "Bluetooth"
    ],
    description: "This pristine BMW 3 Series...",
    seller: {
      id: "seller1",
      name: "John Perera",
      rating: 4.8,
      reviewCount: 127,
      verified: true,
      memberSince: "2019",
      location: "Colombo",
      responseTime: "Within 2 hours"
    }
  },
  // Add more vehicles from your frontend mock data...
];

const parts = [
  {
    id: "1",
    title: "Front Brake Pads Set",
    price: 12500,
    condition: "New",
    location: "Colombo",
    brand: "Bosch",
    partNumber: "BP1234",
    compatibility: ["Honda Civic 2015-2020", "Honda Accord 2013-2018"],
    warranty: "1 year",
    category: "brakes",
    description: "High quality brake pads...",
    seller: {
      id: "seller1",
      name: "Auto Parts Lanka",
      rating: 4.8
    }
  },
  // Add more parts...
];

module.exports = { vehicles, parts };