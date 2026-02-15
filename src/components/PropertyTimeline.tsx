import { useEffect, useState } from "react";
import { Eye, Heart, Clock } from "lucide-react";

interface PropertyTimelineProps {
  propertyId: string;
  listedDate: string;
}

/**
 * Property Timeline Component
 * Shows property statistics and activity
 */
const PropertyTimeline = ({
  propertyId,
  listedDate,
}: PropertyTimelineProps) => {
  const [stats, setStats] = useState({
    views: Math.floor(Math.random() * 500) + 100,
    saves: Math.floor(Math.random() * 50) + 10,
    daysOnMarket: Math.floor(
      (Date.now() - new Date(listedDate).getTime()) / (1000 * 60 * 60 * 24),
    ),
  });

  const [liveViewers] = useState(Math.floor(Math.random() * 5) + 1);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold text-lg text-card-foreground mb-4">
        📊 Property Activity
      </h3>

      <div className="space-y-4">
        {/* Live Viewers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="relative">
              <Eye className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <span className="text-sm">Live Viewers</span>
          </div>
          <span className="font-semibold text-foreground">{liveViewers}</span>
        </div>

        {/* Total Views */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-5 w-5" />
            <span className="text-sm">Total Views</span>
          </div>
          <span className="font-semibold text-foreground">
            {stats.views.toLocaleString()}
          </span>
        </div>

        {/* Saves */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-5 w-5" />
            <span className="text-sm">Times Saved</span>
          </div>
          <span className="font-semibold text-foreground">{stats.saves}</span>
        </div>

        {/* Days on Market */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Days on Market</span>
          </div>
          <span className="font-semibold text-foreground">
            {stats.daysOnMarket} days
          </span>
        </div>
      </div>

      {/* Activity Indicator */}
      <div className="mt-6 rounded-lg bg-secondary p-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">
            {stats.saves > 30 ? "High interest!" : "Active listing"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyTimeline;
