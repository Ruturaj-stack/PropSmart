import { useState } from "react";
import {
  MapPin,
  Car,
  Train,
  Bike,
  FootprintsIcon,
  Plus,
  X,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Destination {
  id: string;
  name: string;
  address: string;
}

interface CommuteMapsProps {
  propertyLocation: string;
}

/**
 * Commute Time Isochrone Maps
 * Visual "bubble" showing reachable areas within time limits
 */
const CommuteMaps = ({ propertyLocation }: CommuteMapsProps) => {
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: "1", name: "My Office", address: "MG Road, Bangalore" },
  ]);
  const [timeRange, setTimeRange] = useState(30); // minutes
  const [transportMode, setTransportMode] = useState<
    "car" | "metro" | "bike" | "walk"
  >("car");
  const [newDestination, setNewDestination] = useState("");

  const transportModes = [
    { id: "car" as const, name: "Car", icon: Car, color: "blue" },
    { id: "metro" as const, name: "Metro", icon: Train, color: "purple" },
    { id: "bike" as const, name: "Bike", icon: Bike, color: "green" },
    {
      id: "walk" as const,
      name: "Walk",
      icon: FootprintsIcon,
      color: "orange",
    },
  ];

  // Mock distances based on transport mode
  const getReachableRadius = () => {
    const baseSpeed = {
      car: 25, // km/h in traffic
      metro: 35,
      bike: 15,
      walk: 5,
    };
    return (baseSpeed[transportMode] * timeRange) / 60; // Convert to km
  };

  const addDestination = () => {
    if (!newDestination.trim()) return;
    setDestinations([
      ...destinations,
      { id: Date.now().toString(), name: newDestination, address: "Bangalore" },
    ]);
    setNewDestination("");
  };

  const removeDestination = (id: string) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Commute Time Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            See how far you can travel in different time limits
          </p>
        </div>
      </div>

      {/* Transport Mode Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Transportation Mode
        </label>
        <div className="grid grid-cols-4 gap-2">
          {transportModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setTransportMode(mode.id)}
                className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  transportMode === mode.id
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${transportMode === mode.id ? "text-accent" : "text-muted-foreground"}`}
                />
                <span className="text-xs font-medium">{mode.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Range Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground">
            Maximum Commute Time
          </label>
          <span className="text-sm font-semibold text-accent">
            {timeRange} min
          </span>
        </div>
        <Slider
          value={[timeRange]}
          onValueChange={(value) => setTimeRange(value[0])}
          min={15}
          max={60}
          step={15}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>15 min</span>
          <span>30 min</span>
          <span>45 min</span>
          <span>60 min</span>
        </div>
      </div>

      {/* Destinations */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Your Destinations
        </label>

        {/* Add Destination */}
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Add destination (e.g., Office, Gym, School)"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addDestination()}
          />
          <Button onClick={addDestination} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Destination List */}
        <div className="space-y-2">
          {destinations.map((dest, index) => (
            <div
              key={dest.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
            >
              <div
                className={`h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-foreground">
                  {dest.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {dest.address}
                </div>
              </div>
              <button
                onClick={() => removeDestination(dest.id)}
                className="text-muted-foreground hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative h-80 rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 overflow-hidden mb-4">
        {/* Mock map background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px),
                             repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px)`,
            }}
          />
        </div>

        {/* Property marker (center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            <MapPin
              className="h-10 w-10 text-red-500 drop-shadow-lg"
              fill="currentColor"
            />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-lg">
              Property
            </div>
          </div>
        </div>

        {/* Isochrone circles */}
        {[15, 30, 45].map((time, index) => {
          if (time > timeRange) return null;
          const radius = (time / timeRange) * 150; // Scale based on max time
          const opacity = 0.3 - index * 0.08;

          return (
            <div
              key={time}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent animate-pulse"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                backgroundColor: `rgba(var(--accent-rgb, 139, 92, 246), ${opacity})`,
                animationDuration: `${2 + index}s`,
              }}
            >
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-medium text-accent">
                {time} min
              </span>
            </div>
          );
        })}

        {/* Destination markers */}
        {destinations.map((dest, index) => {
          const angle = (360 / destinations.length) * index;
          const distance = 100; // pixels from center
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;

          return (
            <div
              key={dest.id}
              className="absolute z-10"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center font-semibold text-sm shadow-lg">
                  {index + 1}
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-lg max-w-32 truncate">
                  {dest.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-lg bg-secondary text-center">
          <div className="text-xs text-muted-foreground">Reachable Radius</div>
          <div className="text-lg font-bold text-accent mt-1">
            {getReachableRadius().toFixed(1)} km
          </div>
        </div>
        <div className="p-3 rounded-lg bg-secondary text-center">
          <div className="text-xs text-muted-foreground">Mode</div>
          <div className="text-lg font-bold text-foreground mt-1 capitalize">
            {transportMode}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-secondary text-center">
          <div className="text-xs text-muted-foreground">Destinations</div>
          <div className="text-lg font-bold text-foreground mt-1">
            {destinations.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuteMaps;
