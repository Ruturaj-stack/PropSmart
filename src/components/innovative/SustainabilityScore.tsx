import { TrendingUp, Leaf, Zap, Droplets, Sun, Wind } from "lucide-react";

const SustainabilityScore = ({ propertyId }: { propertyId: string }) => {
  const metrics = [
    {
      name: "Energy Efficiency",
      score: 82,
      icon: Zap,
      color: "text-yellow-600",
      details: "LED lights, efficient HVAC",
    },
    {
      name: "Water Conservation",
      score: 75,
      icon: Droplets,
      color: "text-blue-600",
      details: "Low-flow fixtures, rainwater",
    },
    {
      name: "Solar Potential",
      score: 90,
      icon: Sun,
      color: "text-orange-600",
      details: "Excellent roof orientation",
    },
    {
      name: "Air Quality",
      score: 88,
      icon: Wind,
      color: "text-green-600",
      details: "Good ventilation, plants",
    },
  ];

  const overallScore = Math.round(
    metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length,
  );

  const solarROI = {
    installationCost: 350000,
    monthlySavings: 4500,
    paybackYears: 6.5,
    lifetime25YearSavings: 1350000,
  };

  const carbonFootprint = {
    current: 4.2,
    withSolar: 2.1,
    reduction: 50,
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Sustainability Scorecard
            </h3>
            <p className="text-sm text-muted-foreground">
              Environmental impact assessment
            </p>
          </div>
        </div>
        <div className="text-center">
          <div
            className={`text-3xl font-bold ${
              overallScore >= 80
                ? "text-green-600"
                : overallScore >= 60
                  ? "text-yellow-600"
                  : "text-orange-600"
            }`}
          >
            {overallScore}
          </div>
          <div className="text-xs text-muted-foreground">Eco Score</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="p-3 rounded-lg bg-secondary">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-5 w-5 ${metric.color}`} />
                <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">
                    {metric.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.details}
                  </div>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {metric.score}
                </div>
              </div>
              <div className="h-2 rounded-full bg-background overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${
                    metric.score >= 80
                      ? "from-green-500 to-green-600"
                      : metric.score >= 60
                        ? "from-yellow-500 to-yellow-600"
                        : "from-orange-500 to-orange-600"
                  }`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Solar ROI */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <Sun className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-foreground mb-2">
              Solar Panel ROI Calculator
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Installation</div>
                <div className="font-bold text-foreground">
                  ₹{(solarROI.installationCost / 1000).toFixed(0)}k
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Monthly Savings</div>
                <div className="font-bold text-green-600">
                  ₹{solarROI.monthlySavings}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Payback Period</div>
                <div className="font-bold text-foreground">
                  {solarROI.paybackYears} years
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">25-Year Savings</div>
                <div className="font-bold text-accent">
                  ₹{(solarROI.lifetime25YearSavings / 100000).toFixed(1)}L
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carbon Footprint */}
      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-sm text-foreground mb-2">
              Carbon Footprint
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Current</div>
                <div className="font-bold text-foreground">
                  {carbonFootprint.current} tons/year
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">With Solar</div>
                <div className="font-bold text-green-600">
                  {carbonFootprint.withSolar} tons/year
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Reduction</div>
                <div className="font-bold text-accent">
                  {carbonFootprint.reduction}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityScore;
