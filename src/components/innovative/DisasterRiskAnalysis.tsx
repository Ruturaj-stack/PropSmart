import {
  AlertTriangle,
  Droplets,
  Wind,
  Zap,
  Shield,
  DollarSign,
} from "lucide-react";

interface DisasterRiskAnalysisProps {
  location: string;
}

/**
 * Climate & Disaster Risk Analysis
 * Comprehensive risk assessment with historical data
 */
const DisasterRiskAnalysis = ({ location }: DisasterRiskAnalysisProps) => {
  const risks = [
    {
      type: "Flood Risk",
      level: "Low",
      score: 25,
      icon: Droplets,
      color: "text-blue-600",
      details: "Outside 100-year flood zone",
      lastEvent: "None in 50 years",
    },
    {
      type: "Earthquake",
      level: "Moderate",
      score: 45,
      icon: Zap,
      color: "text-yellow-600",
      details: "Zone III seismic area",
      lastEvent: "2018 (4.2 magnitude)",
    },
    {
      type: "Air Quality",
      level: "Good",
      score: 15,
      icon: Wind,
      color: "text-green-600",
      details: "AQI avg: 65 (Satisfactory)",
      lastEvent: "Consistent quality",
    },
  ];

  const insuranceImpact = {
    flood: "+₹0",
    earthquake: "+₹1,200/year",
    total: "+₹1,200/year",
  };

  const safetyRecommendations = [
    "Install earthquake safety latches on cabinets",
    "Keep emergency kit with 72-hour supplies",
    "Know evacuation routes for the area",
    "Consider structural reinforcement for older buildings",
  ];

  const getRiskColor = (level: string) => {
    if (level === "Low")
      return "bg-green-500/20 text-green-700 dark:text-green-300";
    if (level === "Moderate")
      return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300";
    return "bg-red-500/20 text-red-700 dark:text-red-300";
  };

  const overallRisk = Math.round(
    risks.reduce((sum, r) => sum + r.score, 0) / risks.length,
  );

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Disaster & Climate Risk
            </h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive safety assessment
            </p>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-2xl font-bold ${
              overallRisk < 30
                ? "text-green-600"
                : overallRisk < 60
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          >
            {overallRisk}/100
          </div>
          <div className="text-xs text-muted-foreground">Risk Score</div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="space-y-4 mb-6">
        {risks.map((risk, index) => {
          const Icon = risk.icon;
          return (
            <div key={index} className="p-4 rounded-lg bg-secondary">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`h-10 w-10 rounded-lg bg-gradient-to-br ${
                    risk.level === "Low"
                      ? "from-green-500/20 to-green-600/20"
                      : risk.level === "Moderate"
                        ? "from-yellow-500/20 to-yellow-600/20"
                        : "from-red-500/20 to-red-600/20"
                  } flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${risk.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">
                      {risk.type}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getRiskColor(risk.level)}`}
                    >
                      {risk.level} Risk
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {risk.details}
                  </div>
                </div>
              </div>

              <div className="h-2 rounded-full bg-secondary-foreground/10 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    risk.level === "Low"
                      ? "bg-green-500"
                      : risk.level === "Moderate"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${risk.score}%` }}
                />
              </div>

              <div className="mt-2 text-xs text-muted-foreground">
                Last event: {risk.lastEvent}
              </div>
            </div>
          );
        })}
      </div>

      {/* Insurance Impact */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 mb-6">
        <div className="flex items-start gap-3">
          <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-sm text-foreground mb-2">
              Insurance Cost Impact
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Flood coverage:</span>
                <span className="ml-2 font-medium text-foreground">
                  {insuranceImpact.flood}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Earthquake:</span>
                <span className="ml-2 font-medium text-foreground">
                  {insuranceImpact.earthquake}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-orange-500/20">
              <span className="text-muted-foreground text-sm">
                Estimated additional cost:
              </span>
              <span className="ml-2 font-bold text-orange-600 dark:text-orange-400">
                {insuranceImpact.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Recommendations */}
      <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
        <div className="flex items-start gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <h4 className="text-sm font-medium text-foreground">
            Safety Recommendations
          </h4>
        </div>
        <ul className="space-y-2">
          {safetyRecommendations.map((rec, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="text-accent mt-0.5">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisasterRiskAnalysis;
