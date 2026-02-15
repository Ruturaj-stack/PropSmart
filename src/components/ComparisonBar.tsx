import { useComparison } from "@/contexts/ComparisonContext";
import { Link } from "react-router-dom";
import { Scale, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Fixed bottom bar showing comparison status
 */
const ComparisonBar = () => {
  const { selectedProperties, removeFromComparison, clearComparison } =
    useComparison();

  if (selectedProperties.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-elevated">
      <div className="container flex items-center justify-between py-3">
        {/* Selected Properties */}
        <div className="flex items-center gap-3">
          <Scale className="h-5 w-5 text-accent" />
          <span className="font-medium text-card-foreground">
            {selectedProperties.length}{" "}
            {selectedProperties.length === 1 ? "Property" : "Properties"}{" "}
            Selected
          </span>

          {/* Property Thumbnails */}
          <div className="flex gap-2">
            {selectedProperties.map((property) => (
              <div key={property.id} className="relative group">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="h-12 w-16 rounded object-cover"
                />
                <button
                  onClick={() => removeFromComparison(property.id)}
                  className="absolute -right-1 -top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground group-hover:flex"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button onClick={clearComparison} variant="ghost" size="sm">
            Clear All
          </Button>
          <Link to="/compare">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Compare Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
