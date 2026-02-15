import { useParams, Link } from "react-router-dom";
import { mockProperties, formatPrice } from "@/data/properties";
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

// Phase 1 & 2: Innovative Features
import VirtualStagingTool from "@/components/innovative/VirtualStagingTool";
import SunlightSimulator from "@/components/innovative/SunlightSimulator";
import CommuteMaps from "@/components/innovative/CommuteMaps";
import StreetViewHistory from "@/components/innovative/StreetViewHistory";
import NoisePollutionMap from "@/components/innovative/NoisePollutionMap";
import PropertyValuePredictor from "@/components/innovative/PropertyValuePredictor";
import SmartPhotoAnalyzer from "@/components/innovative/SmartPhotoAnalyzer";
import NeighborhoodSentiment from "@/components/innovative/NeighborhoodSentiment";
import AIInteriorDesigner from "@/components/innovative/AIInteriorDesigner";

// Phase 3 & 4 & 5: Data-Driven Insights, Social, Gamification
import NeighborhoodDNA from "@/components/innovative/NeighborhoodDNA";
import DisasterRiskAnalysis from "@/components/innovative/DisasterRiskAnalysis";
import SchoolPerformanceDashboard from "@/components/innovative/SchoolPerformanceDashboard";
import HiddenCostsCalculator from "@/components/innovative/HiddenCostsCalculator";
import NeighborConnect from "@/components/innovative/NeighborConnect";
import FamilyDecisionBoard from "@/components/innovative/FamilyDecisionBoard";
import ExpertMarketplace from "@/components/innovative/ExpertMarketplace";
import VirtualOpenHouse from "@/components/innovative/VirtualOpenHouse";
import PropertyQuestSystem from "@/components/innovative/PropertyQuestSystem";
import InvestmentSimulator from "@/components/innovative/InvestmentSimulator";
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
  Palette,
  Sun,
  Map,
  Clock,
  Volume2,
  TrendingUp,
  Camera,
  MessageCircle,
  Home,
  Dna,
  Shield,
  GraduationCap,
  DollarSign,
  Users,
  Vote,
  Hammer,
  Video,
  Trophy,
  PieChart,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!property) {
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

  const similar = mockProperties
    .filter((p) => p.id !== property.id && p.location === property.location)
    .slice(0, 3);

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
          <div className="overflow-hidden rounded-xl">
            <img
              src={property.images[activeImg]}
              alt={property.title}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="flex gap-2 lg:flex-col">
            {property.images.map((img, i) => (
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
                  property.listingType === "Rent"
                    ? "bg-badge-rent text-badge-rent-foreground"
                    : "bg-badge-buy text-badge-buy-foreground"
                }`}
              >
                For {property.listingType}
              </span>
              <Badge variant="secondary">{property.propertyType}</Badge>
              <Badge variant="secondary">{property.status}</Badge>
              <PropertyBadge type="verified" />
              <PropertyBadge type="trending" />
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold text-foreground">
              {property.title}
            </h1>
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {property.location}
            </div>

            <div className="mt-6 flex gap-6">
              {[
                { icon: Bed, label: `${property.bedrooms} Bedrooms` },
                { icon: Bath, label: `${property.bathrooms} Bathrooms` },
                { icon: Maximize, label: `${property.area} sq ft` },
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
                {property.description}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Amenities
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
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
                {formatPrice(property.price, property.listingType)}
              </p>
              {property.listingType === "Rent" && (
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
                    onClick={() => setSaved(!saved)}
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
                  {property.listingType === "Buy"
                    ? `₹${Math.round(property.price * 0.007).toLocaleString("en-IN")}/mo`
                    : "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                  *Based on 8.5% interest, 20 years
                </p>
              </div>
            </div>

            <PropertyTimeline
              propertyId={property.id}
              listedDate="2024-01-15"
            />
          </div>
        </div>

        {/* 🚀 INNOVATIVE FEATURES - All 20 Features from Phases 1-5 */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              20 Next-Gen AI Features
            </h2>
          </div>

          <Tabs defaultValue="staging" className="w-full">
            {/* Responsive Grid: 4 cols on mobile, 10 cols on lg, 20 cols on xl */}
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex w-max gap-1 p-1">
                {/* Phase 1 & 2: Visual & AI */}
                <TabsTrigger value="staging" className="gap-2">
                  <Palette className="h-4 w-4" /> Staging
                </TabsTrigger>
                <TabsTrigger value="sunlight" className="gap-2">
                  <Sun className="h-4 w-4" /> Sunlight
                </TabsTrigger>
                <TabsTrigger value="commute" className="gap-2">
                  <Map className="h-4 w-4" /> Commute
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <Clock className="h-4 w-4" /> History
                </TabsTrigger>
                <TabsTrigger value="noise" className="gap-2">
                  <Volume2 className="h-4 w-4" /> Noise
                </TabsTrigger>
                <TabsTrigger value="value" className="gap-2">
                  <TrendingUp className="h-4 w-4" /> Value
                </TabsTrigger>
                <TabsTrigger value="photos" className="gap-2">
                  <Camera className="h-4 w-4" /> Photos
                </TabsTrigger>
                <TabsTrigger value="sentiment" className="gap-2">
                  <MessageCircle className="h-4 w-4" /> Social
                </TabsTrigger>
                <TabsTrigger value="design" className="gap-2">
                  <Home className="h-4 w-4" /> Interior
                </TabsTrigger>

                {/* Phase 3: Data-Driven */}
                <TabsTrigger value="dna" className="gap-2">
                  <Dna className="h-4 w-4" /> DNA
                </TabsTrigger>
                <TabsTrigger value="disaster" className="gap-2">
                  <Shield className="h-4 w-4" /> Risk
                </TabsTrigger>
                <TabsTrigger value="schools" className="gap-2">
                  <GraduationCap className="h-4 w-4" /> Schools
                </TabsTrigger>
                <TabsTrigger value="costs" className="gap-2">
                  <DollarSign className="h-4 w-4" /> Costs
                </TabsTrigger>

                {/* Phase 4: Social */}
                <TabsTrigger value="neighbors" className="gap-2">
                  <Users className="h-4 w-4" /> Neighbors
                </TabsTrigger>
                <TabsTrigger value="family" className="gap-2">
                  <Vote className="h-4 w-4" /> Family
                </TabsTrigger>
                <TabsTrigger value="experts" className="gap-2">
                  <Hammer className="h-4 w-4" /> Experts
                </TabsTrigger>
                <TabsTrigger value="virtual" className="gap-2">
                  <Video className="h-4 w-4" /> Tours
                </TabsTrigger>

                {/* Phase 5: Gamification */}
                <TabsTrigger value="quests" className="gap-2">
                  <Trophy className="h-4 w-4" /> Quests
                </TabsTrigger>
                <TabsTrigger value="simulator" className="gap-2">
                  <PieChart className="h-4 w-4" /> Simulator
                </TabsTrigger>
                <TabsTrigger value="sustainability" className="gap-2">
                  <Leaf className="h-4 w-4" /> Eco
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Phase 1 & 2 Content */}
            <TabsContent value="staging" className="mt-6">
              <VirtualStagingTool propertyId={property.id} />
            </TabsContent>

            <TabsContent value="sunlight" className="mt-6">
              <SunlightSimulator propertyId={property.id} />
            </TabsContent>

            <TabsContent value="commute" className="mt-6">
              <CommuteMaps propertyLocation={property.location} />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <StreetViewHistory location={property.location} />
            </TabsContent>

            <TabsContent value="noise" className="mt-6">
              <NoisePollutionMap location={property.location} />
            </TabsContent>

            <TabsContent value="value" className="mt-6">
              <PropertyValuePredictor
                currentPrice={property.price}
                propertyType={property.propertyType}
                location={property.location}
              />
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <SmartPhotoAnalyzer propertyImages={property.images} />
            </TabsContent>

            <TabsContent value="sentiment" className="mt-6">
              <NeighborhoodSentiment location={property.location} />
            </TabsContent>

            <TabsContent value="design" className="mt-6">
              <AIInteriorDesigner propertyId={property.id} />
            </TabsContent>

            {/* Phase 3 Content: Data-Driven Insights */}
            <TabsContent value="dna" className="mt-6">
              <NeighborhoodDNA location={property.location} />
            </TabsContent>

            <TabsContent value="disaster" className="mt-6">
              <DisasterRiskAnalysis location={property.location} />
            </TabsContent>

            <TabsContent value="schools" className="mt-6">
              <SchoolPerformanceDashboard location={property.location} />
            </TabsContent>

            <TabsContent value="costs" className="mt-6">
              <HiddenCostsCalculator
                propertyPrice={property.price}
                propertyType={property.propertyType}
                area={property.area}
              />
            </TabsContent>

            {/* Phase 4 Content: Social & Collaborative */}
            <TabsContent value="neighbors" className="mt-6">
              <NeighborConnect location={property.location} />
            </TabsContent>

            <TabsContent value="family" className="mt-6">
              <FamilyDecisionBoard propertyId={property.id} />
            </TabsContent>

            <TabsContent value="experts" className="mt-6">
              <ExpertMarketplace location={property.location} />
            </TabsContent>

            <TabsContent value="virtual" className="mt-6">
              <VirtualOpenHouse propertyId={property.id} />
            </TabsContent>

            {/* Phase 5 Content: Gamification */}
            <TabsContent value="quests" className="mt-6">
              <PropertyQuestSystem />
            </TabsContent>

            <TabsContent value="simulator" className="mt-6">
              <InvestmentSimulator propertyPrice={property.price} />
            </TabsContent>

            <TabsContent value="sustainability" className="mt-6">
              <SustainabilityScore propertyId={property.id} />
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
            title={property.title}
            description={property.description}
          />
        </div>

        {/* Investment Analysis Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <InvestmentInsights property={property} />
          <PriceHistoryChart propertyId={property.id} />
        </div>

        {/* ROI Calculator & Neighborhood */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ROICalculator
            propertyPrice={property.price}
            expectedRent={property.price * 0.003}
          />
          <NeighborhoodInsights location={property.location} />
        </div>

        {/* Reviews Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Reviews & Ratings
            </h2>
            <div className="mt-6">
              <ReviewList propertyId={property.id} />
            </div>
          </div>
          <div>
            <ReviewForm propertyId={property.id} onSubmitted={() => {}} />
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Similar Properties in {property.location}
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
