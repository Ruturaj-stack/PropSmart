import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import SavedProperties from "@/components/SavedProperties";
import RecentlyViewed from "@/components/RecentlyViewed";
import AnimatedStats from "@/components/AnimatedStats";
import GamificationPanel from "@/components/GamificationPanel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProperties } from "@/data/properties";
import {
  getRecommendations,
  DEFAULT_PREFERENCES,
} from "@/data/recommendations";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Home,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featured = mockProperties
    .filter((p) => p.status === "Available")
    .slice(0, 4);
  const recommended = getRecommendations(
    mockProperties,
    DEFAULT_PREFERENCES,
    4,
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* NEW: Stats Section with Animated Counters */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">
              PropSmart by the Numbers
            </h2>
            <p className="mt-2 text-muted-foreground">
              Join thousands of happy property hunters
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedStats
              end={1248}
              label="Active Users"
              icon={<Users className="h-6 w-6 text-accent" />}
              duration={2.5}
            />
            <AnimatedStats
              end={3542}
              label="Properties Listed"
              icon={<Home className="h-6 w-6 text-accent" />}
              duration={2.5}
            />
            <AnimatedStats
              end={892}
              label="Successful Deals"
              icon={<TrendingUp className="h-6 w-6 text-accent" />}
              duration={2.5}
            />
            <AnimatedStats
              end={98}
              label="Satisfaction Rate"
              suffix="%"
              icon={<Sparkles className="h-6 w-6 text-accent" />}
              duration={2.5}
            />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Featured Properties
            </h2>
            <p className="mt-2 text-muted-foreground">
              Handpicked properties for you
            </p>
          </div>
          <Link to="/properties">
            <Button
              variant="ghost"
              className="gap-2 text-accent hover:text-accent"
            >
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

      {/* Recently Viewed */}
      <section className="container py-8">
        <RecentlyViewed />
      </section>

      {/* Saved Properties */}
      <section className="container py-8">
        <SavedProperties />
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
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
                Recommended For You
              </h2>
              <p className="mt-2 text-muted-foreground">
                Based on your preferences and browsing history
              </p>
            </div>
            <Link to="/recommendations">
              <Button
                variant="ghost"
                className="gap-2 text-accent hover:text-accent"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((rec) => (
              <PropertyCard
                key={rec.property.id}
                property={rec.property}
                reasons={rec.reasons}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Gamification Panel */}
      <section className="container py-16">
        <GamificationPanel />
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Why Choose PropSmart?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your trusted partner in real estate
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              AI-Powered
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Smart recommendations based on your preferences
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              Verified Listings
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All properties thoroughly verified by our team
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Zap className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              Quick Process
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Find your dream home in just a few clicks
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
