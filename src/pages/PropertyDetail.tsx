import { useParams, Link } from "react-router-dom";
import { mockProperties, formatPrice, Property } from "@/data/properties";
import {
  fetchPropertyBySlug,
  fetchProperties,
} from "@/services/propertyService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyBadge from "@/components/PropertyBadge";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import ShareButtons from "@/components/ShareButtons";
import PropertyTimeline from "@/components/PropertyTimeline";
import ROICalculator from "@/components/ROICalculator";
import NeighborhoodInsights from "@/components/NeighborhoodInsights";
import InvestmentInsights from "@/components/InvestmentInsights";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import { useSavedProperties } from "@/hooks/useSavedProperties";

// 5 Core AI Features
import PropertyValuePredictor from "@/components/innovative/PropertyValuePredictor";
import VirtualStagingTool from "@/components/innovative/VirtualStagingTool";
import HiddenCostsCalculator from "@/components/innovative/HiddenCostsCalculator";
import CommuteMaps from "@/components/innovative/CommuteMaps";
import SustainabilityScore from "@/components/innovative/SustainabilityScore";

import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Sparkles,
  TrendingUp,
  Palette,
  DollarSign,
  Map,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const PropertyDetail = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchPropertyBySlug(slug);
      setProperty(data);

      // Fetch similar properties (naive approach: fetch all and filter)
      if (data) {
        const allProps = await fetchProperties();
        setSimilar(
          allProps
            .filter((p) => p.slug !== slug && p.location === data.location)
            .slice(0, 3),
        );
      }
      setLoading(false);
    };
    loadData();
  }, [slug]);

  const [activeImg, setActiveImg] = useState(0);
  const { isSaved, toggleSave, loading: saveLoading } = useSavedProperties();
  const saved = property ? isSaved(property.id) : false;

  const handleSaveClick = async () => {
    if (property) {
      await toggleSave(property.id);
    }
  };

  if (!property && !loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-32">
          <h1 className="font-display text-2xl font-bold">
            Property Not Found
          </h1>
          <Link to="/properties" className="mt-4 text-accent hover:underline">
            Browse Properties
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Render something even if property is null (e.g. empty skeleton skeleton or just the layout)
  // For "instant" feel, we render the structure.
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-8">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>

        {/* Images */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="overflow-hidden rounded-xl bg-secondary">
            {property?.images[activeImg] && (
              <img
                src={property.images[activeImg]}
                alt={property.title}
                className="aspect-[16/10] w-full object-cover"
              />
            )}
          </div>
          <div className="flex gap-2 lg:flex-col">
            {property?.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${
                  i === activeImg ? "border-accent" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-md px-3 py-1 text-sm font-semibold ${
                  property?.listingType === "Rent"
                    ? "bg-badge-rent text-badge-rent-foreground"
                    : "bg-badge-buy text-badge-buy-foreground"
                }`}
              >
                For {property?.listingType || "..."}
              </span>
              <Badge variant="secondary">
                {property?.propertyType || "..."}
              </Badge>
              <Badge variant="secondary">{property?.status || "..."}</Badge>
              <PropertyBadge type="verified" />
              <PropertyBadge type="trending" />
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold text-foreground">
              {property?.title || "Loading property..."}
            </h1>
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {property?.location || "..."}
            </div>

            <div className="mt-6 flex gap-6">
              {[
                { icon: Bed, label: `${property?.bedrooms || 0} Bedrooms` },
                { icon: Bath, label: `${property?.bathrooms || 0} Bathrooms` },
                { icon: Maximize, label: `${property?.area || 0} sq ft` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Description
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {property?.description || "..."}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Amenities
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {property?.amenities.map((a) => (
                  <Badge key={a} variant="secondary" className="px-3 py-1.5">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
              <p className="font-display text-3xl font-bold text-foreground">
                {property
                  ? formatPrice(property.price, property.listingType)
                  : "..."}
              </p>
              {property?.listingType === "Rent" && (
                <p className="text-sm text-muted-foreground">per month</p>
              )}

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  size="lg"
                >
                  <Phone className="h-4 w-4" /> Contact Owner
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={handleSaveClick}
                    disabled={saveLoading}
                  >
                    <Heart
                      className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`}
                    />
                    {saved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-secondary p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  EMI Estimate
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">
                  {property?.listingType === "Buy"
                    ? `₹${Math.round(property.price * 0.007).toLocaleString("en-IN")}/mo`
                    : "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                  *Based on 8.5% interest, 20 years
                </p>
              </div>
            </div>

            <PropertyTimeline
              propertyId={property?.id || ""}
              listedDate="2024-01-15"
            />
          </div>
        </div>

        {/* 🚀 INNOVATIVE FEATURES - All 20 Features from Phases 1-5 */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              AI-Powered Tools
            </h2>
          </div>

          <Tabs defaultValue="value" className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex w-max gap-1 p-1">
                <TabsTrigger value="value" className="gap-2">
                  <TrendingUp className="h-4 w-4" /> Value Predictor
                </TabsTrigger>
                <TabsTrigger value="staging" className="gap-2">
                  <Palette className="h-4 w-4" /> Virtual Staging
                </TabsTrigger>
                <TabsTrigger value="costs" className="gap-2">
                  <DollarSign className="h-4 w-4" /> Hidden Costs
                </TabsTrigger>
                <TabsTrigger value="commute" className="gap-2">
                  <Map className="h-4 w-4" /> Commute Maps
                </TabsTrigger>
                <TabsTrigger value="sustainability" className="gap-2">
                  <Leaf className="h-4 w-4" /> Eco Score
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="value" className="mt-6">
              <PropertyValuePredictor
                currentPrice={property?.price || 0}
                propertyType={property?.propertyType || ""}
                location={property?.location || ""}
              />
            </TabsContent>

            <TabsContent value="staging" className="mt-6">
              <VirtualStagingTool propertyId={property?.id || ""} />
            </TabsContent>

            <TabsContent value="costs" className="mt-6">
              <HiddenCostsCalculator
                propertyPrice={property?.price || 0}
                propertyType={property?.propertyType || ""}
                area={property?.area || 0}
              />
            </TabsContent>

            <TabsContent value="commute" className="mt-6">
              <CommuteMaps propertyLocation={property?.location || ""} />
            </TabsContent>

            <TabsContent value="sustainability" className="mt-6">
              <SustainabilityScore propertyId={property?.id || ""} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Share Buttons */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Share This Property
          </h2>
          <ShareButtons
            url={typeof window !== "undefined" ? window.location.href : ""}
            title={property?.title || ""}
            description={property?.description || ""}
          />
        </div>

        {/* Investment Analysis Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {property ? (
            <InvestmentInsights property={property} />
          ) : (
            <div className="h-40 rounded-xl bg-secondary animate-pulse" />
          )}
          <PriceHistoryChart propertyId={property?.id || ""} />
        </div>

        {/* ROI Calculator & Neighborhood */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ROICalculator
            propertyPrice={property?.price || 0}
            expectedRent={(property?.price || 0) * 0.003}
          />
          <NeighborhoodInsights location={property?.location || ""} />
        </div>

        {/* Reviews Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Reviews & Ratings
            </h2>
            <div className="mt-6">
              <ReviewList propertyId={property?.id || ""} />
            </div>
          </div>
          <div>
            <ReviewForm
              propertyId={property?.id || ""}
              onSubmitted={() => {}}
            />
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Similar Properties in {property?.location || "..."}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
