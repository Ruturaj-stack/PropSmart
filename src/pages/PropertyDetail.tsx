import { useParams, Link } from "react-router-dom";
import { mockProperties, formatPrice } from "@/data/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Bed, Bath, Maximize, ArrowLeft, Heart, Share2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
          <h1 className="font-display text-2xl font-bold">Property Not Found</h1>
          <Link to="/properties" className="mt-4 text-accent hover:underline">Browse Properties</Link>
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
        <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
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
                <img src={img} alt="" className="aspect-[4/3] w-full object-cover" />
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
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold text-foreground">{property.title}</h1>
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {property.location}
            </div>

            <div className="mt-6 flex gap-6">
              {[
                { icon: Bed, label: `${property.bedrooms} Bedrooms` },
                { icon: Bath, label: `${property.bathrooms} Bathrooms` },
                { icon: Maximize, label: `${property.area} sq ft` },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4" /> {item.label}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-foreground">Description</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{property.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-foreground">Amenities</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <Badge key={a} variant="secondary" className="px-3 py-1.5">{a}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
            <p className="font-display text-3xl font-bold text-foreground">
              {formatPrice(property.price, property.listingType)}
            </p>
            {property.listingType === "Rent" && (
              <p className="text-sm text-muted-foreground">per month</p>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                <Phone className="h-4 w-4" /> Contact Owner
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => setSaved(!saved)}
                >
                  <Heart className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-secondary p-4">
              <p className="text-xs font-medium text-muted-foreground">EMI Estimate</p>
              <p className="mt-1 font-display text-lg font-semibold text-foreground">
                {property.listingType === "Buy"
                  ? `₹${Math.round(property.price * 0.007).toLocaleString("en-IN")}/mo`
                  : "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">*Based on 8.5% interest, 20 years</p>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground">Similar Properties in {property.location}</h2>
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
