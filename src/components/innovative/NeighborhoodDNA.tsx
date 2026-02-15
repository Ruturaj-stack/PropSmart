import {
  Users,
  Briefcase,
  Home,
  Heart,
  TrendingUp,
  Coffee,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface NeighborhoodDNAProps {
  location: string;
}

/**
 * Neighborhood DNA Profile
 * Unique fingerprint of neighborhood characteristics
 */
const NeighborhoodDNA = ({ location }: NeighborhoodDNAProps) => {
  // Mock demographic data
  const dnaData = [
    { category: "Families", score: 85, maxScore: 100 },
    { category: "Young Prof.", score: 72, maxScore: 100 },
    { category: "Retirees", score: 45, maxScore: 100 },
    { category: "Pet Owners", score: 78, maxScore: 100 },
    { category: "Nightlife", score: 35, maxScore: 100 },
    { category: "Culture", score: 68, maxScore: 100 },
  ];

  const demographics = [
    {
      label: "Avg Age",
      value: "34 years",
      icon: Users,
      color: "text-blue-600",
    },
    { label: "Families", value: "65%", icon: Home, color: "text-green-600" },
    {
      label: "Professionals",
      value: "72%",
      icon: Briefcase,
      color: "text-purple-600",
    },
    {
      label: "Pet Friendly",
      value: "78/100",
      icon: Heart,
      color: "text-pink-600",
    },
  ];

  const lifestyle = [
    { type: "Coffee Shops", count: 12, icon: "☕", trend: "+3 this year" },
    { type: "Parks", count: 5, icon: "🌳", trend: "Well maintained" },
    { type: "Restaurants", count: 28, icon: "🍽️", trend: "8 new openings" },
    { type: "Gyms", count: 7, icon: "💪", trend: "24/7 options" },
  ];

  const culturalDiversity = {
    score: 82,
    description: "Highly diverse community with multiple cultures",
    languages: ["English", "Hindi", "Tamil", "Kannada", "Telugu"],
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
          <Users className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Neighborhood DNA Profile
          </h3>
          <p className="text-sm text-muted-foreground">
            Unique community fingerprint for {location}
          </p>
        </div>
      </div>

      {/* DNA Radar Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={dnaData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />
            <Radar
              name="Community Score"
              dataKey="score"
              stroke="hsl(var(--accent))"
              fill="hsl(var(--accent))"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Demographics */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Key Demographics
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {demographics.map((demo, index) => {
            const Icon = demo.icon;
            return (
              <div key={index} className="p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-4 w-4 ${demo.color}`} />
                  <span className="text-xs text-muted-foreground">
                    {demo.label}
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {demo.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lifestyle Indicators */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Lifestyle & Amenities
        </h4>
        <div className="space-y-2">
          {lifestyle.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-medium text-sm text-foreground">
                    {item.type}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.trend}
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-accent">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Diversity */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-foreground">
                Cultural Diversity Index
              </span>
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {culturalDiversity.score}/100
              </span>
            </div>
            <p className="text-xs text-foreground/80 mb-2">
              {culturalDiversity.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {culturalDiversity.languages.map((lang, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodDNA;
