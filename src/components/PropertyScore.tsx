import {
  calculatePropertyScore,
  getScoreColor,
  getScoreLabel,
} from "@/services/propertyScoring";

interface PropertyScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

/**
 * Circular property score indicator (0-100)
 */
const PropertyScore = ({
  score,
  size = "md",
  showLabel = false,
}: PropertyScoreProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  // Calculate circle parameters
  const radius = size === "sm" ? 18 : size === "md" ? 26 : 38;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;

  const scoreColor = getScoreColor(score);
  const label = getScoreLabel(score);

  // Color for the circle stroke
  const strokeColor =
    score >= 75
      ? "#22c55e" // green
      : score >= 50
        ? "#eab308" // yellow
        : "#ef4444"; // red

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width="100%" height="100%">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-border"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={strokeColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>

        {/* Score number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${scoreColor} ${textSizes[size]}`}>
            {score}
          </span>
        </div>
      </div>

      {showLabel && (
        <span className={`text-xs font-medium ${scoreColor}`}>{label}</span>
      )}
    </div>
  );
};

export default PropertyScore;
