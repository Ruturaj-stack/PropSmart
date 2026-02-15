import { useEffect, useState } from "react";
import { Trophy, Star, Target, Zap } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

/**
 * Gamification Component
 * Shows user achievements, streaks, and progress
 */
const GamificationPanel = () => {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("property_hunt_streak");
    return saved ? JSON.parse(saved) : { count: 0, lastVisit: null };
  });

  const [level, setLevel] = useState(() => {
    const activityCount = parseInt(
      localStorage.getItem("total_property_views") || "0",
    );
    if (activityCount >= 100) return { level: 4, name: "Pro Hunter" };
    if (activityCount >= 50) return { level: 3, name: "Expert" };
    if (activityCount >= 20) return { level: 2, name: "Hunter" };
    return { level: 1, name: "Browser" };
  });

  const achievements: Achievement[] = [
    {
      id: "first_save",
      title: "First Save",
      description: "Save your first property",
      icon: <Star className="h-5 w-5" />,
      unlocked: (localStorage.getItem("saved_properties_count") || "0") !== "0",
    },
    {
      id: "comparison_pro",
      title: "Comparison Pro",
      description: "Compare 4 properties",
      icon: <Target className="h-5 w-5" />,
      unlocked: (localStorage.getItem("has_compared") || "false") === "true",
    },
    {
      id: "deal_hunter",
      title: "Deal Hunter",
      description: "Set up your first alert",
      icon: <Zap className="h-5 w-5" />,
      unlocked: (localStorage.getItem("has_alert") || "false") === "true",
    },
    {
      id: "week_streak",
      title: "7-Day Streak",
      description: "Visit 7 days in a row",
      icon: <Trophy className="h-5 w-5" />,
      unlocked: streak.count >= 7,
      progress: Math.min(streak.count, 7),
      total: 7,
    },
  ];

  // Update streak
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = streak.lastVisit;

    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const newStreak =
        lastVisit === yesterday.toDateString()
          ? { count: streak.count + 1, lastVisit: today }
          : { count: 1, lastVisit: today };

      setStreak(newStreak);
      localStorage.setItem("property_hunt_streak", JSON.stringify(newStreak));
    }
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold text-lg text-card-foreground mb-4">
        🎮 Your Progress
      </h3>

      {/* Level & Streak */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900 p-4 text-center">
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            Level {level.level}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            {level.name}
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950 dark:to-orange-900 p-4 text-center">
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
            {streak.count} 🔥
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
            Day Streak
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">
          Achievements
        </h4>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
              achievement.unlocked
                ? "bg-accent/10 border border-accent/20"
                : "bg-secondary opacity-60"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                achievement.unlocked
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {achievement.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-foreground">
                {achievement.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {achievement.description}
              </div>
              {achievement.progress !== undefined && (
                <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{
                      width: `${(achievement.progress / (achievement.total || 1)) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
            {achievement.unlocked && (
              <Trophy className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamificationPanel;
