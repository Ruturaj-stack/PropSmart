import { useSavedProperties } from "@/hooks/useSavedProperties";
import PropertyCard from "./PropertyCard";
import { mockProperties } from "@/data/properties";
import { Loader2, Heart } from "lucide-react";

/**
 * Saved Properties / Favorites Component
 */
const SavedProperties = () => {
  const { savedProperties, loading, error } = useSavedProperties();

  // Match saved property IDs with full property data
  const properties = savedProperties
    .map((saved) => mockProperties.find((p) => p.id === saved.property_id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
        <p className="text-sm text-destructive">
          Failed to load saved properties
        </p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-secondary p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Heart className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          No Saved Properties
        </h3>
        <p className="mt-2 text-muted-foreground">
          Click the heart icon on any property to save it to your favorites
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Saved Properties
        </h2>
        <span className="text-sm text-muted-foreground">
          {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;
