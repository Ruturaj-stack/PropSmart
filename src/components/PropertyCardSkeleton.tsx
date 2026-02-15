/**
 * Skeleton Loading Component for Property Cards
 * Shows placeholder while content loads
 */
const PropertyCardSkeleton = () => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-muted" />

      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="h-6 bg-muted rounded w-3/4" />

        {/* Location Skeleton */}
        <div className="h-4 bg-muted rounded w-1/2" />

        {/* Price Skeleton */}
        <div className="h-8 bg-muted rounded w-2/3 mt-4" />

        {/* Features Skeleton */}
        <div className="flex gap-4 mt-3">
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex gap-2 mt-4">
          <div className="h-9 bg-muted rounded flex-1" />
          <div className="h-9 bg-muted rounded w-9" />
          <div className="h-9 bg-muted rounded w-9" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
