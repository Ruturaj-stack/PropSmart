import {
  DollarSign,
  TrendingUp,
  Zap,
  Droplets,
  Home,
  Wrench,
} from "lucide-react";

interface HiddenCostsCalculatorProps {
  propertyPrice: number;
  propertyType: string;
  area: number;
}

const HiddenCostsCalculator = ({
  propertyPrice,
  propertyType,
  area,
}: HiddenCostsCalculatorProps) => {
  // Calculate various hidden costs
  const costs = {
    propertyTax: {
      current: propertyPrice * 0.0015, // 0.15% annually
      year5: propertyPrice * 0.0018, // Projected increase
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
      annual: area * 50, // ₹50 per sq ft
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

  const monthlyTotal =
    costs.propertyTax.current / 12 +
    costs.hoa.monthly +
    costs.utilities.total +
    costs.maintenance.annual / 12 +
    costs.insurance.total / 12;

  const yearlyTotal = monthlyTotal * 12;

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(1)}k`;
  };

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

      {/* Monthly & Yearly Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
          <div className="text-xs text-muted-foreground mb-1">
            Monthly Costs
          </div>
          <div className="text-2xl font-bold text-accent">
            {formatCurrency(monthlyTotal)}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
          <div className="text-xs text-muted-foreground mb-1">Yearly Costs</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(yearlyTotal)}
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-foreground">Cost Breakdown</h4>

        {/* Property Tax */}
        <div className="p-3 rounded-lg bg-secondary">
          <div className="flex items-center gap-3 mb-2">
            <Home className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <div className="font-medium text-sm text-foreground">
                Property Tax
              </div>
              <div className="text-xs text-muted-foreground">
                Current: {formatCurrency(costs.propertyTax.current)}/year
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground">
                {formatCurrency(costs.propertyTax.current / 12)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            ⚠️ Projected 5-year: {formatCurrency(costs.propertyTax.year5)}/year
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
                {formatCurrency(costs.hoa.monthly)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Trend: {costs.hoa.trend}
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
                {formatCurrency(costs.utilities.total)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">⚡ Electric:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(costs.utilities.electricity)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">💧 Water:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(costs.utilities.water)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">🔥 Gas:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(costs.utilities.gas)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">🔧 Common:</span>
              <div className="font-medium text-foreground">
                {formatCurrency(costs.utilities.maintenance)}
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
                {formatCurrency(costs.maintenance.annual / 12)}
              </div>
              <div className="text-xs text-muted-foreground">/month</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Emergency fund recommended:{" "}
            {formatCurrency(costs.maintenance.emergency)}
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
                {formatCurrency(costs.insurance.total / 12)}
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
              {formatCurrency(propertyPrice + yearlyTotal * 10)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Property ({formatCurrency(propertyPrice)}) + Hidden costs (
              {formatCurrency(yearlyTotal * 10)})
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              Hidden costs are
            </div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {(((yearlyTotal * 10) / propertyPrice) * 100).toFixed(1)}%
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
