import type { Property } from "@/data/properties";
import {
  calculateInvestmentInsights,
  getDemandColor,
  formatPercentage,
  getPriceComparisonLabel,
} from "@/services/investmentAnalytics";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  BarChart3,
  AlertCircle,
} from "lucide-react";

interface InvestmentInsightsProps {
  property: Property;
}

/**
 * Investment Insights Panel
 * Shows rental yield, appreciation, price analysis, and demand
 */
const InvestmentInsights = ({ property }: InvestmentInsightsProps) => {
  const insights = calculateInvestmentInsights(property);

  const demandColorClass = getDemandColor(insights.demandLevel);
  const priceLabel = getPriceComparisonLabel(insights.priceVsAreaAverage);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-accent" />
        <h3 className="font-display text-lg font-semibold text-card-foreground">
          Investment Insights
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Rental Yield */}
        <div className="rounded-lg border border-border bg-secondary p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-muted-foreground">
                Rental Yield
              </span>
            </div>
            <AlertCircle
              className="h-3.5 w-3.5 text-muted-foreground"
              title="Annual rental income as % of property price"
            />
          </div>
          <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
            {insights.rentalYield}%
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ₹{insights.estimatedMonthlyRent.toLocaleString()}/month
          </p>
        </div>

        {/* Price vs Area Average */}
        <div className="rounded-lg border border-border bg-secondary p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-muted-foreground">
                Price Analysis
              </span>
            </div>
            <AlertCircle
              className="h-3.5 w-3.5 text-muted-foreground"
              title="Compared to area average"
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
            {insights.priceVsAreaAverage < 0 ? (
              <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
            <span
              className={`text-2xl font-bold ${
                insights.priceVsAreaAverage < 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPercentage(insights.priceVsAreaAverage)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{priceLabel}</p>
        </div>

        {/* Appreciation Forecast */}
        <div className="rounded-lg border border-border bg-secondary p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Appreciation
              </span>
            </div>
            <AlertCircle
              className="h-3.5 w-3.5 text-muted-foreground"
              title="Estimated based on historical trends"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted-foreground">3 Years</p>
              <p className="text-lg font-bold text-accent">
                +{insights.appreciation3Year}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">5 Years</p>
              <p className="text-lg font-bold text-accent">
                +{insights.appreciation5Year}%
              </p>
            </div>
          </div>
        </div>

        {/* Demand Level */}
        <div className="rounded-lg border border-border bg-secondary p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-muted-foreground">
                Demand Level
              </span>
            </div>
            <AlertCircle
              className="h-3.5 w-3.5 text-muted-foreground"
              title="Based on location, price, and features"
            />
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${demandColorClass}`}
            >
              {insights.demandLevel}
            </span>
            <span className="text-2xl font-bold text-card-foreground">
              {insights.demandScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="mt-4 rounded-lg bg-accent/10 p-3">
        <p className="text-xs text-accent font-medium">
          💡{" "}
          {insights.rentalYield >= 3
            ? "Strong rental income potential"
            : insights.rentalYield >= 2
              ? "Moderate rental potential"
              : "Better for capital appreciation"}
          {insights.priceVsAreaAverage < -10 && " • Great value vs market"}
          {insights.demandLevel === "High" && " • High demand area"}
        </p>
      </div>
    </div>
  );
};

export default InvestmentInsights;
