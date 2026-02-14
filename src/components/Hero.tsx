import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/data/properties";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    location: "",
    type: "",
    budget: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.location) params.set("location", search.location);
    if (search.type) params.set("type", search.type);
    if (search.budget) params.set("budget", search.budget);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Find Your <span className="text-gradient-warm">Perfect Home</span>
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Smart recommendations powered by your preferences. Discover apartments, villas, and more across India's top cities.
          </p>
        </div>

        {/* Search bar */}
        <div
          className="mt-10 animate-fade-up rounded-2xl bg-card p-2 shadow-elevated sm:flex sm:items-center sm:gap-0"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-1 items-center gap-2 border-b border-border px-4 py-3 sm:border-b-0 sm:border-r">
            <MapPin className="h-5 w-5 shrink-0 text-accent" />
            <select
              value={search.location}
              onChange={(e) => setSearch({ ...search, location: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            >
              <option value="">All Locations</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-1 items-center gap-2 border-b border-border px-4 py-3 sm:border-b-0 sm:border-r">
            <Home className="h-5 w-5 shrink-0 text-accent" />
            <select
              value={search.type}
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="PG">PG</option>
            </select>
          </div>

          <div className="flex flex-1 items-center gap-2 px-4 py-3">
            <IndianRupee className="h-5 w-5 shrink-0 text-accent" />
            <select
              value={search.budget}
              onChange={(e) => setSearch({ ...search, budget: e.target.value })}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            >
              <option value="">Any Budget</option>
              <option value="0-20000">Rent: Under ₹20K/mo</option>
              <option value="20000-50000">Rent: ₹20K - ₹50K/mo</option>
              <option value="0-5000000">Buy: Under ₹50L</option>
              <option value="5000000-20000000">Buy: ₹50L - ₹2Cr</option>
              <option value="20000000-100000000">Buy: ₹2Cr+</option>
            </select>
          </div>

          <div className="p-2">
            <Button
              onClick={handleSearch}
              className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto sm:px-8"
              size="lg"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 flex gap-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "1,200+", label: "Properties" },
            { value: "50+", label: "Cities" },
            { value: "10K+", label: "Happy Users" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</p>
              <p className="text-sm text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
