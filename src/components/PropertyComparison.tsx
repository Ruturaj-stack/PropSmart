import { useComparison } from "@/contexts/ComparisonContext";
import {
  TrendingUp,
  TrendingDown,
  Home,
  DollarSign,
  Maximize,
  Bed,
  Bath,
  X,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/properties";
import { calculatePropertyScore } from "@/services/propertyScoring";
import { calculateInvestmentInsights } from "@/services/investmentAnalytics";
import { Link } from "react-router-dom";

/**
 * Property Comparison Table
 * Compare up to 4 properties side-by-side
 */
const PropertyComparison = () => {
  const { selectedProperties, removeFromComparison, clearComparison } =
    useComparison();

  if (selectedProperties.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <TrendingUp className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
          No Properties Selected
        </h2>
        <p className="mt-2 text-muted-foreground">
          Add properties to comparison by clicking the "Compare" button on
          property cards
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Compare Properties
          </h1>
          <p className="mt-1 text-muted-foreground">
            {selectedProperties.length} of 4 properties selected
          </p>
        </div>
        <Button onClick={clearComparison} variant="outline" size="sm">
          <X className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-background p-4 text-left text-sm font-semibold text-muted-foreground">
                Property
              </th>
              {selectedProperties.map((property) => (
                <th key={property.id} className="min-w-[250px] p-4">
                  <div className="relative">
                    {/* Property Image */}
                    <Link to={`/property/${property.id}`}>
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="h-32 w-full rounded-lg object-cover"
                      />
                    </Link>
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromComparison(property.id)}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm hover:bg-card"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {/* Title */}
                    <Link to={`/property/${property.id}`}>
                      <h3 className="mt-2 font-semibold text-card-foreground line-clamp-2 hover:text-accent">
                        {property.title}
                      </h3>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {/* Price */}
            <ComparisonRow
              label="Price"
              icon={<DollarSign className="h-4 w-4" />}
              values={selectedProperties.map((p) =>
                formatPrice(p.price, p.listingType),
              )}
              highlight="lowest"
              properties={selectedProperties}
            />

            {/* Price per sqft */}
            <ComparisonRow
              label="Price per sqft"
              icon={<Maximize className="h-4 w-4" />}
              values={selectedProperties.map(
                (p) => `₹${Math.round(p.price / p.area).toLocaleString()}`,
              )}
              highlight="lowest"
              properties={selectedProperties}
            />

            {/* Location */}
            <ComparisonRow
              label="Location"
              icon={<MapPin className="h-4 w-4" />}
              values={selectedProperties.map((p) => p.location)}
            />

            {/* Bedrooms */}
            <ComparisonRow
              label="Bedrooms"
              icon={<Bed className="h-4 w-4" />}
              values={selectedProperties.map((p) => `${p.bedrooms} BHK`)}
            />

            {/* Bathrooms */}
            <ComparisonRow
              label="Bathrooms"
              icon={<Bath className="h-4 w-4" />}
              values={selectedProperties.map((p) => p.bathrooms.toString())}
            />

            {/* Area */}
            <ComparisonRow
              label="Area"
              icon={<Maximize className="h-4 w-4" />}
              values={selectedProperties.map((p) => `${p.area} sqft`)}
              highlight="highest"
              properties={selectedProperties}
            />

            {/* Furnishing */}
            <ComparisonRow
              label="Furnishing"
              values={selectedProperties.map((p) => p.furnishing)}
            />

            {/* Amenities Count */}
            <ComparisonRow
              label="Amenities"
              values={selectedProperties.map(
                (p) => `${p.amenities.length} amenities`,
              )}
              highlight="highest"
              properties={selectedProperties}
            />

            {/* Property Score */}
            <ComparisonRow
              label="Property Score"
              values={selectedProperties.map((p) => {
                const score = calculatePropertyScore(p);
                return `${score.total}/100`;
              })}
              highlight="highest"
              properties={selectedProperties}
            />

            {/* Rental Yield */}
            <ComparisonRow
              label="Rental Yield"
              values={selectedProperties.map((p) => {
                const insights = calculateInvestmentInsights(p);
                return `${insights.rentalYield}%`;
              })}
              highlight="highest"
              properties={selectedProperties}
            />

            {/* Demand Level */}
            <ComparisonRow
              label="Demand"
              values={selectedProperties.map((p) => {
                const insights = calculateInvestmentInsights(p);
                return insights.demandLevel;
              })}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper component for comparison rows
interface ComparisonRowProps {
  label: string;
  icon?: React.ReactNode;
  values: string[];
  highlight?: "highest" | "lowest";
  properties?: any[];
}

function ComparisonRow({
  label,
  icon,
  values,
  highlight,
  properties,
}: ComparisonRowProps) {
  let bestIndex = -1;

  if (highlight && properties) {
    const numericValues = values.map((v) => {
      const num = parseFloat(v.replace(/[^0-9.-]/g, ""));
      return isNaN(num) ? 0 : num;
    });

    if (highlight === "highest") {
      bestIndex = numericValues.indexOf(Math.max(...numericValues));
    } else {
      bestIndex = numericValues.indexOf(
        Math.min(...numericValues.filter((n) => n > 0)),
      );
    }
  }

  return (
    <tr className="hover:bg-secondary/50">
      <td className="sticky left-0 z-10 bg-background p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {icon}
          {label}
        </div>
      </td>
      {values.map((value, index) => (
        <td key={index} className="p-4 text-center">
          <div
            className={`inline-flex items-center gap-2 ${
              bestIndex === index
                ? "font-bold text-green-600 dark:text-green-400"
                : "text-card-foreground"
            }`}
          >
            {bestIndex === index && <CheckCircle className="h-4 w-4" />}
            {value}
          </div>
        </td>
      ))}
    </tr>
  );
}

export default PropertyComparison;
