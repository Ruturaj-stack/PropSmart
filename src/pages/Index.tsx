import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProperties } from "@/data/properties";
import { getRecommendations, DEFAULT_PREFERENCES } from "@/data/recommendations";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featured = mockProperties.filter((p) => p.status === "Available").slice(0, 4);
  const recommended = getRecommendations(mockProperties, DEFAULT_PREFERENCES, 4);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Properties */}
      <section className="container py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Properties</h2>
            <p className="mt-2 text-muted-foreground">Handpicked properties for you</p>
          </div>
          <Link to="/properties">
            <Button variant="ghost" className="gap-2 text-accent hover:text-accent">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered</span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Recommended For You</h2>
              <p className="mt-2 text-muted-foreground">Based on your preferences and browsing history</p>
            </div>
            <Link to="/recommendations">
              <Button variant="ghost" className="gap-2 text-accent hover:text-accent">
                See All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((r) => (
              <PropertyCard key={r.property.id} property={r.property} reasons={r.reasons} />
            ))}
          </div>
        </div>
      </section>

      {/* Why PropSmart */}
      <section className="container py-16">
        <h2 className="text-center font-display text-3xl font-bold text-foreground">Why PropSmart?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Sparkles, title: "Smart Recommendations", desc: "Our scoring engine matches properties to your exact preferences with weighted criteria." },
            { icon: Shield, title: "Verified Listings", desc: "Every property is verified for authenticity. No fake listings, no scams." },
            { icon: Zap, title: "Real-Time Updates", desc: "New listings appear instantly. Never miss your dream property." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center shadow-card transition-shadow hover:shadow-card-hover">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <item.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-card-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
