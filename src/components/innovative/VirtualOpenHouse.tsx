import { Video, Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const VirtualOpenHouse = ({ propertyId }: { propertyId: string }) => {
  const tours = [
    {
      date: "Feb 18, 2024",
      time: "10:00 AM",
      host: "Agent Priya",
      attendees: 8,
      duration: "45 min",
      status: "upcoming",
    },
    {
      date: "Feb 20, 2024",
      time: "3:00 PM",
      host: "Agent Rajesh",
      attendees: 12,
      duration: "45 min",
      status: "upcoming",
    },
    {
      date: "Feb 15, 2024",
      time: "11:00 AM",
      host: "Agent Priya",
      attendees: 15,
      duration: "45 min",
      status: "completed",
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Video className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Virtual Open Houses
          </h3>
          <p className="text-sm text-muted-foreground">
            Live video tours with Q&A
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {tours
          .filter((t) => t.status === "upcoming")
          .map((tour, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Video className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      Live Video Tour
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {tour.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {tour.time}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Host: {tour.host} • {tour.duration} duration
                    </div>
                  </div>
                </div>
                <Button className="gap-2">
                  <Video className="h-4 w-4" /> Join
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{tour.attendees} people registered</span>
              </div>
            </div>
          ))}

        <div className="mt-4">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Past Tours
          </h4>
          {tours
            .filter((t) => t.status === "completed")
            .map((tour, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-foreground">
                      {tour.date} at {tour.time}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      • {tour.attendees} attended
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Watch Recording
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-xs text-foreground">
          💡 <span className="font-medium">Interactive tours:</span> Ask
          questions live, see every room, and meet other interested buyers!
        </p>
      </div>
    </div>
  );
};

export default VirtualOpenHouse;
