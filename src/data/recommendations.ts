import { Property, UserPreferences } from "./properties";

interface ScoredProperty {
  property: Property;
  score: number;
  reasons: string[];
}

export const scoreProperty = (
  property: Property,
  preferences: UserPreferences
): ScoredProperty => {
  let score = 0;
  const reasons: string[] = [];

  // Budget match → +35 points max (Increased weight for accuracy)
  const isWithinBudget = property.price >= preferences.minBudget && property.price <= preferences.maxBudget;
  
  if (isWithinBudget) {
    score += 35;
    reasons.push("Perfect match for your budget");
  } else {
    // Calculate how far out it is (%)
    const lowerDiff = (preferences.minBudget - property.price) / preferences.minBudget;
    const upperDiff = (property.price - preferences.maxBudget) / preferences.maxBudget;
    const maxDiff = Math.max(lowerDiff, upperDiff);

    if (maxDiff <= 0.1) { // Within 10%
      score += 20;
      reasons.push("Very close to your budget");
    } else if (maxDiff <= 0.25) { // Within 25%
      score += 10;
      reasons.push("Slightly outside budget range");
    }
  }

  // Location match → +25 points
  if (
    preferences.preferredLocation &&
    property.location.toLowerCase() === preferences.preferredLocation.toLowerCase()
  ) {
    score += 25;
    reasons.push(`Located in ${property.location}`);
  }

  // Property type match → +20 points
  if (
    preferences.propertyType &&
    property.propertyType.toLowerCase() === preferences.propertyType.toLowerCase()
  ) {
    score += 20;
    reasons.push(`${property.propertyType} — your preferred type`);
  }

  // Bedrooms match → +15 points
  if (preferences.bedrooms && property.bedrooms === preferences.bedrooms) {
    score += 15;
    reasons.push(`${property.bedrooms} bedrooms as preferred`);
  } else if (
    preferences.bedrooms &&
    Math.abs(property.bedrooms - preferences.bedrooms) === 1
  ) {
    score += 8;
    reasons.push(`Close to your preferred ${preferences.bedrooms} bedrooms`);
  }

  // Amenity bonus → +10 points max
  const popularAmenities = ["Swimming Pool", "Gym", "Parking", "Security"];
  const matchingAmenities = property.amenities.filter((a) =>
    popularAmenities.includes(a)
  );
  if (matchingAmenities.length > 0) {
    score += Math.min(matchingAmenities.length * 3, 10);
    reasons.push(`Has ${matchingAmenities.join(", ")}`);
  }

  return { property, score, reasons };
};

export const getRecommendations = (
  properties: Property[],
  preferences: UserPreferences,
  limit = 5
): ScoredProperty[] => {
  return properties
    .filter((p) => p.status === "Available")
    .map((p) => scoreProperty(p, preferences))
    .filter((sp) => sp.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  minBudget: 5000000,
  maxBudget: 30000000,
  preferredLocation: "Mumbai",
  propertyType: "Apartment",
  bedrooms: 3,
};
