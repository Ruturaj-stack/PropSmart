import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PriceHistoryChartProps {
  propertyId: string;
}

// Mock data generator - replace with real API later
const generateMockHistory = () => {
  const months = [
    "6mo ago",
    "5mo ago",
    "4mo ago",
    "3mo ago",
    "2mo ago",
    "1mo ago",
    "Now",
  ];
  const basePrice = 5000000;

  return months.map((month, i) => ({
    month,
    price: basePrice + (Math.random() - 0.3) * 500000 + i * 50000,
  }));
};

/**
 * Price History Chart Component
 * Shows property price trends over time
 */
const PriceHistoryChart = ({ propertyId }: PriceHistoryChartProps) => {
  const data = generateMockHistory();

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold text-lg text-card-foreground mb-4">
        📈 Price Trend (Last 6 Months)
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [
              `₹${(value / 100000).toFixed(2)}L`,
              "Price",
            ]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--accent))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--accent))", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">6 months ago</span>
        <span className="font-semibold text-green-600 dark:text-green-400">
          ↗{" "}
          {(
            ((data[data.length - 1].price - data[0].price) / data[0].price) *
            100
          ).toFixed(1)}
          % growth
        </span>
        <span className="text-muted-foreground">Today</span>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
