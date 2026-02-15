import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import PropertyCard from "./PropertyCard";
import { Loader2 } from "lucide-react";

interface RecentlyViewedProps {
  limit?: number;
}

/**
 * Recently Viewed Properties Component
 * Displays user's recently viewed properties
 */
const RecentlyViewed = ({ limit = 6 }: RecentlyViewedProps) => {
  const { recentlyViewed, loading, error } = useRecentlyViewed(limit);

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
          Failed to load recently viewed properties
        </p>
      </div>
    );
  }

  if (recentlyViewed.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-secondary p-8 text-center">
        <p className="text-muted-foreground">
          No recently viewed properties yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Start browsing properties to see your viewing history here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Recently Viewed
        </h2>
        <span className="text-sm text-muted-foreground">
          {recentlyViewed.length}{" "}
          {recentlyViewed.length === 1 ? "property" : "properties"}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recentlyViewed.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
