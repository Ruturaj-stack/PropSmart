import { Hammer, Scale, FileCheck, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExpertMarketplace = ({ location }: { location: string }) => {
  const experts = [
    {
      name: "Ramesh Inspection Services",
      category: "Home Inspector",
      rating: 4.8,
      reviews: 142,
      price: "₹8,000",
      icon: FileCheck,
      specialties: ["Structural", "Electrical", "Plumbing"],
    },
    {
      name: "Kumar Legal Associates",
      category: "Property Lawyer",
      rating: 4.9,
      reviews: 98,
      price: "₹15,000/case",
      icon: Scale,
      specialties: ["Title verification", "Contracts", "Registration"],
    },
    {
      name: "Modern Interiors Co.",
      category: "Contractor",
      rating: 4.7,
      reviews: 215,
      price: "₹500/sqft",
      icon: Hammer,
      specialties: ["Renovation", "Painting", "Flooring"],
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Hammer className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Expert Marketplace
          </h3>
          <p className="text-sm text-muted-foreground">
            Verified professionals in {location}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {experts.map((expert, i) => {
          const Icon = expert.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-lg bg-secondary border border-border"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {expert.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {expert.category}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">
                      {expert.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({expert.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-accent">{expert.price}</div>
                  <Button size="sm" className="mt-2">
                    Book
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                {expert.specialties.map((spec, j) => (
                  <span
                    key={j}
                    className="text-xs px-2 py-1 rounded-full bg-background text-muted-foreground"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
        <div className="flex items-start gap-2">
          <DollarSign className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground">
            <span className="font-medium">Commission-free bookings:</span>{" "}
            Connect directly with verified professionals. All experts are
            background-checked and insured.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpertMarketplace;
