import type { Property } from '@/data/properties';

export interface PropertyScore {
  total: number; // 0-100
  breakdown: {
    priceFairness: number; // 0-25
    amenitiesScore: number; // 0-20
    locationRating: number; // 0-25
    userInterest: number; // 0-15
    avgRating: number; // 0-15
  };
}

/**
 * Calculate property score (0-100)
 */
export function calculatePropertyScore(
  property: Property,
  areaAveragePrice?: number,
  viewCount: number = 0,
  saveCount: number = 0,
  avgRating: number = 0
): PropertyScore {
  // 1. Price Fairness (25 points)
  const priceFairness = calculatePriceFairness(property, areaAveragePrice);

  // 2. Amenities Score (20 points)
  const amenitiesScore = calculateAmenitiesScore(property);

  // 3. Location Rating (25 points)
  const locationRating = calculateLocationRating(property);

  // 4. User Interest (15 points)
  const userInterest = calculateUserInterest(viewCount, saveCount);

  // 5. Average Rating (15 points)
  const avgRatingScore = (avgRating / 5) * 15;

  const total = Math.round(
    priceFairness +
    amenitiesScore +
    locationRating +
    userInterest +
    avgRatingScore
  );

  return {
    total: Math.min(100, Math.max(0, total)),
    breakdown: {
      priceFairness,
      amenitiesScore,
      locationRating,
      userInterest,
      avgRating: avgRatingScore,
    },
  };
}

/**
 * Price Fairness Score (0-25)
 * Lower price vs area average = higher score
 */
function calculatePriceFairness(property: Property, areaAverage?: number): number {
  if (!areaAverage) {
    // Default to median score if no area data
    return 12.5;
  }

  const pricePerSqft = property.price / property.area;
  const avgPricePerSqft = areaAverage;

  // Calculate percentage difference
  const diff = ((pricePerSqft - avgPricePerSqft) / avgPricePerSqft) * 100;

  if (diff <= -20) return 25; // 20%+ below average = excellent
  if (diff <= -10) return 20; // 10-20% below = very good
  if (diff <= 0) return 15;   // At or slightly below = good
  if (diff <= 10) return 10;  // Slightly above = fair
  if (diff <= 20) return 5;   // 10-20% above = poor
  return 0;                   // 20%+ above = very poor
}

/**
 * Amenities Score (0-20)
 * Based on number and quality of amenities
 */
function calculateAmenitiesScore(property: Property): number {
  const amenityCount = property.amenities.length;

  // Premium amenities worth extra points
  const premiumAmenities = ['Swimming Pool', 'Gym', 'Club House', 'Security'];
  const premiumCount = property.amenities.filter(a => 
    premiumAmenities.includes(a)
  ).length;

  let score = Math.min(amenityCount * 1.5, 15); // Up to 15 points for quantity
  score += premiumCount * 1.25; // Up to 5 points for premium amenities

  return Math.min(20, Math.round(score));
}

/**
 * Location Rating (0-25)
 * Based on city tier and area desirability
 */
function calculateLocationRating(property: Property): number {
  // Tier 1 cities
  const tier1Cities = ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'];
  // Tier 2 cities  
  const tier2Cities = ['Jaipur', 'Ahmedabad', 'Kolkata', 'Chandigarh'];

  let score = 15; // Base score

  if (tier1Cities.includes(property.location)) {
    score += 10;
  } else if (tier2Cities.includes(property.location)) {
    score += 5;
  }

  return Math.min(25, score);
}

/**
 * User Interest Score (0-15)
 * Based on view count and save count
 */
function calculateUserInterest(viewCount: number, saveCount: number): number {
  // Normalize counts (assuming average property gets 100 views, 10 saves)
  const viewScore = Math.min((viewCount / 100) * 10, 10);
  const saveScore = Math.min((saveCount / 10) * 5, 5);

  return Math.round(viewScore + saveScore);
}

/**
 * Get score color based on value
 */
export function getScoreColor(score: number): string {
  if (score >= 75) return 'text-green-600 dark:text-green-400';
  if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

/**
 * Get score label
 */
export function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 75) return 'Very Good';
  if (score >= 60) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Below Average';
  return 'Poor';
}
