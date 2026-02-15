import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Property } from "@/data/properties";

interface ComparisonRadarChartProps {
  properties: Property[];
}

/**
 * Radar Chart for Property Comparison
 * Visual comparison across multiple dimensions
 */
const ComparisonRadarChart = ({ properties }: ComparisonRadarChartProps) => {
  if (properties.length === 0) return null;

  // Normalize properties to 0-100 scale for comparison
  const normalizePrice = (price: number) =>
    Math.min(100, (price / 200000) * 10);
  const normalizeArea = (area: number) => Math.min(100, area / 30);

  const data = [
    {
      dimension: "Price",
      ...Object.fromEntries(
        properties.map((p, i) => [
          `Property${i + 1}`,
          100 - normalizePrice(p.price), // Inverse for price (lower is better)
        ]),
      ),
    },
    {
      dimension: "Size",
      ...Object.fromEntries(
        properties.map((p, i) => [`Property${i + 1}`, normalizeArea(p.area)]),
      ),
    },
    {
      dimension: "Bedrooms",
      ...Object.fromEntries(
        properties.map((p, i) => [`Property${i + 1}`, (p.bedrooms / 5) * 100]),
      ),
    },
    {
      dimension: "Amenities",
      ...Object.fromEntries(
        properties.map((p, i) => [
          `Property${i + 1}`,
          (p.amenities.length / 15) * 100,
        ]),
      ),
    },
    {
      dimension: "Bathrooms",
      ...Object.fromEntries(
        properties.map((p, i) => [`Property${i + 1}`, (p.bathrooms / 4) * 100]),
      ),
    },
  ];

  const colors = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold text-lg text-card-foreground mb-4">
        📊 Visual Comparison
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="dimension"
            stroke="hsl(var(--foreground))"
            style={{ fontSize: "12px" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            stroke="hsl(var(--muted-foreground))"
          />
          {properties.map((p, i) => (
            <Radar
              key={p.id}
              name={p.title.substring(0, 20) + "..."}
              dataKey={`Property${i + 1}`}
              stroke={colors[i]}
              fill={colors[i]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        Larger area = better value in that dimension
      </p>
    </div>
  );
};

export default ComparisonRadarChart;
