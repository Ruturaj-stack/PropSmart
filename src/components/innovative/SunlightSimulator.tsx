import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sun, Cloud, Sunset, Snowflake } from "lucide-react";

interface SunlightSimulatorProps {
  propertyId: string;
}

/**
 * Sunlight & Shadow Simulation
 * Shows sunlight patterns throughout the day and seasons
 */
const SunlightSimulator = ({ propertyId }: SunlightSimulatorProps) => {
  const [timeOfDay, setTimeOfDay] = useState(12); // Hour (0-24)
  const [season, setSeason] = useState<"summer" | "winter">("summer");

  // Mock data for different rooms
  const rooms = [
    { name: "Living Room", direction: "South", sunHours: 6 },
    { name: "Master Bedroom", direction: "East", sunHours: 4 },
    { name: "Kitchen", direction: "West", sunHours: 5 },
    { name: "Balcony", direction: "South", sunHours: 8 },
  ];

  // Calculate sunlight intensity based on time and season
  const getSunlightIntensity = (hour: number, roomDirection: string) => {
    const seasonFactor = season === "summer" ? 1.2 : 0.8;

    // Peak sun at noon
    const timeFactor = 1 - Math.abs(hour - 12) / 12;

    // Direction factor
    let directionFactor = 0.5;
    if (hour >= 6 && hour <= 10 && roomDirection === "East")
      directionFactor = 1;
    if (
      hour >= 11 &&
      hour <= 15 &&
      (roomDirection === "South" || roomDirection === "North")
    )
      directionFactor = 1;
    if (hour >= 16 && hour <= 19 && roomDirection === "West")
      directionFactor = 1;

    return Math.max(
      0,
      Math.min(100, timeFactor * directionFactor * seasonFactor * 100),
    );
  };

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const getBestVisitTime = () => {
    // Calculate best time based on max sunlight across all rooms
    let bestHour = 12;
    let maxLight = 0;

    for (let h = 6; h <= 20; h++) {
      const totalLight = rooms.reduce(
        (sum, room) => sum + getSunlightIntensity(h, room.direction),
        0,
      );
      if (totalLight > maxLight) {
        maxLight = totalLight;
        bestHour = h;
      }
    }

    return formatTime(bestHour);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sun className="h-5 w-5 text-yellow-500" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Sunlight Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            See how natural light enters throughout the day
          </p>
        </div>
      </div>

      {/* Time of Day Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground">
            Time of Day
          </label>
          <span className="text-sm font-semibold text-accent">
            {formatTime(timeOfDay)}
          </span>
        </div>
        <Slider
          value={[timeOfDay]}
          onValueChange={(value) => setTimeOfDay(value[0])}
          min={6}
          max={20}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Sunset className="h-3 w-3" /> 6 AM
          </span>
          <span className="flex items-center gap-1">
            <Sun className="h-3 w-3" /> Noon
          </span>
          <span className="flex items-center gap-1">
            <Cloud className="h-3 w-3" /> 8 PM
          </span>
        </div>
      </div>

      {/* Season Toggle */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Season
        </label>
        <div className="flex gap-2">
          <Button
            variant={season === "summer" ? "default" : "outline"}
            onClick={() => setSeason("summer")}
            className="flex-1 gap-2"
          >
            <Sun className="h-4 w-4" />
            Summer
          </Button>
          <Button
            variant={season === "winter" ? "default" : "outline"}
            onClick={() => setSeason("winter")}
            className="flex-1 gap-2"
          >
            <Snowflake className="h-4 w-4" />
            Winter
          </Button>
        </div>
      </div>

      {/* Visual Simulation */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-b from-blue-100 to-yellow-50 dark:from-blue-950 dark:to-yellow-950 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-4">
            <div className="inline-block">
              <Sun
                className="h-16 w-16 text-yellow-400 drop-shadow-lg"
                style={{
                  transform: `rotate(${(timeOfDay - 6) * 15}deg)`,
                  opacity: getSunlightIntensity(timeOfDay, "South") / 100,
                }}
              />
            </div>
          </div>

          {/* Simple house visualization */}
          <div className="flex justify-center items-end gap-2">
            <div className="w-24 h-24 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-t-lg relative">
              <div
                className="absolute top-3 left-3 w-6 h-6 bg-blue-200/50 dark:bg-blue-400/30 rounded"
                style={{
                  opacity: getSunlightIntensity(timeOfDay, "East") / 100,
                }}
              />
              <div
                className="absolute top-3 right-3 w-6 h-6 bg-blue-200/50 dark:bg-blue-400/30 rounded"
                style={{
                  opacity: getSunlightIntensity(timeOfDay, "West") / 100,
                }}
              />
            </div>
          </div>
        </div>

        {/* Sunlight rays effect */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-yellow-200/30 to-transparent pointer-events-none"
          style={{ opacity: getSunlightIntensity(timeOfDay, "South") / 100 }}
        />
      </div>

      {/* Room-by-Room Analysis */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-foreground">Room Analysis</h4>
        {rooms.map((room) => {
          const intensity = getSunlightIntensity(timeOfDay, room.direction);
          return (
            <div key={room.name} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{room.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {room.direction}-facing
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${intensity}%` }}
                  />
                </div>
              </div>
              <div className="text-xs font-medium text-muted-foreground w-12 text-right">
                {Math.round(intensity)}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Sunlight Hours */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-secondary">
          <div className="text-xs text-muted-foreground">
            Avg. Sunlight Hours
          </div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {season === "summer" ? "6.5" : "4.8"} hrs
          </div>
        </div>
        <div className="p-3 rounded-lg bg-secondary">
          <div className="text-xs text-muted-foreground">Best Visit Time</div>
          <div className="text-2xl font-bold text-accent mt-1">
            {getBestVisitTime()}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <p className="text-xs text-foreground">
          ✨ <span className="font-medium">Recommendation:</span> Visit this
          property around {getBestVisitTime()} to experience maximum natural
          light in all rooms!
        </p>
      </div>
    </div>
  );
};

export default SunlightSimulator;
