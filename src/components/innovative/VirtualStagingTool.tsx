import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sparkles, Download } from "lucide-react";

interface VirtualStagingToolProps {
  propertyId: string;
}

type StagingStyle =
  | "modern"
  | "traditional"
  | "minimalist"
  | "luxury"
  | "scandinavian";

/**
 * Virtual Staging AI Tool
 * Let users visualize empty rooms with different furniture styles
 */
const VirtualStagingTool = ({ propertyId }: VirtualStagingToolProps) => {
  const [selectedStyle, setSelectedStyle] = useState<StagingStyle>("modern");
  const [compareMode, setCompareMode] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);

  const stagingStyles = [
    {
      id: "modern" as StagingStyle,
      name: "Modern",
      description: "Clean lines, neutral colors",
    },
    {
      id: "traditional" as StagingStyle,
      name: "Traditional",
      description: "Classic elegance",
    },
    {
      id: "minimalist" as StagingStyle,
      name: "Minimalist",
      description: "Less is more",
    },
    {
      id: "luxury" as StagingStyle,
      name: "Luxury",
      description: "High-end finishes",
    },
    {
      id: "scandinavian" as StagingStyle,
      name: "Scandinavian",
      description: "Cozy & bright",
    },
  ];

  // Mock staged images - in production, these would come from AI API
  const emptyRoom =
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800";
  const stagedImages = {
    modern:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    traditional:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    minimalist:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    luxury:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    scandinavian:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      setCompareMode(true);
    }, 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Virtual Staging AI
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Visualize this space with furniture
          </p>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="gap-2"
        >
          <>
            <Sparkles className="h-4 w-4" />
            Apply Staging
          </>
        </Button>
      </div>

      {/* Style Selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Select Design Style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stagingStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                selectedStyle === style.id
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div className="font-medium text-sm text-foreground">
                {style.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {style.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Before/After Comparison */}
      {!compareMode ? (
        <div className="relative rounded-lg overflow-hidden aspect-video bg-secondary">
          <img
            src={emptyRoom}
            alt="Empty room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-80" />
              <p className="text-sm">
                Select a style and click "Apply Staging"
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden aspect-video">
          {/* Before/After Slider */}
          <div className="relative w-full h-full">
            <img
              src={emptyRoom}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={stagedImages[selectedStyle]}
                alt="After staging"
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

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
              Before
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
              After ({stagingStyles.find((s) => s.id === selectedStyle)?.name})
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {compareMode && (
        <div className="mt-4 flex gap-3">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Download Image
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCompareMode(false)}
          >
            Try Another Style
          </Button>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-xs text-muted-foreground">
          💡 <span className="font-medium">Pro Tip:</span> Virtual staging helps
          you visualize the potential of empty spaces. Drag the slider to
          compare before and after!
        </p>
      </div>
    </div>
  );
};

export default VirtualStagingTool;
