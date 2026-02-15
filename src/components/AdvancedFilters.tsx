import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface AdvancedFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  priceRange: [number, number];
  bedrooms: number[];
  propertyTypes: string[];
  amenities: string[];
}

/**
 * Advanced Filters Component
 * Rich filter UI with sliders, chips, and toggles
 */
const AdvancedFilters = ({ onFilterChange }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [0, 200],
    bedrooms: [],
    propertyTypes: [],
    amenities: [],
  });

  const bedroomOptions = [1, 2, 3, 4, 5];
  const propertyTypeOptions = [
    "Apartment",
    "Villa",
    "House",
    "Penthouse",
    "Studio",
  ];
  const amenityOptions = [
    "Parking",
    "Gym",
    "Pool",
    "Garden",
    "Security",
    "Power Backup",
    "Lift",
    "Club House",
  ];

  const updateFilters = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayItem = (
    key: "bedrooms" | "propertyTypes" | "amenities",
    item: any,
  ) => {
    const current = filters[key];
    const newValue = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    updateFilters(key, newValue);
  };

  const clearAll = () => {
    const clearedFilters = {
      priceRange: [0, 200] as [number, number],
      bedrooms: [],
      propertyTypes: [],
      amenities: [],
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.bedrooms.length > 0 ||
    filters.propertyTypes.length > 0 ||
    filters.amenities.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 200;

  return (
    <div className="space-y-6">
      {/* Header with Clear All */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Price Range Slider */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Price Range
        </label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) =>
            updateFilters("priceRange", value as [number, number])
          }
          min={0}
          max={200}
          step={5}
          minStepsBetweenThumbs={1}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-accent">
            ₹{filters.priceRange[0]}L
          </span>
          <span className="text-muted-foreground">to</span>
          <span className="font-semibold text-accent">
            {filters.priceRange[1] === 200
              ? "₹2Cr+"
              : `₹${filters.priceRange[1]}L`}
          </span>
        </div>
      </div>

      {/* Bedrooms - Multi-select chips */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Bedrooms
        </label>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((num) => (
            <Badge
              key={num}
              variant={filters.bedrooms.includes(num) ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => toggleArrayItem("bedrooms", num)}
            >
              {num} BHK
            </Badge>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Property Type
        </label>
        <div className="flex flex-wrap gap-2">
          {propertyTypeOptions.map((type) => (
            <Badge
              key={type}
              variant={
                filters.propertyTypes.includes(type) ? "default" : "outline"
              }
              className="cursor-pointer px-4 py-2"
              onClick={() => toggleArrayItem("propertyTypes", type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((amenity) => (
            <Badge
              key={amenity}
              variant={
                filters.amenities.includes(amenity) ? "default" : "secondary"
              }
              className="cursor-pointer px-3 py-1.5 text-xs"
              onClick={() => toggleArrayItem("amenities", amenity)}
            >
              {amenity}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {filters.bedrooms.length +
              filters.propertyTypes.length +
              filters.amenities.length}{" "}
            filters active
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
