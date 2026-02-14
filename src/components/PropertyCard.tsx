import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, Heart } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
  reasons?: string[];
}

const PropertyCard = ({ property, reasons }: PropertyCardProps) => {
  const [saved, setSaved] = useState(false);

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
              property.listingType === "Rent"
                ? "bg-badge-rent text-badge-rent-foreground"
                : "bg-badge-buy text-badge-buy-foreground"
            }`}
          >
            {property.listingType}
          </span>
          <span className="rounded-md bg-card/90 px-2.5 py-1 text-xs font-medium text-card-foreground backdrop-blur-sm">
            {property.propertyType}
          </span>
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved ? "fill-accent text-accent" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="font-display text-xl font-bold text-primary-foreground">
            {formatPrice(property.price, property.listingType)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-card-foreground line-clamp-1">
          {property.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {property.location}
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" /> {property.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> {property.area} sqft
          </span>
        </div>

        {/* Recommendation reasons */}
        {reasons && reasons.length > 0 && (
          <div className="mt-3 border-t border-border pt-3">
            <p className="text-xs font-medium text-accent">Why recommended:</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {reasons.slice(0, 2).map((reason, i) => (
                <Badge key={i} variant="secondary" className="text-xs font-normal">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;
