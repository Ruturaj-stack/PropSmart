import {
  MessageCircle,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
} from "lucide-react";

interface NeighborhoodSentimentProps {
  location: string;
}

/**
 * Neighborhood Sentiment Analysis
 * AI scrapes social media and forums for community opinions
 */
const NeighborhoodSentiment = ({ location }: NeighborhoodSentimentProps) => {
  // Mock sentiment data
  const sentimentScore = 78; // Overall positive sentiment

  const topicSentiments = [
    { topic: "Safety & Security", score: 85, trend: "up", mentions: 142 },
    { topic: "Schools & Education", score: 82, trend: "up", mentions: 98 },
    { topic: "Transportation", score: 74, trend: "stable", mentions: 156 },
    { topic: "Cleanliness", score: 68, trend: "down", mentions: 89 },
    { topic: "Amenities", score: 79, trend: "up", mentions: 112 },
  ];

  const recentMentions = [
    {
      text: "Love the new park! Great for morning walks 🌳",
      sentiment: "positive",
      source: "Reddit",
      time: "2h ago",
    },
    {
      text: "Metro connectivity has improved a lot recently",
      sentiment: "positive",
      source: "Twitter",
      time: "5h ago",
    },
    {
      text: "Street cleaning could be more frequent",
      sentiment: "negative",
      source: "Facebook",
      time: "1d ago",
    },
    {
      text: "Excellent schools in the vicinity",
      sentiment: "positive",
      source: "Reddit",
      time: "2d ago",
    },
  ];

  const trendingKeywords = [
    { word: "Safe", count: 234, sentiment: "positive" },
    { word: "Peaceful", count: 189, sentiment: "positive" },
    { word: "Convenient", count: 156, sentiment: "positive" },
    { word: "Expensive", count: 87, sentiment: "negative" },
    { word: "Crowded", count: 65, sentiment: "negative" },
  ];

  const getSentimentColor = (score: number) => {
    if (score >= 75) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "📈";
    if (trend === "down") return "📉";
    return "➡️";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-accent" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Community Sentiment
            </h3>
            <p className="text-sm text-muted-foreground">
              What people are saying about {location}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-2xl font-bold ${getSentimentColor(sentimentScore)}`}
          >
            {sentimentScore}%
          </div>
          <div className="text-xs text-muted-foreground">Positive</div>
        </div>
      </div>

      {/* Overall Sentiment Gauge */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Overall Sentiment
          </span>
          <span className="text-sm text-muted-foreground">
            {sentimentScore >= 75
              ? "😊 Very Positive"
              : sentimentScore >= 50
                ? "😐 Mixed"
                : "😞 Negative"}
          </span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-green-500"
              style={{ width: `${sentimentScore}%` }}
            />
            <div
              className="bg-red-500"
              style={{ width: `${100 - sentimentScore}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" /> {sentimentScore}% Positive
          </span>
          <span className="flex items-center gap-1">
            <ThumbsDown className="h-3 w-3" /> {100 - sentimentScore}% Negative
          </span>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Topic Analysis
        </h4>
        <div className="space-y-3">
          {topicSentiments.map((topic, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{topic.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {topic.mentions} mentions
                    </span>
                    <span className="text-sm">{getTrendIcon(topic.trend)}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-green-500 transition-all"
                    style={{ width: `${topic.score}%` }}
                  />
                </div>
              </div>
              <div
                className={`text-sm font-bold ${getSentimentColor(topic.score)} w-12 text-right`}
              >
                {topic.score}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Keywords */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Trending Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {trendingKeywords.map((keyword, index) => (
            <div
              key={index}
              className={`px-3 py-1.5 rounded-full text-sm ${
                keyword.sentiment === "positive"
                  ? "bg-green-500/20 text-green-700 dark:text-green-300"
                  : "bg-red-500/20 text-red-700 dark:text-red-300"
              }`}
            >
              {keyword.word} ({keyword.count})
            </div>
          ))}
        </div>
      </div>

      {/* Recent Mentions */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Recent Mentions
        </h4>
        <div className="space-y-2">
          {recentMentions.map((mention, index) => (
            <div key={index} className="p-3 rounded-lg bg-secondary">
              <div className="flex items-start gap-2 mb-2">
                {mention.sentiment === "positive" ? (
                  <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <ThumbsDown className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm text-foreground flex-1">{mention.text}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground ml-6">
                <span>{mention.source}</span>
                <span>•</span>
                <span>{mention.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Data aggregated from Reddit, Twitter, Facebook groups, local forums,
            and review sites. Last updated: 2 hours ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodSentiment;
