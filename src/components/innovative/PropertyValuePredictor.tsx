import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Clock,
  Pause,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface PropertyValuePredictorProps {
  currentPrice: number;
  propertyType: string;
  location: string;
}

/**
 * AI Property Value Predictor
 * ML-powered price predictions and investment timing recommendations
 */
const PropertyValuePredictor = ({
  currentPrice,
  propertyType,
  location,
}: PropertyValuePredictorProps) => {
  // Mock prediction data
  const predictions = {
    sixMonths: currentPrice * 1.04,
    oneYear: currentPrice * 1.09,
    fiveYears: currentPrice * 1.38,
  };

  const confidence = {
    sixMonths: 85,
    oneYear: 78,
    fiveYears: 62,
  };

  // Historical + predicted data for chart
  const chartData = [
    { month: "Jan 23", actual: currentPrice * 0.85, predicted: null },
    { month: "Apr 23", actual: currentPrice * 0.88, predicted: null },
    { month: "Jul 23", actual: currentPrice * 0.91, predicted: null },
    { month: "Oct 23", actual: currentPrice * 0.95, predicted: null },
    { month: "Jan 24", actual: currentPrice * 0.97, predicted: null },
    { month: "Apr 24", actual: currentPrice, predicted: null },
    { month: "Jul 24", actual: null, predicted: currentPrice * 1.02 },
    { month: "Oct 24", actual: null, predicted: currentPrice * 1.04 },
    { month: "Jan 25", actual: null, predicted: currentPrice * 1.06 },
    { month: "Apr 25", actual: null, predicted: currentPrice * 1.09 },
  ];

  const recommendation =
    predictions.oneYear > currentPrice * 1.08 ? "buy" : "wait";

  const formatPrice = (price: number) => {
    return `₹${(price / 100000).toFixed(1)}L`;
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return "text-green-600 dark:text-green-400";
    if (conf >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            AI Price Predictor
          </h3>
          <p className="text-sm text-muted-foreground">
            ML-powered value forecasts for smart investment decisions
          </p>
        </div>
      </div>

      {/* Current vs Predicted Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="predictedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
              tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => formatPrice(value)}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#actualGradient)"
              name="Actual Price"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#predictedGradient)"
              name="Predicted Price"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {
            period: "6 Months",
            price: predictions.sixMonths,
            confidence: confidence.sixMonths,
            icon: Clock,
          },
          {
            period: "1 Year",
            price: predictions.oneYear,
            confidence: confidence.oneYear,
            icon: TrendingUp,
          },
          {
            period: "5 Years",
            price: predictions.fiveYears,
            confidence: confidence.fiveYears,
            icon: TrendingUp,
          },
        ].map((pred, index) => {
          const growth = ((pred.price - currentPrice) / currentPrice) * 100;
          const Icon = pred.icon;

          return (
            <div key={index} className="p-4 rounded-lg bg-secondary">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {pred.period}
                </span>
              </div>
              <div className="text-lg font-bold text-foreground mb-1">
                {formatPrice(pred.price)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  +{growth.toFixed(1)}%
                </span>
                <span
                  className={`text-xs ${getConfidenceColor(pred.confidence)}`}
                >
                  {pred.confidence}% ✓
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      <div
        className={`p-4 rounded-lg ${
          recommendation === "buy"
            ? "bg-green-500/10 border border-green-500/20"
            : "bg-yellow-500/10 border border-yellow-500/20"
        }`}
      >
        <div className="flex items-start gap-3">
          {recommendation === "buy" ? (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Recommendation
              </span>
              <Badge
                variant={recommendation === "buy" ? "default" : "outline"}
                className="gap-1"
              >
                {recommendation === "buy" ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Good Time to Buy
                  </>
                ) : (
                  <>
                    <Pause className="h-3 w-3" />
                    Consider Waiting
                  </>
                )}
              </Badge>
            </div>
            <p className="text-xs text-foreground leading-relaxed mt-2">
              {recommendation === "buy"
                ? `Our AI predicts a ${(((predictions.oneYear - currentPrice) / currentPrice) * 100).toFixed(1)}% appreciation in the next year. Strong market indicators suggest buying now could yield good returns.`
                : "Market indicators suggest prices may stabilize soon. Consider monitoring for 2-3 months before making a decision."}
            </p>
          </div>
        </div>
      </div>

      {/* Market Factors */}
      <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
        <h4 className="text-xs font-medium text-foreground mb-2">
          Key Market Factors
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Demand: High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Supply: Limited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <span className="text-muted-foreground">
              Interest Rates: Moderate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Area Growth: Strong</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyValuePredictor;
