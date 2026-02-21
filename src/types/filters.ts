export interface Filters {
  location: string;
  propertyType: string;
  listingType: string;
  minBudget: number;
  maxBudget: number;
  bedrooms: number | null;
  amenities: string[];
  sortBy: string;
}

export const defaultFilters: Filters = {
  location: "",
  propertyType: "",
  listingType: "",
  minBudget: 0,
  maxBudget: 100000000,
  bedrooms: null,
  amenities: [],
  sortBy: "recommended",
};
