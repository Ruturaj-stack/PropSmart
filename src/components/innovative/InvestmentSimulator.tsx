import { useState } from "react";
import { TrendingUp, DollarSign, PieChart, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const InvestmentSimulator = ({ propertyPrice }: { propertyPrice: number }) => {
  const [downPayment, setDownPayment] = useState(20);
  const [loanTenure, setLoanTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [appreciation, setAppreciation] = useState(8);

  // Calculate EMI
  const principal = propertyPrice * (1 - downPayment / 100);
  const monthlyRate = interestRate / 1200;
  const months = loanTenure * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  // Future value projection
  const futureValue = propertyPrice * Math.pow(1 + appreciation / 100, 10);
  const totalInvestment = (propertyPrice * downPayment) / 100 + emi * 12 * 10;
  const netGain = futureValue - totalInvestment;
  const roi = ((futureValue - propertyPrice) / propertyPrice) * 100;

  // Projection data
  const projectionData = Array.from({ length: 11 }, (_, i) => ({
    year: i,
    value: propertyPrice * Math.pow(1 + appreciation / 100, i),
    invested: (propertyPrice * downPayment) / 100 + emi * 12 * i,
  }));

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}k`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Investment Simulator
          </h3>
          <p className="text-sm text-muted-foreground">
            What if you bought this property?
          </p>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-foreground">Down Payment</label>
            <span className="text-sm font-semibold text-accent">
              {downPayment}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-foreground">Loan Tenure</label>
            <span className="text-sm font-semibold text-accent">
              {loanTenure} years
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-foreground">
              Annual Appreciation
            </label>
            <span className="text-sm font-semibold text-accent">
              {appreciation}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={appreciation}
            onChange={(e) => setAppreciation(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-secondary">
          <div className="text-xs text-muted-foreground mb-1">Monthly EMI</div>
          <div className="text-lg font-bold text-foreground">
            {formatCurrency(emi)}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-secondary">
          <div className="text-xs text-muted-foreground mb-1">Down Payment</div>
          <div className="text-lg font-bold text-foreground">
            {formatCurrency((propertyPrice * downPayment) / 100)}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-green-500/10">
          <div className="text-xs text-muted-foreground mb-1">
            10-Year Value
          </div>
          <div className="text-lg font-bold text-green-600">
            {formatCurrency(futureValue)}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-purple-500/10">
          <div className="text-xs text-muted-foreground mb-1">Net Gain</div>
          <div className="text-lg font-bold text-purple-600">
            {formatCurrency(netGain)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
              tickFormatter={(value) => `${(value / 10000000).toFixed(1)}Cr`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981" }}
              name="Property Value"
            />
            <Line
              type="monotone"
              dataKey="invested"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#8b5cf6" }}
              name="Amount Invested"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-sm text-foreground mb-1">
              Investment Summary (10 Years)
            </div>
            <div className="text-xs text-foreground/80 space-y-1">
              <div>
                • Total invested: {formatCurrency(totalInvestment)} (down +
                EMIs)
              </div>
              <div>• Property value: {formatCurrency(futureValue)}</div>
              <div className="text-accent font-semibold">
                • ROI: {roi.toFixed(1)}% ({formatCurrency(netGain)} profit)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button className="flex-1 gap-2">
          <Calendar className="h-4 w-4" /> Schedule Call
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <DollarSign className="h-4 w-4" /> Get Loan Quote
        </Button>
      </div>
    </div>
  );
};

export default InvestmentSimulator;
