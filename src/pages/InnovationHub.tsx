import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Zap,
  Brain,
  TrendingUp,
  Palette,
  Map,
  DollarSign,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Innovation Hub Page
 * Showcases all next-gen features available in PropSmart
 */
const InnovationHub = () => {
  const featureCategories = [
    {
      title: "Intelligent Insights",
      icon: Brain,
      color: "text-blue-600",
      features: [
        {
          name: "Property Value Predictor",
          description:
            "ML forecasts for future price trends and investment timing",
          icon: TrendingUp,
        },
        {
          name: "Hidden Costs Calculator",
          description: "Complete transparency on taxes, fees, and maintenance",
          icon: DollarSign,
        },
        {
          name: "Sustainability Score",
          description: "Energy efficiency and eco-friendliness ratings",
          icon: Leaf,
        },
      ],
    },
    {
      title: "Visual & Immersive",
      icon: Sparkles,
      color: "text-purple-600",
      features: [
        {
          name: "Virtual Staging AI",
          description: "Visualize empty rooms with AI-furnished designs",
          icon: Palette,
        },
        {
          name: "Commute Time Maps",
          description: "Interactive travel planning with isochrone maps",
          icon: Map,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-accent/10 via-purple-500/10 to-blue-500/10 py-20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">
              Next-Generation Features
            </span>
          </div>

          <h1 className="font-display text-5xl font-bold text-foreground mb-4">
            Innovation Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our 5 premium AI-powered tools and immersive experiences
            that make PropSmart the most advanced property finder
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/properties">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Try Features Now
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Categories */}
      <div className="container py-16">
        {featureCategories.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <div key={catIndex} className="mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all hover:border-accent cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                        <FeatureIcon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
                        <span>Learn more</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Banner */}
      <div className="bg-secondary py-16">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "5", label: "Premium AI Features", icon: Brain },
              { value: "98%", label: "Accuracy Rate", icon: TrendingUp },
              { value: "< 2s", label: "Processing Time", icon: Zap },
              { value: "24/7", label: "Availability", icon: Sparkles },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-16">
        <div className="rounded-2xl bg-gradient-to-r from-accent to-purple-600 p-12 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-4">
            Experience the Future of Property Search
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            All these innovative features are available on every property
            listing. Start exploring smarter today.
          </p>
          <Link to="/properties">
            <Button size="lg" variant="secondary" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InnovationHub;
