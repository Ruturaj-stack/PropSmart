import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCATIONS = [
    "Mumbai", "Bangalore", "Gurgaon", "Pune", "Hyderabad",
    "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Goa",
    "Noida", "New Delhi", "Chandigarh", "Kochi", "Mysore"
];

const TYPES = ["Apartment", "Villa", "Plot", "Commercial", "Penthouse", "Studio", "Independent Floor"];
const LISTING_TYPES = ["Buy", "Rent"];
const STATUSES = ["Available", "Sold", "Under Construction"];

const AMENITIES_POOL = [
    "Swimming Pool", "Gym", "Parking", "Security", "Club House",
    "Jogging Track", "Power Backup", "Garden", "WiFi", "Pet Friendly",
    "Vastu Compliant", "Intercom", "Lift", "CCTV", "Water Harvest"
];

const IMAGES = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?q=80&w=2021&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-2a4d9fdb22d7?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = (arr, count) => arr.sort(() => 0.5 - Math.random()).slice(0, count);

const generateProperties = (count) => {
    const properties = [];
    for (let i = 1; i <= count; i++) {
        const type = getRandom(TYPES);
        const location = getRandom(LOCATIONS);
        const isRent = Math.random() > 0.7;
        const listingType = isRent ? "Rent" : "Buy";

        let price;
        if (listingType === "Rent") {
            price = type === "Plot" ? 0 : Math.floor(Math.random() * 100000) + 10000; // 10k - 1.1L
        } else {
            price = Math.floor(Math.random() * 50000000) + 2500000; // 25L - 5.25Cr
            if (location === "Mumbai") price *= 2;
        }

        const bedrooms = type === "Plot" || type === "Commercial" ? 0 : Math.floor(Math.random() * 4) + 1;
        const bathrooms = type === "Plot" || type === "Commercial" ? (Math.random() > 0.5 ? 1 : 0) : Math.max(1, bedrooms + (Math.random() > 0.5 ? 1 : 0));
        const area = type === "Plot" ? Math.floor(Math.random() * 5000) + 1200 : bedrooms * 400 + 400;

        const titleAdjectives = ["Luxurious", "Spacious", "Modern", "Premium", "Cozy", "Elegant", "Exclusive", "Affordable", "Prime", "Scenic"];
        const title = `${getRandom(titleAdjectives)} ${type} in ${location}`;

        // Select 2 random unique images
        const uniqueImages = [...new Set(IMAGES)];
        const propImages = getRandomSubset(uniqueImages, 2);

        properties.push({
            id: `IN-${i.toString().padStart(3, '0')}`,
            title: title,
            description: `Beautiful ${type.toLowerCase()} located in the heart of ${location}. Close to major landmarks, schools, and hospitals. This property offers a perfect blend of comfort and luxury with ${area} sq.ft of living space. Ideal for ${listingType === "Rent" ? "families and professionals" : "investment or end-use"}.`,
            price: price,
            location: location,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            area: area,
            amenities: getRandomSubset(AMENITIES_POOL, Math.floor(Math.random() * 5) + 3),
            propertyType: type,
            listingType: listingType,
            status: getRandom(STATUSES),
            images: propImages,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
        });
    }
    return properties;
};

const properties = generateProperties(55); // Generating 55 to be sure
const outputPath = path.join(__dirname, '..', 'public', 'properties.json');

fs.writeFileSync(outputPath, JSON.stringify(properties, null, 2));
console.log(`Generated ${properties.length} properties to ${outputPath}`);
