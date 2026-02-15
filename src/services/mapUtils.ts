import type { Property } from '@/data/properties';

// Mock coordinates for cities (in production, use geocoding API)
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
  'Chandigarh': { lat: 30.7333, lng: 76.7794 },
};

export interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  price: string;
  propertyType: string;
  listingType: string;
}

/**
 * Generate random offset for properties in same city
 */
function getRandomOffset(): number {
  return (Math.random() - 0.5) * 0.05; // ±0.025 degrees (~2.5km variance)
}

/**
 * Convert property to map marker
 */
export function propertyToMarker(property: Property): MapMarker {
  const cityCoords = CITY_COORDINATES[property.location] || CITY_COORDINATES['Bangalore'];
  
  return {
    id: property.id,
    position: {
      lat: cityCoords.lat + getRandomOffset(),
      lng: cityCoords.lng + getRandomOffset(),
    },
    title: property.title,
    price: `₹${property.price.toLocaleString()}`,
    propertyType: property.propertyType,
    listingType: property.listingType,
  };
}

/**
 * Convert multiple properties to markers
 */
export function propertiesToMarkers(properties: Property[]): MapMarker[] {
  return properties.map(propertyToMarker);
}

/**
 * Get center point for a set of properties
 */
export function getCenterPoint(properties: Property[]): { lat: number; lng: number } {
  if (properties.length === 0) {
    return CITY_COORDINATES['Bangalore']; // Default
  }

  if (properties.length === 1) {
    return CITY_COORDINATES[properties[0].location] || CITY_COORDINATES['Bangalore'];
  }

  // Calculate center of all properties
  const markers = propertiesToMarkers(properties);
  const sumLat = markers.reduce((sum, m) => sum + m.position.lat, 0);
  const sumLng = markers.reduce((sum, m) => sum + m.position.lng, 0);

  return {
    lat: sumLat / markers.length,
    lng: sumLng / markers.length,
  };
}

/**
 * Get bounds for a set of properties
 */
export function getBounds(properties: Property[]): {
  north: number;
  south: number;
  east: number;
  west: number;
} | null {
  if (properties.length === 0) return null;

  const markers = propertiesToMarkers(properties);
  
  let north = markers[0].position.lat;
  let south = markers[0].position.lat;
  let east = markers[0].position.lng;
  let west = markers[0].position.lng;

  markers.forEach(marker => {
    north = Math.max(north, marker.position.lat);
    south = Math.min(south, marker.position.lat);
    east = Math.max(east, marker.position.lng);
    west = Math.min(west, marker.position.lng);
  });

  // Add padding (10%)
  const latPadding = (north - south) * 0.1;
  const lngPadding = (east - west) * 0.1;

  return {
    north: north + latPadding,
    south: south - latPadding,
    east: east + lngPadding,
    west: west - lngPadding,
  };
}

/**
 * Calculate distance between two points (in km)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get Google Maps URL for a property
 */
export function getGoogleMapsUrl(property: Property): string {
  const coords = CITY_COORDINATES[property.location] || CITY_COORDINATES['Bangalore'];
  return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
}
