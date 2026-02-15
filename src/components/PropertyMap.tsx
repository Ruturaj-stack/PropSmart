import { useState } from "react";
import type { Property } from "@/data/properties";
import {
  propertiesToMarkers,
  getCenterPoint,
  type MapMarker,
} from "@/services/mapUtils";
import { MapPin, Maximize, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyMapProps {
  properties: Property[];
  height?: string;
  onMarkerClick?: (propertyId: string) => void;
}

/**
 * Interactive property map component
 * Note: This is a placeholder that shows property locations
 * In production, integrate with Google Maps API or similar
 */
const PropertyMap = ({
  properties,
  height = "500px",
  onMarkerClick,
}: PropertyMapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const markers = propertiesToMarkers(properties);
  const center = getCenterPoint(properties);

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    if (onMarkerClick) {
      onMarkerClick(marker.id);
    }
  };

  return (
    <div
      className="relative rounded-xl border border-border bg-secondary overflow-hidden"
      style={{ height }}
    >
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background/90 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="font-medium text-foreground">
              {properties.length}{" "}
              {properties.length === 1 ? "Property" : "Properties"}
            </span>
          </div>
          <div className="rounded-lg bg-card px-3 py-1.5 text-xs font-medium">
            📍 Centered on {properties[0]?.location || "India"}
          </div>
        </div>
      </div>

      {/* Simplified Map View (Grid Layout) */}
      <div className="h-full overflow-auto p-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {markers.map((marker, index) => {
            const property = properties.find((p) => p.id === marker.id);
            if (!property) return null;

            return (
              <button
                key={marker.id}
                onClick={() => handleMarkerClick(marker)}
                className={`group relative rounded-lg border-2 p-4 text-left transition-all hover:shadow-lg ${
                  selectedMarker?.id === marker.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                {/* Map Pin Badge */}
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Property Image */}
                <img
                  src={property.images[0]}
                  alt={marker.title}
                  className="h-32 w-full rounded-lg object-cover"
                />

                {/* Property Info */}
                <div className="mt-3 space-y-2">
                  <h4 className="font-semibold text-card-foreground line-clamp-1">
                    {marker.title}
                  </h4>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Home className="h-3 w-3" />
                      {marker.propertyType}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Maximize className="h-3 w-3" />
                      {property.area} sqft
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-lg font-bold text-accent">
                      {marker.price}
                      {marker.listingType === "Rent" && (
                        <span className="text-xs font-normal">/mo</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* View Details */}
                <Link
                  to={`/property/${marker.id}`}
                  className="mt-3 block w-full rounded-lg bg-accent/10 py-2 text-center text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details
                </Link>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Integration Notice */}
      <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-card/95 backdrop-blur-sm p-3 text-xs text-muted-foreground border border-border">
        💡 <strong>Map Integration Ready:</strong> This component is ready for
        Google Maps API integration. Add your API key to display an interactive
        map with clustering and advanced features.
      </div>
    </div>
  );
};

export default PropertyMap;
