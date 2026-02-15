import { Trophy, Target, Award, Star, TrendingUp } from "lucide-react";

const PropertyQuestSystem = () => {
  const quests = [
    {
      title: "Property Explorer",
      description: "View 10 property details",
      progress: 7,
      total: 10,
      reward: "50 XP + Explorer Badge",
      status: "active",
    },
    {
      title: "Neighborhood Scout",
      description: "Research 5 different neighborhoods",
      progress: 3,
      total: 5,
      reward: "75 XP + Scout Badge",
      status: "active",
    },
    {
      title: "Smart Saver",
      description: "Save 15 properties to favorites",
      progress: 15,
      total: 15,
      reward: "100 XP + Saver Badge",
      status: "completed",
    },
  ];

  const achievements = [
    { name: "First-Time Viewer", icon: "👁️", unlocked: true },
    { name: "Comparison Expert", icon: "⚖️", unlocked: true },
    { name: "Early Bird", icon: "🌅", unlocked: false },
    { name: "Deal Hunter", icon: "🎯", unlocked: true },
  ];

  const userLevel = 5;
  const userXP = 450;
  const nextLevelXP = 500;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Quest System
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete challenges, earn rewards
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            Level {userLevel}
          </div>
          <div className="text-xs text-muted-foreground">
            {userXP}/{nextLevelXP} XP
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-6">
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-purple-600 transition-all"
            style={{ width: `${(userXP / nextLevelXP) * 100}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {nextLevelXP - userXP} XP to Level {userLevel + 1}
        </div>
      </div>

      {/* Active Quests */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Target className="h-4 w-4" /> Active Quests
        </h4>
        {quests.map((quest, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg ${
              quest.status === "completed"
                ? "bg-green-500/10 border border-green-500/20"
                : "bg-secondary"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="font-medium text-foreground flex items-center gap-2">
                  {quest.title}
                  {quest.status === "completed" && (
                    <Award className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {quest.description}
                </div>
              </div>
              <div className="text-sm font-semibold text-accent">
                {quest.progress}/{quest.total}
              </div>
            </div>
            <div className="h-2 rounded-full bg-secondary-foreground/10 overflow-hidden mb-2">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${(quest.progress / quest.total) * 100}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Reward: {quest.reward}
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Star className="h-4 w-4" /> Achievements (
          {achievements.filter((a) => a.unlocked).length}/{achievements.length})
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-center ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                  : "bg-secondary opacity-50"
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="text-xs font-medium text-foreground">
                {achievement.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground">
            Keep completing quests to unlock exclusive features, priority
            alerts, and expert consultations!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyQuestSystem;
