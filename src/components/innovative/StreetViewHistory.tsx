import { useState } from "react";
import { Clock, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface StreetViewHistoryProps {
  location: string;
}

/**
 * Street View Time Machine
 * Shows neighborhood evolution over years
 */
const StreetViewHistory = ({ location }: StreetViewHistoryProps) => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [sliderPosition, setSliderPosition] = useState(50);

  // Mock historical data
  const years = [2015, 2017, 2019, 2021, 2023, 2024];
  const currentIndex = years.indexOf(selectedYear);

  // Mock images representing different years
  const historicalImages = {
    2015: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800",
    2017: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    2019: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
    2021: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    2023: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=800",
    2024: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
  };

  const improvements = [
    { year: 2016, description: "New metro station opened" },
    { year: 2018, description: "Shopping mall construction" },
    { year: 2020, description: "Park renovation completed" },
    { year: 2022, description: "Road widening project" },
    { year: 2023, description: "Smart street lights installed" },
  ];

  const getImprovementScore = () => {
    const baseScore = 65;
    const yearsSince2015 = selectedYear - 2015;
    return Math.min(95, baseScore + yearsSince2015 * 3);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Neighborhood Evolution
          </h3>
          <p className="text-sm text-muted-foreground">
            See how this area has changed over the years
          </p>
        </div>
      </div>

      {/* Year Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-foreground">
            Select Year
          </label>
          <span className="text-lg font-bold text-accent">{selectedYear}</span>
        </div>

        <Slider
          value={[years.indexOf(selectedYear)]}
          onValueChange={(value) => setSelectedYear(years[value[0]])}
          min={0}
          max={years.length - 1}
          step={1}
          className="mb-2"
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          {years.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="mb-6">
        <div className="relative rounded-lg overflow-hidden aspect-video">
          {/* Before image (2015) */}
          <img
            src={historicalImages[2015]}
            alt="2015"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* After image (selected year) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={
                historicalImages[selectedYear as keyof typeof historicalImages]
              }
              alt={selectedYear.toString()}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Slider Handle */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-10"
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg
                className="h-4 w-4 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </div>
          </div>

          {/* Year Labels */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
            2015
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
            {selectedYear}
          </div>
        </div>
      </div>

      {/* Development Timeline */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Development Milestones
        </h4>
        <div className="relative pl-6 space-y-4">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-accent/30" />

          {improvements
            .filter((imp) => imp.year <= selectedYear)
            .map((improvement, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full bg-accent border-2 border-card" />
                <div className="text-xs text-muted-foreground">
                  {improvement.year}
                </div>
                <div className="text-sm text-foreground">
                  {improvement.description}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Improvement Score */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">Improvement Score</span>
          </div>
          <div className="text-3xl font-bold text-green-700 dark:text-green-300">
            {getImprovementScore()}%
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            Area quality increased significantly
          </div>
        </div>

        <div className="p-4 rounded-lg bg-secondary">
          <div className="text-xs text-muted-foreground mb-2">
            Changes Since 2015
          </div>
          <div className="text-3xl font-bold text-accent">
            {improvements.filter((imp) => imp.year <= selectedYear).length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Major developments
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetViewHistory;
