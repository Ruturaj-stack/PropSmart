export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  propertyType: "Apartment" | "Villa" | "House" | "PG" | "Plot" | "Commercial" | "Penthouse" | "Studio" | "Independent Floor";
  listingType: "Rent" | "Buy";
  status: "Available" | "Sold" | "Rented" | "Under Construction";
  images: string[];
  createdAt: string;
  slug: string;
}

export interface UserPreferences {
  minBudget: number;
  maxBudget: number;
  preferredLocation: string;
  propertyType: string;
  bedrooms: number;
}

export const LOCATIONS = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Goa",
  "Noida", "New Delhi", "Chandigarh", "Kochi", "Mysore", "Gurgaon"
];

export const AMENITIES = [
  "Swimming Pool", "Gym", "Parking", "Garden", "Security",
  "Power Backup", "Elevator", "Club House", "Play Area", "Wi-Fi",
  "CCTV", "Intercom", "Water Harvest", "Jogging Track", "Vastu Compliant", "Pet Friendly"
];

export const PROPERTY_TYPES = [
  "Apartment", "Villa", "House", "PG",
  "Plot", "Commercial", "Penthouse", "Studio", "Independent Floor"
] as const;

const propertyImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
];

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxurious Sea-View Apartment",
    description: "Stunning 3BHK apartment with panoramic sea views, modern interiors, and premium fittings. Located in the heart of Mumbai's most sought-after neighborhood with easy access to business districts and entertainment hubs.",
    price: 25000000,
    location: "Mumbai",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Elevator", "CCTV"],
    propertyType: "Apartment",
    listingType: "Buy",
    status: "Available",
    images: [propertyImages[0], propertyImages[1]],
    createdAt: "2025-12-01",
    slug: "luxurious-sea-view-apartment-mumbai",
  },
  {
    id: "2",
    title: "Modern Villa in Whitefield",
    description: "Spacious 4BHK villa with private garden, modern kitchen, and a rooftop terrace. Perfect for families looking for luxury living in Bangalore's tech corridor.",
    price: 35000000,
    location: "Bangalore",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    amenities: ["Garden", "Parking", "Security", "Power Backup", "Clubhouse", "Play Area"],
    propertyType: "Villa",
    listingType: "Buy",
    status: "Available",
    images: [propertyImages[2], propertyImages[3]],
    createdAt: "2025-11-15",
    slug: "modern-villa-whitefield-bangalore",
  },
  {
    id: "3",
    title: "Cozy Studio in Koramangala",
    description: "Well-furnished studio apartment ideal for professionals. Close to IT parks, restaurants, and nightlife. Fully equipped kitchen and high-speed internet included.",
    price: 22000,
    location: "Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    amenities: ["Wi-Fi", "Gym", "Security", "Parking", "Elevator"],
    propertyType: "Apartment",
    listingType: "Rent",
    status: "Available",
    images: [propertyImages[5], propertyImages[6]],
    createdAt: "2026-01-05",
    slug: "cozy-studio-koramangala-bangalore",
  },
  {
    id: "4",
    title: "Premium PG in Hinjewadi",
    description: "Fully furnished PG accommodation with meals, laundry, and housekeeping services. Walking distance to major IT parks in Pune.",
    price: 12000,
    location: "Pune",
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    amenities: ["Wi-Fi", "Security", "Power Backup", "CCTV"],
    propertyType: "PG",
    listingType: "Rent",
    status: "Available",
    images: [propertyImages[6], propertyImages[7]],
    createdAt: "2026-01-20",
    slug: "premium-pg-hinjewadi-pune",
  },
  {
    id: "5",
    title: "Elegant 3BHK in Jubilee Hills",
    description: "Beautifully designed apartment in Hyderabad's premium locality. Features Italian marble flooring, modular kitchen, and breathtaking city views.",
    price: 18000000,
    location: "Hyderabad",
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    amenities: ["Swimming Pool", "Gym", "Parking", "Clubhouse", "Jogging Track", "Intercom"],
    propertyType: "Apartment",
    listingType: "Buy",
    status: "Available",
    images: [propertyImages[4], propertyImages[0]],
    createdAt: "2025-10-30",
    slug: "elegant-3bhk-jubilee-hills-hyderabad",
  },
  {
    id: "6",
    title: "Beach House in Goa",
    description: "Charming 2BHK beach house just 200 meters from the shore. Perfect weekend getaway or rental investment with stunning sunset views.",
    price: 15000000,
    location: "Goa",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    amenities: ["Garden", "Parking", "Security"],
    propertyType: "House",
    listingType: "Buy",
    status: "Available",
    images: [propertyImages[3], propertyImages[2]],
    createdAt: "2026-02-01",
    slug: "beach-house-goa",
  },
  {
    id: "7",
    title: "Spacious Family Home in Delhi",
    description: "Independent 4BHK house in a gated community with large backyard. Ideal for families seeking privacy and space in the national capital.",
    price: 45000,
    location: "Delhi",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    amenities: ["Garden", "Parking", "Security", "Power Backup", "CCTV", "Play Area"],
    propertyType: "House",
    listingType: "Rent",
    status: "Available",
    images: [propertyImages[7], propertyImages[4]],
    createdAt: "2026-01-10",
    slug: "spacious-family-home-delhi",
  },
  {
    id: "8",
    title: "Smart 2BHK in Baner",
    description: "Contemporary 2BHK apartment with smart home features, voice-controlled lighting, and automated curtains. Premium township with world-class amenities.",
    price: 8500000,
    location: "Pune",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    amenities: ["Swimming Pool", "Gym", "Wi-Fi", "Parking", "Elevator", "Rain Water Harvesting"],
    propertyType: "Apartment",
    listingType: "Buy",
    status: "Available",
    images: [propertyImages[1], propertyImages[5]],
    createdAt: "2025-12-20",
    slug: "smart-2bhk-baner-pune",
  },
  {
    id: "9",
    title: "Heritage Villa in Jaipur",
    description: "Restored heritage villa blending Rajasthani architecture with modern comforts. Features a courtyard, jharokha windows, and a rooftop lounge.",
    price: 28000000,
    location: "Jaipur",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    amenities: ["Garden", "Parking", "Security", "Power Backup", "Intercom"],
    propertyType: "Villa",
    listingType: "Buy",
    status: "Available",
    images: [propertyImages[2], propertyImages[7]],
    createdAt: "2025-11-25",
    slug: "heritage-villa-jaipur",
  },
  {
    id: "10",
    title: "Furnished Flat in Anna Nagar",
    description: "Move-in ready 2BHK flat in Chennai's prime residential area. Close to metro station, schools, and hospitals. Ideal for small families.",
    price: 28000,
    location: "Chennai",
    bedrooms: 2,
    bathrooms: 1,
    area: 950,
    amenities: ["Parking", "Security", "Elevator", "Power Backup", "CCTV"],
    propertyType: "Apartment",
    listingType: "Rent",
    status: "Available",
    images: [propertyImages[0], propertyImages[6]],
    createdAt: "2026-02-05",
    slug: "furnished-flat-anna-nagar-chennai",
  },
  {
    id: "11",
    title: "Penthouse Suite in Worli",
    description: "Ultra-luxury penthouse with private terrace, infinity pool, and 360-degree city views. The pinnacle of Mumbai living.",
    price: 85000000,
    location: "Mumbai",
    bedrooms: 4,
    bathrooms: 4,
    area: 5000,
    amenities: ["Swimming Pool", "Gym", "Parking", "Elevator", "Clubhouse", "Security", "CCTV", "Intercom"],
    propertyType: "Apartment",
    listingType: "Buy",
    status: "Available",
    images: [propertyImages[4], propertyImages[1]],
    createdAt: "2025-09-15",
    slug: "penthouse-suite-worli-mumbai",
  },
  {
    id: "12",
    title: "Affordable PG near Manyata Tech Park",
    description: "Budget-friendly PG with all basic amenities. Triple and double sharing available. Shuttle service to nearby tech parks.",
    price: 8000,
    location: "Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 150,
    amenities: ["Wi-Fi", "Security", "Power Backup"],
    propertyType: "PG",
    listingType: "Rent",
    status: "Available",
    images: [propertyImages[5], propertyImages[3]],
    createdAt: "2026-02-10",
    slug: "affordable-pg-manyata-tech-park-bangalore",
  },
];

export const formatPrice = (price: number, listingType: "Rent" | "Buy"): string => {
  if (listingType === "Rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
};
