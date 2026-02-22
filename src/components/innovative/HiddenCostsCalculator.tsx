import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Zap,
  Droplets,
  Home,
  Wrench,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  calculateHiddenCosts,
  HiddenCostsResponse,
} from "@/services/hiddenCostsApi";

interface HiddenCostsCalculatorProps {
  propertyPrice: number;
  propertyType: string;
  area: number;
  state?: string;
  propertyStatus?: string;
}

const HiddenCostsCalculator = ({
  propertyPrice,
  propertyType,
  area,
  state = "",
  propertyStatus = "",
}: HiddenCostsCalculatorProps) => {
  const [apiCosts, setApiCosts] = useState<HiddenCostsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyPrice || !state) return;

    const fetchCosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await calculateHiddenCosts({
          propertyPrice,
          state,
          propertyStatus,
          propertyType,
        });
        setApiCosts(result);
      } catch (err) {
        console.error("Hidden costs calculation failed:", err);
        setError("Unable to calculate costs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCosts();
  }, [propertyPrice, state, propertyStatus, propertyType]);

  // Recurring ownership costs (kept client-side — not stamp-duty related)
  const recurringCosts = {
    propertyTax: {
      current: propertyPrice * 0.0015,
      year5: propertyPrice * 0.0018,
      icon: Home,
      color: "text-blue-600",
    },
    hoa: {
      monthly: 2500,
      yearly: 30000,
      trend: "+8% every 2 years",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    utilities: {
      electricity: 4500,
      water: 1200,
      gas: 800,
      maintenance: 2000,
      total: 8500,
      icon: Zap,
      color: "text-yellow-600",
    },
    maintenance: {
      annual: area * 50,
      emergency: area * 20,
      icon: Wrench,
      color: "text-orange-600",
    },
    insurance: {
      property: propertyPrice * 0.003,
      liability: 12000,
      total: propertyPrice * 0.003 + 12000,
      icon: Droplets,
      color: "text-green-600",
    },
  };

  const monthlyRecurring =
    recurringCosts.propertyTax.current / 12 +
    recurringCosts.hoa.monthly +
    recurringCosts.utilities.total +
    recurringCosts.maintenance.annual / 12 +
    recurringCosts.insurance.total / 12;

  const yearlyRecurring = monthlyRecurring * 12;

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`;
    return `₹${Math.round(amount)}`;
  };

  const formatPercent = (rate: number) => `${(rate * 100).toFixed(1)}%`;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-accent" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Hidden Costs Calculator
            </h3>
            <p className="text-sm text-muted-foreground">
              True cost of ownership beyond price
            </p>
          </div>
        </div>
      </div>

      {/* ── One-Time Purchase Costs (from API) ── */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Calculating costs…</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 mb-6 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      ) : apiCosts ? (
        <div className="mb-6 space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            One-Time Purchase Costs
          </h4>

          <div className="p-3 rounded-lg bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-foreground">
                  Stamp Duty
                </div>
                <div className="text-xs text-muted-foreground">
                  {state} — {formatPercent(apiCosts.stampDutyRate)}
                </div>
              </div>
              <div className="font-bold text-foreground">
                {formatCurrency(apiCosts.stampDuty)}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-foreground">
                  Registration Fee
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatPercent(apiCosts.registrationRate)} of property value
                </div>
              </div>
              <div className="font-bold text-foreground">
                {formatCurrency(apiCosts.registration)}
              </div>
            </div>
          </div>

          {apiCosts.gst > 0 && (
            <div className="p-3 rounded-lg bg-secondary">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-foreground">GST</div>
                  <div className="text-xs text-muted-foreground">
                    Applicable for under-construction properties
                  </div>
                </div>
                <div className="font-bold text-foreground">
                  {formatCurrency(apiCosts.gst)}
                </div>
              </div>
            </div>
          )}

          <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Total One-Time Costs
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  All-in price:{" "}
                  <span className="font-semibold text-foreground">
                    {formatCurrency(apiCosts.totalAllInPrice)}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-accent">
                {formatCurrency(apiCosts.totalOneTimeCosts)}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── Recurring Monthly / Yearly Costs ── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
          <div className="text-xs text-muted-foreground mb-1">
            Monthly Costs
          </div>
          <div className="text-2xl font-bold text-accent">
            {formatCurrency(monthlyRecurring)}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
          <div className="text-xs text-muted-foreground mb-1">Yearly Costs</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(yearlyRecurring)}
          </div>
        </div>
      </div>

      {/* Detailed Recurring Breakdown */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-foreground">
          Recurring Cost Breakdown
        </h4>

        {/* Property Tax */}
        <div className="p-3 rounded-lg bg-secondary">
          <div className="flex items-center gap-3 mb-2">
            <Home className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <div className="font-medium text-sm text-foreground">
                Property Tax
              </div>
              <div className="text-xs text-muted-foreground">
                Current: {formatCurrency(recurringCosts.propertyTax.current)}
                /year
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground">
                {formatCurrency(recurringCosts.propertyTax.current / 12)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            ⚠️ Projected 5-year:{" "}
            {formatCurrency(recurringCosts.propertyTax.year5)}/year
          </div>
        </div>

        {/* HOA Fees */}
        <div className="p-3 rounded-lg bg-secondary">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div className="flex-1">
              <div className="font-medium text-sm text-foreground">
                HOA/Society Fees
              </div>
              <div className="text-xs text-muted-foreground">
                Homeowners association
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground">
                {formatCurrency(recurringCosts.hoa.monthly)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Trend: {recurringCosts.hoa.trend}
          </div>
        </div>

        {/* Utilities */}
        <div className="p-3 rounded-lg bg-secondary">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <div className="font-medium text-sm text-foreground">
                Average Utilities
              </div>
              <div className="text-xs text-muted-foreground">
                Electricity, water, gas, common
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground">
                {formatCurrency(recurringCosts.utilities.total)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">⚡ Electric:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(recurringCosts.utilities.electricity)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">💧 Water:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(recurringCosts.utilities.water)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">🔥 Gas:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(recurringCosts.utilities.gas)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">🔧 Common:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(recurringCosts.utilities.maintenance)}
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="p-3 rounded-lg bg-secondary">
          <div className="flex items-center gap-3 mb-2">
            <Wrench className="h-5 w-5 text-orange-600" />
            <div className="flex-1">
              <div className="font-medium text-sm text-foreground">
                Maintenance Reserve
              </div>
              <div className="text-xs text-muted-foreground">
                Repairs & upkeep (₹50/sq ft)
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground">
                {formatCurrency(recurringCosts.maintenance.annual / 12)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Emergency fund recommended:{" "}
            {formatCurrency(recurringCosts.maintenance.emergency)}
          </div>
        </div>

        {/* Insurance */}
        <div className="p-3 rounded-lg bg-secondary">
          <div className="flex items-center gap-3">
            <Droplets className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <div className="font-medium text-sm text-foreground">
                Insurance
              </div>
              <div className="text-xs text-muted-foreground">
                Property + liability coverage
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground">
                {formatCurrency(recurringCosts.insurance.total / 12)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Ownership Cost */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
        <div className="text-sm font-medium text-foreground mb-2">
          10-Year Total Ownership Cost
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(
                propertyPrice +
                (apiCosts?.totalOneTimeCosts ?? 0) +
                yearlyRecurring * 10
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Property ({formatCurrency(propertyPrice)})
              {apiCosts
                ? ` + One-time (${formatCurrency(apiCosts.totalOneTimeCosts)})`
                : ""}
              {" + "}Recurring ({formatCurrency(yearlyRecurring * 10)})
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              Hidden costs are
            </div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {(
                (((apiCosts?.totalOneTimeCosts ?? 0) + yearlyRecurring * 10) /
                  propertyPrice) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="text-xs text-muted-foreground">
              of purchase price
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenCostsCalculator;
