import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { LOCATIONS, PROPERTY_TYPES, Property } from "@/data/properties";
import {
  getRecommendations,
  DEFAULT_PREFERENCES,
} from "@/data/recommendations";
import { UserPreferences } from "@/data/properties";
import { fetchProperties } from "@/services/propertyService";
import { Sparkles, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Recommendations = () => {
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [recommendations, setRecommendations] = useState<
    { property: Property; score: number; reasons: string[] }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProperties();
      setRecommendations(getRecommendations(data, prefs, 8));
      setLoading(false);
    };
    loadData();
  }, [prefs]);

  const selectClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 dark:bg-slate-900 dark:text-slate-100 transition-colors";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Your Recommendations
            </h1>
            <p className="text-muted-foreground">
              Properties scored and ranked based on your preferences
            </p>
          </div>
        </div>

        {/* Preference editor */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-accent">
            <SlidersHorizontal className="h-4 w-4" />
            <h3 className="font-display font-semibold">Your Preferences</h3>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Min Budget
              </label>
              <input
                type="number"
                value={prefs.minBudget}
                onChange={(e) =>
                  setPrefs({ ...prefs, minBudget: Number(e.target.value) })
                }
                className={selectClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Max Budget
              </label>
              <input
                type="number"
                value={prefs.maxBudget}
                onChange={(e) =>
                  setPrefs({ ...prefs, maxBudget: Number(e.target.value) })
                }
                className={selectClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Location
              </label>
              <select
                className={selectClass}
                value={prefs.preferredLocation}
                onChange={(e) =>
                  setPrefs({ ...prefs, preferredLocation: e.target.value })
                }
              >
                <option value="">Any</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Property Type
              </label>
              <select
                className={selectClass}
                value={prefs.propertyType}
                onChange={(e) =>
                  setPrefs({ ...prefs, propertyType: e.target.value })
                }
              >
                <option value="">Any</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Bedrooms
              </label>
              <select
                className={selectClass}
                value={prefs.bedrooms}
                onChange={(e) =>
                  setPrefs({ ...prefs, bedrooms: Number(e.target.value) })
                }
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scoring legend */}
        <div className="mt-6 flex flex-wrap gap-4 rounded-lg bg-secondary p-4 text-xs text-muted-foreground">
          <span className="font-medium text-secondary-foreground">
            Scoring:
          </span>
          <span>Budget Match +30pts</span>
          <span>Location +25pts</span>
          <span>Type +20pts</span>
          <span>Bedrooms +15pts</span>
          <span>Amenities +10pts</span>
        </div>

        {/* Results */}
        <div className="mt-8">
          {recommendations.length === 0 && !loading ? (
            <div className="rounded-xl border border-border bg-card py-20 text-center">
              <p className="text-lg font-medium text-card-foreground">
                No matching properties
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your preferences
              </p>
            </div>
          ) : (
            recommendations.length > 0 && (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing top {recommendations.length} recommendations
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {recommendations.map((r, i) => (
                    <div key={r.property.id} className="relative">
                      {i < 3 && (
                        <div className="absolute -top-2 left-3 z-10 rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                          #{i + 1} Match
                        </div>
                      )}
                      <PropertyCard property={r.property} reasons={r.reasons} />
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recommendations;
