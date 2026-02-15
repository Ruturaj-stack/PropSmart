import { GraduationCap, TrendingUp, Users, Award, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface SchoolPerformanceDashboardProps {
  location: string;
}

/**
 * School Performance Dashboard
 * Detailed educational insights for families
 */
const SchoolPerformanceDashboard = ({
  location,
}: SchoolPerformanceDashboardProps) => {
  const schools = [
    {
      name: "Greenwood International School",
      type: "CBSE",
      distance: "0.5 km",
      rating: 4.5,
      studentTeacherRatio: "15:1",
      collegeAdmission: 92,
      fees: "₹2.5L/year",
      trend: "up",
    },
    {
      name: "Delhi Public School",
      type: "CBSE",
      distance: "1.2 km",
      rating: 4.8,
      studentTeacherRatio: "12:1",
      collegeAdmission: 95,
      fees: "₹3.2L/year",
      trend: "up",
    },
    {
      name: "St. Mary's High School",
      type: "ICSE",
      distance: "2.1 km",
      rating: 4.3,
      studentTeacherRatio: "18:1",
      collegeAdmission: 88,
      fees: "₹1.8L/year",
      trend: "stable",
    },
  ];

  // Performance trend data
  const performanceTrend = [
    { year: "2019", score: 82 },
    { year: "2020", score: 85 },
    { year: "2021", score: 87 },
    { year: "2022", score: 89 },
    { year: "2023", score: 92 },
  ];

  const extracurriculars = [
    { activity: "Sports", schools: 3 },
    { activity: "Music", schools: 3 },
    { activity: "Arts", schools: 2 },
    { activity: "Robotics", schools: 2 },
    { activity: "Debate", schools: 3 },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            School Performance Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Educational insights for {location}
          </p>
        </div>
      </div>

      {/* Performance Trend Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          District Performance Trend
        </h4>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={performanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
              domain={[75, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* School Cards */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-foreground">Nearby Schools</h4>
        {schools.map((school, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-secondary border border-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="font-medium text-foreground mb-1">
                  {school.name}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {school.distance}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                    {school.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-bold text-foreground">
                  {school.rating}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 rounded bg-background">
                <div className="text-xs text-muted-foreground mb-1">
                  Student:Teacher
                </div>
                <div className="font-semibold text-sm text-foreground">
                  {school.studentTeacherRatio}
                </div>
              </div>
              <div className="p-2 rounded bg-background">
                <div className="text-xs text-muted-foreground mb-1">
                  College Rate
                </div>
                <div className="font-semibold text-sm text-green-600 dark:text-green-400">
                  {school.collegeAdmission}%
                </div>
              </div>
              <div className="p-2 rounded bg-background">
                <div className="text-xs text-muted-foreground mb-1">
                  Annual Fees
                </div>
                <div className="font-semibold text-sm text-foreground">
                  {school.fees}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              {school.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <span className="h-4 w-4 text-muted-foreground">→</span>
              )}
              <span className="text-xs text-muted-foreground">
                {school.trend === "up"
                  ? "Improving performance"
                  : "Stable performance"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Extracurricular Activities */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Award className="h-4 w-4" />
          Extracurricular Activities
        </h4>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={extracurriculars}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="activity"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "11px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="schools"
              fill="hsl(var(--accent))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground">
            <span className="font-medium">Excellent for families:</span> This
            area has {schools.length} highly-rated schools within 2.5km, with
            strong academic performance and diverse extracurricular programs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolPerformanceDashboard;
