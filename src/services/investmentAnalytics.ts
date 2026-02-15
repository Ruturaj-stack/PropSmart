import type { Property } from '@/data/properties';

export interface InvestmentInsights {
  rentalYield: number; // Percentage
  priceVsAreaAverage: number; // Percentage difference
  appreciation3Year: number; // Estimated 3-year appreciation %
  appreciation5Year: number; // Estimated 5-year appreciation %
  demandLevel: 'High' | 'Medium' | 'Low';
  demandScore: number; // 0-100
  pricePerSqft: number;
  estimatedMonthlyRent: number;
}

// Mock data for area averages and trends
// In production, this would come from a real API
const AREA_DATA: Record<string, {
  avgPricePerSqft: number;
  appreciationRate: number; // Annual % growth
  demandMultiplier: number;
}> = {
  'Bangalore': { avgPricePerSqft: 6500, appreciationRate: 8, demandMultiplier: 1.3 },
  'Mumbai': { avgPricePerSqft: 18000, appreciationRate: 6, demandMultiplier: 1.2 },
  'Delhi': { avgPricePerSqft: 9000, appreciationRate: 7, demandMultiplier: 1.1 },
  'Pune': { avgPricePerSqft: 5500, appreciationRate: 9, demandMultiplier: 1.25 },
  'Hyderabad': { avgPricePerSqft: 5000, appreciationRate: 10, demandMultiplier: 1.3 },
  'Chennai': { avgPricePerSqft: 5200, appreciationRate: 8, demandMultiplier: 1.15 },
  'Jaipur': { avgPricePerSqft: 3500, appreciationRate: 7, demandMultiplier: 1.0 },
  'Ahmedabad': { avgPricePerSqft: 4000, appreciationRate: 8, demandMultiplier: 1.1 },
  'Kolkata': { avgPricePerSqft: 4500, appreciationRate: 6, demandMultiplier: 1.0 },
  'Chandigarh': { avgPricePerSqft: 5800, appreciationRate: 7, demandMultiplier: 1.05 },
};

/**
 * Calculate comprehensive investment insights for a property
 */
export function calculateInvestmentInsights(property: Property): InvestmentInsights {
  const pricePerSqft = property.price / property.area;
  const areaData = AREA_DATA[property.location] || AREA_DATA['Bangalore'];

  // 1. Rental Yield
  const estimatedMonthlyRent = calculateEstimatedRent(property, areaData);
  const annualRent = estimatedMonthlyRent * 12;
  const rentalYield = (annualRent / property.price) * 100;

  // 2. Price vs Area Average
  const priceVsAreaAverage = ((pricePerSqft - areaData.avgPricePerSqft) / areaData.avgPricePerSqft) * 100;

  // 3. Appreciation Estimates
  const baseAppreciation = areaData.appreciationRate;
  const appreciation3Year = calculateCompoundGrowth(baseAppreciation, 3);
  const appreciation5Year = calculateCompoundGrowth(baseAppreciation, 5);

  // 4. Demand Level
  const { demandLevel, demandScore } = calculateDemandLevel(property, areaData);

  return {
    rentalYield: parseFloat(rentalYield.toFixed(2)),
    priceVsAreaAverage: parseFloat(priceVsAreaAverage.toFixed(1)),
    appreciation3Year: parseFloat(appreciation3Year.toFixed(1)),
    appreciation5Year: parseFloat(appreciation5Year.toFixed(1)),
    demandLevel,
    demandScore,
    pricePerSqft: Math.round(pricePerSqft),
    estimatedMonthlyRent: Math.round(estimatedMonthlyRent),
  };
}

/**
 * Estimate monthly rent based on property characteristics
 */
function calculateEstimatedRent(property: Property, areaData: typeof AREA_DATA[string]): number {
  if (property.listingType === 'Rent') {
    return property.price; // Already monthly rent
  }

  // For sale properties, estimate rental income
  // Typical rental yield in India is 2-4% annually
  const baseYield = 0.025; // 2.5% annual yield

  // Adjust based on property type
  let typeMultiplier = 1.0;
  if (property.propertyType === 'Apartment') typeMultiplier = 1.1;
  if (property.propertyType === 'PG') typeMultiplier = 1.3;
  if (property.propertyType === 'Villa') typeMultiplier = 0.9;

  // Adjust based on amenities
  const amenityBonus = property.amenities.length * 0.01; // 1% per amenity

  const adjustedYield = baseYield * typeMultiplier * (1 + amenityBonus);
  const monthlyRent = (property.price * adjustedYield) / 12;

  return monthlyRent;
}

/**
 * Calculate compound growth over years
 */
function calculateCompoundGrowth(annualRate: number, years: number): number {
  return ((Math.pow(1 + annualRate / 100, years) - 1) * 100);
}

/**
 * Calculate demand level based on various factors
 */
function calculateDemandLevel(
  property: Property,
  areaData: typeof AREA_DATA[string]
): { demandLevel: 'High' | 'Medium' | 'Low'; demandScore: number } {
  let score = 50; // Base score

  // Location demand
  score += areaData.demandMultiplier * 15;

  // Price competitiveness
  const pricePerSqft = property.price / property.area;
  if (pricePerSqft < areaData.avgPricePerSqft) {
    score += 15; // Below average price = higher demand
  } else if (pricePerSqft < areaData.avgPricePerSqft * 1.1) {
    score += 5; // Slightly above average
  } else {
    score -= 10; // Overpriced
  }

  // Property type demand
  if (property.propertyType === 'Apartment') score += 10;
  if (property.propertyType === 'Villa') score += 5;
  if (property.propertyType === 'PG') score += 8;

  // Bedrooms (2-3 BHK has highest demand)
  if (property.bedrooms >= 2 && property.bedrooms <= 3) score += 10;

  // Amenities
  score += Math.min(property.amenities.length * 2, 10);

  // Normalize to 0-100
  score = Math.max(0, Math.min(100, score));

  let demandLevel: 'High' | 'Medium' | 'Low';
  if (score >= 70) demandLevel = 'High';
  else if (score >= 40) demandLevel = 'Medium';
  else demandLevel = 'Low';

  return { demandLevel, demandScore: Math.round(score) };
}

/**
 * Get demand level color
 */
export function getDemandColor(level: 'High' | 'Medium' | 'Low'): string {
  switch (level) {
    case 'High': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950';
    case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950';
    case 'Low': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950';
  }
}

/**
 * Format percentage with + or - sign
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Get price comparison label
 */
export function getPriceComparisonLabel(percentage: number): string {
  if (percentage <= -15) return 'Great Value';
  if (percentage <= -5) return 'Good Value';
  if (percentage <= 5) return 'Fair Price';
  if (percentage <= 15) return 'Above Average';
  return 'Overpriced';
}
