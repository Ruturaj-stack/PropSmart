import {
  MapPin,
  GraduationCap,
  Hospital,
  ShoppingCart,
  Train,
  Shield,
  Wind,
  Trees,
} from "lucide-react";

interface NeighborhoodInsightsProps {
  location: string;
}

/**
 * Neighborhood Insights Component
 * Shows area scores and nearby amenities
 */
const NeighborhoodInsights = ({ location }: NeighborhoodInsightsProps) => {
  // Mock data - replace with real API
  const insights = {
    walkability: 78,
    safety: 85,
    airQuality: 65,
    greenery: 72,
    schools: [
      { name: "Delhi Public School", distance: "0.8 km", rating: 4.5 },
      { name: "Ryan International", distance: "1.2 km", rating: 4.3 },
    ],
    hospitals: [
      { name: "Apollo Hospital", distance: "2.1 km", rating: 4.7 },
      { name: "Fortis Healthcare", distance: "3.5 km", rating: 4.5 },
    ],
    malls: [
      { name: "Phoenix Marketcity", distance: "1.5 km" },
      { name: "Inorbit Mall", distance: "2.8 km" },
    ],
    metro: { name: "MG Road Metro", distance: "0.5 km" },
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Good";
    return "Fair";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold text-lg text-card-foreground mb-4">
        🏘️ Neighborhood Insights
      </h3>

      {/* Scores Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg bg-secondary p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-xs">Walkability</span>
          </div>
          <div
            className={`text-2xl font-bold ${getScoreColor(insights.walkability)}`}
          >
            {insights.walkability}/100
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {getScoreLabel(insights.walkability)}
          </div>
        </div>

        <div className="rounded-lg bg-secondary p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Safety Rating</span>
          </div>
          <div
            className={`text-2xl font-bold ${getScoreColor(insights.safety)}`}
          >
            {insights.safety}/100
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {getScoreLabel(insights.safety)}
          </div>
        </div>

        <div className="rounded-lg bg-secondary p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Wind className="h-4 w-4" />
            <span className="text-xs">Air Quality</span>
          </div>
          <div
            className={`text-2xl font-bold ${getScoreColor(insights.airQuality)}`}
          >
            {insights.airQuality}/100
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {getScoreLabel(insights.airQuality)}
          </div>
        </div>

        <div className="rounded-lg bg-secondary p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Trees className="h-4 w-4" />
            <span className="text-xs">Green Spaces</span>
          </div>
          <div
            className={`text-2xl font-bold ${getScoreColor(insights.greenery)}`}
          >
            {insights.greenery}/100
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {getScoreLabel(insights.greenery)}
          </div>
        </div>
      </div>

      {/* Nearby Amenities */}
      <div className="space-y-4">
        {/* Metro */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
            <Train className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{insights.metro.name}</div>
            <div className="text-xs text-muted-foreground">
              {insights.metro.distance} away
            </div>
          </div>
        </div>

        {/* Schools */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Top Schools</span>
          </div>
          <div className="space-y-2">
            {insights.schools.map((school, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm p-2 rounded bg-secondary"
              >
                <span className="text-foreground">{school.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐ {school.rating}</span>
                  <span className="text-muted-foreground text-xs">
                    {school.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospitals */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Hospital className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Hospitals</span>
          </div>
          <div className="space-y-2">
            {insights.hospitals.map((hospital, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm p-2 rounded bg-secondary"
              >
                <span className="text-foreground">{hospital.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐ {hospital.rating}</span>
                  <span className="text-muted-foreground text-xs">
                    {hospital.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Shopping</span>
          </div>
          <div className="space-y-2">
            {insights.malls.map((mall, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm p-2 rounded bg-secondary"
              >
                <span className="text-foreground">{mall.name}</span>
                <span className="text-muted-foreground text-xs">
                  {mall.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodInsights;
