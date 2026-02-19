import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters, { Filters, defaultFilters } from "@/components/SearchFilters";
import { mockProperties, Property } from "@/data/properties";
import { fetchProperties } from "@/services/propertyService";
import { scoreProperty, DEFAULT_PREFERENCES } from "@/data/recommendations";

const Properties = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => ({
    ...defaultFilters,
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("type") || "",
  }));

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        console.log("Fetching properties...");
        const data = await fetchProperties();
        console.log("Fetched properties:", data);
        if (data.length === 0) {
          setError("No properties returned from API.");
        }
        setProperties(data);
      } catch (err) {
        console.error("Failed to load properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const filtered = useMemo(() => {
    console.log("Filtering properties. Total:", properties.length);
    console.log("Current filters:", filters);

    const result = properties.filter((p) => {
      if (filters.location && p.location !== filters.location) return false;
      if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
      if (filters.listingType && p.listingType !== filters.listingType) return false;
      if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false;
      if (filters.amenities.length > 0 && !filters.amenities.every((a) => p.amenities.includes(a)))
        return false;
      return true;
    });

    console.log("Filtered count:", result.length);
    if (result.length === 0 && properties.length > 0) {
      console.warn("All properties were filtered out!");
    }

    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "latest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "recommended":
      default:
        result.sort((a, b) => {
          const sa = scoreProperty(a, DEFAULT_PREFERENCES).score;
          const sb = scoreProperty(b, DEFAULT_PREFERENCES).score;
          return sb - sa;
        });
    }

    return result;
  }, [filters, properties]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Browse Properties</h1>
        <p className="mt-1 text-muted-foreground">Find your perfect home from our curated listings</p>


        {error ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 py-20 text-center text-destructive">
            <p className="text-lg font-medium">Error loading properties</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <aside className="w-full shrink-0 lg:w-72">
              <SearchFilters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilters)}
                resultCount={filtered.length}
              />
            </aside>

            <main className="flex-1">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
                  <p className="text-lg font-medium text-card-foreground">No properties found</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}
            </main>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
