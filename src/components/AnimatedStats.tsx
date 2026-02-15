import { useEffect, useState } from "react";
import CountUp from "react-countup";

interface AnimatedStatsProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  duration?: number;
}

/**
 * Animated Number Counter Component
 * Counts from 0 to target number with smooth animation
 */
const AnimatedStats = ({
  end,
  label,
  suffix = "",
  prefix = "",
  icon,
  duration = 2.5,
}: AnimatedStatsProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <div className="text-center p-6 rounded-xl border border-border bg-card hover:shadow-elevated transition-shadow">
      {icon && (
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          {icon}
        </div>
      )}
      <div className="font-display text-4xl font-bold text-foreground">
        {hasAnimated && (
          <CountUp
            start={0}
            end={end}
            duration={duration}
            separator=","
            prefix={prefix}
            suffix={suffix}
            enableScrollSpy
            scrollSpyOnce
          />
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default AnimatedStats;
