import { useSavedProperties } from "@/hooks/useSavedProperties";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/data/properties";
import { fetchProperties } from "@/services/propertyService";
import { Loader2, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SavedPropertiesPage = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Saved Properties
        </h1>
        <p className="text-muted-foreground mb-8">
          Your personal collection of dream homes
        </p>

        {savedError ? (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-8 text-center text-destructive">
            <p className="font-medium">Error loading saved properties</p>
            <p className="mt-1 text-sm">
              {savedError instanceof Error
                ? savedError.message
                : String(savedError)}
            </p>
          </div>
        ) : properties.length === 0 && !loading && !savedLoading ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              No Saved Properties
            </h3>
            <p className="mt-2 text-muted-foreground">
              Click the heart icon on any property to save it to your favorites
            </p>
            <Link to="/properties" className="mt-6">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedPropertiesPage;
