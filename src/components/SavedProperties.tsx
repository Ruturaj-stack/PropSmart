import { useSavedProperties } from "@/hooks/useSavedProperties";
import PropertyCard from "./PropertyCard";
import { Property } from "@/data/properties";
import { fetchProperties } from "@/services/propertyService";
import { Loader2, Heart } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Saved Properties / Favorites Component
 */
const SavedProperties = () => {
  const {
    savedProperties,
    loading: savedLoading,
    error: savedError,
  } = useSavedProperties();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      if (savedLoading) return;
      setLoading(true);
      const allProperties = await fetchProperties();
      const savedIds = savedProperties.map((s) => s.property_id);
      const filtered = allProperties.filter((p) => savedIds.includes(p.id));
      setProperties(filtered);
      setLoading(false);
    };
    loadProperties();
  }, [savedProperties, savedLoading]);

  // Render immediately for instant feel
  /* Loading handled inline if needed */

  if (savedError) {
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
