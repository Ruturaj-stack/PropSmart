import { Volume2, AlertTriangle, CheckCircle } from "lucide-react";

interface NoisePollutionMapProps {
  location: string;
}

/**
 * Noise Pollution Visualization
 * Heat map showing noise levels in the area
 */
const NoisePollutionMap = ({ location }: NoisePollutionMapProps) => {
  // Mock noise data
  const noiseZones = [
    { name: "Property Area", level: 45, status: "quiet" },
    { name: "Main Road (200m)", level: 68, status: "moderate" },
    { name: "Highway (500m)", level: 75, status: "noisy" },
    { name: "Airport Flight Path", level: 52, status: "moderate" },
  ];

  const timeOfDayNoise = [
    { time: "6 AM", level: 35 },
    { time: "9 AM", level: 58 },
    { time: "12 PM", level: 62 },
    { time: "3 PM", level: 60 },
    { time: "6 PM", level: 70 },
    { time: "9 PM", level: 48 },
    { time: "12 AM", level: 30 },
  ];

  const getNoiseColor = (level: number) => {
    if (level < 50) return "bg-green-500";
    if (level < 65) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getNoiseLabel = (level: number) => {
    if (level < 50) return "Quiet";
    if (level < 65) return "Moderate";
    return "Noisy";
  };

  const getNoiseIcon = (level: number) => {
    if (level < 50) return CheckCircle;
    if (level < 65) return AlertTriangle;
    return Volume2;
  };

  const avgDaytimeNoise = 58;
  const avgNighttimeNoise = 35;
  const quietHoursPercentage = 70;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Volume2 className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Noise Pollution Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Sound level monitoring around this property
          </p>
        </div>
      </div>

      {/* Heat Map Visualization */}
      <div className="relative h-64 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden mb-6">
        {/* Mock map background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 15px),
                             repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 15px)`,
            }}
          />
        </div>

        {/* Property marker (center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="h-12 w-12 rounded-full bg-green-500 opacity-70 animate-ping absolute" />
          <div className="relative h-10 w-10 rounded-full bg-green-600 border-4 border-white shadow-lg flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-lg">
            45 dB - Quiet
          </div>
        </div>

        {/* Noise zones */}
        {[
          {
            top: "20%",
            left: "30%",
            size: 80,
            color: "bg-yellow-400/40",
            label: "68 dB",
          },
          {
            top: "15%",
            left: "70%",
            size: 100,
            color: "bg-red-400/40",
            label: "75 dB",
          },
          {
            top: "70%",
            left: "60%",
            size: 70,
            color: "bg-yellow-400/30",
            label: "52 dB",
          },
        ].map((zone, index) => (
          <div
            key={index}
            className={`absolute rounded-full ${zone.color} blur-sm`}
            style={{
              top: zone.top,
              left: zone.left,
              width: `${zone.size}px`,
              height: `${zone.size}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 dark:text-gray-200">
              {zone.label}
            </span>
          </div>
        ))}
      </div>

      {/* Noise Sources */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Noise Sources Nearby
        </h4>
        <div className="space-y-2">
          {noiseZones.map((zone, index) => {
            const Icon = getNoiseIcon(zone.level);
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
              >
                <div
                  className={`h-10 w-10 rounded-full ${getNoiseColor(zone.level)} flex items-center justify-center`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">
                    {zone.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getNoiseLabel(zone.level)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    {zone.level}
                  </div>
                  <div className="text-xs text-muted-foreground">dB</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time of Day Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Noise Levels Throughout Day
        </h4>
        <div className="flex items-end justify-between gap-2 h-32">
          {timeOfDayNoise.map((data, index) => {
            const height = (data.level / 80) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="relative w-full bg-secondary rounded-t-lg"
                  style={{ height: `${height}%` }}
                >
                  <div
                    className={`absolute inset-0 rounded-t-lg ${getNoiseColor(data.level)} opacity-70`}
                    style={{ height: "100%" }}
                  />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground">
                    {data.level}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {data.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-lg bg-secondary text-center">
          <div className="text-xs text-muted-foreground">Daytime Avg</div>
          <div className="text-xl font-bold text-foreground mt-1">
            {avgDaytimeNoise} dB
          </div>
        </div>
        <div className="p-3 rounded-lg bg-secondary text-center">
          <div className="text-xs text-muted-foreground">Nighttime Avg</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
            {avgNighttimeNoise} dB
          </div>
        </div>
        <div className="p-3 rounded-lg bg-secondary text-center">
          <div className="text-xs text-muted-foreground">Quiet Hours</div>
          <div className="text-xl font-bold text-accent mt-1">
            {quietHoursPercentage}%
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <p className="text-xs text-foreground">
          ✅ <span className="font-medium">Good for living:</span> This area
          maintains comfortable noise levels with 70% quiet hours. Peak noise
          during rush hours (6-7 PM).
        </p>
      </div>
    </div>
  );
};

export default NoisePollutionMap;
