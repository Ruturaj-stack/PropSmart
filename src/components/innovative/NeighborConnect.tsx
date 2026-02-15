import { useState } from "react";
import { Users, MessageCircle, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const NeighborConnect = ({ location }: { location: string }) => {
  const residents = [
    {
      name: "Priya Sharma",
      bio: "Tech professional, dog lover",
      interests: ["Yoga", "Hiking"],
      years: 3,
      avatar: "👩",
    },
    {
      name: "Rajesh Kumar",
      bio: "Architect, foodie",
      interests: ["Cooking", "Art"],
      years: 5,
      avatar: "👨",
    },
    {
      name: "Anita Patel",
      bio: "Teacher, book club organizer",
      interests: ["Reading", "Gardening"],
      years: 2,
      avatar: "👩‍🦱",
    },
  ];

  const events = [
    { title: "Community Yoga", date: "Every Sunday 7 AM", attendees: 12 },
    { title: "Book Club", date: "Feb 20, 5 PM", attendees: 8 },
    { title: "Kids Playdate", date: "Feb 22, 4 PM", attendees: 15 },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Neighbor Connect
          </h3>
          <p className="text-sm text-muted-foreground">
            Meet your future community
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-foreground">
          Active Residents
        </h4>
        {residents.map((resident, i) => (
          <div key={i} className="p-4 rounded-lg bg-secondary">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{resident.avatar}</div>
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {resident.name}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {resident.bio}
                </div>
                <div className="flex gap-2 mb-2">
                  {resident.interests.map((interest, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Living here for {resident.years} years
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" /> Ask
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Upcoming Events
        </h4>
        <div className="space-y-2">
          {events.map((event, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary"
            >
              <div>
                <div className="font-medium text-sm text-foreground">
                  {event.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.date}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {event.attendees} attending
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeighborConnect;
