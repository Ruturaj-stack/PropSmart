import { useEffect, useState } from "react";
import { useComparison } from "@/contexts/ComparisonContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyComparison from "@/components/PropertyComparison";
import ComparisonRadarChart from "@/components/ComparisonRadarChart";
import { mockProperties } from "@/data/properties";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Compare = () => {
  const { comparedProperties, removeProperty } = useComparison();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const props = comparedProperties
      .map((id) => mockProperties.find((p) => p.id === id))
      .filter(Boolean);
    setProperties(props);
  }, [comparedProperties]);

  if (properties.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-32">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground">
            No Properties to Compare
          </h1>
          <p className="mt-2 text-muted-foreground">
            Add properties from listings to compare them
          </p>
          <Link to="/properties" className="mt-6">
            <Button>Browse Properties</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Property Comparison
        </h1>
        <p className="mt-2 text-muted-foreground">
          Comparing {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"}
        </p>

        {/* NEW: Radar Chart Visualization */}
        {properties.length >= 2 && (
          <div className="mt-12">
            <ComparisonRadarChart properties={properties} />
          </div>
        )}

        {/* Table Comparison */}
        <div className="mt-12">
          <PropertyComparison />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
