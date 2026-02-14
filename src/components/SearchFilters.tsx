import { LOCATIONS, PROPERTY_TYPES, AMENITIES } from "@/data/properties";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface SearchFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  resultCount: number;
}

const SearchFilters = ({ filters, onChange, onReset, resultCount }: SearchFiltersProps) => {
  const activeCount = [
    filters.location,
    filters.propertyType,
    filters.listingType,
    filters.bedrooms,
    filters.amenities.length > 0,
  ].filter(Boolean).length;

  const selectClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-accent" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Filters</h3>
          {activeCount > 0 && (
            <Badge variant="secondary" className="text-xs">{activeCount} active</Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-1 text-xs text-muted-foreground">
            <X className="h-3 w-3" /> Clear
          </Button>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Location</label>
          <select
            className={selectClass}
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Listing Type</label>
          <select
            className={selectClass}
            value={filters.listingType}
            onChange={(e) => onChange({ ...filters, listingType: e.target.value })}
          >
            <option value="">Buy & Rent</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Property Type</label>
          <select
            className={selectClass}
            value={filters.propertyType}
            onChange={(e) => onChange({ ...filters, propertyType: e.target.value })}
          >
            <option value="">All Types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Bedrooms</label>
          <div className="flex gap-1.5">
            {[null, 1, 2, 3, 4].map((num) => (
              <button
                key={String(num)}
                onClick={() => onChange({ ...filters, bedrooms: num })}
                className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${
                  filters.bedrooms === num
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/40"
                }`}
              >
                {num === null ? "Any" : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Sort By</label>
          <select
            className={selectClass}
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="latest">Latest</option>
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Amenities</label>
          <div className="flex flex-wrap gap-1.5">
            {AMENITIES.slice(0, 8).map((amenity) => (
              <button
                key={amenity}
                onClick={() => {
                  const next = filters.amenities.includes(amenity)
                    ? filters.amenities.filter((a) => a !== amenity)
                    : [...filters.amenities, amenity];
                  onChange({ ...filters, amenities: next });
                }}
                className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                  filters.amenities.includes(amenity)
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/40"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-secondary px-4 py-2.5 text-center text-sm font-medium text-secondary-foreground">
        {resultCount} properties found
      </div>
    </div>
  );
};

export default SearchFilters;
