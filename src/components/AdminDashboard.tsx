import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Home,
  DollarSign,
  Eye,
} from "lucide-react";

/**
 * Admin Analytics Dashboard
 * Overview of platform metrics and insights
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 156,
    totalUsers: 1248,
    totalViewsToday: 3421,
    totalReviews: 89,
    avgRating: 4.3,
    revenueThisMonth: 125000,
  });

  // Mock trending data
  const trendingProperties = [
    { id: "1", title: "Luxury Villa in Whitefield", views: 234, saves: 45 },
    { id: "2", title: "Modern Apartment Koramangala", views: 198, saves: 38 },
    { id: "3", title: "3 BHK in HSR Layout", views: 176, saves: 32 },
  ];

  const recentActivity = [
    {
      type: "review",
      user: "John Doe",
      property: "Luxury Villa",
      time: "5m ago",
    },
    {
      type: "save",
      user: "Jane Smith",
      property: "Modern Apartment",
      time: "12m ago",
    },
    {
      type: "view",
      user: "Mike Johnson",
      property: "3 BHK HSR",
      time: "18m ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Platform analytics and insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Properties */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                {stats.totalProperties}
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                +12% from last month
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                +8% from last month
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Views Today */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Views Today</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                {stats.totalViewsToday.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                +15% from yesterday
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Avg Rating */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                {stats.avgRating.toFixed(1)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                From {stats.totalReviews} reviews
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-950">
              <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                ₹{(stats.revenueThisMonth / 1000).toFixed(0)}K
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                +22% from last month
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
              <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Growth */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">User Growth</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                +24%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Properties */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-lg text-card-foreground mb-4">
          🔥 Trending Properties
        </h3>
        <div className="space-y-3">
          {trendingProperties.map((prop, index) => (
            <div
              key={prop.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-accent">#{index + 1}</span>
                <span className="font-medium text-foreground">
                  {prop.title}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {prop.views}
                </span>
                <span>💾 {prop.saves}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-lg text-card-foreground mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  activity.type === "review"
                    ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                    : activity.type === "save"
                      ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                }`}
              >
                {activity.type}
              </span>
              <span className="text-foreground">{activity.user}</span>
              <span className="text-muted-foreground">
                → {activity.property}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
