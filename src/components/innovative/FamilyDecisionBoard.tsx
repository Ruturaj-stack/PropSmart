import { useState } from "react";
import { Users, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const FamilyDecisionBoard = ({ propertyId }: { propertyId: string }) => {
  const [members] = useState([
    { name: "You", priority: "Commute", vote: "yes", weight: 8 },
    { name: "Spouse", priority: "Schools", vote: "yes", weight: 9 },
    { name: "Parent", priority: "Safety", vote: "neutral", weight: 7 },
  ]);

  const proscons = [
    { type: "pro", text: "Excellent schools nearby", addedBy: "Spouse" },
    { type: "pro", text: "Short commute to office", addedBy: "You" },
    { type: "con", text: "Higher than budget", addedBy: "Parent" },
  ];

  const overallScore =
    (members.reduce((sum, m) => (m.vote === "yes" ? sum + m.weight : sum), 0) /
      members.reduce((sum, m) => sum + m.weight, 0)) *
    100;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Family Decision Board
            </h3>
            <p className="text-sm text-muted-foreground">
              Collaborative decision making
            </p>
          </div>
        </div>
        <div className="text-right">
          <div
            className={`text-2xl font-bold ${overallScore >= 70 ? "text-green-600" : "text-yellow-600"}`}
          >
            {overallScore.toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">Family Score</div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {members.map((member, i) => (
          <div key={i} className="p-3 rounded-lg bg-secondary">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium text-foreground">{member.name}</div>
                <div className="text-xs text-muted-foreground">
                  Priority: {member.priority}
                </div>
              </div>
              <div className="flex gap-2">
                <ThumbsUp
                  className={`h-5 w-5 ${member.vote === "yes" ? "text-green-600 fill-current" : "text-muted-foreground"}`}
                />
                <ThumbsDown
                  className={`h-5 w-5 ${member.vote === "no" ? "text-red-600 fill-current" : "text-muted-foreground"}`}
                />
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Weightage: {member.weight}/10
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-medium text-foreground">Pros & Cons</h4>
        {proscons.map((item, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${item.type === "pro" ? "bg-green-500/10" : "bg-red-500/10"}`}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm">
                {item.type === "pro" ? "✅" : "⚠️"}
              </span>
              <div className="flex-1">
                <div className="text-sm text-foreground">{item.text}</div>
                <div className="text-xs text-muted-foreground">
                  by {item.addedBy}
                </div>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full gap-2">
          <MessageSquare className="h-4 w-4" /> Add Comment
        </Button>
      </div>
    </div>
  );
};

export default FamilyDecisionBoard;
